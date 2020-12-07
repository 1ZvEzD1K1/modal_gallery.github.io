window.addEventListener("load", () => {
    var res = document.getElementById('res');
    window.onclick = (e) => {
        if (e.target == res) {
            res.style.display = "none";
        }
    }
    var carousels = document.querySelectorAll(".carousel");
    for (var i = 0; i < carousels.length; i++) {
        carousel(carousels[i]);
        var el = Array.from(carousels[i].children);
        var divs = Array.from(el[0].children);
        divs.forEach((div) => {
            div.onclick = () => {
                res.style.display = "block";
                var img = Array.from(div.children)[0].innerHTML;
                console.log(img)
                res.innerHTML = img;
            }
        })
    }
});

function carousel(root) {
    var figure = root.querySelector("figure");
    nav = root.querySelector("nav");
    images = figure.children;
    n = images.length;
    gap = 0;
    theta = 2 * Math.PI / n;
    currImage = 0;
    setupCarousel(n, parseFloat(getComputedStyle(images[0]).width));
    window.addEventListener("resize", () => {
        setupCarousel(n, parseFloat(getComputedStyle(images[0]).width));
    });
    setupNavigation();
    function setupCarousel(n, s) {
        var apothem = s / (2 * Math.tan(Math.PI / n));
        figure.style.transformOrigin = `50% 50% ${-apothem}px`;
        for (var i = 0; i < n; i++) images[i].style.padding = `0 ${gap}px`;
        for (i = 0; i < n; i++) {
            images[i].style.transformOrigin = `50% 50% ${-apothem}px`;
            images[i].style.transform = `rotateY(${i * theta}rad)`;
        }
        for (i = 0; i < n; i++) images[i].style.backfaceVisibility = "hidden";
        rotateCarousel(currImage);
    }
    function setupNavigation() {
        nav.addEventListener("click", onClick, true);
        function onClick(e) {
            e.stopPropagation();
            var t = e.target;
            if (t.tagName.toUpperCase() != "BUTTON") return;
            if (t.classList.contains("next")) {
                currImage++;
                } else {
                currImage--;
            }
            rotateCarousel(currImage);
        }
    }
    function rotateCarousel(imageIndex) {
        figure.style.transform = `rotateY(${imageIndex * -theta}rad)`;
    }
}

var show = document.getElementById("myBtn");
var myGal = document.getElementsByClassName('myGal')[0];
show.onclick = () => {
    myGal.style.visibility = "visible";
};

window.onclick = (e) => {
    if (e.target == myGal) {
        myGal.style.visibility = "hidden";
    }
}
