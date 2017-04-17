window.onload = function() {
    // renderer
    var renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('main')
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xcccccc);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    // scene
    var scene = new THREE.Scene();
    // camera
    var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 100);
    camera.position.set(3, 2, 3);
    camera.lookAt(new THREE.Vector3(0, -0.5, 0));
    scene.add(camera);
    // controls: rotate zoom pan
    var controls = new THREE.TrackballControls(camera);
    controls.minDistance = 3;
	controls.addEventListener('change', function() {
        renderer.render(scene, camera);
    });
    // texture loader
    var loader = new THREE.TextureLoader();
    var picName = ['right', 'left', 'top', 'bottom', 'near', 'far'];
    var materials = [];
    for (var i=0; i<picName.length; i++) {
        materials.push(new THREE.MeshLambertMaterial({
            map: loader.load('img/' + picName[i] + '.jpg', function() {
                renderer.render(scene, camera);
            })
        }));
    }
    var textureTire = loader.load('img/tire.png', function() {
        renderer.render(scene, camera);
    });
    textureTire.wrapS = THREE.RepeatWrapping;
    textureTire.repeat.x = 6;
    var textureFloor = loader.load('img/floor.png', function() {
        renderer.render(scene, camera);
    });
    textureFloor.wrapS = THREE.RepeatWrapping;
    textureFloor.wrapT = THREE.RepeatWrapping;
    textureFloor.repeat.set(6, 8);
    // geometry
    var cube = new THREE.Mesh(new THREE.CubeGeometry(3, 1.5, 1.5), materials);
    cube.castShadow = true;
    scene.add(cube);
    var torus = createTorus(-1, -0.75, 0.75, textureTire);
    scene.add(torus);
    torus = createTorus(1, -0.75, 0.75, textureTire);
    scene.add(torus);
    torus = createTorus(1, -0.75, -0.75, textureTire);
    scene.add(torus);
    torus = createTorus(-1, -0.75, -0.75, textureTire);
    scene.add(torus);
    var plane = new THREE.Mesh(new THREE.PlaneGeometry(6, 8),
        new THREE.MeshLambertMaterial({
            map: textureFloor,
            side: THREE.DoubleSide
        })
    );
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -1.15;
    plane.receiveShadow = true;
    scene.add(plane);
    // light
    var aLight = new THREE.AmbientLight(0x333333);
    scene.add(aLight);
    var dLight = new THREE.DirectionalLight(0xffffff);
    dLight.position.set(-1, 1.5, 2);
    dLight.castShadow = true;
    scene.add(dLight);
    dLight.shadow.mapSize.width = 2048;
    dLight.shadow.mapSize.height = 2048;
    // render
    renderer.render(scene, camera);
    // animate
    animate();
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
    }
    // resize
    window.addEventListener('resize', function() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        controls.handleResize();
        renderer.render(scene, camera);
    });
};

function createTorus(x, y, z, texture) {
    var torus = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.1, 16, 100),
        new THREE.MeshLambertMaterial({
            map: texture
        })
    );
    torus.position.x = x;
    torus.position.y = y;
    torus.position.z = z;
    torus.castShadow = true;
    return torus;
}