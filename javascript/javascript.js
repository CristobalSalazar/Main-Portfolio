var aboutLink = document.getElementsByClassName("aboutContainer").item(0);
var navLinks = document.getElementsByClassName("navLinks");

function scrollToAbout() 
{
    aboutLink.scrollIntoView( { behavior: "smooth", block: "start", inline: "start"} );
}