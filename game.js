bounce.game = {
    
    obstacles : [],
    objectivs : [],
    nb_obstacle : null,
    nb_objectiv:null,
    field:{
        width : 500,
        height : 2500
    },
    speed: null,
    player : null,
    velocity : new THREE.Vector3(),
    moveForward : null,
	moveBackward : null,
	moveLeft :null,
	moveRight : null,
    canJump : null,

  
    build_objectiv : function(objectiv_mesh){
        
        for(let j = 0; j < this.nb_objectiv ; j++){

            
            objectiv_mesh.scale.set(1,1,1);
            console.log("test");
            objectiv_mesh.position.set(
                Math.floor(Math.random()*this.field.width) - this.field.width*0.5,
                -70,
                Math.floor(-Math.random()*this.field.height) + 5
            );
            scene.add(objectiv_mesh);   
            this.objectivs.push(objectiv_mesh);

        };
        
        ;
    },
    build_obstacle : function(obstacle_mesh){
        
    
            const scene = bounce.gfx_engine.scene;
            console.log('test');
            for(let j = 0; j < this.nb_obstacle ; j++){
               
                let obstacle_clone = obstacle_mesh.clone();
                obstacle_clone.scale.set(1,1,1);
                console.log("test");
                obstacle_clone.position.set(
                    Math.floor(Math.random()*this.field.width) - this.field.width*0.5,
                    -70,
                    Math.floor(-Math.random()*this.field.height) + 5
                );
                scene.add(obstacle_clone);   
                this.obstacles.push(obstacle_clone);
            
        }
    },
        
 


    
    init: function(config){
       
        const loader = new THREE.OBJLoader();
        const scene = bounce.gfx_engine.scene;
        const objectiv_geometry = new THREE.RingGeometry( 1, 5, 32 );
        const objectiv_material = new THREE.MeshBasicMaterial( { color: 0xffff00, side: THREE.DoubleSide } );
        const objectiv_mesh = new THREE.Mesh( objectiv_geometry, objectiv_material );
        
        config = config || {};

        this.player = bounce.gfx_engine.camera;
        this.speed = config.speed || 10;
        this.gravity = config.gravity || 1;
        this.nb_tree = config.nb_tree || 50;

        
       
        
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
        bounce.gfx_engine.camera.add(plane);
        scene.add(plane);

        //Obstacles 
        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
        this.cube = new THREE.Mesh( geometry, material );
        this.cube.position.set(0,0,-17);
        this.cube.receiveShadow = true;
        bounce.gfx_engine.camera.add(this.cube);
        scene.add(this.cube);
        console.log(this.cube);

        loader.load('3d_obj/source/big_ast.obj', function (ast) {
        
            bounce.game.build_obstacle(ast);
        });
        bounce.game.build_objectiv(objectiv_mesh);
        
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
            bounce.game.cube.translateZ(-1);
            console.log('test 2');
        }
        if(bounce.game.moveLeft == true){
            bounce.game.cube.translateX(-1);
            console.log('test 2');
        }if(bounce.game.moveBackward == true){
            bounce.game.cube.translateZ(1);
            console.log('test 2');
        }if(bounce.game.moveRight == true){
            bounce.game.cube.translateX(1);
            console.log('test 2');
        }
        if(bounce.game.moveUp == true){
        bounce.game.cube.translateY(1);
        console.log('test 2');
    };

        this.player.translateZ(-this.speed/10);
        if(this.cube.position.y > 0){
        this.cube.translateY(-this.gravity/10);
        }

        if(this.obstacles.length > 0){
        
            for(let i = 0 ; i < this.nb_tree ; i++){
       
            if(this.obstacles[i].position.z > this.player.position.z){
            this.obstacles[i].translateZ(-this.field.width- 50);
            this.obstacles[i].position.x =
            Math.floor(Math.random()*this.field.width) -this.field.width * 0.5;
            
                };
            }
        };
        

        if(this.objectivs.length > 0){
        
            for(let i = 0 ; i < this.nb_tree ; i++){
       
            if(this.objectiv[i].position.z > this.player.position.z){
            this.objectiv[i].translateZ(-this.field.width- 50);
            this.objectiv[i].position.x =
            Math.floor(Math.random()*this.field.width) -this.field.width * 0.5;
            
                };
            }
        };
        
        
    
       
}
};