import {SimpleScene,SimpleSprite,AnimatedSprite} from '../engine/engine.js';
import MultiAnimatedSprite from '../engine/sprites/types/multi_animated_sprite.js';
import MultiSimpleSprite from '../engine/sprites/types/multi_simple_sprite.js';

class Tela3 extends SimpleScene{
    constructor(){
        super('TELA 3');

        // define os ESTADOS e seus indices
        this.STATE_PLAY=0; // devem começar com zero!!
        this.STATE_PAUSE=1;

        // registra os ESTADOS
        this.registerState(this.STATE_PLAY);

        // cria os sprites dessa cena
        this.chao = new SimpleSprite('assets/imgs/fundo3.png');
        this.b1 = new SimpleSprite('assets/imgs/braid-died.png');
        this.b2 = new MultiSimpleSprite('assets/imgs/braid-jump-teste.png',15,3,0);
        this.b2.posX=500;
        this.b2.posY=100;
        this.b1.posX=50;
        this.b1.posY=200;
       // this.braid = new MultiAnimatedSprite('assets/imgs/braid-jump-teste.png',15,3,0);
        
        // coloca cada sprite nos batchs dos seus respectivos STATES
        this.registerSprite(this.chao,this.STATE_PLAY);
        this.registerSprite(this.b1,this.STATE_PLAY);
        this.registerSprite(this.b2,this.STATE_PLAY);
       //is.registerSprite(this.chao,this.STATE_PAUSE);
        //this.registerSprite(this.braid,this.STATE_PAUSE);
    }

    // Sobrescreve para especificar como as teclas serão tratadas nessa cena
    handleEvents(){
   
    }
}
export default Tela3;