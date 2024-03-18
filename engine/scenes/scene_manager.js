"use strict";

import Resources from "../resources.js";
import LoadingScene from "./types/loading_scene.js";

/** SINGLETON que gerencia o caregamento e transição entre as cenas do jogo
 * Classe usada pela maioria das outras classes da engine */
class SceneManager {
    
    static singleton;
    constructor() {
        this.loadingScene=null;

        // dados do gerenciamento do splash
        // TODO remover alguns destes
        this.splashList=null;
        this.splashIndex=0;
        this.postSplashScene=null;
        this.accTime=0.0;

        this.actualScene=null;
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

    /** Inicializa os recursos do SceneManager */
    init(gameLoopCallBack){
        this.loadingScene = new LoadingScene('LOADING'); // cena usada entre os carregamentos das cenas
        this.loadingScene.startLoadResources(
            (scene)=>{ // callback para o pós carregamento dos recursos da cena de loading
                this.changeScene(this.loadingScene);
                requestAnimationFrame(gameLoopCallBack); // pode iniciar o gameloop
            }
        );
    }

    changeScene(scene){
        this.actualScene=scene;
    }

    /** Dá início ao processo de inicialização da cena
    * @param {Scene} scene cena ser definida como atual */
    startScene = (scene) => {
        this.changeScene(this.loadingScene);
        scene.startLoadResources(
            (scene) => { // callback para o pós carregamento dos recursos da cena
                this.changeScene(scene);
            }
        );
    }

    /*****************************************************************************/
    /* MÉTODOS DO GAMELOOP */
    /*****************************************************************************/

    handleEvents() {
        this.actualScene.handleEvents();
    }

    update() {
        // mecanismo de temporização para mudar os splashes
        // isso vai sair daqui. vai para dentro do update do splashscene
        if(this.splashList!=null){
            this.accTime += Resources.getInstance().deltaTime;
            if(this.accTime>=this.splashList[this.splashIndex].durationTime){
                this.splashIndex++;
                this.accTime=0;
                if(this.splashIndex==this.splashList.length){
                    this.splashIndex--;
                    this.actualScene=this.postSplashScene;
                    this.actualScene.onShow();
                    this.splashList=null;
                    this.actualScene.update();
                    return;
                }
            }
            this.actualScene=this.splashList[this.splashIndex];
            this.actualScene.onShow();
        }
        this.actualScene.update();
    }

    render() {
        this.actualScene.render();
    }
}

export default SceneManager;