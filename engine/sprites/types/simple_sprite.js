import Sprite from '../sprite.js';

/** Implementação mais simples de Sprite de arquivos de imagem.
 * Para sprites com apenas um único frame. */
class SimpleSprite extends Sprite {
    /**
     * Construtor
     * @param {String} fileSource - caminho do arquivo da imagem do sprite
     * @param {Number} cx - coordenada X do ponto de origem do recorte
     * @param {Number} cy - coordenada Y do ponto de origem do recorte
     * @param {Number} cw - largura do recorte
     * @param {Number} ch - altura do recorte */
    constructor(fileSource, cx = 0, cy = 0, cw = 0, ch = 0) {
        super(); // OBRIGATÓRIO
        this.cx = cx; this.cy = cy; // coordenadas do ponto de corte da imagem
        this.cw = cw; this.ch = ch; // dimensões do recorte da imagem
        this.img = new Image(); // armazena o arquivo de imagem de onde serão extraídos os frames
        this.img.src = fileSource; // inicia o carregamento da imagem
    }

    //---------------------------------------------------------------------------------------------------------
    // GETTERS & SETTERS
    //---------------------------------------------------------------------------------------------------------

    /** Retorna o frame único do sprite para a renderização. */
    getFrame() { // overriding
        return this.frames[0][0];
    }

    //---------------------------------------------------------------------------------------------------------
    // MÉTODOS 
    //---------------------------------------------------------------------------------------------------------

    /** Inicializa o processamento de recorte dos frames do sprite
    * só pode ser invocada após a imagem ser totalmente carregada (Image.onload) */
    init() {
        this.loaded = true; // sinaliza à flag
        this.initFramesList(1) //inicializa a lista de frames (this.frames)
        if (this.cw == 0) // se a largura do recorte não for passado...
            this.cw = this.img.width; // é a da própria imagem
        if (this.ch == 0) // se a altura do recorte não for passado...
            this.ch = this.img.height; // é a da própria imagem
        let subimage = this.getSubImage(this.img, this.cx, this.cy, this.cw, this.ch); // obtém o frame único
        // Lança um erro de o frame for uma imagem vazia. Se todos os pixels forem transparentes
        if (this.checkEmptyImage(subimage, this.cw, this.ch))
            throw new Error("A imagem " + this.img.src + " está vazia! Todos os seus pixels são transparentes!");
        this.frames[0].push(subimage);
    }

    /** Obtém um pedaço menor de uma imagem maior
     * @param {Image} img imagem a ser recortada
     * @param {Number} cx - coordenada X do ponto de origem do recorte
     * @param {Number} cy - coordenada Y do ponto de origem do recorte
     * @param {Number} cw - largura do recorte
     * @param {Number} ch - altura do recorte
     * @return {OffscreenCanvas} o pedaço recortado da imagem original */
    getSubImage(img, cx, cy, cw, ch) {
        let imgBuffer = new OffscreenCanvas(img.width, img.height);
        imgBuffer.getContext('2d').drawImage(img, 0, 0);
        let subImgData = imgBuffer.getContext('2d').getImageData(cx, cy, cw, ch);
        this.subImgBuffer = new OffscreenCanvas(cw, ch);
        this.subImgBuffer.getContext('2d').putImageData(subImgData, 0, 0);
        return this.subImgBuffer;
    }

    /** Verifica se a imagem está vazia (com todos os pixels transparentes)
     * @param {OffscreenCanvas} imgBuffer imagem a ser verificada
     * @param {Number} w - largura da imagem
     * @param {Number} h - altura da imagem
     * @return {Boolean} se a imagem está ou não vazia */
    checkEmptyImage(imgBuffer, w, h) {
        // obtém os dados da imagem
        let imgData = imgBuffer.getContext('2d').getImageData(0, 0, w, h);
        // Percorre todos os pixels da imagem
        for (let i = 0; i < imgData.data.length; i += 4) {
            // Verifica se o canal alfa (transparência) tem valor 255
            if (imgData.data[i + 3] == 255)
                return false;// Se encontrar um pixel não transparente, a imagem não está vazia
        }
        // Se todos os pixels forem transparentes a imagem está vazia
        return true;
    }
}

export default SimpleSprite;