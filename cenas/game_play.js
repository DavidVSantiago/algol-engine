import { SimpleScene, SimpleSprite } from "../engine/engine.js";

class GamePlay extends SimpleScene{
    constructor(){
        super('GAME_PLAY');

        // registra os ESTADOS

        // cria os sprites dessa cena
        this.chao = new SimpleSprite('assets/imgs/fundo.png');
        this.b1 = new SimpleSprite('assets/imgs/braid-died.png');
        this.b2 = new SimpleSprite('assets/imgs/braid-jump-teste.png',130,150,130,150);
        
        // coloca cada sprite nos batchs dos seus respectivos STATES
        this.registerSprite(this.chao,0);
        this.registerSprite(this.b1,1);
        this.registerSprite(this.b2,1);
    }

    //---------------------------------------------------------------------------------------------------------
    // MÉTODOS 
    //---------------------------------------------------------------------------------------------------------

    /** Invocado após todos os recursos serem totalmente carregados */
    onFinishLoad() { // overriding
        this.b2.posX=150;
        this.b2.posY=200;
        console.log("GAME onFinishLoad()");
    } 
    /** Invocado após a cena aparecer na tela */
    onShow(){ // overriding
        console.log("GAME onShow()");
    }

    start(){
        super.start();
        console.log("GAME start()");
    }
    //---------------------------------------------------------------------------------------------------------
    // MÉTODOS DO GAMELOOP
    //---------------------------------------------------------------------------------------------------------

    // Sobrescreve para especificar como as teclas serão tratadas nessa cena
    handleEvents=()=>{
      
    }
}

export default GamePlay;