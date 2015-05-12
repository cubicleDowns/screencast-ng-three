goog.provide('Viewer.Wrangler');
/**
 * @class This is a resource manager and loads individual models.
 *
 * @param {Object} params
 * @param {Viewer.MessageBus} MessageBus

 * @struct
 * @constructor
 */
Viewer.Wrangler = function (params, MessageBus) {
    this.context = params.context;
    this.currentModel = null;
    this.glTFLoader = new THREE.glTFLoader();
    this.name = null;
    this.MessageBus = MessageBus;
};

/**
 *
 */
Viewer.Wrangler.prototype = {

    /**
     * @param {!string} url
     * @param {!string} name
     */
    loadGLTF: function (url, name) {
        this.name = name;
        this.glTFLoader.load(url, function(object){

            object.scene.name = name;
            this.currentModel = object.scene;
            //TODO:  add animation
            this.context.scene.add(object.scene);
            this.MessageBus.trigger('fileAdded', 'Loaded');
        }.bind(this));
    }
};
