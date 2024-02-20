import Scene from '../scene.js';

class SimpleScene extends Scene {
    constructor(name) {
        super(name);
    }

    /** Inicializa todos os recursos assíncronos da cena, principalmente as imagens*/
    initScene(changeSceneCallBack) {
        // Vincula o onload de todas as imagens a novas promisses
        for (let i = 0; i < this.allSpriteList.length; i++) {
            this.promisesList.push( // adiciona uma nova promisse na lista, cada uma associada a uma imagem
                new Promise((resolve) => {
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
            console.log('Carregou Cena '+this.name);
            setTimeout(()=>changeSceneCallBack(this),1000); // transição de tela de Loading para a nova cena
        });
    }
}

export default SimpleScene;