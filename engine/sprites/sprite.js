"use strict";
import Resources from '../resources.js';


/** Implementação abstrata de um Sprite.
 * Elementos básicos de todos os Sprites. */
class Sprite{

    /** Construtor
     * @param {String} fileSource local do arquivo da imagem a ser carregada
     */
    constructor(fileSource){     
        this.loaded=false;
        this.frames; // array de frames do sprite
        this.img=new Image(); // armazena o arquivo de imagem de onde serão extraídos os frames
        this.img.src=fileSource;
        this.posX=0.0;
        this.posY=0.0;
        this.speedX=0.0;
        this.speedY=0.0;
    }

    
    //---------------------------------------------------------------------------------------------------------
    // GETTERS & SETTERS
    //---------------------------------------------------------------------------------------------------------
    
    /** Retorna a posição X do Spite na tela.*/
    getPosX(){return this.posX;} 
    /** Retorna a posição Y do Spite na tela.*/
    getPosY(){return this.posY;}
    /** Retorna o frame correto para a renderização. */
    getFrame(deltaTime){} // abstract
    
    //---------------------------------------------------------------------------------------------------------
    // MÉTODOS 
    //---------------------------------------------------------------------------------------------------------
   
    /** Inicializa o o array de frames do sprite
     * @param {Number} lineNumbers numero de linhas no array (cada linha é um sprite)
     */
    initFramesList(lineNumbers){
        this.frames = new Array(lineNumbers);
        for (let i = 0; i < lineNumbers; i++) {
            this.frames[i] = [];
        }
    }
    
    /** Obtém um pedaço menor de uma imagem maior
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

    /** Verifica se a imagem está vazia (com todos os pixels transparentes)
     * @param {Image} img imagem a ser verificada
     * @param {Number} w - largura da imagem
     * @param {Number} h - altura da imagem
     * @return {Boolean} se a imagem está ou não vazia
     */
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

    //---------------------------------------------------------------------------------------------------------
    // MÉTODOS DO GAMELOOP
    //---------------------------------------------------------------------------------------------------------
   
    /** Renderiza o sprite na tela
     * @param {CanvasRenderingContext2D} ctx contexto de renderização
     * @param {Number} deltaTime tempo decorrido desde o último quadro renderizado na tela*/
    render(ctx,deltaTime){
        if(this.loaded)// apenas renderiza se o Sprite estiver carregado (evita falhas de exibição)
            ctx.drawImage(this.getFrame(deltaTime),Math.floor(this.posX),Math.floor(this.posY));
    }

}

export default Sprite;