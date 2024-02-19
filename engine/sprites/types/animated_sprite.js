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
}

export default AnimatedSprite;