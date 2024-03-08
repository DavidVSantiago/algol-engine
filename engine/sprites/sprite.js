"use strict";

import Resources from '../resources.js';

/** Implementação abstrata de um Sprite.
 * Elementos básicos de todos os tipos de Sprites. */
class Sprite{

    /** Construtor */
    constructor(){     
        this.frames; // array de frames do sprite
        this.posX=0.0;
        this.posY=0.0;
        this.speedX=0.0;
        this.speedY=0.0;
        this.loaded = false;
        this.res = Resources.getInstance();
    }
    
    //---------------------------------------------------------------------------------------------------------
    // GETTERS & SETTERS
    //---------------------------------------------------------------------------------------------------------
    
    /** Retorna a posição X do Spite na tela.*/
    getPosX(){return this.posX;} 
    /** Retorna a posição Y do Spite na tela.*/
    getPosY(){return this.posY;}
    /** Retorna o frame correto para a renderização. */
    getFrame(){} // abstract
    
    //---------------------------------------------------------------------------------------------------------
    // MÉTODOS 
    //---------------------------------------------------------------------------------------------------------

    /** Invocado após os recursos da imagem serem todos carregados */
    init() {} // abstract

    /** Inicializa o o array de frames do sprite
     * @param {Number} lineNumbers numero de linhas no array (cada linha é um sprite)
     */
    initFramesList(lineNumbers) {
        this.frames = new Array(lineNumbers);
        for (let i = 0; i < lineNumbers; i++) {
            this.frames[i] = [];
        }
    }

    //---------------------------------------------------------------------------------------------------------
    // MÉTODOS DO GAMELOOP
    //---------------------------------------------------------------------------------------------------------
   
    /** Renderiza o sprite na tela
     * @param {CanvasRenderingContext2D} ctx contexto de renderização */
    render(ctx){
        if(this.loaded)// apenas renderiza se o Sprite estiver carregado (evita falhas de exibição)
            ctx.drawImage(this.getFrame(),Math.floor(this.posX),Math.floor(this.posY));
    }

}

export default Sprite;