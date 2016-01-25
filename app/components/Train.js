import React from 'react';
import d3 from 'd3';
import ReactFauxDom from 'react-faux-dom';
import { getProjection } from '../MapLayer.js';

export default class Train extends React.Component {
	constructor(props) {
		super(props);

		this.render = this.render.bind(this);
	}

	render() {
		const projection = getProjection(this.props.mapScale, this.props.mapWidth, this.props.mapHeight);

		const map = ReactFauxDom.createElement('svg');

		d3.select(map)
			.attr('width', this.props.mapWidth)
			.attr('height', this.props.mapHeight)
			.append('g:circle')
			.style('fill', '#2c3e50')
			.style('stroke', '#95a5a6')
			.style('stroke-width', '2px')
			.attr('cy', () => {
				const coords = [this.props.lon, this.props.lat];
				return projection(coords)[1];
			})
			.attr('cx', () => {
				const coords = [this.props.lon, this.props.lat];
				return projection(coords)[0];
			})
			.attr('r', 6);


		return map.toReact();
	}
}

Train.propTypes = {
	lat: React.PropTypes.string,
	lon: React.PropTypes.string,
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
