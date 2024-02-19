import Sprite from '../sprite.js';

/** Implementação para Sprites animados.
 * Para sprites com vários quadros de animação. */
class AnimatedSprite extends Sprite{
    /**
     * Construtor
     * @param {String} fileSource - caminho do arquivo da imagem com os tiles do sprite
     * @param {Number} lns - quantidade de linhas do sprite
     * @param {Number} cols - quantidade de colunas do sprite
     * @param {Number} tilesNumber - quantidade total de tiles a serem considerados após o recorte do sprite
     */
    constructor(fileSource,lns,cols,tilesNumber){
        super(); // OBRIGATÓRIO
        this.acumulator=0;
        this.frameIndex=0;
        this.timeFrame=100;
        this.lns=lns,this.cols=cols,this.tilesNumber=tilesNumber;
        this.checkTiles(); // verifica a quantidade de tiles informada é válida
        this.frames = []; // array que armazena os tiles(frames) da animação
        this.image=new Image(); // cria a imagem com os tiles
        this.image.src = fileSource; // carrega a imagem com os tiles
        this.image.onload=()=>{ // após o carregamento...
            this.loaded=true; // sinaliza à flag
            this.cutTiles(); // recorta os tiles para criar os frames da animação
        }
    }
    checkTiles(){
        if(this.tilesNumber > this.lns*this.cols)
            throw new Error('A quantidade de tiles não pode ser maior que a quantidade de linhas*colunas informadas!');
    }
    
    /** Retorna o frame correto do sprite para a renderização. */
    getFrame(deltaTime){ // overriding
        this.acumulator+=deltaTime;
        if(this.acumulator>this.timeFrame){
            this.frameIndex++;
            this.acumulator=0;
        }
        if(this.frameIndex >= this.tilesNumber){
            this.frameIndex=0;
        }
        return this.frames[this.frameIndex];
    }

    cutTiles(){
        // calcula a dimensão de cada tile
        const tileWidth = this.image.width/this.cols;
        const tileHeight = this.image.height/this.lns;
        // cria um canvas temporário para servir de "local de recorte" da imagem 
        const offCanvasImage = new OffscreenCanvas(this.image.width, this.image.height);
        const ctxCanvasImage = offCanvasImage.getContext('2d');       
        // desenha a imagem no "local de recorte"
        ctxCanvasImage.drawImage(this.image,0,0);
        // corta o cada tile e insere no array de frames
        for(let i=0; i<this.lns; i++){ // linhas da imagem
            for(let j=0; j<this.cols; j++){ // colunas da imagem
                const tileData = ctxCanvasImage.getImageData(j*tileWidth,i*tileHeight,tileWidth,tileHeight);
                const offCanvasTile = new OffscreenCanvas(tileWidth, tileHeight);
                const ctxCanvasTile = offCanvasTile.getContext('2d');
                // obtém os dados de cada tile
                ctxCanvasTile.putImageData(tileData,0,0);
                this.frames.push(offCanvasTile);
            }
        }
    }
}

export default AnimatedSprite;