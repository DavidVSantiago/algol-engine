"use strict";

import { SimpleSprite } from '../../engine.js';
import Resources from '../../resources.js';
import SimpleProcSprite from '../../sprites/procedural_types/simple_proc_sprite.js';
import Scene from '../scene.js';

/** Implementação de uma cena de carregamento de tela */
class LoadingScene extends Scene{
    /** construtor
    * @param {String} name nome único da cena */
    constructor(name){
        super(name); // OBRIGATÓRIO

        let resources = Resources.getInstance();

        // Geração dos sprites da tela de loading
        this.registerState(0);
        this.loading = new SimpleSprite('assets/imgs/loading.png');
        
        // cria um sprite procedural para representar um fundo preto
        let blackScreen = new OffscreenCanvas(resources.canvas.width,resources.canvas.height);
        let blackScreenCtx = blackScreen.getContext('2d');
        blackScreenCtx.fillStyle = "black";
        blackScreenCtx.fillRect(0, 0, blackScreen.width, blackScreen.height);
        this.black = new SimpleProcSprite(blackScreen);
        
        // registra os sprites na cena
        this.registerSprite(this.black,0);
        this.registerSprite(this.loading,0);
    }

    //---------------------------------------------------------------------------------------------------------
    // MÉTODOS 
    //---------------------------------------------------------------------------------------------------------

    /** Invocado após todos os recursos serem totalmente carregados */
    onInit() { // overriding
        let resources = Resources.getInstance();
        this.loading.posX=(resources.canvas.width/2)-(this.loading.img.width/2);
        this.loading.posY=(resources.canvas.height/2)-(this.loading.img.height/2);
        console.log("LOADING onInit()");
    }
    /** Invocado após a cena aparecer na tela */
    onShow(){ // overriding
        console.log("LOADING onShow()");
    }
}
export default LoadingScene;