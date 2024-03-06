"use strict";

/** SINGLETON que armazena os recursos universais do jogo
 * Classe usada pela maioria das outras classes da engine */
class Resources {
    static singleton;

    static getInstance() {

        if (!this.singleton) {
            this.singleton = new this();
        }
        return this.singleton;
    }

    /** Inicializa os recursos do Singleton - uso privado interno */
    init(width, height) {
        this.vk_up = false, this.vk_down = false, this.vk_left = false, this.vk_right = false, this.vk_esc = false;
        this.deltatime;
        this.canvas = document.createElement('canvas');
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);
        this.offscreen = new OffscreenCanvas(width, height);
        this.offCtx = this.offscreen.getContext("2d");
    }

    loadAllImages(){

    }

    /** limpa a tela */
    clearScreen() {
        this.offCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /** obtém uma amostra de tempo em milissegundos */
    getTimeTick(){
        return performance.now();
    }
}
export default Resources;