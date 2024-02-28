import {SimpleScene,SimpleSprite,AnimatedSprite, SceneManager} from '../engine/engine.js';
import GamePlay from './game_play.js';

class SplashScreen extends SimpleScene{
    constructor(){
        super('Splash');
        // registra os ESTADOS
        this.registerState(0);

        // cria os sprites dessa cena
        this.bg = new SimpleSprite('assets/imgs/splash.png');
    
        // coloca cada sprite nos batchs dos seus respectivos STATES
        this.registerSprite(this.bg,0);
    }

    //---------------------------------------------------------------------------------------------------------
    // MÉTODOS 
    //---------------------------------------------------------------------------------------------------------

    /** Invocado após todos os recursos serem totalmente carregados */
    onInit() { // overriding
        console.log("SPLASH onInit()");
    }
    
    /** Invocado após a cena aparecer na tela */
    onShow(){ // overriding
        console.log("SPLASH onShow()");
        
    }
    
    //---------------------------------------------------------------------------------------------------------
    // MÉTODOS DO GAMELOOP
    //---------------------------------------------------------------------------------------------------------
    
    // Sobrescreve para especificar como as teclas serão tratadas nessa cena
    handleEvents(){
        if(this.res.vk_a){
            let gamePlay = new GamePlay();
            SceneManager.getInstance().startScene(gamePlay);
        }
    }
}

export default SplashScreen;