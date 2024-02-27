
import SplashScreen from './cenas/splash_screen.js';
import {Engine, SceneManager} from './engine/engine.js';

window.addEventListener('load',()=>{
    window.game = new Game();
});

class Game extends Engine{
    constructor(){
        super(1000,435);// Obrigatorio. inicializa o jogo especificando as dimensões

        // cria e registra as cenas
        let splashScreen =new SplashScreen();
        splashScreen.start();
    }

    handleEvents(){
        super.handleEvents();
    }
}