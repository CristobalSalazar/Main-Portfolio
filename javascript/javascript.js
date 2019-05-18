var aboutLink = document.getElementById("about");
var open = false;

function scrollToAbout() 
{
    aboutLink.scrollIntoView( { behavior: "smooth", block: "start"} );
}

function closeDropdown() {

    let navbarElements = document.getElementsByClassName("navbarElement");
    let navLinks = document.getElementsByClassName("navLink");

    for (let i = 0; i < navbarElements.length; i++)
    {
        let navbarElement = navbarElements.item(i);
        navbarElement.style.display = ("none");
    }
    
    for (let i = 0; i < navLinks.length; i++)
    {
        let navLink = navLinks.item(i);
        navLink.style.display = ("none");
    }

    open = false;
}

function dropdownToggle() {

    open = !open;
    let navbarElements = document.getElementsByClassName("navbarElement");
    let navLinks = document.getElementsByClassName("navLink");
    let activePages = document.getElementsByClassName("activePage");

    if (open)
    {
        for (let i = 0; i < activePages.length; i++)
        {
            activePages.item(i).className = "navLink";
        }
        
        for (let i = 0; i < navbarElements.length; i++) {

            let navbarElement = navbarElements.item(i);
            navbarElement.style.display = ("block");
            
            if (i == 0) {
                navbarElement.style.margin = "48px 0px 0px 0px";
            }
            else {
                navbarElement.style.margin = "12px 0px 0px 0px";
            }
        }
        
        for (let i = 0; i < navLinks.length; i++)
        {
            let navLink = navLinks.item(i);
            navLink.style.display = ("block");
            navLink.style.padding = ("12px");
        }
    }

    else {
        
        for (let i = 0; i < navbarElements.length; i++)
        {
            let navbarElement = navbarElements.item(i);
            navbarElement.style.display = ("none");
        }
        
        for (let i = 0; i < navLinks.length; i++)
        {
            let navLink = navLinks.item(i);
            navLink.style.display = ("none");
        }
    }

    window.onresize = closeDropdown;
}