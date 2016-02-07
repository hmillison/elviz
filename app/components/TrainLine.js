import React from 'react';
import _ from 'lodash';

import { pairShapes } from '../MapLayer';
import { trainLineOffsetHash } from '../styles/map';
import { colorHash } from '../styles/colors';

import Line from '../components/Line';

export default class TrainLine extends React.Component {
	constructor(props) {
		super(props);

		this.render = this.render.bind(this);
	}

	shouldComponentUpdate() {
		// the train lines never change, no need to re-render
		return false;
	}

	render() {
		const pairedShapeData = pairShapes(this.props.shapes, this.props.route);
		const lineStyle = {
			stroke: colorHash[this.props.route.route_id.toLowerCase()],
			strokeWidth: '2px'
		};
		const style = _.merge(lineStyle, trainLineOffsetHash[this.props.route.route_id.toLowerCase()]);

		const lines = pairedShapeData.map((data) => {
			const coords1 = [data.shape1.shape_pt_lon, data.shape1.shape_pt_lat];
			const coords2 = [data.shape2.shape_pt_lon, data.shape2.shape_pt_lat];
			const firstShapeProjection = this.props.projection(coords1);
			const secondShapeProjection = this.props.projection(coords2);
			const y1 = firstShapeProjection[1];
			const x1 = firstShapeProjection[0];
			const y2 = secondShapeProjection[1];
			const x2 = secondShapeProjection[0];

			return (
				<Line
					y1={y1}
					x1={x1}
					y2={y2}
					x2={x2}
					style={style}
				/>
			);
		});
		return (
			<g>
				{ lines }
			</g>
		);
	}
}

TrainLine.propTypes = {
	shapes: React.PropTypes.array,
	route: React.PropTypes.object,
	mapScale: React.PropTypes.number,
	mapWidth: React.PropTypes.number,
	mapHeight: React.PropTypes.number,
	projection: React.PropTypes.func.isRequired
};

TrainLine.defaultProps = {
	shapes: {},
	route: {},
	mapScale: 0.3,
	mapWidth: 900,
	mapHeight: 500
};
