'use strict';
goog.provide('Viewer.MessageBus');

/**
 * This is a messaging service.
 * It broadcasts from $rootScope allowing all Angular components to digest changes.
 * @param {angular.Scope} $rootScope
 *
 * @constructor
 * @export
 * @ngInject
 */
Viewer.MessageBus = function ($rootScope) {
    this.message = {};
    this.rootScope = $rootScope;
};

/**
 * @export
 *
 * Trigger a message from rootScope.
 * @param {!string} type
 * @param {!string=} message
 */
Viewer.MessageBus.prototype.trigger = function (type, message) {
    this.message[type] = message;
    this.broadcast(type);
};

/**
 * Trigger a message from rootScope.
 * NOTE:  Wrap the broadcast with $evalAsync or $timeout to ensure
 *   events outside the Angular digest cycle are triggered properly.
 *
 *   If this isn't done, the event will likely never post to your UI!
 * @param {!string} type
 */
Viewer.MessageBus.prototype.broadcast = function (type) {
    this.rootScope.$evalAsync(function(){
        this.rootScope.$broadcast(type);
    }.bind(this));
};
