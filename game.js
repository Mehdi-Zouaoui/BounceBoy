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
    moveUp : null,
    canJump : null,
    
  
    build_objectiv : function(objectiv_mesh){
        const scene = bounce.gfx_engine.scene;
        
        for(let j = 0; j < this.nb_objectiv ; j++){

            const clone_mesh = objectiv_mesh.children[0].clone();
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
       
       // const objectiv_geometry = new THREE.BoxGeometry( 1, 1, 1 );
       // const objectiv_material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
        //const objectiv_mesh = new THREE.Mesh( objectiv_geometry, objectiv_material );
        this.falcon = null;
       
        this.direction_ray = new THREE.Vector3(0,0,-1);
        this.raycaster = new THREE.Raycaster();

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
        
        textureLoader.load('3d_obj/textures/falcon_obj.mtl',function(material){
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
        const game = bounce.game;
        let distance = gfx.camera.position.distanceTo(game.falcon.position);
        console.log(distance);
        if(game.moveForward == true){
            if(distance < 100){
            game.falcon.translateZ(-1);
            };
        }
        if(game.moveLeft == true){
            game.falcon.translateX(-1);

        }if(game.moveBackward == true){
            game.falcon.translateZ(1);
            
        }if(game.moveRight == true){
            game.falcon.translateX(1);
        }
        if(game.moveUp == true){
            if(game.falcon.position.y < window.innerHeight){
                game.falcon.translateY(1);
    
            
            }
    };

        game.player.translateZ(-game.speed/10);
        if(game.falcon.position.y > 0){
            game.falcon.translateY(-game.gravity/10);
            }
        
                
        
        
        

        if(this.obstacles.length > 0){
        
            for(let i = 0 ; i < this.nb_objectiv ; i++){
            
            if(game.obstacles[i].position.z > game.player.position.z){
            game.obstacles[i].translateZ(-game.field.width- 50);
            game.obstacles[i].position.x =
            Math.floor(Math.random()*game.field.width) -game.field.width * 0.5;
            
                };
            }
        };
        
        //console.log(bounce.game.falcon.position);
        if(game.objectivs.length > 0){
            console.log(game.objectivs);
            game.raycaster.set(game.falcon.position, game.direction_ray);
            const intersects = game.raycaster.intersectObjects(game.objectivs, false);
            console.log(intersects);


            for(let i = 0 ; i < game.objectivs.length ; i++){

            
            if(game.objectivs[i].position.z > game.player.position.z){
            game.objectivs[i].translateZ((-game.field.width- 50)/50);
            game.objectivs[i].position.x =
            Math.floor(-(Math.random() - 0.5) * 2 * game.field.height/50) + 5
            
                };
            }
        };
        
        
    
       
}
};