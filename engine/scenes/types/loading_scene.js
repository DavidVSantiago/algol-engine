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
        this.loadingImage = new SimpleSprite('assets/imgs/loading.png');
    }

    //---------------------------------------------------------------------------------------------------------
    // MÉTODOS 
    //---------------------------------------------------------------------------------------------------------

    onStartLoad() { // overriding
        console.log("LOADING onStartLoad()");
    }
    onFinishLoad(){ // overriding
        console.log("LOADING onFinishLoad()");
        let resources = Resources.getInstance();
        this.loadingImage.posX=(resources.canvas.width/2)-(this.loadingImage.img.width/2);
        this.loadingImage.posY=(resources.canvas.height/2)-(this.loadingImage.img.height/2);
    }
    onShow(){ // overriding
        console.log("LOADING onShow()");
    }
    startLoadResources(onFinishLoadCallBack){ // overriding
    
        this.onStartLoad(); // começou a carregar a cena
        
        this.promisesList.push( // adiciona uma nova promisse na lista, cada uma associada a uma imagem
            new Promise((resolve) => {
                this.loadingImage.img.onload = () => resolve(); // quando o onload acontecer vai resolver a promisse
            })
        );
        
        // quando todas as promisses forem resolvidas...
        Promise.all(this.promisesList).then(() => {
            this.loadingImage.init(); // inicia cada uma das imagens
            this.loadingImage.loaded = true;
            this.onFinishLoad(); // terminou de carregar a cena
            onFinishLoadCallBack(this); // informa o termino do carregamento da cena
        }).catch(error => {
            console.log(error); // rejectReason of any first rejected promise
        });
    }

    //---------------------------------------------------------------------------------------------------------
    // MÉTODOS DO GAMELOOP
    //---------------------------------------------------------------------------------------------------------

    render() {
        // limpa a tela da renderização do quadro anterior
        this.res.clearScreen();

        // renderiza todos os sprites da cena no buffer
        this.black.render(this.res.offCtx);

        // renderiza o imageBuffer na tela do jogo
        this.res.ctx.drawImage(this.res.offscreen,0,0);
    }
}
export default LoadingScene;