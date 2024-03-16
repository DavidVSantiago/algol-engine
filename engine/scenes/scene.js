"use strict";

import Resources from '../resources.js';
import SimpleProcSprite from '../sprites/procedural_types/simple_proc_sprite.js';

/** Implementação de uma cena genérica do jogo
 * Classe abstrata que reúne as operações a atributos genéricos a qualquer cena*/
class Scene {
    /** construtor
    * @param {String} name nome único da cena */
    constructor(name) {
        this.name = name; // toda Scene possui um nome associado a ela
        this.res = Resources.getInstance(); // ref. para o singleton de recursos

        this.promisesList = []; // lista de todas as promisse de recursos da cena
        
        // cria um sprite procedural para representar um fundo preto (comum a várias cenas)
        this.blackScreen = new OffscreenCanvas(this.res.canvas.width, this.res.canvas.height);
        this.blackScreenCtx = this.blackScreen.getContext('2d');
        this.blackScreenCtx.fillStyle = "black";
        this.blackScreenCtx.globalAlpha = 1; // a princípio transparente
        this.blackScreenCtx.fillRect(0, 0, this.blackScreen.width, this.blackScreen.height);
        this.black = new SimpleProcSprite(this.blackScreen);  
    }

    //---------------------------------------------------------------------------------------------------------
    // GETTERS & SETTERS
    //---------------------------------------------------------------------------------------------------------
    
    /** define o tempo mínimo de intervalo da transição entre as cenas.
     * Mínimo porque a transição depende do carregamento completo dos recurso da cena.
     * Caso o carregamento demore mais que o tempo mínimo, o tempo mínimo será superado!
     * Caso demore menos, a cena esperará decorrer o tempo mínimo */
    setMinTransitionTime(time){ this.minTransitionTime=time;}

    //---------------------------------------------------------------------------------------------------------
    // MÉTODOS 
    //---------------------------------------------------------------------------------------------------------

    /** Invocado quando os recursos da cena começam a ser carregados */
    onStartLoad() { } // abstract
    /** Invocado após os recursos da cena serem todos carregados */
    onFinishLoad(){ } // abstract
    /** Invocado quando a cena começa a ser exibida na tela */
    onShow(){ } // abstract
    /** Inicializa todos os recursos assíncronos da cena, principalmente as imagens */
    startLoadResources(onFinishLoadCallBack){ } // abstract

    //---------------------------------------------------------------------------------------------------------
    // MÉTODOS DO GAMELOOP
    //---------------------------------------------------------------------------------------------------------

    handleEvents() { } // abstract
    update() { } // abstract
    render() { } // abstract

}

export default Scene;