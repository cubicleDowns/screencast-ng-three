'use strict';
goog.provide('Viewer.AppController');

/**
 *
 * @param {angular.Scope} $scope
 * @param {Viewer.ViewerService} ViewerService
 *
 * @constructor
 * @export
 * @ngInject
 */
Viewer.AppController = function ($scope, ViewerService) {

    this.scope = $scope;
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
        'url': 'dist/gltf/duck.json',
        'scale': "1"
    };

    this.init();
};

Viewer.AppController.prototype.init = function () {
    this.ViewerService.init({
        canvasId: 'viewer',
        containerId: 'container'
    });
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
