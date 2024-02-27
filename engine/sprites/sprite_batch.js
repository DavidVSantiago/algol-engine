"use strict";

import Resources from '../resources.js';

class SpriteBatch{
    constructor(stateIndex){
        this.stateIndex = stateIndex;
        this.spritesList = []; // pilha de sprites renderizaveis
        this.res=Resources.getInstance();
    }

    //---------------------------------------------------------------------------------------------------------
    // MÉTODOS
    //---------------------------------------------------------------------------------------------------------

    putSprite(sprite){
        this.spritesList.push(sprite);
    }

    //---------------------------------------------------------------------------------------------------------
    // MÉTODOS DO GAMELOOP
    //---------------------------------------------------------------------------------------------------------

    render(){
        // limpa a tela da renderização do quadro anterior
        this.res.clearScreen();
        // renderiza todos os sprites no imageBuffer externo
        for(let i=0;i<this.spritesList.length;i++){
            this.spritesList[i].render(this.res.offCtx);
        }
        // renderiza o imageBuffer na tela do jogo
        this.res.ctx.drawImage(this.res.offscreen,0,0);
    }
    
}
export default SpriteBatch;