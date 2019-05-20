var aboutLink = document.getElementById("about");
var open = false;

function scrollToAbout() 
{
    aboutLink.scrollIntoView( { behavior: "smooth", block: "start"} );
}
function dropdownToggle()
{
    let mobileNav = document.getElementById("mobileNav");
    let navLayout = document.getElementsByClassName("navLayout").item(0);
    
    open = !open;
    
    if (open) {
        navLayout.style.display = "inline";        
    }
    else {
        navLayout.style.display = "none";
        mobileNav.style.opacity = "1";
    }
}