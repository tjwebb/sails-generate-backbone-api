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

var usage = 'Usage: sails generate backbone-api';

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
    return cb.invalid(usage);
  }

  if (!scope.id) {
    return cb.invalid(usage);
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
