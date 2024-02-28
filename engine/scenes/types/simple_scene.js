"use strict";

import { SimpleSprite } from '../../engine.js';
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

    /** Inicializa todos os recursos assíncronos da cena, principalmente as imagens
    * @param {callback} actualScene ?? */
    startLoadResources(actualScene) {
        // marca o tempo do início da transição da cena
        let startTime = this.res.getTimeTick();
        // Vincula o onload de todas as imagens à novas promisses
        for (let i = 0; i < this.spriteBatchList.length; i++) { // percorre todos os batchs
            let spritesList = this.spriteBatchList[i].spritesList;
            for (let i = 0; i < spritesList.length; i++) { // percorre todos os sprites de cada batch
                if (spritesList[i] instanceof SimpleSprite)
                    this.promisesList.push( // adiciona uma nova promisse na lista, cada uma associada a uma imagem
                        new Promise((resolve) => {
                            if (spritesList[i] instanceof SimpleSprite)
                                spritesList[i].img.onload = () => resolve(); // quando o onload acontecer vai resolver a promisse
                        })
                    );
            }
        }
        // quando todas as promisses forem resolvidas...
        Promise.allSettled(this.promisesList).then(() => {
            for (let i = 0; i < this.spriteBatchList.length; i++) { // percorre todos os batchs
                let spritesList = this.spriteBatchList[i].spritesList;
                for (let i = 0; i < spritesList.length; i++) { // percorre todos os sprites de cada batch
                    spritesList[i].init(); // inicia cada uma das imagens
                    spritesList[i].loaded = true;
                }
            }
            this.onInit();
            // marca o tempo de término da transição da cena
            let endTime = this.res.getTimeTick();
            // obtem o tempo restante até a limite do tempo de transição da cena
            let leftTime = this.minTransitionTime - (endTime-startTime);
            //correção para caso o tempo decorrido seja maior que o tempo limite da transição
            if(leftTime<0)leftTime=0;
            // agenda a mudança de cena com base no tempo restante
            setTimeout(()=>{
                SceneManager.getInstance().actualScene=this; // ??
                this.onShow();
            },leftTime);
        }).catch(error => {
            console.log(error); // rejectReason of any first rejected promise
        });;
        this.promisesList=null;
    }
        
    //---------------------------------------------------------------------------------------------------------
    // MÉTODOS DO GAMELOOP
    //---------------------------------------------------------------------------------------------------------
}
export default SimpleScene;