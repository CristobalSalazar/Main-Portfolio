var aboutLink = document.getElementById("about");
var open = false;

function scrollToAbout() 
{
    aboutLink.scrollIntoView( { behavior: "smooth", block: "start"} );
}

function closeDropdown() {

    let navLayout = document.getElementById("navLayout");
    console.log(navLayout.parentElement);  
    open = false;
    
}

function dropdownToggle() {
    let mobileNav = document.getElementById("mobileNav");
    let navLayout = document.getElementById("navLayout");
    let navLinks = document.getElementsByClassName("navLink");
    let navbarElements = document.getElementsByClassName("navbarElement");
    let activePage = document.getElementsByClassName("activePage").item(0);
    

    open = !open;
    console.log("open " + open);
    
    if (open)
    {
        mobileNav.style.opacity = "0.5";
        if (activePage != null)
        {   
            activePage.className = "navLink";
        }
        navLayout.style.display = "block";
        for (let i = 0; i < navLinks.length; i++) {
            let navLink = navLinks.item(i);
            navLink.style.display = "block";
            navLink.style.margin = "36px 0 0 0";
        }
        for (let i = 0; i < navbarElements.length; i++) {
            let navElement = navbarElements.item(i);
            navElement.style.display = "block";
        }
    }
    
    else {
        mobileNav.style.opacity = "1";
        navLayout.style.display = "none";
    }
}