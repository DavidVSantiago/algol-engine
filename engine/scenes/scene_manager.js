"use strict";

import LoadingScene from "./types/loading_scene.js";

/** SINGLETON que gerencia o caregamento e transição entre as cenas do jogo
 * Classe usada pela maioria das outras classes da engine */
class SceneManager {
    static singleton;
    constructor() {
        this.isTrasition=false;
        this.loadingScene = new LoadingScene('LOADING'); // cena usada entre os carregamentos das cenas
        //this.loadingScene.setMinTransitionTime(0);
        this.loadingScene.startLoadResources(this.scheduleChange);
        this.actualScene=this.loadingScene;
    }

    //---------------------------------------------------------------------------------------------------------
    // GETTERS & SETTERS
    //---------------------------------------------------------------------------------------------------------

    /** Retorna o singleton dessa classe */
    static getInstance() {

        if (!this.singleton) {
            this.singleton = new this();
        }
        return this.singleton;
    }

    /** Retorna a cena atual a ser renderizada */
    getActualScene = () => {
        return this.actualScene;
    }

    //---------------------------------------------------------------------------------------------------------
    // MÉTODOS
    //---------------------------------------------------------------------------------------------------------

    /** Dá início ao processo de inicialização da cena
    * @param {Scene} scene cena ser definida como atual */
    startScene = (scene) => {
        this.isTrasition=true;
        scene.startLoadResources(this.onFinishLoad); // Obrigatório para carregar todos os sprites
    }

    /** Altera a cena atual após um período de tempo 
    * @param {Scene} scene cena ser definida como atual */
    onFinishLoad = (scene) => {
        this.actualScene = scene;
        scene.onShow();
        this.isTrasition=false;
    }
}

export default SceneManager;