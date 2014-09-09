var _ = require('lodash');
var sailsgen = require('sails-generate');

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
  if (!scope.rootPath) return cb.invalid(usage);

  scope.generatorType = 'backbone-api';
  scope.id = 'backbone-api';

  _.defaults(scope, {
    entity: 'BackboneApiController',
    resourcePlural: 'BackboneApis',
    lang: 'js',
    destDir: 'api/controllers/'
  });

  cb();
};
