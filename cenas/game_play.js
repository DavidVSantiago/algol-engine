import {SimpleScene,SimpleSprite,AnimatedSprite} from '../engine/engine.js';
import MultiAnimatedSprite from '../engine/sprites/types/multi_animated_sprite.js';
import MultiSimpleSprite from '../engine/sprites/types/multi_simple_sprite.js';

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
        this.b2.posX=150;
        this.b2.posY=200;
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
export default GamePlay;