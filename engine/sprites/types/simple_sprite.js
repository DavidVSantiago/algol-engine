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
     * @param {Number} tw - largura do recorte
     * @param {Number} th - altura do recorte
     */
    init(sx=0,sy=0,tw=0,th=0){
        this.img.onload=()=>{ // após carregada a imagem...
            this.loaded=true; // sinaliza à flag
            this.initFramesList(1) //inicializa a lista de frames (this.frames)
            if(tw==0) // se a largura do recorte não for passado...
                tw=this.img.width; // é a da própria imagem
            if(th==0) // se a altura do recorte não for passado...
                th=this.img.height; // é a da própria imagem
            let subimage = this.getSubImage(this.img,sx,sy,tw,th); // obtém o frame único
            // Lança um erro de o frame for uma imagem vazia. Se todos os pixels forem transparentes
            if(this.checkEmptyImage(subimage,tw,th))
                throw new Error("A imagem "+this.img.src+" está vazia! Todos os seus pixels são transparentes!");
            this.frames[0].push(subimage);
        }
    }
    /** Retorna o frame único do sprite para a renderização. */
    getFrame(deltaTime){ // overriding
        return this.frames[0][0];
    }
}

export default SimpleSprite;