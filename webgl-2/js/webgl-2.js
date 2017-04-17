window.onload = function() {
    // renderer
    var renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('main')
    });
    renderer.setClearColor(0x666666);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    // scene
    var scene = new THREE.Scene();
    // camera
    var camera = new THREE.PerspectiveCamera(60, 900 / 600, 1, 10);
    camera.position.set(3, 2, 3);
    camera.lookAt(new THREE.Vector3(0, -0.5, 0));
    scene.add(camera);
    // geometry
    var cube = new THREE.Mesh(new THREE.CubeGeometry(3, 1.5, 1.5),
        new THREE.MeshLambertMaterial({
            color: 0xcccccc
        })
    );
    cube.castShadow = true;
    scene.add(cube);
    var torus = createTorus(-1, -0.75, 0.75);
    scene.add(torus);
    torus = createTorus(1, -0.75, 0.75);
    scene.add(torus);
    torus = createTorus(1, -0.75, -0.75);
    scene.add(torus);
    torus = createTorus(-1, -0.75, -0.75);
    scene.add(torus);
    cube = createCube(1.75, -0.5, 0);
    scene.add(cube);
    cube = createCube(-1.75, -0.5, 0);
    scene.add(cube);
    var plane = new THREE.Mesh(new THREE.PlaneGeometry(6, 8),
        new THREE.MeshLambertMaterial({
            color: 0xccff99
        })
    );
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -1.15;
    plane.receiveShadow = true;
    scene.add(plane);
    // light
    var light = new THREE.DirectionalLight(0xffffff);
    light.position.set(-1, 1.5, 2);
    light.castShadow = true;
    scene.add(light);
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
    // render
    renderer.render(scene, camera);
};

function createCube(x, y, z) {
    var cube = new THREE.Mesh(new THREE.CubeGeometry(0.5, 0.5, 1.5),
        new THREE.MeshLambertMaterial({
            color: 0xcccccc
        })
    );
    cube.position.x = x;
    cube.position.y = y;
    cube.position.z = z;
    cube.castShadow = true;
    return cube;
}

function createTorus(x, y, z) {
    var torus = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.1, 16, 100),
        new THREE.MeshLambertMaterial({
            color: 0x999999
        })
    );
    torus.position.x = x;
    torus.position.y = y;
    torus.position.z = z;
    torus.castShadow = true;
    return torus;
}