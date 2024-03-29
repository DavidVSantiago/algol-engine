"use strict";

import { SimpleSprite } from '../../../engine.js';
import Scene from '../../scene.js';
import SceneLayer from './scene_layer.js';

/** Implementação de uma cena simples e vazia
 * Classe abstrata. Deve ser herdada para fornecer as funcionalidades básicas de uma cena */
class SimpleScene extends Scene {
    /** construtor
    * @param {String} name nome único da cena */
    constructor(name) {
        super(name);

        // atributos da transição da tela
        this.elapsedTime = 0; // tempo decorrido da cena
        this.transitionDurationTime = 500;
        this.minTransitionTime = 1000; // tempo, em milissegundo, mínimo de duração da transição da cena

        // array de layers da cena (max 10)
        this.sceneLayersList = [];
        for (let i = 0; i < 10; i++) {
            this.sceneLayersList.push(new SceneLayer());
        }

        // tela preta da transição transparente
        this.black.setAlpha(0);
    }

    //---------------------------------------------------------------------------------------------------------
    // MÉTODOS 
    //---------------------------------------------------------------------------------------------------------

    addPromiseList() {
        // Vincula o onload de todas as imagens à novas promisses
        for (let i = 0; i < this.sceneLayersList.length; i++) { // percorre todos os layers
            let spritesList = this.sceneLayersList[i].spritesList;
            for (let j = 0; j < spritesList.length; j++) { // percorre todos os sprites de cada layer
                if (spritesList[j] instanceof SimpleSprite)
                    this.promisesList.push( // adiciona uma nova promisse na lista, cada uma associada a uma imagem
                        new Promise((resolve, reject) => {
                            if (spritesList[j] instanceof SimpleSprite) {
                                spritesList[j].img.onload = () => resolve(); // quando o onload acontecer vai resolver a promisse
                                spritesList[j].img.onerror = () => reject;
                            }
                        })
                    );
            }
        }
    }

    postResolveAllPromises() {
        // quando todas as promisses forem resolvidas...
        for (let i = 0; i < this.sceneLayersList.length; i++) { // percorre todos os layers
            let spritesList = this.sceneLayersList[i].spritesList;
            for (let i = 0; i < spritesList.length; i++) { // percorre todos os sprites de cada batch
                spritesList[i].init(); // inicia cada uma das imagens
                spritesList[i].loaded = true;
            }
        }
    }

    /** Inicializa todos os recursos assíncronos da cena, principalmente as imagens
    * @param {callback} onFinishLoadCallBack função a ser invocada para iniciar esta cena, após os recursos serem carregados */
    startLoadResources(onFinishLoadCallBack) {
        this.onStartLoad(); // começou a carregar a cena
        this.addPromiseList();
        Promise.all(this.promisesList).then(()=>{
            this.postResolveAllPromises();
            this.onFinishLoad(); // terminou de carregar a cena
            onFinishLoadCallBack(this); // informa o termino do carregamento da cena
        }).catch(error => { console.log(error); });
    }

    registerSprite(sprite, layerIndex) {
        this.sceneLayersList[layerIndex].putSprite(sprite, layerIndex);
    }

    //---------------------------------------------------------------------------------------------------------
    // MÉTODOS DO GAMELOOP
    //---------------------------------------------------------------------------------------------------------

    render() {
        // limpa a tela da renderização do quadro anterior
        this.res.clearScreen();

        // renderiza todos os sprites da cena no buffer
        for (let i = 0; i < this.sceneLayersList.length; i++) {
            this.sceneLayersList[i].render(this.res.offCtx);
        }
        // renderiza o fundo preto da transição
        this.black.render(this.res.offCtx);

        // renderiza o imageBuffer na tela do jogo
        this.res.ctx.drawImage(this.res.offscreen, 0, 0);
    }
}

export default SimpleScene;