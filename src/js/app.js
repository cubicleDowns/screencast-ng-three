'use strict';
goog.require('Viewer.ViewerService');
goog.require('Viewer.AppController');
goog.require('Viewer.Directives');
goog.require('Viewer.MessageBus');

angular.module('ViewerApp', [])
    .directive('stopEvent', Viewer.StopEventDirective.factory)
    .service('MessageBus', ['$rootScope', Viewer.MessageBus])
    .service('ViewerService', ['$timeout', 'MessageBus', Viewer.ViewerService])
    .controller('AppController', ['$scope', 'ViewerService', Viewer.AppController]);
