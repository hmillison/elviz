import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import d3 from 'd3';

import { trainLineOffsetHash } from '../styles/map';
import { colorHash } from '../styles/colors';

import Circle from '../components/Circle';

export default class Train extends React.Component {
	constructor(props) {
		super(props);

		this.render = this.render.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.lon !== this.props.lon && nextProps.lat !== this.props.lat) {
			const trainDot = ReactDOM.findDOMNode(this.refs.trainDot);
			d3.select(trainDot)
			.transition()
			.duration(1000)
			.attr('cy', () => {
				const coords = [nextProps.lon, nextProps.lat];
				return this.props.projection(coords)[1];
			})
			.attr('cx', () => {
				const coords = [nextProps.lon, nextProps.lat];
				return this.props.projection(coords)[0];
			});
		}
	}

	shouldComponentUpdate() {
		// let D3 animate the changes in position
		return false;
	}

	render() {
		const circleStyle = {
			fill: colorHash[this.props.routeName],
			stroke: '#ecf0f1',
			strokeWidth: '2px'
		};
		const style = _.merge(circleStyle, trainLineOffsetHash[this.props.routeName]);
		const coords = [this.props.lon, this.props.lat];
		const projection = this.props.projection(coords);
		const cy = projection[1];
		const cx = projection[0];
		return (
			<Circle
				ref="trainDot"
				style={style}
				cy={cy}
				cx={cx}
			/>
		);
	}
}

Train.propTypes = {
	lat: React.PropTypes.string,
	lon: React.PropTypes.string,
	routeName: React.PropTypes.string,
	mapScale: React.PropTypes.number,
	mapWidth: React.PropTypes.number,
	mapHeight: React.PropTypes.number,
	projection: React.PropTypes.func.isRequired
};

Train.defaultProps = {
	lat: {},
	lon: {},
	mapScale: 0.3,
	mapWidth: 900,
	mapHeight: 500
};
