window.onload = function () {
    var fullName = "Ido Dor";
    var lastName = fullName.split(' ')[1];
    var squaresCount = lastName.length * 2;
    var contentArea = document.getElementsByClassName("wrapper layout-three")[0];
    var counter = 0;
    //
    var plusHor = document.createElement('a');
    plusHor.id = 'plus-hor';
    var plusVer = document.createElement('a');
    plusVer.id = 'plus-ver';
    plusVer.onclick = plusHor.onclick = function (e) {
        addSquare();
        e.stopPropagation()
    }

    var colorset = ["rgb(149, 198, 212)",
        "rgb(125, 163, 173)",
        "rgb(125, 170, 180)",
        "rgb(125, 180, 190)",
        "rgb(125, 190, 200)",
        "rgb(135, 210, 220)",
        "rgb(145, 230, 240)",
        "rgb(180, 245, 255)",
        "rgb(180, 245, 200)",
        "rgb(110, 200, 175)",
        "rgb(180, 220, 185)",
        "rgb(190, 220, 115)"];

    function addSquare() {
        var square = document.createElement('div');
        var color = colorset[Math.floor(Math.random() * colorset.length)];
        square.style.backgroundColor = color;
        if (counter % 3 === 2) {
            square.className = 'square starred';
        } else {
            square.className = 'square';
        }
        if (counter === 0) {
            contentArea.insertBefore(square, contentArea.firstChild);
            square.appendChild(plusHor);
            square.appendChild(plusVer);
        }
        else {
            square.onclick = function () {
                if (square.style.backgroundImage) {
                    square.style.backgroundImage = "";
                    square.style.backgroundColor = color;
                    square.style.backgroundPosition = 'top right';
                } else {
                    square.style.backgroundColor = 'white';
                    square.style.backgroundImage = 'url(./images/panda.png)';
                    square.style.backgroundPosition = 'center';
                }
            }
            contentArea.appendChild(square, contentArea.lastChild)
        }
        counter++;
    }
    for (var i = 0; i < squaresCount; i++) {
        addSquare();
    }


}
