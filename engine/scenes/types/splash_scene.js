import {SimpleScene,SimpleSprite} from '../../engine.js';

/** Abstract */
class SplashScene extends SimpleScene{
    constructor(name){
        super(name);
    }

    //---------------------------------------------------------------------------------------------------------
    // MÉTODOS
    //---------------------------------------------------------------------------------------------------------
   

    //---------------------------------------------------------------------------------------------------------
    // MÉTODOS OVERRIDE
    //---------------------------------------------------------------------------------------------------------

    /** Invocado após todos os recursos serem totalmente carregados */
    onInit() { // overriding
        console.log("SPLASH onInit()");
    }
    
    /** Invocado após a cena aparecer na tela */
    onShow(){ // overriding
        console.log("SPLASH onShow()");
    }

    start(bg, nextScene, time){
        this.bg=bg;
        this.nextScene=nextScene;
        this.time=time;
        super.start();
        console.log("SPLASH start()");
    }
    
    //---------------------------------------------------------------------------------------------------------
    // MÉTODOS DO GAMELOOP
    //---------------------------------------------------------------------------------------------------------

    // Sobrescreve para especificar como as teclas serão tratadas nessa cena
    handleEvents(){
       
    }
}
export default SplashScene;