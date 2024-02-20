import SimpleSprite from './sprites/types/simple_sprite.js';
import AnimatedSprite from './sprites/types/animated_sprite.js';
import SpriteBatch from './sprites/sprite_batch.js';
import SimpleScene from './scenes/types/simple_scene.js';
import SceneManager from './scenes/scene_manager.js';
import Resources from './resources.js';
import LoadingScene from './scenes/types/loading_scene.js';


class Engine{
    constructor(width,height){
        this.res = Resources.getInstance();
        this.res.init(width,height);

        // atributos da Engine
        this.sceneManager = SceneManager.getInstance();
        this.sceneManager.gameLoopCallBack = this.gameloop; // o SceneManager precisa controlar o gameloop
        // registra os eventos de pressionamento e soltura das teclas
        window.addEventListener('keydown', this.keyPressed, false);
        window.addEventListener('keyup', this.keyReleased, false);

        requestAnimationFrame(this.gameloop);
    }

    /*****************************************************************************/
    /* MÉTODOS DO GAMELOOP */
    /*****************************************************************************/

    handleEvents(){
        //console.log('handleEvents - ENGINE');
        this.sceneManager.getActualScene().handleEvents();
    }
    
    update(){
        //console.log('update - ENGINE');
        this.sceneManager.getActualScene().update();
    }

    render(){
        //console.log('render - ENGINE');
        this.sceneManager.getActualScene().render();
    }
    gameloop=()=>{
        let tempoAtual = performance.now();
        this.res.deltaTime = (tempoAtual - this.tempoAnterior) ;//* (6e-2);

        this.handleEvents();
        this.update();
        this.render();

        this.tempoAnterior = tempoAtual; // atualiza o tempo anterior (para o próximo quadro)
        requestAnimationFrame(this.gameloop);
    }

    /*****************************************************************************/
    /* MONITORAMENTO DAS TECLAS DO TECLADO */
    /*****************************************************************************/
    keyPressed=(e)=>{
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
    keyReleased=(e)=>{
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

export {Engine,SimpleSprite,AnimatedSprite,SpriteBatch,SimpleScene,SceneManager};