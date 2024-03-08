"use strict";

import Sprite from '../sprite.js';

/** Implementação de Sprite com imagem gerada de forma procedural.
 * Para sprites com apenas um único frame. */
class SimpleProcSprite extends Sprite {

    /** Construtor
     * @param {OffscreenCanvas} offCanvas imagem gerada de forma procedural, pronta para ser exibida */
    constructor(offCanvas) {
        super();
        this.offCanvas = offCanvas;
        this.ctx=this.offCanvas.getContext('2d');
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
    init() { // override
        this.initFramesList(1);
        this.frames[0].push(this.offCanvas);
        this.loaded=true;
    }

    /** Define a transparencia do sprite procedural */
    setAlpha(alphaValue){
        this.ctx.clearRect(0, 0, this.offCanvas.width, this.offCanvas.height);
        this.ctx.fillStyle = "black";
        this.ctx.globalAlpha = alphaValue;
        this.ctx.fillRect(0, 0, this.offCanvas.width, this.offCanvas.height);
    }
}

export default SimpleProcSprite;