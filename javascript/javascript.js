var aboutLink = document.getElementById("about");
var navLinks = document.getElementsByClassName("navLinks");

function scrollToAbout() 
{
    aboutLink.scrollIntoView( { behavior: "smooth", block: "start"} );
}