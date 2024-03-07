import {SimpleScene,SimpleSprite} from '../../engine.js';

/** Abstract */
class SplashScene extends SimpleScene{
    constructor(name){
        super(name);
        this.bg;
        this.nextScene;
        this.time=0;
    }

    //---------------------------------------------------------------------------------------------------------
    // MÉTODOS
    //---------------------------------------------------------------------------------------------------------
   
    setTime(time){ this.time=time; }

    setImage(fileSource){
        this.bg = new SimpleSprite(fileSource);
        this.registerState(0);
        this.registerSprite(this.bg,0);
    }

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