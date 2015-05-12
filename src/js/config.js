'use strict';

var SETUP = {
    CAM: {
        ORTH_NEAR_PLANE: -1000,
        ORTH_FAR_PLANE: 1000,
        PERP_NEAR_PLANE: 1,
        PERP_FAR_PLANE: 10000,
        FOV: 70,
        ORTHO: false,
        VIEWSIZE: 1000
    },
    SCENE: {
        HELPERS: true,
        AXIS_LENGTH: 50,
        GRID: true,
        GROUND: true
    },
    LIGHTS: {
        DIRECTIONAL: true,
        SPOT: true,
        AMBIENT: true
    },
    DEBUG_MODE: false,
    SAMPLES: {
        GLTFURL : '/v2/dist/gltf/duck.gltf',
        GLTFNAME: 'duck'
    },
    'LOAD_DELAY': 1500
};
