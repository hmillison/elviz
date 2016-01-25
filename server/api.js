require('es6-promise').polyfill();
import { Router } from 'express';
import fetch from 'isomorphic-fetch';
import xml2js from 'xml2js';
import { ctaTrainTrackerAPIKey } from './keys';

export default function() {
	const api = Router();

	api.get('/', (req, res) => {
		res.json({
			version: '1.0'
		});
	});

	api.get('/locations', (req, res) => {
		const endpointURL = 'http://lapi.transitchicago.com/api/1.0/ttpositions.aspx';
		fetch(`${endpointURL}?key=${ctaTrainTrackerAPIKey}&rt=red,blue,pink,g,brn,org`)
		.then((response) => {
			return response.text();
		})
		.then((data) => {
			const parser = new xml2js.Parser();
			parser.parseString(data, (err, result) => {
				res.json(result.ctatt.route);
			});
		});
	});

	return api;
}
