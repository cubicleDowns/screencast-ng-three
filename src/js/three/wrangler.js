goog.provide('Viewer.Wrangler');
/**
 * @class This is a resource manager and loads individual models.
 *
 * @struct
 * @constructor
 */
Viewer.Wrangler = function (params) {

    this.context = params.context;
    this.currentModel = null;
    this.glTFLoader = new THREE.glTFLoader();
    this.name = null;
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
        this.removeFromScene();
        this.name = name;
        this.glTFLoader.load(url, function(object){

            object.scene.name = name;
            this.currentModel = object.scene;
            //TODO:  add animation
            this.context.scene.add(object.scene);
        }.bind(this));
    },

    /**
     * Removes the old object from the scene
     */
    removeFromScene: function(){
        var obj = this.context.scene.getObjectByName(this.name, true);
        this.context.scene.remove(obj);
    }
};
