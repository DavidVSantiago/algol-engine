import {SimpleScene,SimpleSprite} from '../../../engine.js';
import Resources from '../../../resources.js';
import SimpleProcSprite from '../../../sprites/procedural_types/simple_proc_sprite.js';
import SplashPiece from './splash_piece.js';

/** Abstract */
class SplashScene extends SimpleScene{
    constructor(name){
        super(name);

        // array de imagens de splash com seus respectivos tempos de duração
        this.splashPieceList = [];
        // cena a ser exibida ao final da execução do splash
        this.postScene=null;
    }

    //---------------------------------------------------------------------------------------------------------
    // GETTERS & SETTERS
    //---------------------------------------------------------------------------------------------------------

    setTime(durationTime){ this.durationTime=durationTime; }

    setImage(fileSource){
        
        // sprite de fundo da tela de splash
        let bg = new SimpleSprite(fileSource);
        
        // cria um registra o sprite do fundo preto para as transições
        this.blackScreen = new OffscreenCanvas(this.res.canvas.width,this.res.canvas.height);
        this.blackScreenCtx = this.blackScreen.getContext('2d');
        this.blackScreenCtx.fillStyle = "black";
        this.blackScreenCtx.globalAlpha = 1;
        this.blackScreenCtx.fillRect(0, 0, this.blackScreen.width, this.blackScreen.height);
        this.black = new SimpleProcSprite(this.blackScreen);
        
        // registra os prites
        this.registerState(0);
        this.registerSprite(bg,0);
        this.registerSprite(this.black,0);
    }

    //---------------------------------------------------------------------------------------------------------
    // MÉTODOS OVERRIDE
    //---------------------------------------------------------------------------------------------------------

    /** Invocado após todos os recursos serem totalmente carregados */
    onStartLoad() { // overriding
        console.log("SPLASH onStartLoad()");
    }
    
    /** Invocado após a cena aparecer na tela */
    onFinishLoad(){ // overriding
        console.log("SPLASH onFinishLoad()");
    }

    onShow(){
        console.log("SPLASH onShow()");
    }

    //---------------------------------------------------------------------------------------------------------
    // MÉTODOS
    //---------------------------------------------------------------------------------------------------------
    
    addSplash(fileSource,durationTime){
        // cria um novo sprite com a imagem recebida
        let sprite = new SimpleSprite(fileSource);
        // cria um novo splashpiece com o sprite e o seu tempo associado
        let splashPiece = new SplashPiece(sprite,durationTime);
        // adiciona o novo splashpiece na lista
        this.splashPieceList.push(splashPiece);
    }

    addPostScene(postScene){
        this.postScene = postScene;
    }

    //---------------------------------------------------------------------------------------------------------
    // MÉTODOS DO GAMELOOP
    //---------------------------------------------------------------------------------------------------------

    // Sobrescreve para especificar como as teclas serão tratadas nessa cena
    handleEvents(){
       
    }

    update() {
        this.elapsedTime+=this.res.deltaTime;
        // atualiza os valores de transparencia da tela preta de trasição do splash
        if(this.elapsedTime<=this.transitionDurationTime){ // inicio da transição
            let alphaValue = 1.0 - this.elapsedTime/this.transitionDurationTime;
            this.black.setAlpha(alphaValue);
        }else if(this.elapsedTime>=this.durationTime-this.transitionDurationTime){ // final da transição
            let diffEndTime = this.durationTime-this.elapsedTime;
            let alphaValue = 1.0 - diffEndTime/this.transitionDurationTime;
            this.black.setAlpha(alphaValue);
        }

    }

    render() {
        super.render();

    }
}
export default SplashScene;