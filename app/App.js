import React from 'react';
import fetch from 'isomorphic-fetch';
import _ from 'lodash';

import Map from './components/Map';

export default class App extends React.Component {
  constructor(props) {
	super(props);

	this.state = {
		trainLines: [],
		trains: []
	};

	_.bindAll(this, 'fetchTrainMap', 'fetchTrains');
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
		const trainLines = _.values(trainLinesJSON);
		this.setState({
			trainLines: trainLines
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

  render() {
	const { trainLines, trains } = this.state;
	return (
	  <Map 
		trainLines={trainLines}
		trains={trains}
	  />
	);
  }
}
