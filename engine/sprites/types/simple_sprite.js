import Sprite from '../sprite.js';

/** Implementação mais simples de Sprite.
 * Para sprites com apenas um único frame. */
class SimpleSprite extends Sprite{
    /**
     * Construtor
     * @param {String} fileSource - caminho do arquivo da imagem do sprite
     */
    constructor(fileSource,){
        super(fileSource); // OBRIGATÓRIO
    }

    /**
     * Inicializa o processamento de recorte das imagens do sprite
     * @param {Number} sx - coordenada X do ponto de origem do recorte
     * @param {Number} sy - coordenada Y do ponto de origem do recorte
     * @param {Number} sw - largura do recorte
     * @param {Number} sh - altura do recorte
     */
    init(sx=0,sy=0,sw=0,sh=0){
        this.img.onload=()=>{ // após carregada a imagem...
            this.loaded=true; // sinaliza à flag
            this.initFramesList(1,1) //inicializa a lista de frames (this.frames)
            if(sw==0) // se a largura do recorte não for passado...
                sw=this.img.width; // é a da própria imagem
            if(sh==0) // se a altura do recorte não for passado...
                sh=this.img.height; // é a da própria imagem
            // obtém o frame único do sprite
            this.frames[0].push(this.getSubImage(this.img,sx,sy,sw,sh));
        }
    }
    /** Retorna o frame único do sprite para a renderização. */
    getFrame(deltaTime){ // overriding
        return this.frames[0][0];
    }
}

export default SimpleSprite;