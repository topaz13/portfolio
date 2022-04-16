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
        })
    };
}

var changeColor = (element) => {
    console.log(element.style.backgroundColor)
    if (element.style.backgroundColor == "red") {
        element.style.backgroundColor = "yellow"
    } else {
        element.style.backgroundColor = "red"
    }
}