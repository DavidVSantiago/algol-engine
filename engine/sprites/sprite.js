"use strict";

import Resources from '../resources.js';

/** Implementação abstrata de um Sprite.
 * Elementos básicos de todos os Sprites. */
class Sprite{
    /** Construtor*/
    constructor(fileSource){
        this.loaded=false; // flag de sinalização de carregamento da imagem do sprite
        this.frames; // array de frames do sprite
        this.img=new Image(); // cria um obj de imagem
        this.img.src = fileSource; // carrega a imagem no obj
        this.posX=0.0;
        this.posY=0.0;
        this.speedX=0.0;
        this.speedY=0.0;
    }
    initFramesList(lns,cols){
        this.frames = new Array(lns);
        for (let i = 0; i < lns; i++) {
            this.frames[i] = [];
        }
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
        if(this.loaded)// apenas renderiza se o Sprite estiver carregado (evita falhas de exibição)
            ctx.drawImage(this.getFrame(deltaTime),Math.floor(this.posX),Math.floor(this.posY));
    }

    /**
     * Obtém um pedaço menor de uma imagem maior
     * @param {Image} img imagem a ser recortada
     * @param {Number} sx - coordenada X do ponto de origem do recorte
     * @param {Number} sy - coordenada Y do ponto de origem do recorte
     * @param {Number} sw - largura do recorte
     * @param {Number} sh - altura do recorte
     * @return {OffscreenCanvasRenderingContext2D } o pedaço da imagem original
     */
    getSubImage(img,x,y,w,h){
        let imgBuffer = new OffscreenCanvas(img.width,img.height);
        imgBuffer.getContext('2d').drawImage(img,0,0);
        let subImgData = imgBuffer.getContext('2d').getImageData(x,y,w,h);
        this.subImgBuffer = new OffscreenCanvas(w,h);
        this.subImgBuffer.getContext('2d').putImageData(subImgData,0,0);
        return this.subImgBuffer;
    }
}

export default Sprite;