window.onload = function() {
    // renderer
    var renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('main')
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xcccccc);
    // scene
    var scene = new THREE.Scene();
    // camera
    var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 100);
    camera.position.set(3, 2, 3);
    camera.lookAt(new THREE.Vector3(0, -0.5, 0));
    scene.add(camera);
    // progress bar
    var progress = document.getElementById('progress');
    var proInfo = document.getElementById('progress-info').getElementsByTagName('span')[0];
    // texture loader
    var tLoader = new THREE.TextureLoader();
    var textureFloor = tLoader.load('img/floor.png', function() {
        renderer.render(scene, camera);
    });
    textureFloor.wrapS = THREE.RepeatWrapping;
    textureFloor.wrapT = THREE.RepeatWrapping;
    textureFloor.repeat.set(6, 8);
    // geometry
    var plane = new THREE.Mesh(new THREE.PlaneGeometry(6, 8),
        new THREE.MeshLambertMaterial({
            map: textureFloor
        })
    );
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -1.15;
    scene.add(plane);
    // model
    var car;
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.load('model/MiniCooperCountryman.mtl', function(materials) {
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.load('model/MiniCooperCountryman.obj', function(obj) {
            obj.traverse(function(child) {
                if (child instanceof THREE.Mesh) {
                    child.material.side = THREE.DoubleSide;
                }
            });
            obj.position.y = -1.15;
            obj.rotation.set(-Math.PI / 2, 0, Math.PI / 2);
            car = obj;
            scene.add(obj);
            renderer.render(scene, camera);
        }, function(xhr) {
            if (xhr.lengthComputable) {
                var percent = +(xhr.loaded / xhr.total * 100).toFixed(2);
                progress.style.marginLeft = '-' + (100 - percent) + '%';
                proInfo.innerText = percent;
            }
        }, function(err) {
            console.error(err);
        });
    });
    // light
    var aLight = new THREE.AmbientLight(0x333333);
    scene.add(aLight);
    var dLight = new THREE.DirectionalLight(0xffffff);
    dLight.position.set(-1, 1.5, 2);
    scene.add(dLight);
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
        car.rotation.z += rad;
        var direction = car.rotation.z - Math.PI / 2;
        car.position.x += -dis * Math.cos(direction);
        car.position.z += dis * Math.sin(direction);
        stats.update();
        renderer.render(scene, camera);
    }
};