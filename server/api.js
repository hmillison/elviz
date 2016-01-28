const Router = require('express').Router;
require('es6-promise').polyfill();
const fetch = require('isomorphic-fetch');
const xml2js = require('xml2js');
const keys = require('./keys');
const map = require('./trainLines');

module.exports = () => {
	const api = Router();

	api.get('/', (req, res) => {
		res.json({
			version: '1.0'
		});
	});

	api.get('/map', (req, res) => {
		res.json(map.trainLines);
	});

	api.get('/locations', (req, res) => {
		const endpointURL = 'http://lapi.transitchicago.com/api/1.0/ttpositions.aspx';
		fetch(`${endpointURL}?key=${keys.ctaTrainTrackerAPIKey}&rt=red,blue,pink,g,brn,org`)
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
};
