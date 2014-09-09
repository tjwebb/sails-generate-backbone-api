/**
 * Module dependencies
 */

var util = require('util');
var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var pluralize = require('pluralize');
var sailsgen = require('sails-generate');
_.defaults = require('merge-defaults');
_.str = require('underscore.string');

// Fetch stub action template on initial load.
var ACTION_TEMPLATE = path.resolve(__dirname, '../templates/action.template');
ACTION_TEMPLATE = fs.readFileSync(ACTION_TEMPLATE, 'utf8');

/**
 * This `before()` function is run before generating targets.
 * It validates user input, configures defaults, gets extra
 * dependencies, etc.
 *
 * @param  {Object} scope
 * @param  {Function} cb    [callback]
 */

module.exports = function (scope, cb) {
  scope.id = 'backbone-api';

  sailsgen(require('sails-generate-backbone-api-hook'), scope, function (error, result) {
    if (error) throw error;

    console.log(result);
  });

	if (!scope.rootPath) {
		return cb.invalid('Usage: sails generate backbone-api');
	}

	// Check that we're in a valid sails project
	// TODO: see if we can remove this-- I think it's already been done by
	// Sails core at this point
	var pathToPackageJSON = path.resolve(scope.rootPath, 'package.json');
	var package, invalidPackageJSON;
	try {
		package = require(pathToPackageJSON);
	} catch (e) {
		invalidPackageJSON = true;
	}

	if (invalidPackageJSON) {
		return cb.invalid('Sorry, this command can only be used in the root directory of a Sails project.');
	}

	if (!scope.id) {
		return cb.invalid('Usage: sails generate controller <controllername> [action ...]');
	}

	// Validate optional action arguments
	var actions = scope.actions;
	var invalidActions = [];
	actions = _.map(actions, function(action, i) {

		// Validate action names
		var invalid = action.match(/[^a-zA-Z0-9_\$]+/);

		// Handle errors
		if (invalid) {
			return invalidActions.push(
				'Invalid action notation:   "' + action + '"');
		}
		return action;
	});

	// Handle invalid action arguments
	// Send back invalidActions
	if (invalidActions.length) {
		return cb.invalid(invalidActions);
	}

	_.defaults(scope, {
		entity: _.str.capitalize(scope.id) + 'Controller',
		resourcePlural: pluralize(scope.id),
		ext: '.js',
		actions: [],
		destDir: 'api/controllers/'
	});

	_.defaults(scope, {
		filename: scope.entity + scope.ext,
		lang: 'js'
	});

	return cb.success();
};
