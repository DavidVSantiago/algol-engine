import GamePlay from './cenas/game_play.js';
import {Engine, SceneManager} from './engine/engine.js';

window.addEventListener('load',()=>{
    window.game = new Game();
});

class Game extends Engine{
    constructor(){
        super(1000,435);// Obrigatorio. inicializa o jogo especificando as dimensões

        // cria e registra as cenas
        let gamePlay =new GamePlay();
        SceneManager.getInstance().startScene(gamePlay);
    }

    handleEvents(){
        super.handleEvents();
    }
}