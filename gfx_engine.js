//MOTEUR GRAPHIQUE
bounce.gfx_engine = {
    
    stats : null , 

    init : function(config){
       
        // Scene
        this.scene  = new THREE.Scene();
        config = config || {};
        const fov = config.camera_fov || 75;
       
        // Caméra
        const aspect = window.innerWidth/window.innerHeight;
        this.camera = new THREE.PerspectiveCamera(fov,aspect,1,5000);
        this.camera.position.set(0,0,-10);
        this.scene.add(this.camera);
        this.scene.background = new THREE.TextureLoader().load( '3d_obj/textures/space.jpg' );
        this.scene.fog = new THREE.FogExp2( 0xefd1b5, 0.0025 );
        
        //Debug_mode 
        if(bounce.configuration.debug_mode && Stats){
            // Function pour les fps
           this.stats = new Stats(),
           this.stats.showPanel(0) // 0: fps , 1: ms , 2: mb , 3+: custom
           document.body.appendChild(this.stats.dom);
        }
        // Renderer
          if( bounce.configuration.high_performance == true){
        console.log("High performance mode");
        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        
        }else{
            console.log("Low performance mode");
            this.renderer = new THREE.WebGLRenderer({antialias: false});
            this.renderer.shadowMap.enabled = false;
        }

        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize(window.innerWidth , window.innerHeight);
       
        document.body.appendChild(this.renderer.domElement);
       
        
      //RAF polyfill
      window.requestAnimFrame = (function(){
        return  window.requestAnimationFrame       ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame    ||
                function( callback ){
                  window.setTimeout(callback, 1000 / 60);
                };
      })();
        

        console.log('gfx engine ready');
            },
  
    update(){
        
        this.renderer.render(this.scene,this.camera);
        }
};
