import SimpleSprite from './simple_sprite.js';

/** Implementação de SimpleSprite com suporte para vários frames simples de um mesmo sprite. */
class MultiSimpleSprite{
    /**
     * Construtor
     * @param {String} fileSource - caminho do arquivo da imagem com os sprites
     * @param {Number} framesNumber - quantidade de sprites na imagem
     * @param {Number} line - numero da linha na imagem que contém os sprites (começa de 0)
     */
    constructor(fileSource,framesNumber,line){
        this.spriteIndex=0;
        this.sprites=[]; // array de SimpleSprite
        
        let img=new Image(); // cria um obj de imagem
        img.src = fileSource; // carrega a imagem no obj
        img.onload=()=>{ // após o carregamento...
            // percorre as colunas da imagem para obter cada um dos frames simples
            for(let j=0; j<framesNumber; j++){
                // cria um novo SimpleSprite com a ordem de recortar um novo fragmento da imagem
                let x = j*img.width;
                let y = line*img.height;
                let simpleSprite = new SimpleSprite(fileSource,)
            }
        }
    }
    /** Retorna o frame único do sprite para a renderização. */
    getFrame(deltaTime){ // overriding
        return this.sprites[spriteIndex].getFrame(deltaTime);
    }
    /** Carrega  */
    loadImages(){

    }
}

export default MultiSimpleSprite;