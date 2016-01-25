import React from 'react';
import d3 from 'd3';
import ReactFauxDom from 'react-faux-dom';

export default class Line extends React.Component {
	constructor(props) {
		super(props);
		this.MAP_WIDTH = 100;
		this.MAP_HEIGHT = 100;
		this.render = this.render.bind(this);
	}

	render() {
		const projection = d3.geo.albersUsa()
	    .scale(1000)
	    .translate([this.MAP_WIDTH/2, this.MAP_HEIGHT/2]);

		const line = ReactFauxDom.createElement('div');


		d3.select("body").append("svg:svg")
		  .attr("width", width)
		  .attr("height", height);

		const coords = [this.props.lon, this.props.lat];

		d3.select(line)
		.append('svg:circle')
	    .attr("cy", projection(coords)[1])
		.attr("cx", projection(coords)[0])
	    .attr("r", 4.5);
		return line.toReact();
	}
}

Line.propTypes = {
	lat: React.PropTypes.number,
	lon: React.PropTypes.number,
	color: React.PropTypes.string
};

Line.defaultProps = {
	shapes: {},
	route: {}
};
