var aboutLink = document.getElementById("about");
var introContainer = document.getElementById("intro");
var headshot = document.getElementById("headshot");

function scrollToAbout() 
{
    aboutLink.scrollIntoView( { behavior: "smooth", block: "start"} );
}

function getRelativeWidth(height, img) {
    const aspectRatio = img.width / img.height;
    return height * aspectRatio;
}

function getRelativeHeight(width, img) {
    const aspectRatio = img.height / img.width;
    return width * aspectRatio;
}

function resizeImg() {


}

window.onload = resizeImg;
window.onresize = resizeImg;