import React from 'react';
import fetch from 'isomorphic-fetch';
import _ from 'lodash';

import { getProjection } from '../MapLayer';
import { svgLayer } from '../styles/map';

import TrainLine from '../components/TrainLine';
import Train from '../components/Train';

export default class Map extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			mapScale: 0.25,
			mapWidth: window.innerWidth,
			mapHeight: window.innerHeight,
			trains: null,
			trainLines: null
		};

		this.projection = getProjection(this.state.mapScale, this.state.mapWidth, this.state.mapHeight);

		this.render = this.render.bind(this);
		this.fetchTrainMap = this.fetchTrainMap.bind(this);
		this.fetchTrains = this.fetchTrains.bind(this);
		this.renderTrains = this.renderTrains.bind(this);
		this.renderTrainLines = this.renderTrainLines.bind(this);
	}

	componentDidMount() {
		this.fetchTrainMap();
		window.setInterval(this.fetchTrains, 1000);
	}

	fetchTrainMap() {
		fetch('/api/map')
		.then((mapResponse) => {
			return mapResponse.json();
		})
		.then((trainLinesJSON) => {
			const trainLinesArray = _.values(trainLinesJSON);
			this.setState({
				trainLines: trainLinesArray
			});
		});
	}

	fetchTrains() {
		fetch('/api/locations')
		.then((locationsResponse) => {
			return locationsResponse.json();
		})
		.then((trainLocationsJSON) => {
			this.setState({
				trains: trainLocationsJSON
			});
		});
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
				{...trainLine}
				projection={this.projection}
				{...this.state}
			/>
		);
	}

	render() {
		const trainLines = this.state.trainLines;
		const trains = this.state.trains;
		const style = svgLayer;
		return (
			<div>
				<svg
					width={this.state.mapWidth}
					height={this.state.mapHeight}
					style={style}
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
	Red: React.PropTypes.object,
	P: React.PropTypes.object,
	Y: React.PropTypes.object,
	Blue: React.PropTypes.object,
	Pink: React.PropTypes.object,
	G: React.PropTypes.object,
	Brn: React.PropTypes.object,
	Org: React.PropTypes.object,
	trainsFetch: React.PropTypes.object
};

Map.defaultProps = {
	Red: {},
	P: {},
	Y: {},
	Blue: {},
	Pink: {},
	G: {},
	Brn: {},
	Org: {},
	trainsFetch: null
};
