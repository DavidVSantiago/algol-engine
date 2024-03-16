"use strict";

import {SceneManager, SimpleScene,SimpleSprite} from '../../engine.js';

/** Abstract */
class SplashScene extends SimpleScene{
    constructor(name){
        super(name);
        this.splashImgCount=0; // quantidade de imagens de splash
        this.splashImgIndex=0; // quantidade de imagens de splash
        this.splashImgTimeList=[]; // array de tempos de cada iésimo splashImage
        this.postScene=null; // cena a ser exibida ao final da exibição das imagens de splash

        // registra o sprite do fundo preto para as transições
        this.registerSprite(this.black,9); // o layer 9 é obrigatório, para ficar na frente de todos
    }
   
    //---------------------------------------------------------------------------------------------------------
    // MÉTODOS OVERRIDE
    //---------------------------------------------------------------------------------------------------------

    /** Invocado após todos os recursos serem totalmente carregados */
    onStartLoad() { // overriding
        console.log("SPLASH onStartLoad()");
    }
    
    /** Invocado após a cena aparecer na tela */
    onFinishLoad(){ // overriding
        console.log("SPLASH onFinishLoad()");
    }

    onShow(){
        console.log("SPLASH onShow()");
    }

    //---------------------------------------------------------------------------------------------------------
    // MÉTODOS
    //---------------------------------------------------------------------------------------------------------
    
    registerSplash(splash,durationTime){ // private
        this.registerSprite(splash,0); // os splash são adicionados na camada 0
        this.splashImgCount++; // incrementa o contador de splashes
        this.splashImgTimeList.push(durationTime); // cada i-ésimo tempo fica associado a cada i-ésimo sprite 
    }

    addSplash(fileSource,durationTime){
        let splash = new SimpleSprite(fileSource); // cria um novo sprite com a imagem recebida
        this.registerSplash(splash,durationTime);
    }

    addPostScene(postScene){
        this.postScene = postScene;
    }

    /** Inicializa todos os recursos assíncronos da cena, principalmente as imagens
    * @param {callback} onFinishLoadCallBack função a ser invocada para iniciar esta cena, após os recursos serem carregados */
    startLoadResources(onFinishLoadCallBack) {

        super.startLoadResources((scene)=>{ // invoca a versão pai para iniciar o carregamento das imagens dos splashes

            this.postScene.startLoadResources((scene)=>{// inicia o carregamento do postScene
                onFinishLoadCallBack(this); // apos carregar os splashes e o postscene, retorna o callback principal
            })
        });
    }

    //---------------------------------------------------------------------------------------------------------
    // MÉTODOS DO GAMELOOP
    //---------------------------------------------------------------------------------------------------------

    // Sobrescreve para especificar como as teclas serão tratadas nessa cena
    handleEvents(){
       
    }

    update() {
        this.elapsedTime+=this.res.deltaTime;
        // atualiza os valores de transparencia da tela preta de trasição do splash
        if(this.elapsedTime<=this.transitionDurationTime){ // inicio da transição
            let alphaValue = 1.0 - this.elapsedTime/this.transitionDurationTime;
            this.black.setAlpha(alphaValue);
        }else if(this.elapsedTime>=this.splashImgTimeList[this.splashImgIndex]-this.transitionDurationTime){ // final da transição
            let diffEndTime = this.splashImgTimeList[this.splashImgIndex]-this.elapsedTime;
            let alphaValue = 1.0 - diffEndTime/this.transitionDurationTime;
            this.black.setAlpha(alphaValue);
        }

        // checa se o tempo splash atual chegou ao fim
        if(this.elapsedTime>=this.splashImgTimeList[this.splashImgIndex]){
            this.splashImgIndex++; // muda para o próximo splash
            this.elapsedTime=0; // reinicia o contador de tempo da cena
            
            // checa se já se passaram todos os splashs
            if(this.splashImgIndex>=this.splashImgCount){
                
            }
        }

        //console.log(this.elapsedTime);
    }

    render() {
        // limpa a tela da renderização do quadro anterior
        this.res.clearScreen();

        // renderiza o splashscene atual
        this.sceneLayersList[0].getSprite(this.splashImgIndex).render(this.res.offCtx);

        // renderiza o fundo preto da transição
        this.black.render(this.res.offCtx);

        // renderiza o imageBuffer na tela do jogo
        this.res.ctx.drawImage(this.res.offscreen,0,0);
    }
}
export default SplashScene;