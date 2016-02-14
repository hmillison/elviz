import React from 'react';
import d3 from'd3';
import _ from 'lodash';

import { getProjection } from '../MapLayer';

import TrainLine from '../components/TrainLine';
import Train from '../components/Train';
import Path from '../components/Path';

export default class Map extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			mapScale: 0.15,
			mapWidth: window.innerWidth,
			mapHeight: window.innerHeight,
			trains: null,
			trainLines: null,
			projection: null
		};

		this.state.projection = getProjection(this.state.mapScale, this.state.mapWidth, this.state.mapHeight);

		// window.scale = () => {
		// 	this.setState({
		// 		mapScale: this.state.mapScale + 0.02
		// 	});
		// 	this.state.projection = getProjection(this.state.mapScale + 0.02, this.state.mapWidth, this.state.mapHeight);
		// };
		_.bindAll(this, 'renderTrains', 'renderTrainLines');
	}

	componentDidMount() {
		const selection = d3.select(this.refs.Map);
		const drag = d3.behavior.drag();
		selection.call(drag);
		drag.on('drag', () => {
			console.log(d3.event.sourceEvent.pageX, d3.event.sourceEvent.pageY);
			const projection = this.state.projection;
		});
	}

	renderTrains(trainGroup) {
		const trains = trainGroup.train ? trainGroup.train : [];
		return trains.map((train) => {
			return (
				<Train
					key={_.first(train.rn)}
					lat={_.first(train.lat)}
					lon={_.first(train.lon)}
					routeName={trainGroup.$.name}
					projection={this.state.projection}
				/>
			);
		});
	}

	renderTrainLines(trainLine) {
		return (
			<TrainLine
				key={trainLine.route.route_id}
				{...trainLine}
				projection={this.state.projection}
			/>
		);
	}

	render() {
		const { trainLines, trains } = this.props;
		const svgStyle = {
			width: this.state.mapWidth,
			height: this.state.mapWidth,
			transform: 'rotate(5deg)'
		};
		return (
			<div>
				<svg
					ref='Map'
					onDrag={this.onDrag}
					style={svgStyle}
				>
					<Path
						projection={this.state.projection}
					/>
					{ trainLines &&
						trainLines.map((trainLine) => this.renderTrainLines(trainLine))
					}
					{ trains &&
						trains.map((trainGroup) => this.renderTrains(trainGroup))
					}
				</svg>
			</div>
		);
	}

}

Map.propTypes = {
	trainLines: React.PropTypes.array,
	trains: React.PropTypes.array
};

Map.defaultProps = {
	trainLines: [],
	trains: []
};
