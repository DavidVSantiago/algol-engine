import SimpleSprite from './simple_sprite.js';

/** Implementação de SimpleSprite com suporte para vários frames simples de um mesmo sprite. */
class MultiSimpleSprite extends SimpleSprite{
    /**
     * Construtor
     * @param {String} fileSource - caminho do arquivo da imagem com os sprites
     */
    constructor(fileSource){
        super(fileSource);
        this.spriteIndex=0; // indice do sprite a ser renderizado
    }
    /**
     * Inicializa o processamento de recorte das imagens do sprite
     * @param {Number} twNumbers numero de tiles na largura da imagem
     * @param {Number} thNumbers numero de tiles na altura da imagem
     * @param {Number} line linha da imagem de onde serão retirados os frames
     */
    init(twNumbers,thNumbers,line){ // overriding
        this.img.onload=()=>{ // após carregada a imagem...
            this.loaded=true; // sinaliza à flag
            this.initFramesList(this.img.width,this.img.height) //inicializa a lista de frames (this.frames)
            // percorre as colunas da imagem para obter cada um dos frames
            let tw = this.img.width/twNumbers;
            let th = this.img.height/thNumbers;
            for(let j=0; j<twNumbers; j++){
                let sx = j*tw;
                let sy = line*th;
                this.frames[0].push(this.getSubImage(this.img,sx,sy,tw,th));
            }
        }
    }
    /** Retorna o frame único do sprite para a renderização. */
    getFrame(deltaTime){ // overriding
        return this.frames[0][this.spriteIndex];
    }
    setFrameIndex(index){
        this.spriteIndex=index;

    }
}

export default MultiSimpleSprite;