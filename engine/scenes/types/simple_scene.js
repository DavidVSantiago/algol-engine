"use strict";

import Scene from '../scene.js';
import SceneManager from '../scene_manager.js';

/** Implementação de uma cena simples e vazia
 * Classe abstrata. Deve ser herdada para fornecer as funcionalidades básicas de uma cena */
class SimpleScene extends Scene {
    /** construtor
    * @param {String} name nome único da cena */
    constructor(name) {
        super(name);
        this.sceneManager = SceneManager.getInstance();
    }

    //---------------------------------------------------------------------------------------------------------
    // MÉTODOS 
    //---------------------------------------------------------------------------------------------------------

    /** Dá início ao processo de carregamento da cena */
    start(old){
        this.sceneManager.startScene(this,old);
    }

    /** Agenda o início do processo de carregamento da cena 
    * @param {Number} time tempo, em milissegundos, de espera até o início da cena */
    scheduleStart=(time,old) => {
        setTimeout(() => {
            this.start(old);
        },time);
    }
    
    
    //---------------------------------------------------------------------------------------------------------
    // MÉTODOS DO GAMELOOP
    //---------------------------------------------------------------------------------------------------------
}
export default SimpleScene;