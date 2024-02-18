"use strict";

import Resources from '../resources.js';

/** Implementação abstrata de um Sprite.
 * Elementos básicos de todos os Sprites. */
class Sprite{
    /** Construtor*/
    constructor(){
        this.posX=0.0;
        this.posY=0.0;
        this.speedX=0.0;
        this.speedY=0.0;
        this.loaded=false; // flag de sinalização de carregamento da imagem do sprite
    }
    /** Retorna a posição X do Spite na tela.*/
    getPosX(){return this.posX;} 
    /** Retorna a posição Y do Spite na tela.*/
    getPosY(){return this.posY;}
    /** Retorna o frame correto para a renderização. */
    getFrame(deltaTime){} // abstract
    /** Renderiza o sprite na tela.
     * @param {CanvasRenderingContext2D } ctx - contexto de renderização. */
    render(ctx,deltaTime){
        
        ctx.drawImage(this.getFrame(deltaTime),Math.floor(this.posX),Math.floor(this.posY));
    }
}

export default Sprite;