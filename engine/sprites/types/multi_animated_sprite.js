"use strict";

import AnimatedSprite from './animated_sprite.js';

/** Implementação especializada de AnimatedSprite
 * com suporte para vários sprites e vários frames
 * n-cols x n-lines*/
class MultiAnimatedSprite extends AnimatedSprite {
    /** Construtor
     * @param {String} fileSource - caminho do arquivo da imagem com os tiles do sprite
     * @param {Number} twNumbers numero de tiles na largura da imagem
     * @param {Number} thNumbers numero de tiles na altura da imagem
     * @param {Number} indexStartSprite indice do sprite a ficar ativo */
    constructor(fileSource, twNumbers, thNumbers, indexStartSprite) {
        super(fileSource, twNumbers, thNumbers, indexStartSprite); // OBRIGATÓRIO
    }

    //---------------------------------------------------------------------------------------------------------
    // MÉTODOS 
    //---------------------------------------------------------------------------------------------------------

    /**
     * Inicializa o processamento de recorte das imagens do sprite */
    init() { // overriding
        this.loaded = true; // sinaliza à flag
        this.initFramesList(this.thNumbers) //inicializa a lista de frames (this.frames)
        // obtém as dimensões do tile
        let tw = this.img.width / this.twNumbers;
        let th = this.img.height / this.thNumbers;
        // percorre as linhas da imagem para obter cada um dos sprites
        for (let i = 0; i < this.thNumbers; i++) {
            // percorre as colunas da imagem para obter cada um dos frames
            for (let j = 0; j < this.twNumbers; j++) {
                let sx = j * tw;
                let sy = i * th;
                let subimage = this.getSubImage(this.img, sx, sy, tw, th); // obtém o frame
                // descarta o frame se ele for uma imagem vazia. Se todos os pixels forem transparentes
                if (this.checkEmptyImage(subimage, tw, th)) continue;
                this.frames[i].push(subimage); // insere o frame no array de frames
            }
        }
        this.setSpriteIndex(this.line);
    }
}

export default MultiAnimatedSprite;