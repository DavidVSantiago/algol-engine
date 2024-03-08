"use strict";

import Resources from "../resources.js";
import LoadingScene from "./types/loading_scene.js";

/** SINGLETON que gerencia o caregamento e transição entre as cenas do jogo
 * Classe usada pela maioria das outras classes da engine */
class SceneManager {
    static singleton;
    constructor() {
        
        // dados do gerenciamento do splash
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
                this.actualScene = this.loadingScene;
                scene.onShow();
                requestAnimationFrame(gameLoopCallBack); // pode iniciar o gameloop
            }
        );
    }

    /** Dá início ao processo de inicialização da cena
    * @param {Scene} scene cena ser definida como atual */
    startScene = (scene) => {
        scene.startLoadResources(
            (scene) => { // callback para o pós carregamento dos recursos da cena
                this.actualScene = scene;
                this.actualScene.onShow();
            }
        );
    }

    startSplashesList = (splashList,postSplashScene) => { // recebe uma lista de cenas a serem carregadas
        splashList;
        this.postSplashScene=postSplashScene;
        this.actualScene = this.loadingScene;
        const promises = splashList.map( // processa a lista de cena
            (scene)=>{ // para cada cena
                return scene.startLoadResources( // retorna uma promise
                    (scene) => { // cada promise será resolvida quando este callback for invocado
                        console.log("cena "+scene.name+" carregada");
                    }
                );
            }
        )
        Promise.all(promises).then(()=>{
            // quando todas os splashs forem carregadas
            this.postSplashScene.startLoadResources( // carrega os recursos da cena pós splash 
                (scene) => { // após carregados os recursos da cena pós splash
                    console.log("todas as cenas carregadas");
                    this.actualScene = splashList[0];
                    this.actualScene.onShow();
                    this.splashList=splashList;
                }
            );
        })
    }

    /*****************************************************************************/
    /* MÉTODOS DO GAMELOOP */
    /*****************************************************************************/

    handleEvents() {
        this.actualScene.handleEvents();
    }

    update() {
        // TODO criar mecanismo de temporização para mudar os splashes
        if(this.splashList!=null){
            console.log("AccTime: "+this.accTime);
            this.accTime += Resources.getInstance().deltaTime;
            if(this.accTime>=this.splashList[this.splashIndex].time){
                this.splashIndex++;
                this.accTime=0;
                if(this.splashIndex==this.splashList.length){
                    this.splashIndex--;
                    this.actualScene=this.postSplashScene;
                    this.splashList=null;
                    this.actualScene.update();
                    return;
                }
            }
            this.actualScene=this.splashList[this.splashIndex];
        }
        this.actualScene.update();
    }

    render() {
        this.actualScene.render();
    }
}

export default SceneManager;