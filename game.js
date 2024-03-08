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

        // cria e configura os splashes
        let sp1 = new SplashScene('SP1');
        sp1.setTime(3000);
        sp1.setImage('assets/imgs/splash.png');
        let sp2 = new SplashScene('SP2');
        sp2.setTime(3000);
        sp2.setImage('assets/imgs/splash2.png');
        let sp3 = new SplashScene('SP3');
        sp3.setTime(3000);
        sp3.setImage('assets/imgs/splash3.png');
        let sp4 = new SplashScene('SP4');
        sp4.setTime(3000);
        sp4.setImage('assets/imgs/splash4.png');

        // organiza a lista de splashes
        const list=[sp1,sp2,sp3,sp4];

        // cria e configura a cena pós splash
        let gamePlay = new GamePlay();

        // inicializa os splashes
        this.sceneManager.startSplashesList(list,gamePlay);

    }

    handleEvents(){
        super.handleEvents();
    }
}