'use strict';
goog.provide('Viewer.ViewerService');

/**
 * Service which initiates the THREE.js scene and
 *  provides methods to interact with that scene
 *
 * @param {angular.$timeout} $timeout
 * @param {Viewer.MessageBus} MessageBus
 *
 * @constructor
 * @export
 * @ngInject
 */
Viewer.ViewerService = function($timeout, MessageBus){
    this.timeout = $timeout;
    this.MessageBus = MessageBus;
    this.home = null;
};

/**
 * Initialize the 3D scene
 * @param {!object} params
 */
Viewer.ViewerService.prototype.init = function (params){
    this.home = new Viewer.Scene(params);
    this.timeout(function(){
        this.MessageBus.trigger('appReady');
    }.bind(this), SETUP.LOAD_DELAY);
    this.animate();
};

/**
 * @export
 */
Viewer.ViewerService.prototype.animate = function(){
    requestAnimationFrame(this.animate.bind(this));
    this.render();
};

/**
 * @export
 */
Viewer.ViewerService.prototype.render = function () {
    this.home.renderer.render(this.home.scene, this.home.cameras.liveCam);
};

/**
 * See if a mouse click intersects an object.
 * @param {!{x:number, y:number}} mouse
 */
Viewer.ViewerService.prototype.makeSelection = function (mouse) {
    var vector = new THREE.Vector3( mouse.x, mouse.y, 1).unproject(this.home.cameras.liveCam);
    this.home.raycaster.set(this.home.cameras.liveCam.position,
        vector.sub(this.home.cameras.liveCam.position).normalize());
    var intersected = this.home.raycaster.intersectObjects(this.home.wrangler.collision, true);

    if(intersected.length > 0){
        intersected = intersected[0];
        this.MessageBus.trigger('objectSelected', intersected[0])
    } else {
        intersected = null;
        console.info('No intersection detected');
    }
    return intersected;
};

/**
 * Load a glTF file
 * @param {!{url: string, name: string, type: string}} info
 */
Viewer.ViewerService.prototype.loadGLTF = function (info){
    this.home.wrangler.loadGLTF(info.url, info.name);
};

/**
 * @param {!number} s
 */
Viewer.ViewerService.prototype.scale = function(s) {
    this.home.wrangler.currentModel.scale.set(s, s, s);
};

