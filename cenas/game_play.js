import {SimpleScene,SimpleSprite,AnimatedSprite} from '../engine/engine.js';

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
        
        // coloca cada sprite nos batchs dos seus respectivos STATES
        this.registerSprite(this.chao,this.STATE_PLAY);
        this.registerSprite(this.b1,this.STATE_PLAY);
        this.registerSprite(this.b2,this.STATE_PLAY);

    }

    // Sobrescreve para especificar como as teclas serão tratadas nessa cena
    handleEvents(){

    }
}
export default GamePlay;