import Scene from '../scene.js';
import SceneManager from '../scene_manager.js';

/** Classe Abstrata. Representa uma cena simples com sprites de imagens.
 * Deve ser herdada por uma classe que irá representar uma cena do jogo */
class SimpleScene extends Scene {
    constructor(name) {
        super(name);
    }

    //---------------------------------------------------------------------------------------------------------
    // MÉTODOS 
    //---------------------------------------------------------------------------------------------------------

    start(){
        SceneManager.getInstance().startScene(this);
    }
    
    //---------------------------------------------------------------------------------------------------------
    // MÉTODOS DO GAMELOOP
    //---------------------------------------------------------------------------------------------------------
}
export default SimpleScene;