import SpriteBatch from '../sprites/sprite_batch.js';
import Resources from '../resources.js';

class Scene{

    constructor(name){
        this.name=name; // toda Scene possui um nome associado a ela
        this.spriteBatchList = []; // array de states da Cena
        this.actualState;
        this.res = Resources.getInstance();
        this.allSpriteList = []; // lista de todos os sprites da cena (usada para checar o carregamento das imagens)
        this.promisesList=[]; // lista de todas as promisse de recursos da cena
    }

    //---------------------------------------------------------------------------------------------------------
    // MÉTODOS 
    //---------------------------------------------------------------------------------------------------------

    /** Registra um novo Estado e o seu spriteBatch associado */
    registerState(stateIndex){
        this.spriteBatchList.push(new SpriteBatch(stateIndex));
        if(this.spriteBatchList.length==1) this.changeState(stateIndex); // se for o primeiro Estado registrado, o configura como atual
    }

    /* Altera o State atual*/
    changeState(stateIndex){
        if(stateIndex>=this.spriteBatchList.length)
            throw new Error("O registro dos STATES deve obedecer a ordem dos seus índices!");
        this.actualState = this.spriteBatchList[stateIndex];
    }  

    registerSprite(sprite,stateIndex){
        this.spriteBatchList[stateIndex].putSprite(sprite);
        this.allSpriteList.push(sprite);
    }

    //---------------------------------------------------------------------------------------------------------
    // MÉTODOS DO GAMELOOP
    //---------------------------------------------------------------------------------------------------------

    handleEvents(){
        if(this.res.vk_up) console.log('Tecla cima');
        if(this.res.vk_down) console.log('Tecla baixo');
        if(this.res.vk_left) console.log('Tecla esquerda');
        if(this.res.vk_right) console.log('Tecla direita');
        if(this.res.vk_esc) console.log('Tecla esc');
    }

    update(){
        
    }

    render(){
        // renderiza o srpitebatch do stado atual
        this.actualState.render();
    }
}

export default Scene;