import SpriteBatch from '../sprites/sprite_batch.js';
import Resources from '../resources.js';
import { SceneManager, SimpleSprite } from '../engine.js';

class Scene {
    /** construtor
    * @param {String} name nome único da cena */
    constructor(name) {
        this.name = name; // toda Scene possui um nome associado a ela
        this.spriteBatchList = []; // array de states da Cena
        this.actualBatch;
        this.res = Resources.getInstance();
        this.promisesList = []; // lista de todas as promisse de recursos da cena
    }

    //---------------------------------------------------------------------------------------------------------
    // MÉTODOS 
    //---------------------------------------------------------------------------------------------------------

    /** Invocado após todos os recursos serem totalmente carregados */
    init() { } // abstract

    /** Inicializa todos os recursos assíncronos da cena, principalmente as imagens
    * @param {callback} changeSceneCallBack função a ser invocada para iniciar esta cena, apois os recursos serem carregados */
    startLoadResources(changeSceneCallBack) {
        // Vincula o onload de todas as imagens à novas promisses
        for (let i = 0; i < this.spriteBatchList.length; i++) { // percorre todos os batchs
            let spritesList = this.spriteBatchList[i].spritesList;
            for (let i = 0; i < spritesList.length; i++) { // percorre todos os sprites de cada batch
                if (spritesList[i] instanceof SimpleSprite)
                    this.promisesList.push( // adiciona uma nova promisse na lista, cada uma associada a uma imagem
                        new Promise((resolve) => {
                            if (spritesList[i] instanceof SimpleSprite)
                                spritesList[i].img.onload = () => resolve(); // quando o onload acontecer vai resolver a promisse
                        })
                    );
            }
        }
        // quando todas as promisses forem resolvidas...
        Promise.all(this.promisesList).then(() => {
            for (let i = 0; i < this.spriteBatchList.length; i++) { // percorre todos os batchs
                let spritesList = this.spriteBatchList[i].spritesList;
                for (let i = 0; i < spritesList.length; i++) { // percorre todos os sprites de cada batch
                    spritesList[i].init(); // inicia cada uma das imagens
                    spritesList[i].loaded = true;
                }
            }
            console.log('Carregou Cena ' + this.name);
            this.init();
            setTimeout(() => changeSceneCallBack(this), 1000); // transição de tela de Loading para a nova cena
        });
    }

    /** Registra um novo Estado e o seu spriteBatch associado
    * @param {Number} stateIndex índice do estado */
    registerState(stateIndex) {
        this.spriteBatchList.push(new SpriteBatch(stateIndex));
        if (this.spriteBatchList.length == 1) this.changeState(stateIndex); // se for o primeiro Estado registrado, o configura como atual
    }

    /** Altera o State atual
    * @param {Number} stateIndex índice do estado */
    changeState(stateIndex) {
        if (stateIndex >= this.spriteBatchList.length)
            throw new Error("O registro dos STATES deve obedecer a ordem dos seus índices!");
        this.actualBatch = this.spriteBatchList[stateIndex];
    }

    /** Registra um Sprite em um Batch associado a um estado
    * @param {Number} stateIndex índice do estado do Batch */
    registerSprite(sprite, stateIndex) {
        this.spriteBatchList[stateIndex].putSprite(sprite);
    }

    //---------------------------------------------------------------------------------------------------------
    // MÉTODOS DO GAMELOOP
    //---------------------------------------------------------------------------------------------------------

    handleEvents() { } // abstract

    update() { } // abstract

    render() {
        // renderiza o srpitebatch do stado atual
        this.actualBatch.render();
    }
}

export default Scene;