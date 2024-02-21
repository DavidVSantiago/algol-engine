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
        this.changeScene(this.loadingScene);
    }
    getActualScene=()=>{
        return this.actualScene;
    }
    startScene=(scene)=>{
        this.changeScene(this.loadingScene);
        scene.initScene(this.changeScene); // Obrigatório para carregar todos os sprites
    }
    changeScene=(scene)=>{
        this.actualScene=scene;
    }
}
export default SceneManager;