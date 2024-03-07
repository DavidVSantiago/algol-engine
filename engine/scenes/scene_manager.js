"use strict";

import LoadingScene from "./types/loading_scene.js";

/** SINGLETON que gerencia o caregamento e transição entre as cenas do jogo
 * Classe usada pela maioria das outras classes da engine */
class SceneManager {
    static singleton;
    constructor() {}

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

    /** Inicializa os recursos do SceneManager */
    init(gameLoopCallBack){
        this.loadingScene = new LoadingScene('LOADING'); // cena usada entre os carregamentos das cenas
        this.loadingScene.startLoadResources((scene)=>{
            requestAnimationFrame(gameLoopCallBack);
        });
    }

    /** Dá início ao processo de inicialização da cena
    * @param {Scene} scene cena ser definida como atual */
    startScene = (scene) => {
        scene.startLoadResources(this.onFinishLoad); // Obrigatório para carregar todos os sprites
    }

    /** 
    * @param {Scene} scene cena ser definida como atual */
    onFinishLoad = (scene) => {
        this.actualScene = scene;
        scene.onShow();
    }
}

export default SceneManager;