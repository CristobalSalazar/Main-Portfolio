var aboutLink = document.getElementById("about");
var navLinks = document.getElementsByClassName("navLinks");
var introContainer = document.getElementById("intro");
var headshot = document.getElementById("headshot");

function scrollToAbout() 
{
    aboutLink.scrollIntoView( { behavior: "smooth", block: "start"} );
}

function resizeImg() {
    
    var img = new Image();
    img.src = headshot.src;

    console.log(img.width);
    console.log(img.height);

    if (window.innerWidth <= img.width/2)
    {
        console.log("overflow");
    }
}

window.onload = resizeImg;
window.onresize = resizeImg;