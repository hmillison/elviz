import React from 'react';
import { connect } from 'react-refetch';
import _ from 'lodash';

import TrainLine from './TrainLine';
import Train from './Train';

export default class Map extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			mapScale: 0.25,
			mapWidth: window.innerWidth,
			mapHeight: window.innerHeight
		};

		this.render = this.render.bind(this);
		this.renderTrains = this.renderTrains.bind(this);
	}

	renderTrains(train) {
		return (
			<Train
				lat={_.first(train.lat)}
				lon={_.first(train.lon)}
				{...this.state}
			/>
		);
	}

	render() {
		let trains = null
		if (this.props.trainsFetch.fulfilled) {
			trains = this.props.trainsFetch.value;
		}
		return (
			<div className='Map'>
				<TrainLine
					{...this.props.Red}
					{...this.state}
				/>
				<TrainLine
					{...this.props.P}
					{...this.state}
				/>
				<TrainLine
					{...this.props.Y}
					{...this.state}
				/>
				<TrainLine
					{...this.props.Blue}
					{...this.state}
				/>
				<TrainLine
					{...this.props.Pink}
					{...this.state}
				/>
				<TrainLine
					{...this.props.G}
					{...this.state}
				/>
				<TrainLine
					{...this.props.Brn}
					{...this.state}
				/>
				<TrainLine
					{...this.props.Org}
					{...this.state}
				/>
				{ trains &&
					trains.map((trainGroup) => trainGroup.train.map((train) => this.renderTrains(train)))
				}
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

export default connect(props => ({
	trainsFetch: {
		url: '/api/locations',
		refreshInterval: 5000
	}
}))(Map);
