import React from 'react';
import d3 from 'd3';

import { getProjection } from '../MapLayer';
import { svgLayer } from '../styles/map';
import { colorHash } from '../styles/colors';

export default class Train extends React.Component {
	constructor(props) {
		super(props);

		this.style = {
			fill: colorHash[this.props.routeName],
			stroke: '#ecf0f1',
			strokeWidth: '2px'
		};
		this.projection = getProjection(this.props.mapScale, this.props.mapWidth, this.props.mapHeight);
		this.render = this.render.bind(this);
	}

	componentDidMount() {
		d3.select(this.refs.trainDot)
		.attr('cy', () => {
			const coords = [this.props.lon, this.props.lat];
			return this.projection(coords)[1];
		})
		.attr('cx', () => {
			const coords = [this.props.lon, this.props.lat];
			return this.projection(coords)[0];
		})
		.attr('r', 6);
	}

	shouldComponentUpdate(nextProps) {
		if (nextProps.lon === this.props.lon && nextProps.lat === this.props.lat) {
			return false;
		}
		return true;
	}

	componentDidUpdate() {
		d3.select(this.refs.trainDot)
		.transition()
		.duration(1000)
		.style('fill', colorHash[this.props.routeName])
		.attr('cy', () => {
			const coords = [this.props.lon, this.props.lat];
			return this.projection(coords)[1];
		})
		.attr('cx', () => {
			const coords = [this.props.lon, this.props.lat];
			return this.projection(coords)[0];
		});
	}

	render() {
		return (
			<svg
				width={this.props.mapWidth}
				height={this.props.mapHeight}
				style={svgLayer}
			>
				<circle
					ref='trainDot'
					style={this.style}
				/>
			</svg>
		);
	}
}

Train.propTypes = {
	lat: React.PropTypes.string,
	lon: React.PropTypes.string,
	routeName: React.PropTypes.string,
	mapScale: React.PropTypes.number,
	mapWidth: React.PropTypes.number,
	mapHeight: React.PropTypes.number
};

Train.defaultProps = {
	lat: {},
	lon: {},
	mapScale: 0.3,
	mapWidth: 900,
	mapHeight: 500
};
