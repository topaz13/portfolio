window.onload = () => {
  console.log("works.js loaded");
  var contents = document.getElementsByClassName("work_content");
  for (let index = 0; index < contents.length; index++) {
    contents[index].addEventListener("click", () => {
    });
  }
};

var changeColor = (element) => {
  if (element.style.backgroundColor == "red") {
    element.style.backgroundColor = "yellow";
  } else {
    element.style.backgroundColor = "red";
  }
};

function popupImage() {
  var popup = document.getElementById("js-popup");
  if (!popup) return;

  var blackBg = document.getElementById("js-black-bg");
  var closeBtn = document.getElementById("js-close-btn");
  var showBtn = document.getElementById("js-show-popup");

  closePopUp(blackBg);
  closePopUp(closeBtn);
  closePopUp(showBtn);
  function closePopUp(elem) {
    if (!elem) return;
    elem.addEventListener("click", function () {
      popup.classList.toggle("is-show");
    });
  }

  var s = document.getElementsByClassName("work_content");

  for (let index = 0; index < s.length; index++) {
    var a = s[index];
    var b = a.getElementsByTagName("img");

    s[index].addEventListener("click", function () {
      popup.classList.toggle("is-show");

      ShowPopup(s[index]);
    });
  }

  function ShowPopup(elem) {
    if (!elem) return;
    // 画像の設定
    var img = elem.getElementsByTagName("img");
    var igm_frame = document.getElementById("popup_img");
    igm_frame.innerHTML = "";
    var clone = img[0].cloneNode(true);
    // タイトルの設定
    var title = elem.getElementsByClassName("game_titele")[0].innerHTML;
    var titleNode = document.getElementById("popup_works_title");
    titleNode.innerHTML = title;
    // 説明文の設定
    var des = GetDescription(title);
    var desNode = document.getElementById("popup_description");
    desNode.innerHTML = des;
    igm_frame.append(clone);
  }
}
popupImage();

var GetDescription = (title) => {
  switch (title) {
    case "ぱぱぷ":
      return "2018年から2020年までプログラミングサークル「traP」で作成したパズルアクションゲームです.Unity,UniRxを用いて作成しコミックマーケット等で頒布も行われました.";
    case "花粉バスター":
      return "2021年3月12日から14日にかけて行われたサイバーエージェントさん主催のゲーム開発インターンで作成したゲームです.Unityで開発し,クライアントサイドのサーバーとの接続部分を担当しました.";
    case "ジャパリパークオンライン":
      return "2020年にプログラミングサークル「traP」で作成したオンラインゲームになります.webpack,webソケット,pixi.jsを使用しました,";
    case "SwitchAndDash":
      return "NYUに通っていた友達と作ったアプリになります.Firebaseでオンラインランキング機能を実装しました.アメリカに住んでいたため全てオンラインで企画からリリースまで行いました.";
    case "StarCollection":
      return "サイバーエージェントさん主催の1Dayゲームハッカソンで作成したゲームです.3人チームでUnityを用いて作りました.主にインゲーム部分の実装を担当しました.";
    case "100以下の自然数":
      return "2021年3月にサークルで行われた15日間のハッカソンで1人で作成したゲーム.UnityのDoTweenを用いて開発しました.";
    case "中央値！":
      return "2021年9月のUnity1Weekで作成したゲーム.お題は「ちゅう」で，中央値を選ぶゲームにしました.";
    case "やじりんパーク":
      return "2022年にリリースした株式会社ニコリのオリジナルゲームを元に作成したアプリです.FirebaseのFireStoreを使用し,他のユーザーが作成した問題を解くことができるようにしました.";
    case "OneCommandOneAction":
      return "Trijam165に参加した作品で3時間で作成したゲームです.お題は「One Action at one time」でした.";
    case "DayNightSwitch":
      return "Trijam164に参加した時のゲームです.お題は「Day/Night cycle」でした.";
    case "BlockCount":
      return "サークル「traP」のゲームジャムで1人で作成したゲームです.\nお題は「超スピード」「勘」「trial」でした.";

    default:
      return "ぽぽぽ";
  }
};
