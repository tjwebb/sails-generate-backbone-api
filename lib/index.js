module.exports = {

	templatesDirectory: require('path').resolve(__dirname,'../templates'),

	before: require('./before'),

	targets: {
		'./api/controllers/BackboneApiController.js': { template: './controller.template.js' },
    './api/hooks/backbone-api/index.js': { template: './hook.template.js' }
	}
};

