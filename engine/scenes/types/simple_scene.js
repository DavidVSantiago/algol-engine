"use strict";

import { SimpleSprite } from '../../engine.js';
import Scene from '../scene.js';
import SceneLayer from '../scene_layer.js';
import SceneManager from '../scene_manager.js';

/** Implementação de uma cena simples e vazia
 * Classe abstrata. Deve ser herdada para fornecer as funcionalidades básicas de uma cena */
class SimpleScene extends Scene {
    /** construtor
    * @param {String} name nome único da cena */
    constructor(name) {
        super(name);

        // array de layers da cena (max 10) a ultima é reservada para o black da trasição
        this.sceneLayersList = [];
        for(let i=0;i<10;i++){
            this.sceneLayersList.push(new SceneLayer());
        }
    }

    //---------------------------------------------------------------------------------------------------------
    // MÉTODOS 
    //---------------------------------------------------------------------------------------------------------

    /** Inicializa todos os recursos assíncronos da cena, principalmente as imagens
    * @param {callback} onFinishLoadCallBack função a ser invocada para iniciar esta cena, após os recursos serem carregados */
    startLoadResources(onFinishLoadCallBack) {

        this.onStartLoad(); // começou a carregar a cena
        
        // Vincula o onload de todas as imagens à novas promisses
        for (let i = 0; i < this.sceneLayersList.length; i++) { // percorre todos os layers
            let spritesList = this.sceneLayersList[i].spritesList;
            for (let j = 0; j < spritesList.length; j++) { // percorre todos os sprites de cada batch
                if (spritesList[j] instanceof SimpleSprite)
                    this.promisesList.push( // adiciona uma nova promisse na lista, cada uma associada a uma imagem
                        new Promise((resolve) => {
                            if (spritesList[j] instanceof SimpleSprite)
                                spritesList[j].img.onload = () => resolve(); // quando o onload acontecer vai resolver a promisse
                        })
                    );
            }
        }

        // quando todas as promisses forem resolvidas...
         Promise.allSettled(this.promisesList).then(() => {
            for (let i = 0; i < this.sceneLayersList.length; i++) { // percorre todos os batchs
                let spritesList = this.sceneLayersList[i].spritesList;
                for (let i = 0; i < spritesList.length; i++) { // percorre todos os sprites de cada batch
                    spritesList[i].init(); // inicia cada uma das imagens
                    spritesList[i].loaded = true;
                }
            }
            this.onFinishLoad(); // terminou de carregar a cena
            onFinishLoadCallBack(this); // informa o termino do carregamento da cena
        }).catch(error => {
            console.log(error); // rejectReason of any first rejected promise
        });;
    }

    registerSprite(sprite, layerIndex){
        this.sceneLayersList[layerIndex].putSprite(sprite,layerIndex);
    }

    //---------------------------------------------------------------------------------------------------------
    // MÉTODOS DO GAMELOOP
    //---------------------------------------------------------------------------------------------------------

    render() {
        // limpa a tela da renderização do quadro anterior
        this.res.clearScreen();

        // renderiza todos os sprites da cena no buffer
        for(let i=0;i<this.sceneLayersList.length;i++){
            this.sceneLayersList[i].render(this.res.offCtx);
        }
        // renderiza o imageBuffer na tela do jogo
        this.res.ctx.drawImage(this.res.offscreen,0,0);
    }
}

export default SimpleScene;