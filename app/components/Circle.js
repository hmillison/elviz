import React from 'react';

export default class Circle extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { cx, cy, style } = this.props;
		return (
			<circle
				cx={cx}
				cy={cy}
				style={style}
				r={6}
			/>
		);
	}
}

Circle.propTypes = {
	cx: React.PropTypes.number.isRequired,
	cy: React.PropTypes.number.isRequired,
	style: React.PropTypes.object
};

Circle.defaultProps = {
	style: {}
};
