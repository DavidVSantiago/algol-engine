import AnimatedSprite from './animated_sprite.js';

/** Implementação especializada de MultiSimpleSprite
 * com suporte para mudança de frame com base no tempo (animação)*/
class MultiAnimatedSprite extends AnimatedSprite{
    /**
     * Construtor
     * @param {String} fileSource - caminho do arquivo da imagem com os tiles do sprite
     */
    constructor(fileSource){
        super(fileSource); // OBRIGATÓRIO
    }

    /**
     * Inicializa o processamento de recorte das imagens do sprite
     * @param {Number} twNumbers numero de tiles na largura da imagem
     * @param {Number} thNumbers numero de tiles na altura da imagem
     */
    init(twNumbers,thNumbers){ // overriding
        //TODO
    }
    
    /** Retorna o frame correto do sprite para a renderização. */
    getFrame(deltaTime){ // overriding
       //TODO
    }
}

export default MultiAnimatedSprite;