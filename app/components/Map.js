import React from 'react';
import _ from 'lodash';

import { getProjection } from '../MapLayer';
import { svgLayer } from '../styles/map';

import TrainLine from '../components/TrainLine';
import Train from '../components/Train';

export default class Map extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			mapScale: 0.15,
			mapWidth: window.innerWidth,
			mapHeight: window.innerHeight,
			trains: null,
			trainLines: null
		};

		this.projection = getProjection(this.state.mapScale, this.state.mapWidth, this.state.mapHeight);

		_.bindAll(this, 'renderTrains', 'renderTrainLines');
	}

	renderTrains(train, trainGroup) {
		return (
			<Train
				key={_.first(train.rn)}
				lat={_.first(train.lat)}
				lon={_.first(train.lon)}
				routeName={trainGroup.$.name}
				projection={this.projection}
				{...this.state}
			/>
		);
	}

	renderTrainLines(trainLine) {
		return (
			<TrainLine
				key={trainLine.route.route_id}
				{...trainLine}
				projection={this.projection}
				{...this.state}
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
					style={svgStyle}
				>
					{ trainLines &&
						trainLines.map((trainLine) => this.renderTrainLines(trainLine))
					}
					{ trains &&
						trains.map((trainGroup) => trainGroup.train.map((train) => this.renderTrains(train, trainGroup)))
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
