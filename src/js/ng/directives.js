'use strict';
goog.provide('Viewer.Directives');

/**
 * @param {Viewer.ViewerService} ViewerService
 *
 * @constructor
 */
Viewer.SelectDirective = function (ViewerService) {
    /** @type {angular.Scope} */
    this.scope;
    /** @type {angular.JQLite} */
    this.elem;
    /** @type {angular.Attributes} */
    this.attrs;

    /**@type {Viewer.ViewerService} */
    this.ViewerService = ViewerService;

    this.link = this.link.bind(this);
};

/**
 * @return {Object}
 *
 * @param {Viewer.ViewerService} ViewerService
 *
 * @ngInject
 */
Viewer.SelectDirective.factory = function(ViewerService) {
    var d = new Viewer.SelectDirective(ViewerService);
    return {
        'restrict': 'A',
        link: d.link
    };
};

/**
 * Linking function.
 * @ngInject
 */
Viewer.SelectDirective.prototype.link = function (scope, elem, attrs) {
    this.scope = scope;
    this.elem = elem;
    this.attrs = attrs;

    var x, y,
        width,
        height,
        offsetLeft,
        offsetTop,
        mouseDown = {};
    $(this.elem).hammer({
        prevent_default: false
    }).bind('tap', function(e) {
        x = e.gesture.center.x;
        y = e.gesture.center.y;

        offsetLeft = this.elem.context.offsetLeft;
        offsetTop = this.elem.context.offsetTop;
        width = window.innerWidth;
        height = window.innerHeight;

        // creating NDC coordinates for ray intersection.
        mouseDown.x = (x / width) * 2 - 1;
        mouseDown.y = -(y / height) * 2 + 1;
        this.ViewerService.makeSelection(mouseDown);
    }.bind(this));
};

/**
 * @constructor
 */
Viewer.StopEventDirective = function () {
    /** @type {angular.Scope} */
    this.scope;
    /** @type {angular.JQLite} */
    this.elem;
    /** @type {angular.Attributes} */
    this.attrs;

    this.link = this.link.bind(this);
};

Viewer.StopEventDirective.factory = function () {
    var d = new Viewer.StopEventDirective();

    return {
        restrict: 'A',
        link: d.link
    };
};
/**
 * Linking function
 * @param {angular.Scope} scope
 * @param {angular.JQLite} elem
 * @param {angular.Attributes} attrs
 */
Viewer.StopEventDirective.prototype.link = function (scope, elem, attrs) {
    this.scope = scope;
    this.elem = elem;
    this.attrs = attrs;
    this.elem.on('click', function(e){
        e.stopImmediatePropagation();
        e.preventDefault();
    });
};
