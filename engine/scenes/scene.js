import SpriteBatch from '../sprites/sprite_batch.js';
import Resources from '../resources.js';
import { SceneManager, SimpleSprite } from '../engine.js';

class Scene {
    constructor(name) {
        this.name = name; // toda Scene possui um nome associado a ela
        this.spriteBatchList = []; // array de states da Cena
        this.actualBatch;
        this.res = Resources.getInstance();
        this.allSpriteList = []; // lista de todos os sprites da cena (usada para checar o carregamento das imagens)
        this.promisesList = []; // lista de todas as promisse de recursos da cena
    }

    //---------------------------------------------------------------------------------------------------------
    // MÉTODOS 
    //---------------------------------------------------------------------------------------------------------

    /** Invocado após todos os recursos serem totalmente carregados */
    init() { } // abstract

    /** Inicializa todos os recursos assíncronos da cena, principalmente as imagens*/
    startLoadResources(changeSceneCallBack) { // protected
        // Vincula o onload de todas as imagens a novas promisses
        for (let i = 0; i < this.allSpriteList.length; i++) {
            if (this.allSpriteList[i] instanceof SimpleSprite)
                this.promisesList.push( // adiciona uma nova promisse na lista, cada uma associada a uma imagem
                    new Promise((resolve) => {
                        if (this.allSpriteList[i] instanceof SimpleSprite)
                            this.allSpriteList[i].img.onload = () => resolve(); // quando o onload acontecer vai resolver a promisse
                    })
                );
        };
        // quando todas as promisses forem resolvidas...
        Promise.all(this.promisesList).then(() => {
            for (let i = 0; i < this.allSpriteList.length; i++) {
                this.allSpriteList[i].init();
                this.allSpriteList[i].loaded = true;
            };
            console.log('Carregou Cena ' + this.name);
            this.init();
            setTimeout(() => changeSceneCallBack(this), 1000); // transição de tela de Loading para a nova cena
        });
    }

    /** Registra um novo Estado e o seu spriteBatch associado */
    registerState(stateIndex) {
        this.spriteBatchList.push(new SpriteBatch(stateIndex));
        if (this.spriteBatchList.length == 1) this.changeState(stateIndex); // se for o primeiro Estado registrado, o configura como atual
    }

    /** Altera o State atual*/
    changeState(stateIndex) {
        if (stateIndex >= this.spriteBatchList.length)
            throw new Error("O registro dos STATES deve obedecer a ordem dos seus índices!");
        this.actualBatch = this.spriteBatchList[stateIndex];
    }

    registerSprite(sprite, stateIndex) {
        this.spriteBatchList[stateIndex].putSprite(sprite);
        this.allSpriteList.push(sprite);
    }

    //---------------------------------------------------------------------------------------------------------
    // MÉTODOS DO GAMELOOP
    //---------------------------------------------------------------------------------------------------------

    handleEvents() {
        if (this.res.vk_up) console.log('Tecla cima');
        if (this.res.vk_down) console.log('Tecla baixo');
        if (this.res.vk_left) console.log('Tecla esquerda');
        if (this.res.vk_right) console.log('Tecla direita');
        if (this.res.vk_esc) console.log('Tecla esc');
    }

    update() {

    }

    render() {
        // renderiza o srpitebatch do stado atual
        this.actualBatch.render();
    }
}

export default Scene;