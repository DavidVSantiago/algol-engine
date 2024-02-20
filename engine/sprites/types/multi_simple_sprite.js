import SimpleSprite from './simple_sprite.js';

/** Implementação de SimpleSprite com suporte para vários frames simples de um mesmo sprite. */
class MultiSimpleSprite extends SimpleSprite {
    /**
     * Construtor
     * @param {String} fileSource local do arquivo da imagem a ser carregada
     * @param {Number} twNumbers numero de tiles na largura da imagem
     * @param {Number} thNumbers numero de tiles na altura da imagem
     * @param {Number} col coluna da imagem de onde serão retirados os sprites
     */
    constructor(fileSource, twNumbers, thNumbers, col) {
        super(fileSource);
        this.twNumbers = twNumbers;
        this.thNumbers = thNumbers;
        this.col = col;
        this.spriteIndex = 0; // indice do sprite a ser renderizado
    }

    //---------------------------------------------------------------------------------------------------------
    // GETTERS & SETTERS
    //---------------------------------------------------------------------------------------------------------

    /** Retorna o frame único do sprite para a renderização. */
    getFrame() { // overriding
        return this.frames[this.spriteIndex][0];
    }
    setSpriteIndex(index) {
        if (index >= this.frames.length)
            throw new Error("Tentativa inváida de mudança de sprite na imagem " + this.img.src + ". O último sprite válido é o índice " + (this.frames.length - 1));
        this.spriteIndex = index;
    }

    //---------------------------------------------------------------------------------------------------------
    // MÉTODOS 
    //---------------------------------------------------------------------------------------------------------

    /** Inicializa o processamento de recorte das imagens do sprite */
    init() { // overriding
        this.loaded = true; // sinaliza à flag
        this.initFramesList(this.thNumbers) //inicializa a lista de frames (this.frames)
        // obtém as dimensões do tile
        let tw = this.img.width / this.twNumbers;
        let th = this.img.height / this.thNumbers;
        // percorre as linhas da imagem para obter cada um dos sprites
        for (let i = 0; i < this.thNumbers; i++) {
            let sx = this.col * tw;
            let sy = i * th;
            let subimage = this.getSubImage(this.img, sx, sy, tw, th); // obtém o frame
            // descarta o frame se ele for uma imagem vazia. Se todos os pixels forem transparentes
            if (this.checkEmptyImage(subimage, tw, th)) {
                console.error("Frame transparente removido!");
                continue;
            }
            this.frames[i].push(subimage); // insere o frame no array de frames
        }
    }
}

export default MultiSimpleSprite;