bounce.game = {
    
    trees : [],
    nb_tree : 50,
    field:{
        width : 500,
        height : 2500
    },
    speed: null,
    player : null,
    
    
  
    
    built_obstacle : function(obstacle_mesh){

        
        const scene = bounce.gfx_engine.scene;

        

        

    },
    init: function(config){
       
        const scene = bounce.gfx_engine.scene;
    
        config = config || {};

        this.player = bounce.gfx_engine.camera;
        this.speed = config.speed || 10;
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
        
        
        var onKeyDown = function ( event ) {
            switch ( event.keyCode ) {
                case 38: // up
                case 87: // w
                    moveForward = true;
                    break;
                case 37: // left
                case 65: // a
                    moveLeft = true;
                    break;
                case 40: // down
                case 83: // s
                    moveBackward = true;
                    break;
                case 39: // right
                case 68: // d
                    moveRight = true;
                    break;
                case 32: // space
                    if ( canJump === true ) velocity.y += 350;
                    canJump = false;
                    break;
            }
        };
        var onKeyUp = function ( event ) {
            switch ( event.keyCode ) {
                case 38: // up
                case 90: // w
                    moveForward = false;
                    break;
                case 37: // left
                case 65: // a
                    moveLeft = false;
                    break;
                case 40: // down
                case 83: // s
                    moveBackward = false;
                    break;
                case 39: // right
                case 68: // d
                    moveRight = false;
                    break;
            }
        };
        document.addEventListener( 'keydown', onKeyDown, false );
        document.addEventListener( 'keyup', onKeyUp, false );

        raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );
            
    
       // return obstacle_mesh ; 
        

        
       
        
    console.log('Game is ready')

    },
     
    update : function(){
        
        
        const gfx = bounce.gfx_engine;
        
       // this.player.translateZ(-this.speed/10);
        
    
       
}
};