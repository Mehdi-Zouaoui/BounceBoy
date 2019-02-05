bounce.game = {
    
    obstacles : [],
    objectivs : [],
    field:{
        width : 2000,
        height : 2500
    },
    player : null,
    //velocity : new THREE.Vector3(),
    moveForward : null,
	moveBackward : null,
	moveLeft :null,
	moveRight : null,
    canJump : null,

  
    build_objectiv : function(objectiv_mesh){
        const scene = bounce.gfx_engine.scene;
        
        for(let j = 0; j < this.nb_objectiv ; j++){
            const clone_mesh = objectiv_mesh.clone();
            clone_mesh.scale.set(0.7,0.7,0.7);
            console.log("test obj");
            clone_mesh.position.set(
               // Math.random() * (max - min) + min;
                Math.floor((Math.random() - 0.5) * 2 * this.field.width/50 - this.field.width/50),
                Math.floor((Math.random() - 0.5) * 20),
                Math.floor(-Math.random() * this.field.height/50) + 5
            );
            console.log(clone_mesh.position);
            scene.add(clone_mesh);   
            this.objectivs.push(clone_mesh);

        };
        
        ;
    },
    build_obstacle : function(obstacle_mesh){
        
    
            const scene = bounce.gfx_engine.scene;
            //console.log('test');
            for(let j = 0; j < this.nb_obstacle ; j++){
               
                let obstacle_clone = obstacle_mesh.clone();
                obstacle_clone.scale.set(1,1,1);
                console.log("test");
                obstacle_clone.position.set(
                    Math.floor(Math.random()*100) ,
                    -70,
                    Math.floor(-Math.random()*100) + 5
                );
                scene.add(obstacle_clone);   
                this.obstacles.push(obstacle_clone);
            
        }
    },
        
    
    init: function(config){
        const textureLoader = new THREE.MTLLoader();
        const loader = new THREE.OBJLoader();
        const scene = bounce.gfx_engine.scene;
        const objectiv_geometry = new THREE.BoxGeometry( 1, 1, 1 );
        const objectiv_material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
        const objectiv_mesh = new THREE.Mesh( objectiv_geometry, objectiv_material );
        const falcon = null;
        config = config || {};

        this.player = bounce.gfx_engine.camera;
        this.speed = config.speed || 10;
        this.gravity = config.gravity || 1;
        this.nb_objectiv = config.nb_objectiv || 50;

        
       
        
        //const material = new THREE.MeshBasicMaterial({color : 0xff0000});
            
        // Ground *
        
        const plane = new THREE.Mesh(
            new THREE.PlaneGeometry(this.field.width , this.field.height),
            new THREE.MeshBasicMaterial({color : 0xffff00})
        );

        plane.translateY(-50)
        plane.translateZ(-this.field.height*0.5);
        plane.rotateX(THREE.Math.degToRad(-90));
        plane.receiveShadow = true;
       // bounce.gfx_engine.camera.add(plane);
       // scene.add(plane);

        //Obstacles 
        
        textureLoader.load('3d_obj/texture/falcon_obj.mtl',function(material){
             material.preload();
        
        loader.setMaterials(material).load("3d_obj/source/falcon_obj.obj",function (object) {
        
        
        object.scale.set(0.01,0.01,0.01);
        object.position.set(0,0,-17);
        
        
        object.receiveShadow = true;
        //bounce.gfx_engine.camera.add(this.cube);
        bounce.game.falcon = object;
        scene.add(object);
        })
    });
       
        
        
        loader.load('3d_obj/source/big_ast.obj', function (ast) {
            

               // ast.material = ast_material;
         
            
         
            bounce.game.build_objectiv(ast);
            //bounce.game.build_obstacle(ast);
        });
        loader.load('3d_obj/source/ast.obj', function (ast) {
            
            bounce.game.build_objectiv(ast);
            //bounce.game.build_obstacle(ast);
        });
        //bounce.game.build_obstacle(ast);
        
        
        const onKeyDown = function ( event ) {
            switch ( event.keyCode ) {
                case 38: // up
                case 87: // w
                    bounce.game.moveForward = true;
                    break;
                case 37: // left
                case 65: // a
                    bounce.game.moveLeft = true;
                    break;
                case 40: // down
                case 83: // s
                    bounce.game.moveBackward = true;
                    break;
                case 39: // right
                case 68: // d
                    bounce.game.moveRight = true;
                    break;
                case 32: // space
                    bounce.game.moveUp = true;
                    break;
                    
            }
        };
        const onKeyUp = function ( event ) {
            switch ( event.keyCode ) {
                case 38: // up
                case 87: // w
                    bounce.game.moveForward = false;
                    break;
                case 37: // left
                case 65: // a
                    bounce.game.moveLeft = false;
                    break;
                case 40: // down
                case 83: // s
                    bounce.game.moveBackward = false;
                    break;
                case 39: // right
                case 68: // d
                    bounce.game.moveRight = false;
                    break;
                case 32: // space
                    bounce.game.moveUp = false;
                    break;
            }

        };
        document.addEventListener( 'keydown', onKeyDown, false );
        document.addEventListener( 'keyup', onKeyUp, false );
        // return obstacle_mesh ; 
        

        
       
        
    console.log('Game is ready')

    },
     
    update : function(){
        
        const gfx = bounce.gfx_engine;

        if(bounce.game.moveForward == true){
            bounce.game.falcon.translateZ(-1);
            console.log('test 2');
        }
        if(bounce.game.moveLeft == true){
            bounce.game.falcon.translateX(-1);
            console.log('test 2');
        }if(bounce.game.moveBackward == true){
            bounce.game.falcon.translateZ(1);
            console.log('test 2');
        }if(bounce.game.moveRight == true){
            bounce.game.falcon.translateX(1);
            console.log('test 2');
        }
        if(bounce.game.moveUp == true){
        bounce.game.falcon.translateY(1);
        console.log('test 2');
    };

        this.player.translateZ(-this.speed/10);
        if(bounce.game.falcon.position.y > 0){
            bounce.game.falcon.translateY(-this.gravity/10);
            }
        const raycaster = new THREE.Raycaster();
        

        if(this.obstacles.length > 0){
        
            for(let i = 0 ; i < this.nb_objectiv ; i++){
            
            if(this.obstacles[i].position.z > this.player.position.z){
            this.obstacles[i].translateZ(-this.field.width- 50);
            this.obstacles[i].position.x =
            Math.floor(Math.random()*this.field.width) -this.field.width * 0.5;
            
                };
            }
        };
        
        //console.log(this.falcon.position);
        if(this.objectivs.length > 0){
        
            for(let i = 0 ; i < this.objectivs.length ; i++){
            if(this.objectivs[i].position.z > this.player.position.z){
            this.objectivs[i].translateZ((-this.field.width- 50)/50);
            this.objectivs[i].position.x =
            Math.floor(-(Math.random() - 0.5) * 2 * this.field.height/50) + 5
            
                };
            }
        };
        
        
    
       
}
};