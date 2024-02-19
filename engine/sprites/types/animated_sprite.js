import MultiSimpleSprite from './multi_simple_sprite.js';

/** Implementação especializada de MultiSimpleSprite
 * com suporte para mudança de frame com base no tempo (animação)*/
class AnimatedSprite extends MultiSimpleSprite{
    /**
     * Construtor
     * @param {String} fileSource - caminho do arquivo da imagem com os tiles do sprite
     */
    constructor(fileSource){
        super(fileSource); // OBRIGATÓRIO
        this.frameIndex=0;
        this.acumulator=0;
        this.timeFrameChange=100;
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
            this.initFramesList(1) //inicializa a lista de frames (this.frames)
            // obtém as dimensões do tile
            let tw = this.img.width/twNumbers;
            let th = this.img.height/thNumbers;
            // percorre as colunas da imagem para obter cada um dos frames
            for(let j=0; j<twNumbers; j++){
                let sx = j*tw;
                let sy = line*th;
                let subimage = this.getSubImage(this.img,sx,sy,tw,th); // obtém o frame
                // descarta o frame se ele for uma imagem vazia. Se todos os pixels forem transparentes
                if(this.checkEmptyImage(subimage,tw,th)) continue;
                this.frames[0].push(subimage); // insere o frame no array de frames
            }
            this.setSpriteIndex(0);
        }
    }

    /** Retorna o frame correto do sprite para a renderização. */
    getFrame(deltaTime){ // overriding
        this.acumulator+=deltaTime;
        if(this.acumulator>this.timeFrameChange){
            this.frameIndex++;
            this.acumulator=0;
        }
        if(this.frameIndex >= this.frames[this.spriteIndex].length){
            this.frameIndex=0;
        }
        return this.frames[this.spriteIndex][this.frameIndex];
    }
    setFrameIndex(index){
        if(index >= this.frames[this.spriteIndex].length)
            throw new Error("Tentativa inváida de mudança de frame do sprite na imagem "+this.img.src+". O último frame válido é o índice "+(this.frames.length-1));
        this.spriteIndex=index;
    }
}

export default AnimatedSprite;