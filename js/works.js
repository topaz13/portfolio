window.onload = () => {
  console.log("works.js loaded");
  var contents = document.getElementsByClassName("work_content");
  console.log(contents.length);
  for (let index = 0; index < contents.length; index++) {
    // var a = contents[index];
    // a.innerHTML = "po"
    contents[index].addEventListener("click", () => {
      console.log("clicked");
      changeColor(contents[index]);
    });
  }
};

var changeColor = (element) => {
  console.log(element.style.backgroundColor);
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
      console.log("clicked");
    });
  }

  var s = document.getElementsByClassName("work_content");

  for (let index = 0; index < s.length; index++) {
    var a = s[index];
    var b = a.getElementsByTagName("img");
    // console.log(b.length);
    s[index].addEventListener("click", function () {
      popup.classList.toggle("is-show");
      console.log("clicked");
      ShowPopup(s[index]);
    });
  }

  function ShowPopup(elem) {
    if (!elem) return;
    // closePopUp(elem);
    var img = elem.getElementsByTagName("img");
    var igm_frame = document.getElementById("popup_img");
    igm_frame.innerHTML = "";
    var clone = img[0].cloneNode(true);
    igm_frame.append(clone);
  }
}
popupImage();
