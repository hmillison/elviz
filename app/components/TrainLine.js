import React from 'react';
import d3 from 'd3';
import ReactFauxDom from 'react-faux-dom';
import { getProjection, pairShapes } from '../MapLayer.js';
import { colorHash } from '../constants/colors.js';

export default class TrainLine extends React.Component {
	constructor(props) {
		super(props);

		this.render = this.render.bind(this);
	}

	render() {
		const projection = getProjection(this.props.mapScale, this.props.mapWidth, this.props.mapHeight);

		const map = ReactFauxDom.createElement('svg');

		const pairedShapeData = pairShapes(this.props.shapes, this.props.route);

		d3.select(map)
			.attr('width', this.props.mapWidth)
			.attr('height', this.props.mapHeight)
			.selectAll('line')
  			.data(pairedShapeData)
			.enter().append('g:line')
			.style('stroke', colorHash[this.props.route.route_id.toLowerCase()])
			.style('z-index', 0)
			.attr('y1', (d) => {
				const coords = [d.shape1.shape_pt_lon, d.shape1.shape_pt_lat];
				return projection(coords)[1];
			})
			.attr('x1', (d) => {
				const coords = [d.shape1.shape_pt_lon, d.shape1.shape_pt_lat];
				return projection(coords)[0];
			})
			.attr('y2', (d) => {
				const coords = [d.shape2.shape_pt_lon, d.shape2.shape_pt_lat];
				return projection(coords)[1];
			})
			.attr('x2', (d) => {
				const coords = [d.shape2.shape_pt_lon, d.shape2.shape_pt_lat];
				return projection(coords)[0];
			});

		return map.toReact();
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
