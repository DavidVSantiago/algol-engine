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
     * @param {Number} col coluna da imagem de onde serão retirados os sprites
     */
    init(twNumbers,thNumbers,col){ // overriding
        this.img.onload=()=>{ // após carregada a imagem...
            this.loaded=true; // sinaliza à flag
            this.initFramesList(thNumbers) //inicializa a lista de frames (this.frames)
            // obtém as dimensões do tile
            let tw = this.img.width/twNumbers;
            let th = this.img.height/thNumbers;
            // percorre as linhas da imagem para obter cada um dos sprites
            for(let i=0; i<thNumbers; i++){
                let sx = col*tw;
                let sy = i*th;
                let subimage = this.getSubImage(this.img,sx,sy,tw,th); // obtém o frame
                // descarta o frame se ele for uma imagem vazia. Se todos os pixels forem transparentes
                if(this.checkEmptyImage(subimage,tw,th)){
                    console.error("Frame transparente removido!");
                    continue;
                }
                this.frames[i].push(subimage); // insere o frame no array de frames
            }
        }
    }
    /** Retorna o frame único do sprite para a renderização. */
    getFrame(deltaTime){ // overriding
        return this.frames[this.spriteIndex][0];
    }
    setSpriteIndex(index){
        if(index >= this.frames.length)
            throw new Error("Tentativa inváida de mudança de sprite na imagem "+this.img.src+". O último sprite válido é o índice "+(this.frames.length-1));
        this.spriteIndex=index;
    }
}

export default MultiSimpleSprite;