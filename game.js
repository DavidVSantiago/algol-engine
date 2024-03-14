"use strict";

import SplashScene from './engine/scenes/types/splash_scene/splash_scene.js';
import {Engine, SceneManager, SimpleSprite} from './engine/engine.js';
import GamePlay from './cenas/game_play.js';

window.addEventListener('load',()=>{
    window.game = new Game();
});

class Game extends Engine{
    constructor(){
        super(1000,435);// Obrigatorio. inicializa o jogo especificando as dimensões

        // cria e configura a cena de splash
        /*let sp1 = new SplashScene('Splash');
        sp1.addSplash('assets/imgs/splash.png',3000); // adiciona uma imagem dentro array junto com oseu respectivo tempo de transição
        sp1.addSplash('assets/imgs/splash2.png',3000); // adiciona uma imagem dentro array junto com oseu respectivo tempo de transição
        sp1.addSplash('assets/imgs/splash3.png',3000); // adiciona uma imagem dentro array junto com oseu respectivo tempo de transição
        sp1.addSplash('assets/imgs/splash4.png',3000); // adiciona uma imagem dentro array junto com oseu respectivo tempo de transição
        sp1.addPostScene(gamePlay); // adiciona a cena a ser carregada após o splash
        */
       
        let gamePlay = new GamePlay();
        // inicializa os splashes
        this.sceneManager.startScene(gamePlay);

    }

    handleEvents(){
        super.handleEvents();
    }
}