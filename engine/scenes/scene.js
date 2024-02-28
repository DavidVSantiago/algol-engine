"use strict";

import SpriteBatch from '../sprites/sprite_batch.js';
import Resources from '../resources.js';
import { SceneManager, SimpleSprite } from '../engine.js';

/** Implementação de uma cena genérica do jogo
 * Classe abstrata que reúne as operações a atributos genéricos a qualquer cena*/
class Scene {
    /** construtor
    * @param {String} name nome único da cena */
    constructor(name) {
        this.name = name; // toda Scene possui um nome associado a ela
        this.spriteBatchList = []; // array de states da Cena
        this.actualBatch;
        this.res = Resources.getInstance();
        this.promisesList = []; // lista de todas as promisse de recursos da cena
        this.minTransitionTime=1000; // tempo, em milissegundo, mínimo de duração da transição da cena
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

    /** Invocado após todos os recursos serem totalmente carregados */
    onInit() { } // abstract
    /** Invocado após a cena aparecer na tela */
    onShow(){ } // abstract

    /** Registra um novo Estado e o seu spriteBatch associado
    * @param {Number} stateIndex índice do estado */
    registerState(stateIndex) {
        this.spriteBatchList.push(new SpriteBatch(stateIndex));
        if (this.spriteBatchList.length == 1) this.changeState(stateIndex); // se for o primeiro Estado registrado, o configura como atual
    }

    /** Altera o State atual
    * @param {Number} stateIndex índice do estado */
    changeState(stateIndex) {
        if (stateIndex >= this.spriteBatchList.length)
            throw new Error("O registro dos STATES deve obedecer a ordem dos seus índices!");
        this.actualBatch = this.spriteBatchList[stateIndex];
    }

    /** Registra um Sprite em um Batch associado a um estado
    * @param {Number} stateIndex índice do estado do Batch */
    registerSprite(sprite, stateIndex) {
        this.spriteBatchList[stateIndex].putSprite(sprite);
    }

    //---------------------------------------------------------------------------------------------------------
    // MÉTODOS DO GAMELOOP
    //---------------------------------------------------------------------------------------------------------

    handleEvents() { } // abstract

    update() { } // abstract

    render() {
        // renderiza o srpitebatch do stado atual
        this.actualBatch.render();
    }
}

export default Scene;