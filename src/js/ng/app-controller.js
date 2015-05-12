'use strict';
goog.provide('Viewer.AppController');
//goog.require('Viewer.Scene');


/**
 *
 * @param {angular.Scope} $scope
 * @param {Viewer.MessageBus} MessageBus
 * @param {Viewer.ViewerService} ViewerService
 *
 * @constructor
 * @export
 * @ngInject
 */
Viewer.AppController = function ($scope, MessageBus, ViewerService) {

    this.scope = $scope;
    this.MessageBus = MessageBus;
    this.ViewerService = ViewerService;

    /**
     * @type {boolean}
     */
    this.loader = true;

    /**
     * @type {{data:{name:string,name:string,scale:number}}}
     */
    this.data = {
        'name': 'duck',
        'url': 'dist/gltf/duck.gltf ',
        'scale': "1"
    };

    this.status = "Not loaded";

    this.init();
};

Viewer.AppController.prototype.init = function () {
    this.ViewerService.init({
        canvasId: 'viewer',
        containerId: 'container'
    });

    this.listeners();
};


Viewer.AppController.prototype.listeners = function () {

    this.scope.$on('fileAdded', function (e) {
        this.status = this.MessageBus.message['fileAdded'];
    }.bind(this));
};

/**
 * @export
 */
Viewer.AppController.prototype.scale = function () {
    console.log(this.data.scale);
    this.ViewerService.scale(this.data.scale);
};


/**
 * @export
 *
 * Load a glTF file
 *  https://www.khronos.org/gltf
 *  FIXME:  Add animation support
 */
Viewer.AppController.prototype.loadglTF = function () {
    if (this.data.url && this.data.name) {

        var info = {
            'url': this.data.url,
            'name': this.data.name,
            'type': 'glTF'
        };

        this.loader = false;

        this.ViewerService.loadGLTF(info);
    } else {
        alert('URL to a glTF file and a unique name required');
    }
};
