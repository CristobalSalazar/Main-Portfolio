var open = false;
var aboutLink = document.getElementById("about");

function scrollToAbout() 
{
    aboutLink.scrollIntoView( { behavior: "smooth", block: "start"} );
}

function resizePortfolioImages()
{
    let projects = document.getElementsByClassName("project");

    for (let i = 0; i < projects.length; i++) {
        const element = projects.item(i);
        element.style.height = element.clientWidth.toString(10) + "px";
    }
}

function dropdownToggle()
{
    let mobileNav = document.getElementById("mobileNav");    let navLayout = document.getElementsByClassName("navLayout").item(0);
    
    open = !open;
    
    if (open) {
        navLayout.style.display = "inline";        
    }
    else {
        navLayout.style.display = "none";
        mobileNav.style.opacity = "1";
    }
}

function inView(element) {

    var rect = element.getBoundingClientRect();

    if (rect.top < window.innerHeight/1.25)
    {
        return true;
    }
    return false;
}

function setCarouselHeight() {
    var carouselItems = document.getElementsByClassName("carousel-item");
    let maxHeight = 0;
    
    for (let item of carouselItems)
    {
        if (item.clientHeight > maxHeight)
        {
            maxHeight = item.clientHeight;
        }
    }
    for (let item of carouselItems) {
        item.style.height = maxHeight + "px";
        item.style.width = "100%";
    }
    console.log(maxHeight);
}

function onWindowScroll() {

    var headings = document.querySelectorAll("h1");
    var headings2 = document.querySelectorAll("h2");

    for (var heading of headings) {

        if (inView(heading))
        {
            heading.style.animationName = "swoop";
            heading.style.animationDuration = "1s";
        }
    }
    for (var heading of headings2) {

        if (inView(heading))
        {
            heading.style.animationName = "swoop";
            heading.style.animationDuration = "1s";
        }
    }
}

window.addEventListener("load", resizePortfolioImages);
window.addEventListener("load", setCarouselHeight);
window.onresize = resizePortfolioImages;