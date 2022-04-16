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
    // objlist.forEach(element => {
    //     element.position.x += 1;
    //     if (element.position.x > 100) {
    //         CreateObject();
    //         scene.remove(element);
    //     }
    // });
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

    // 毎フレーム時に実行されるループイベントです
    function tick() {
        renderer.render(scene, camera); // レンダリング
        mainLoop();
        requestAnimationFrame(tick);
    }
}
