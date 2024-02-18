import Sprite from '../sprite.js';

/** Implementação mais simples de Sprite.
 * Para sprites com apenas uma única imagem. */
class SimpleSprite extends Sprite{
    /**
     * Construtor
     * @param {String} fileSource - caminho do arquivo da imagem do sprite
     */
    constructor(fileSource){
        super(); // OBRIGATÓRIO
        this.frame=new Image(); // cria o frame único
        this.frame.src = fileSource; // carrega o frame único
        this.frame.onload=()=>{ // após o carregamento, sinaliza à flag
            this.loaded=true;
        }
    }
    /** Retorna o frame único do sprite para a renderização. */
    getFrame(deltaTime){ // overriding
        return this.frame;
    }
}

export default SimpleSprite;