"use strict";

import { SimpleSprite } from '../../engine.js';
import Resources from '../../resources.js';
import SimpleProcSprite from '../../sprites/procedural_types/simple_proc_sprite.js';
import Scene from '../scene.js';

/** Implementação de uma cena de carregamento de tela */
class LoadingScene extends Scene{
    /** construtor
    * @param {String} name nome único da cena */
    constructor(name, gameLoopCallBack){
        super(name); // OBRIGATÓRIO
        this.gameLoopCallBack=gameLoopCallBack;
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

     /** Inicializa todos os recursos assíncronos da cena, principalmente as imagens
    * @param {callback} onCreateCallBack ?? */
     startLoadingScene(onCreateCallBack) {
        // marca o tempo do início da transição da cena
        let startTime = this.res.getTimeTick();
        // Vincula o onload de todas as imagens à novas promisses
        for (let i = 0; i < this.spriteBatchList.length; i++) { // percorre todos os batchs
            let spritesList = this.spriteBatchList[i].spritesList;
            for (let i = 0; i < spritesList.length; i++) { // percorre todos os sprites de cada batch
                if (spritesList[i] instanceof SimpleSprite)
                    this.promisesList.push( // adiciona uma nova promisse na lista, cada uma associada a uma imagem
                        new Promise((resolve) => {
                            if (spritesList[i] instanceof SimpleSprite)
                                spritesList[i].img.onload = () => resolve(); // quando o onload acontecer vai resolver a promisse
                        })
                    );
            }
        }
        // quando todas as promisses forem resolvidas...
        Promise.allSettled(this.promisesList).then(() => {
            for (let i = 0; i < this.spriteBatchList.length; i++) { // percorre todos os batchs
                let spritesList = this.spriteBatchList[i].spritesList;
                for (let i = 0; i < spritesList.length; i++) { // percorre todos os sprites de cada batch
                    spritesList[i].init(); // inicia cada uma das imagens
                    spritesList[i].loaded = true;
                }
            }
            this.onInit();
            // marca o tempo de término da transição da cena
            let endTime = this.res.getTimeTick();
            // obtem o tempo restante até a limite do tempo de transição da cena
            let leftTime = this.minTransitionTime - (endTime-startTime);
            //correção para caso o tempo decorrido seja maior que o tempo limite da transição
            if(leftTime<0)leftTime=0;
            // agenda a mudança de cena com base no tempo restante
            setTimeout(()=>{
                this.onShow();
                onCreateCallBack();
            },leftTime);
        }).catch(error => {
            console.log(error); // rejectReason of any first rejected promise
        });;
        this.promisesList=null;
    }
}
export default LoadingScene;