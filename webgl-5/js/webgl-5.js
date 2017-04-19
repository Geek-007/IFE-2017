window.onload = function() {
    var car = [];
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
    car.push(cube);
    var torus = createTorus(-1, -0.75, 0.75);
    scene.add(torus);
    car.push(torus);
    torus = createTorus(1, -0.75, 0.75);
    scene.add(torus);
    car.push(torus);
    torus = createTorus(1, -0.75, -0.75);
    scene.add(torus);
    car.push(torus);
    torus = createTorus(-1, -0.75, -0.75);
    scene.add(torus);
    car.push(torus);
    var plane = new THREE.Mesh(new THREE.PlaneGeometry(6, 8),
        new THREE.MeshLambertMaterial({
            map: textureFloor
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
    // stats
    var stats = new Stats();
    document.body.appendChild(stats.dom);
    // animate
    animate();
    function animate() {
        requestAnimationFrame(animate);
    }

    /* events & functions */

    // create torus
    function createTorus(x, y, z) {
        var torus = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.1, 16, 100),
            new THREE.MeshLambertMaterial({
                map: textureTire
            })
        );
        torus.position.x = x;
        torus.position.y = y;
        torus.position.z = z;
        torus.castShadow = true;
        return torus;
    }

    // resize
    window.addEventListener('resize', function() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.render(scene, camera);
    });

    // drive
    var disUnit = 0.01;
    var radUnit = Math.PI / 36;
    document.addEventListener('keydown', function(event) {
        switch (event.keyCode) {
            case 87:    // 'W'
                drive(car, disUnit, 0);
                break;
            case 83:    // 'S'
                drive(car, -disUnit, 0);
                break;
            case 65:    // 'A'
                drive(car, 0, radUnit);
                break;
            case 68:    // 'D'
                drive(car, 0, -radUnit);
                break;
            default:
                // nothing
        }
    });
    function drive(car, dis, rad) {
        car[0].rotation.y += rad;
        var direction = car[0].rotation.y;
        var cubeX = car[0].position.x;
        var cubeZ = car[0].position.z;
        car[0].position.x += -dis * Math.cos(direction);
        car[0].position.z += dis * Math.sin(direction);
        for (var i=1; i<car.length; i++) {
            car[i].rotation.y += rad;
            var torusX = car[i].position.x;
            var torusZ = car[i].position.z;
            car[i].position.x = cubeX + (torusX - cubeX) * Math.cos(rad) + (torusZ - cubeZ) * Math.sin(rad);
            car[i].position.z = cubeZ + (torusZ - cubeZ) * Math.cos(rad) - (torusX - cubeX) * Math.sin(rad);
            car[i].position.x += -dis * Math.cos(direction);
            car[i].position.z += dis * Math.sin(direction);
            var radius = +car[i].geometry.boundingSphere.radius.toFixed(1);
            car[i].rotation.z += 2 * Math.PI * dis / radius;
        }
        stats.update();
        renderer.render(scene, camera);
    }
};