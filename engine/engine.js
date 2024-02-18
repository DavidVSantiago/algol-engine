import SimpleSprite from './sprites/types/simple_sprite.js';
import AnimatedSprite from './sprites/types/animated_sprite.js';
import SpriteBatch from './sprites/sprite_batch.js';
import SimpleScene from './scenes/types/simple_scene.js';
import SceneManager from './scenes/scene_manager.js';
import Resources from './resources.js';


class Engine{
    constructor(width,height){
        this.res = Resources.getInstance();
        this.res.init(width,height);

        // atributos da Engine
        this.sceneManager = new SceneManager();
        
        // registra os eventos de pressionamento e soltura das teclas
        window.addEventListener('keydown', this.keyPressed, false);
        window.addEventListener('keyup', this.keyReleased, false);
    }

    /** inicia o gameloop */
    start(){
        requestAnimationFrame(this.gameloop);
    }

    registerScene(scene){
        this.sceneManager.registerScene(scene);
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

    render(deltaTime){
        //console.log('render - ENGINE');
        this.sceneManager.getActualScene().render(deltaTime);
    }
    gameloop=()=>{
        let tempoAtual = performance.now();
        let deltaTime = (tempoAtual - this.tempoAnterior) ;//* (6e-2);

        this.handleEvents();
        this.update();
        this.render(deltaTime);

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
        }
    }
    keyReleased=(e)=>{
        switch (e.keyCode) {
            case 37: this.res.vk_left = false; break; // Left key
            case 38: this.res.vk_up = false; break; // Up key
            case 39: this.res.vk_right = false; break; // Right key
            case 40: this.res.vk_down = false; break; // Down key
            case 27: this.res.vk_esc = false; break; // Esc key
        }
    }
}

export {Engine,SimpleSprite,AnimatedSprite,SpriteBatch,SimpleScene,SceneManager};