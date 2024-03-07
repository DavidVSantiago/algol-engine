"use strict";

import SplashScene from './engine/scenes/types/splash_scene.js';
import {Engine, SceneManager, SimpleSprite} from './engine/engine.js';
import GamePlay from './cenas/game_play.js';

window.addEventListener('load',()=>{
    window.game = new Game();
});

class Game extends Engine{
    constructor(){
        super(1000,435);// Obrigatorio. inicializa o jogo especificando as dimensões

        // cria e configura a cena
        let splashScene = new SplashScene();
        splashScene.setTime(100);
        splashScene.setImage('assets/imgs/splash.png');

        // inicializa a cena
        this.sceneManager.startScene(splashScene);

    }

    handleEvents(){
        super.handleEvents();
    }
}