module.exports = {
	templatesDirectory: require('path').resolve(__dirname,'./templates'),

	before: function (scope, cb) {
    var usage = 'Usage: sails generate backbone-api';

    if (!scope.rootPath) return cb.invalid(usage);

    scope.id = 'backbone-api';
    scope.entity = 'BackboneModel';

    cb();
  },

	targets: {
		'./api/controllers/BackboneModelController.js': { template: './controller.template.js' },
    './api/hooks/backbone-api/index.js': { template: './hook.template.js' },
    './api/models/BackboneModel.js': { template: './model.template.js' }
	}
};

