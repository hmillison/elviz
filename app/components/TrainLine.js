import React from 'react';
import d3 from 'd3';

import { getProjection, pairShapes } from '../MapLayer';
import { svgLayer } from '../styles/map';
import { colorHash } from '../styles/colors';

export default class TrainLine extends React.Component {
	constructor(props) {
		super(props);

		this.style = {
			stroke: colorHash[this.props.route.route_id.toLowerCase()],
			strokeWidth: '2px'
		};
		this.projection = getProjection(this.props.mapScale, this.props.mapWidth, this.props.mapHeight);
		this.render = this.render.bind(this);
	}

	componentDidMount() {
		const pairedShapeData = pairShapes(this.props.shapes, this.props.route);

		d3.select(this.refs.trainLine)
		.attr('width', this.props.mapWidth)
		.attr('height', this.props.mapHeight)
		.selectAll('line')
		.data(pairedShapeData)
		.enter().append('g:line')
		.style(this.style)
		.attr('y1', (d) => {
			const coords = [d.shape1.shape_pt_lon, d.shape1.shape_pt_lat];
			return this.projection(coords)[1];
		})
		.attr('x1', (d) => {
			const coords = [d.shape1.shape_pt_lon, d.shape1.shape_pt_lat];
			return this.projection(coords)[0];
		})
		.attr('y2', (d) => {
			const coords = [d.shape2.shape_pt_lon, d.shape2.shape_pt_lat];
			return this.projection(coords)[1];
		})
		.attr('x2', (d) => {
			const coords = [d.shape2.shape_pt_lon, d.shape2.shape_pt_lat];
			return this.projection(coords)[0];
		});
	}

	shouldComponentUpdate() {
		// the train lines never change, no need to re-render
		return false;
	}

	render() {
		return (
			<svg
				width={this.props.mapWidth}
				height={this.props.mapHeight}
				style={svgLayer}
				ref='trainLine'
			/>
		);
	}
}

TrainLine.propTypes = {
	shapes: React.PropTypes.array,
	route: React.PropTypes.object,
	mapScale: React.PropTypes.number,
	mapWidth: React.PropTypes.number,
	mapHeight: React.PropTypes.number
};

TrainLine.defaultProps = {
	shapes: {},
	route: {},
	mapScale: 0.3,
	mapWidth: 900,
	mapHeight: 500
};
