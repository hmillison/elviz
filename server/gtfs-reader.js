/*
 * Used for parsing CTA GTFS data to JSON objects that will be used by D3 to visualize the transit system
 */
import _ from 'lodash';
import fs from 'fs';
import async from 'async';
import { Converter } from 'csvtojson';

export const ctaRouteIDs = ['Red', 'P', 'Y', 'Blue', 'Pink', 'G', 'Brn', 'Org'];

const parsers = {
	routes: (routesJSON) => {
		const filteredRoutes = _.filter(routesJSON, (route) => {
			return _.indexOf(ctaRouteIDs, route.route_id) !== -1;
		});
		return filteredRoutes;
	},

	trips: (tripsJSON) => {
		const filteredTrips = _.filter(tripsJSON, (trip) => {
			return _.indexOf(ctaRouteIDs, trip.route_id) !== -1;
		});
		return filteredTrips;
	},

	shapes: (shapesJSON) => {
		return shapesJSON;
	},

	stops: (stopsJSON) => {
		const filteredStops = _.filter(stopsJSON, (stop) => {
			return stop.location_type === 1;
		});
		return filteredStops;
	}
};

const writeDataToImportableFile = (fileName, data) => {
	const formattedForFile = `module.exports = const ${fileName} = ${JSON.stringify(data)};`;
	fs.writeFileSync(`server/${fileName}.js`, formattedForFile);
	return null;
};

const csvToJSON = (file, callback) => {
	const fileName = './google_transit/' + file + '.txt';
	const converter = new Converter({});
	converter.fromFile(fileName, (err, result) => {
		const parsedData = parsers[file](result);
		callback(null, [file, parsedData]);
	});
};

const formatShapesByTrainLine = ({routes, trips, shapes}) => {
	const formattedShapes = {};
	_.forEach(ctaRouteIDs, (routeID) => {
		const currentRoute = _.find(routes, (route) => route.route_id === routeID);
		const routeShapes = _.filter(trips, (trip) => trip.route_id === routeID);
		const shapeIDs = routeShapes.map((shape) => shape.shape_id);
		let shapesForRoute = _.filter(shapes, (shape) => _.indexOf(shapeIDs, shape.shape_id) !== -1);
		if (routeID === 'blue') {
			shapesForRoute = shapesForRoute.slice(0, 600);
		}
		formattedShapes[routeID] = {
			shapes: shapesForRoute,
			route: currentRoute
		};
	});
	writeDataToImportableFile('trainLines', formattedShapes);
	return null;
};

console.log('Begin parsing GTFS data');
async.map(['routes', 'trips', 'shapes', 'stops'], csvToJSON, (err, results) => {
	const resultsObject = _.zipObject(results);
	console.log('Finished parsing GTFS data');
	formatShapesByTrainLine(resultsObject);
	process.exit();
});

