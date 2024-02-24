import LoadingScene from "./types/loading_scene.js";

class SceneManager{
    static singleton;
    static getInstance() {

        if (!this.singleton) {
            this.singleton = new this();
        }
        return this.singleton;
    }
    constructor(){
        this.actualScene;
        this.loadingScene = new LoadingScene('LOADING'); // cena usada entre os carregamentos das cenas
        this.loadingScene.startLoadResources(this.changeScene);
        this.actualScene=this.loadingScene;
    }
    getActualScene=()=>{
        return this.actualScene;
    }
    /** Dá início ao processo de inicialização da cena */
    startScene=(scene)=>{
        this.changeScene(this.loadingScene); // muda a cena para a tela de carregamento
        scene.startLoadResources(this.changeScene); // Obrigatório para carregar todos os sprites
    }
    changeScene=(scene)=>{
        this.actualScene=scene;
    }
}
export default SceneManager;