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
var loader;
var rotateList = [];
// -----------------
var tex;

function onResize() {
    // サイズを取得
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
    const geometry2 = new THREE.BoxGeometry(400, 100, 200);
    // const material2 = new THREE.MeshNormalMaterial();
    const material2 = new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.DoubleSide });

    // material2.map = tex;
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

    if (p != null)
        p.rotation.x += 0.01

    rotateList.forEach(element => {
        element.rotation.x += 0.01;
        element.rotation.y += 0.01;
    });
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


var CreateEarth = () => {
    // 球体を作成
    const geometry = new THREE.SphereGeometry(300, 30, 30);
    // 画像を読み込む
    const loader = new THREE.TextureLoader();
    const texture = loader.load("../../images/game/earthmap1k.jpg")
    // マテリアルにテクスチャーを設定
    const material = new THREE.MeshStandardMaterial({
        map: texture
    });
    // メッシュを作成
    const mesh = new THREE.Mesh(geometry, material);
    // 3D空間にメッシュを追加
    scene.add(mesh);
    // 平行光源
    const directionalLight = new THREE.DirectionalLight(0xFFFFFF);
    directionalLight.position.set(1, 1, 1);
    // シーンに追加
    scene.add(directionalLight);
    rotateList.push(mesh)
}

var mm;

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
        canvas: document.querySelector('#myCanvas'),
        alpha: true, //追加 背景を透明にする
        antialias: true, //追加 アンチエイリアス
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    // シーンを作成
    scene = new THREE.Scene();

    // カメラを作成
    camera = new THREE.PerspectiveCamera(45, width / height);
    camera.position.set(0, 0, +1000);

    const geometry2 = new THREE.BoxGeometry(220, 100, 400);
    const material2 = new THREE.MeshNormalMaterial();
    const box2 = new THREE.Mesh(geometry2, material2);
    box2.position = new THREE.Vector3(1000, 10, 0);
    objlist.push(box2);
    console.log("hoge")
    scene.add(box2);

    // 3Dオブジェクトを作る
    loader = new THREE.TextureLoader();
    const texture01 = loader.load("../../test/img/img_01.jpg");
    const textures = [
        texture01,
    ]
    const geometry = new THREE.DodecahedronGeometry(300, 0); // DodecahedronGeometry 正十二面体（半径、詳細）
    const material = new THREE.MeshPhongMaterial();
    if (textures != null)
        material.map = textures[0];
    mm = new THREE.Mesh(geometry, material);
    // scene.add(mm);

    // tex = loader.load("../../images/logo.png");
    tex = loader.load("../../test/img/saikoro_image.png");



    const geome = new THREE.TorusKnotGeometry(10, 3, 100, 16);
    const mate = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const torusKnot = new THREE.Mesh(geome, mate);
    torusKnot.scale.x = 10;
    torusKnot.scale.y = 10;
    torusKnot.scale.z = 10;
    scene.add(torusKnot);
    rotateList.push(torusKnot);
    // 
    tick();
    onResize();

    // 追加
    // drawLine();
    // createDodecahedronGeometry();
    CreateEarth();
    //

    // 毎フレーム時に実行されるループイベントです
    function tick() {
        renderer.render(scene, camera); // レンダリング
        mainLoop();
        requestAnimationFrame(tick);
    }
}
