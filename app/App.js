import React from 'react';

import { trainLines } from './constants/trainlines';
import Map from './components/Map';

export default class App extends React.Component {
  constructor(props) {
	super(props);
  }

  render() {
	return (
	  <Map 	{...trainLines} />
	);
  }
}
