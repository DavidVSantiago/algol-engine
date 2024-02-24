import { SceneManager, SimpleSprite } from '../../engine.js';
import Scene from '../scene.js';

class SimpleScene extends Scene {
    constructor(name) {
        super(name);
    }

    start(){
        SceneManager.getInstance().startScene(this);
    }
}

export default SimpleScene;