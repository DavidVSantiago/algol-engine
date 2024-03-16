"use strict";

import Resources from '../../../resources.js';

class SceneLayer{
    constructor(){
        this.spritesList = []; // pilha de sprites renderizaveis
        this.res=Resources.getInstance();
    }

    //---------------------------------------------------------------------------------------------------------
    // MÉTODOS
    //---------------------------------------------------------------------------------------------------------

    putSprite(sprite){
        this.spritesList.push(sprite);
    }
    getSprite(spriteIndex){
        return this.spritesList[spriteIndex];
    }

    //---------------------------------------------------------------------------------------------------------
    // MÉTODOS DO GAMELOOP
    //---------------------------------------------------------------------------------------------------------

    render(ctx){
        // renderiza todos os sprites desse layer
        for(let i=0;i<this.spritesList.length;i++){
            this.spritesList[i].render(ctx);
        }
    }
}
export default SceneLayer;