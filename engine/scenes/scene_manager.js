"use strict";

import LoadingScene from "./types/loading_scene.js";

/** SINGLETON que gerencia o caregamento e transição entre as cenas do jogo
 * Classe usada pela maioria das outras classes da engine */
class SceneManager {
    static singleton;
    constructor() {
        this.actualScene;
        this.loadingScene = new LoadingScene('LOADING'); // cena usada entre os carregamentos das cenas
        this.loadingScene.startLoadResources(this.changeScene);
        this.actualScene = this.loadingScene;
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
        this.changeScene(this.loadingScene); // muda a cena para a tela de carregamento (intermediária)
        scene.startLoadResources(this.changeScene); // Obrigatório para carregar todos os sprites
    }

    /** Altera a cena atual
    * @param {Scene} scene cena ser definida como atual */
    changeScene = (scene) => {
        this.actualScene = scene;
    }
}
export default SceneManager;