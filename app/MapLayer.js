import d3 from 'd3';
import { chicagoLoopGeoJSON } from './constants/chicagoGeoJson.js';

export const getProjection = (mapScale, mapWidth, mapHeight) => {
	const projection = d3.geo.albers()
	    .scale(1)
	    .translate([0, 0]);

	const path = d3.geo.path().projection(projection);
	const bounds = path.bounds(chicagoLoopGeoJSON);
	const scale = mapScale / Math.max((bounds[1][0] - bounds[0][0]) / mapWidth, (bounds[1][1] - bounds[0][1]) / mapHeight);
	const translate = [(mapWidth - scale * (bounds[1][0] + bounds[0][0])) / 2, (mapHeight - scale * (bounds[1][1] + bounds[0][1])) / 2];

	projection
		.scale(scale)
		.translate(translate);

	return projection;
};

export const pairShapes = (shapes, route) => {
	const pairedShapes = [];
	for (let i = 0; i < shapes.length - 2; i++) {
		if (shapes[i].shape_dist_traveled > shapes[i + 1].shape_dist_traveled) {
			break;
		}
		pairedShapes.push({
			shape1: shapes[i],
			shape2: shapes[i + 1]
		});
	}
	return pairedShapes;
};
