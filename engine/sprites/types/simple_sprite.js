import Sprite from '../sprite.js';

/** Implementação mais simples de Sprite.
 * Para sprites com apenas uma única imagem. */
class SimpleSprite extends Sprite{
    /**
     * Construtor
     * @param {String} fileSource - caminho do arquivo da imagem do sprite
     * @param {Number} sx - coordenada X do ponto de origem do recorte
     * @param {Number} sy - coordenada Y do ponto de origem do recorte
     * @param {Number} sw - largura do recorte
     * @param {Number} sh - altura do recorte
     */
    constructor(fileSource,sx=0,sy=0,sw=0,sh=0){
        super(); // OBRIGATÓRIO
        this.frame; // sprite único a ser desenhado
        let img=new Image(); // cria um obj de imagem
        img.src = fileSource; // carrega a imagem no obj
        img.onload=()=>{ // após o carregamento...
            let tempFrame = new OffscreenCanvas(img.width,img.height);
            tempFrame.getContext('2d').drawImage(img,0,0);
            if(sw==0 && sh==0){ // se as dimensões do recorte estiverem zeradas...
                // as dimensões são as da própria imagem carregada
                sw=img.width;
                sh=img.height;
            }
            let frameData = tempFrame.getContext('2d').getImageData(sx,sy,sw,sh); // obtém o pedaço do sprite unico
            this.frame = new OffscreenCanvas(sw,sh);
            this.frame.getContext('2d').putImageData(frameData,0,0);
            this.loaded=true;
        }
    }
    /** Retorna o frame único do sprite para a renderização. */
    getFrame(deltaTime){ // overriding
        return this.frame;
    }
}

export default SimpleSprite;