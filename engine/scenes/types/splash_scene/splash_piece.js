"use strict";

/** Representa uma imagem e um tempo associado em uma cena de Splash.
 * Uma cena de splash pode ser composta por várias imagens de splash a ser exibidas uma após a outra */
class SplashPiece {
    constructor(image,time){
        this.image=image;
        this.time=time;
    }
    getImage(){return this.image;}
    getTime(){return this.time;}
}
export default SplashPiece;