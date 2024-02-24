import { SimpleScene, SimpleSprite } from "../engine/engine.js";
import Tela2 from "./tela_2.js";
import Tela3 from "./tela_3.js";

class GamePlay extends SimpleScene{
    constructor(){
        super('GAME_PLAY');

        // define os ESTADOS e seus indices
        this.STATE_PLAY=0; // devem começar com zero!!
        this.STATE_PAUSE=1;

        // registra os ESTADOS
        this.registerState(this.STATE_PLAY);

        // cria os sprites dessa cena
        this.chao = new SimpleSprite('assets/imgs/fundo.png');
        this.b1 = new SimpleSprite('assets/imgs/braid-died.png');
        this.b2 = new SimpleSprite('assets/imgs/braid-jump-teste.png',130,150,130,150);
        
        // coloca cada sprite nos batchs dos seus respectivos STATES
        this.registerSprite(this.chao,this.STATE_PLAY);
        this.registerSprite(this.b1,this.STATE_PLAY);
        this.registerSprite(this.b2,this.STATE_PLAY);
    }

    //---------------------------------------------------------------------------------------------------------
    // MÉTODOS 
    //---------------------------------------------------------------------------------------------------------

    /** Invocado após todos os recursos serem totalmente carregados */
    init() { // overriding
        this.b2.posX=150;
        this.b2.posY=200;
    } 

    //---------------------------------------------------------------------------------------------------------
    // MÉTODOS DO GAMELOOP
    //---------------------------------------------------------------------------------------------------------

    // Sobrescreve para especificar como as teclas serão tratadas nessa cena
    handleEvents=()=>{
        if(this.res.vk_a){
            let gamePlay =new GamePlay();
            gamePlay.start();
            return;
        }
        if(this.res.vk_s){
            let tela2 =new Tela2();
            tela2.start();
            return;
        }
        if(this.res.vk_d){
            let tela3 =new Tela3();
            tela3.start();
            return;
        }
    }
}

export default GamePlay;