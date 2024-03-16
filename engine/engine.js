"use strict";

import SimpleSprite from './sprites/types/simple_sprite.js';
import AnimatedSprite from './sprites/types/animated_sprite.js';
import SceneLayer from './scenes/types/simple_scene/scene_layer.js';
import SimpleScene from './scenes/types/simple_scene/simple_scene.js';
import SceneManager from './scenes/scene_manager.js';
import Resources from './resources.js';


/** Implementação da Game Engine do jogo
 * Classe abstrata que deve ser herdada para prover suas funcionalidades */
class Engine {
    /**
     * Construtor
     * @param {Number} width - largura da tela
     * @param {Number} height - altura da tela */
    constructor(width, height) {
        this.tempoAnterior=0.0;

        this.res = Resources.getInstance();
        this.res.init(width, height); // inicializa os recursos da Engine

        // atributos da Engine
        this.sceneManager = SceneManager.getInstance();
        this.sceneManager.init(this.gameloop); // obrigatório para inicializar os recursos 

        // registra os eventos de pressionamento e soltura das teclas
        window.addEventListener('keydown', this.keyPressed, false);
        window.addEventListener('keyup', this.keyReleased, false);
    }

    /*****************************************************************************/
    /* MÉTODOS DO GAMELOOP */
    /*****************************************************************************/

    handleEvents() {
        //console.log('handleEvents - ENGINE');
        this.sceneManager.handleEvents();
    }

    update() {
        //console.log('update - ENGINE');
        this.sceneManager.update();
    }

    render() {
        //console.log('render - ENGINE');
        this.sceneManager.render();
    }

    gameloop = () => {
        let tempoAtual = this.res.getTimeTick();
        this.res.deltaTime = (tempoAtual - this.tempoAnterior);//* (6e-2);

            //console.log("LOOP");
            this.handleEvents();
            this.update();
            this.render();


        this.tempoAnterior = tempoAtual; // atualiza o tempo anterior (para o próximo quadro)
        requestAnimationFrame(this.gameloop);
    }

    /*****************************************************************************/
    /* MONITORAMENTO DAS TECLAS DO TECLADO */
    /*****************************************************************************/
    keyPressed = (e) => {
        switch (e.keyCode) {
            case 37: this.res.vk_left = true; break; // Left key
            case 38: this.res.vk_up = true; break; // Up key
            case 39: this.res.vk_right = true; break; // Right key
            case 40: this.res.vk_down = true; break; // Down key
            case 27: this.res.vk_esc = true; break; // Esc key
            case 65: this.res.vk_a = true; break; // a
            case 83: this.res.vk_s = true; break; // s
            case 68: this.res.vk_d = true; break; // d
        }
    }
    keyReleased = (e) => {
        switch (e.keyCode) {
            case 37: this.res.vk_left = false; break; // Left key
            case 38: this.res.vk_up = false; break; // Up key
            case 39: this.res.vk_right = false; break; // Right key
            case 40: this.res.vk_down = false; break; // Down key
            case 27: this.res.vk_esc = false; break; // Esc key
            case 65: this.res.vk_a = false; break; // a
            case 83: this.res.vk_s = false; break; // s
            case 68: this.res.vk_d = false; break; // d
        }
    }
}

export { Engine, SimpleSprite, AnimatedSprite, SceneLayer as SpriteBatch, SimpleScene, SceneManager };