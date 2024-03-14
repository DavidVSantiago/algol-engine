"use strict";

import SceneLayer from './scene_layer.js';
import Resources from '../resources.js';
import { SceneManager, SimpleSprite } from '../engine.js';

/** Implementação de uma cena genérica do jogo
 * Classe abstrata que reúne as operações a atributos genéricos a qualquer cena*/
class Scene {
    /** construtor
    * @param {String} name nome único da cena */
    constructor(name) {
        this.name = name; // toda Scene possui um nome associado a ela
        this.res = Resources.getInstance(); // ref. para o singleton de recursos
        
        // array de layers da cena (max 10) a ultima é reservada para o black da trasição
        this.layersList = [];
        for(let i=0;i<10;i++){
            this.layersList.push(new SceneLayer());
        }

        this.elapsedTime=0; // tempo decorrido da cena
        this.promisesList = []; // lista de todas as promisse de recursos da cena

        // atributos da transição da tela
        this.transitionDurationTime=500;
        this.minTransitionTime=1000; // tempo, em milissegundo, mínimo de duração da transição da cena
        this.blackScreen;
        this.blackScreenCtx;
        
    }

    //---------------------------------------------------------------------------------------------------------
    // GETTERS & SETTERS
    //---------------------------------------------------------------------------------------------------------
    
    /** define o tempo mínimo de intervalo da transição entre as cenas.
     * Mínimo porque a transição depende do carregamento completo dos recurso da cena.
     * Caso o carregamento demore mais que o tempo mínimo, o tempo mínimo será superado!
     * Caso demore menos, a cena esperará decorrer o tempo mínimo */
    setMinTransitionTime(time){ this.minTransitionTime=time;}

    //---------------------------------------------------------------------------------------------------------
    // MÉTODOS 
    //---------------------------------------------------------------------------------------------------------

    /** Invocado quando os recursos da cena começam a ser carregados */
    onStartLoad() { } // abstract
    /** Invocado após os recursos da cena serem todos carregados */
    onFinishLoad(){ } // abstract
    /** Invocado quando a cena começa a ser exibida na tela */
    onShow(){ } // abstract

    /** Inicializa todos os recursos assíncronos da cena, principalmente as imagens
    * @param {callback} onFinishLoadCallBack função a ser invocada para iniciar esta cena, após os recursos serem carregados */
     startLoadResources(onFinishLoadCallBack) {

        this.onStartLoad(); // começou a carregar a cena
        
        // Vincula o onload de todas as imagens à novas promisses
        for (let i = 0; i < this.layersList.length; i++) { // percorre todos os layers
            let spritesList = this.layersList[i].spritesList;
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
            for (let i = 0; i < this.layersList.length; i++) { // percorre todos os batchs
                let spritesList = this.layersList[i].spritesList;
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

    /** Registra um Sprite em um Batch associado a um estado
    * @param {Number} layerIndex índice do layer onde será inserido o sprite*/
    registerSprite(sprite, layerIndex) {
        this.layersList[layerIndex].putSprite(sprite);
    }

    //---------------------------------------------------------------------------------------------------------
    // MÉTODOS DO GAMELOOP
    //---------------------------------------------------------------------------------------------------------

    handleEvents() { } // abstract

    update() { } // abstract

    render() {
        // limpa a tela da renderização do quadro anterior
        this.res.clearScreen();

        // percorre todas os layers da cena e renderiza cada um deles
        for(let i=0;i<this.layersList.length;i++){
            this.layersList[i].render(this.res.offCtx);
        }
        // renderiza o imageBuffer na tela do jogo
        this.res.ctx.drawImage(this.res.offscreen,0,0);
    }
}

export default Scene;