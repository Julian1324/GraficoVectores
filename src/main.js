var scene=null; var camera=null; var renderer= null; var controls= null;
var vectorU= {x: null, y: null, z: null};
var vectorV= {x: null, y: null, z: null};
var vectors= [];
var origen={x: 0, y: 0, z:0};
var direction=null;

function init(){
    window.onresize= onWindowResize;
    initScene();
    animate();
}

function graficar(){
    let inputs= document.querySelectorAll('input');
    
    vectors= vectors.splice(0, vectors.length);

    for (const input of inputs) {
        this[`vector${input.dataset.julian}`][input.name]= input.value;
    }

    for (const input of inputs) {
        input.value="";
    }
    
    vectors.push(vectorU);
    vectors.push(vectorV);
    
    for (const vector of vectors) {
        graficarVector(vector);
    }
    
}

function graficarVector(vector){
    var dir = new THREE.Vector3( vector.x, vector.y, vector.z );

    //normalize the direction vector (convert to vector of length 1)
    dir.normalize();

    var origin = new THREE.Vector3( 0, 0, 0 );
    var length = Math.sqrt( Math.pow( vector.x,2 ) + Math.pow(vector.y, 2) + Math.pow(vector.z,2));
    console.log();
    
    var hex = +('0x'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6));

    var arrowHelper = new THREE.ArrowHelper( dir, origin, length, hex );
    scene.add( arrowHelper );
}

function initScene(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    renderer = new THREE.WebGLRenderer({ canvas: document.querySelector("canvas") });
    renderer.setSize( window.innerWidth, window.innerHeight );

    controls = new THREE.OrbitControls( camera, renderer.domElement );

    var size = 10;
    var divisions = 10;
    var gridHelper = new THREE.GridHelper( size, divisions );

    var axesHelper= new THREE.AxesHelper(5);

    scene.add( gridHelper );
    scene.add( axesHelper );

    camera.position.z = 14;
    camera.position.y = 4;
}

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}

function onWindowResize(){
    camera.aspect= window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}