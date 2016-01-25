import React from 'react';
import d3 from 'd3';
import ReactFauxDom from 'react-faux-dom';
import { getProjection } from '../MapLayer.js';

export default class TrainLine extends React.Component {
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
			.selectAll('circle')
  			.data(this.props.shapes)
			.enter().append('g:circle')
			.style('fill', `#${this.props.route.route_color}`)
			.style('z-index', 0)
			.attr('cy', (d) => {
				const coords = [d.shape_pt_lon, d.shape_pt_lat];
				return projection(coords)[1];
			})
			.attr('cx', (d) => {
				const coords = [d.shape_pt_lon, d.shape_pt_lat];
				return projection(coords)[0];
			})
			.attr('r', 4.5);


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
