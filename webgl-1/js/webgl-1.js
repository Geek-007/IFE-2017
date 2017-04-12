window.onload = function() {
    // renderer
    var renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('main')
    });
    renderer.setClearColor(0x666666);
    // scene
    var scene = new THREE.Scene();
    // camera
    var camera = new THREE.PerspectiveCamera(45, 900 / 600, 1, 10);
    camera.position.set(3, 2, 3);
    camera.lookAt(new THREE.Vector3(0, -0.5, 0));
    scene.add(camera);
    // geometry
    var cube = new THREE.Mesh(new THREE.CubeGeometry(3, 1.5, 1.5),
        new THREE.MeshBasicMaterial({
            color: 0xcccccc
        })
    );
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

    renderer.render(scene, camera);
};

function createCube(x, y, z) {
    var cube = new THREE.Mesh(new THREE.CubeGeometry(0.5, 0.5, 1.5),
        new THREE.MeshBasicMaterial({
            color: 0xcccccc
        })
    );
    cube.position.x = x;
    cube.position.y = y;
    cube.position.z = z;
    return cube;
}

function createTorus(x, y, z) {
    var torus = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.1, 16, 100),
        new THREE.MeshBasicMaterial({
            color: 0x999999
        })
    );
    torus.position.x = x;
    torus.position.y = y;
    torus.position.z = z;
    return torus;
}