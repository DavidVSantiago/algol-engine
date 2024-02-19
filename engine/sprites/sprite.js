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
    /**
     * Inicializa o o array de sprites
     * @param {Number} lines numero de linhas no array (cada linha armazena 1 sprite)
     */
    initFramesList(lines){
        this.frames = new Array(lines);
        for (let i = 0; i < lines; i++) {
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
     * @param {Number} x - coordenada X do ponto de origem do recorte
     * @param {Number} y - coordenada Y do ponto de origem do recorte
     * @param {Number} w - largura do recorte
     * @param {Number} h - altura do recorte
     * @return {OffscreenCanvas} o pedaço da imagem original
     */
    getSubImage(img,x,y,w,h){
        let imgBuffer = new OffscreenCanvas(img.width,img.height);
        imgBuffer.getContext('2d').drawImage(img,0,0);
        let subImgData = imgBuffer.getContext('2d').getImageData(x,y,w,h);
        this.subImgBuffer = new OffscreenCanvas(w,h);
        this.subImgBuffer.getContext('2d').putImageData(subImgData,0,0);
        return this.subImgBuffer;
    }

    checkEmptyImage(imgBuffer,w,h){
        // obtém os dados da imagem
        let imgData = imgBuffer.getContext('2d').getImageData(0,0,w,h);
        // Percorre todos os pixels da imagem
        for (let i = 0; i < imgData.data.length; i += 4) {
            // Verifica se o canal alfa (transparência) tem valor 255
            if (imgData.data[i + 3] == 255)
                return false;// Se encontrar um pixel não transparente, a imagem não está vazia
        }
        // Se todos os pixels forem transparentes, a imagem está vazia
        return true;
    }
}

export default Sprite;