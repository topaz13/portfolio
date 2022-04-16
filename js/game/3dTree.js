// ページの読み込みを待つ
window.addEventListener('DOMContentLoaded', init);

// 初期化のために実行
onResize();
// リサイズイベント発生時に実行
window.addEventListener('resize', onResize);

// DEFINITIION-----
var renderer;
var camera;
var scene;
// -----------------

function onResize() {
    // サイズを取得
    // const width = window.innerWidth;
    // const width = document.body.clientWidth;
    // const width = screen.width;
    const width = document.documentElement.clientWidth;

    const height = window.innerHeight;

    // レンダラーのサイズを調整する

    console.log("resize")
    if (renderer == null)
        return

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    // カメラのアスペクト比を正す
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

}


var objlist = [];

var CreateObject = () => {
    const geometry2 = new THREE.BoxGeometry(220, 200, 200);
    const material2 = new THREE.MeshNormalMaterial();
    const box2 = new THREE.Mesh(geometry2, material2);
    // box2.position = new THREE.Vector3(0, 1000, 0);
    box2.position.x = -1000;
    objlist.push(box2);
    console.log("create object")
    scene.add(box2);
}

var mainLoop = () => {
    let removedIndexList = [];
    for (let i = 0; i < objlist.length; i++) {
        const element = objlist[i];
        element.position.x += 3;
        if (element.position.x > 1000) {
            removedIndexList.push(i);
        }
    }
    for (let i = 0; i < removedIndexList.length; i++) {
        const index = removedIndexList[i];
        scene.remove(objlist[index]);
        objlist[index].material.dispose();
        objlist[index].geometry.dispose();
    }
    for (let i = 0; i < removedIndexList.length; i++) {
        const index = removedIndexList[i];
        objlist.splice(index - i, 1);
        CreateObject();
    }

    // p.rotation.y += 0.01;
    if (p != null)
        p.rotation.x += 0.01
    // p.rotation.x += 0.01;
}





const drawLine = () => {
    console.log("draw line")
    const material = new THREE.LineBasicMaterial({ color: 0x0000ff });

    const points = [];
    points.push(new THREE.Vector3(-1000, -100, 0));
    points.push(new THREE.Vector3(0, 10, 0));
    points.push(new THREE.Vector3(1000, 100, 0));

    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const line = new THREE.Line(geometry, material);

    scene.add(line);
    renderer.render(scene, camera);
}

var p;

const createDodecahedronGeometry = () => {
    var ambientLight = new THREE.AmbientLight(0x888888);
    var pointLights = [];
    pointLights[0] = new THREE.PointLight(0xffffff, .8, 0);
    pointLights[1] = new THREE.PointLight(0xffffff, .8, 0);
    pointLights[2] = new THREE.PointLight(0xffffff, .8, 0);
    pointLights[0].position.set(0, 200, 0);
    pointLights[1].position.set(100, 200, 100);
    pointLights[2].position.set(-100, -200, -100);
    scene.add(ambientLight, pointLights[0], pointLights[1], pointLights[2]);
    // const geometry = new THREE.DodecahedronGeometry(10, 2);
    // const geometry = new THREE.CylinderGeometry(20, 50, 100, 30);
    const geometry = new THREE.TorusGeometry(50, 20, 40, 40);
    // const geometry = new THREE.CircleGeometry(50, 40);
    // ジオメトリー
    // var geometry = new THREE.BoxGeometry(100, 100, 100);
    var material = new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    p = new THREE.Mesh(geometry, material);
    p.position.set(0, 0, 0)
    scene.add(p);
}





function init() {

    // サイズを指定
    const width = 960;
    const height = 540;
    // const width = document.body.clientWidth;
    // console.log(width)
    // const height = 540 / 960 * width;
    console.log("create renderer")
    // レンダラーを作成
    renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#myCanvas')
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    // シーンを作成
    scene = new THREE.Scene();

    // カメラを作成
    camera = new THREE.PerspectiveCamera(45, width / height);
    camera.position.set(0, 0, +1000);

    // 箱を作成
    // const geometry = new THREE.BoxGeometry(400, 400, 400);
    // const material = new THREE.MeshNormalMaterial();
    // const box = new THREE.Mesh(geometry, material);
    // scene.add(box);

    const geometry2 = new THREE.BoxGeometry(220, 100, 400);
    const material2 = new THREE.MeshNormalMaterial();
    const box2 = new THREE.Mesh(geometry2, material2);
    box2.position = new THREE.Vector3(1000, 1000, 0);
    objlist.push(box2);
    console.log("hoge")
    scene.add(box2);

    tick();
    onResize();

    // 追加
    drawLine();
    createDodecahedronGeometry();
    //

    // 毎フレーム時に実行されるループイベントです
    function tick() {
        renderer.render(scene, camera); // レンダリング
        mainLoop();
        // p.position.x += 3;
        requestAnimationFrame(tick);
        // p.rotation.x += 0.1;
    }
}
