import React from 'react';

export default class Line extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { y1, x1, y2, x2, style } = this.props;
		return (
			<line
				y1={y1}
				x1={x1}
				y2={y2}
				x2={x2}
				style={style}
			/>
		);
	}
}

Line.propTypes = {
	y1: React.PropTypes.number.isRequired,
	x1: React.PropTypes.number.isRequired,
	y2: React.PropTypes.number.isRequired,
	x2: React.PropTypes.number.isRequired,
	style: React.PropTypes.object
};

Line.defaultProps = {
	style: {}
};