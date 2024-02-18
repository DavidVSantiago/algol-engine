import {SimpleScene,SimpleSprite,AnimatedSprite} from '../engine/engine.js';

class GamePlay extends SimpleScene{
    constructor(name){
        super(name);

        // define os ESTADOS e seus indices
        this.STATE_PLAY=0; // devem começar com zero!!
        this.STATE_PAUSE=1;

        // registra os ESTADOS
        this.registerState(this.STATE_PLAY);
        this.registerState(this.STATE_PAUSE);

        // cria os sprites dessa cena
        this.chao = new SimpleSprite('assets/imgs/fundo.png');
        //this.braid = new SimpleSprite('assets/imgs/braid-died.png');
        this.braid = new AnimatedSprite('assets/imgs/braid-jump.png',1,15,15);
        
        // coloca cada sprite nos batchs dos seus respectivos STATES
        this.registerSprite(this.chao,this.STATE_PLAY);
        this.registerSprite(this.chao,this.STATE_PAUSE);
        this.registerSprite(this.braid,this.STATE_PAUSE);
    }

    // Sobrescreve para especificar como as teclas serão tratadas nessa cena
    handleEvents(){
        if(this.res.vk_up) this.changeState(this.STATE_PAUSE);
        if(this.res.vk_down)this.changeState(this.STATE_PLAY);
    }
}
export default GamePlay;