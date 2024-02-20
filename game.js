import {Engine, SceneManager} from './engine/engine.js';
import GamePlay from './cenas/game_play.js';
import Tela2 from './cenas/tela_2.js';
import Tela3 from './cenas/tela_3.js';

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
        if(this.res.vk_a){
            let gamePlay =new GamePlay();
            SceneManager.getInstance().startScene(gamePlay);
        }
        if(this.res.vk_s){
            let tela2 =new Tela2();
            SceneManager.getInstance().startScene(tela2);
        }
        if(this.res.vk_d){
            let tela3 =new Tela3();
            SceneManager.getInstance().startScene(tela3);
        }
    }
}