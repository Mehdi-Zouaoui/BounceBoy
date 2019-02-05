const bounce = {
    
    
    start : function(config){  //Fonction de lancement de jeu 

        //debug mode 
        if(config.debug_mode == false){
            console.log = function(){};
        }

        this.configuration = config;
        this.gfx_engine.init();
        this.game.init(config.game);
        

        this.update();
        console.log("Bounce is started");
    }, 
    update: function(){
        requestAnimFrame(bounce.update);
        
        if(bounce.configuration.debug_mode) bounce.gfx_engine.stats.begin();

            bounce.game.update();
            bounce.gfx_engine.update();

        if(bounce.configuration.debug_mode) bounce.gfx_engine.stats.end();
    }
};