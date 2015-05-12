'use strict';
goog.require('Viewer.ViewerService');
goog.require('Viewer.AppController');
goog.require('Viewer.Directives');
goog.require('Viewer.MessageBus');

angular.module('ViewerApp', [])
    .directive('stopEvent', Viewer.StopEventDirective.factory)
    .service('MessageBus', ['$rootScope', Viewer.MessageBus])
    .service('ViewerService', ['MessageBus', Viewer.ViewerService])
    .controller('AppController', ['$scope', 'MessageBus', 'ViewerService', Viewer.AppController]);
