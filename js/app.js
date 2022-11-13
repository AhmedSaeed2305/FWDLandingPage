//query for the number of sections on the page
const sections = document.querySelectorAll("section");

//query for the main nav menu
const mainNav = document.querySelector(".main__nav_list");

//convert the NodeList to an array
const sectionsArry = Array.from(sections);

//declration of the list item array
let listItems = [];

//declare a tree fragment to avoid reflow and repaint.
let frag = document.createDocumentFragment();

//query the body element and the html element to use them to hide the scrollbar
const bodyEl = document.querySelector("body");
const htmlEl = document.querySelector("html");

//set a timer for 2 seconds before hiding the scrollbar
let timer;

//query all section titles to use them as buttons to collapse sections.
const sectionHeaders = document.querySelectorAll(".section__title");

//query the back to top button
let topBtn = document.getElementById("btn");

//iterate over the sections array to get add navigation items according to 
//the number of sections.
for(let i = 0; i< sectionsArry.length; i++){
    let Item = document.createElement("li");
    listItems.push(Item);
    listItems[i].classList.add("nav__item");
    listItems[i].innerHTML = `<a>Section ${i+1}</a>`
    frag.appendChild(listItems[i]);
    mainNav.appendChild(frag);
}
//add an eventlistener for each navigation button to navigate to its section.
for(let i =0; i <listItems.length; i++){
    listItems[i].addEventListener("click",() =>{
        sectionsArry[i].scrollIntoView({behavior: "smooth"});
    });
}

//function to check if the section is in the view port and highlight it
function highlight(){
    let bounding;
    let elementWidth;
    let elementHeight;
    let i;
    document.addEventListener("scroll", () =>{
        for(i = 0; i <sectionsArry.length; i++){
            bounding = sectionsArry[i].getBoundingClientRect();
            elementWidth = sectionsArry[i].offsetWidth;
            elementHeight = sectionsArry[i].offsetHeight;
            if (checkSectionPositon(bounding, elementHeight, elementWidth)) {
                sectionsArry[i].classList.add("active", "bubbles");
                listItems[i].classList.add("active")
            }
            else {
                sectionsArry[i].classList.remove("active", "bubbles");
                listItems[i].classList.remove("active")
            }
        }
    });
}
// if statement conditon refactor to detect the section boundries and compare it with the viewport.
function checkSectionPositon(boundries, elHeight, elWidth){
    return boundries.top >= -elHeight +500 && boundries.left >= -elWidth && boundries.right <= window.innerWidth + elWidth && boundries.bottom <= window.innerHeight + elHeight -500;
}
highlight();

//functions to hide the scrollbar after 2 seconds if not scrolling
function startTimer(){
    timer = window.setTimeout(function(){
        bodyEl.classList.add("scroll_bar");
        htmlEl.classList.add("scroll_bar");
    },2000);
}

document.addEventListener("scroll", ()=>{
    bodyEl.classList.remove("scroll_bar");
    htmlEl.classList.remove("scroll_bar");
    clearTimeout(timer);
    startTimer();
});
startTimer();

// collapsable sections code
for(let i =0; i< sectionHeaders.length; i++){
        let sectionContent = sectionHeaders[i].nextElementSibling;
        sectionHeaders[i].addEventListener("click", ()=>{
            sectionContent.classList.toggle("section__content-collapse");
        });
   
}

//back to top button function
window.onscroll = function(){scroll()};
function scroll(){
    if(document.body.scrollTop >= 300 || document.documentElement.scrollTop >=300){
        topBtn.style.display = "block";
    }
    else{
        topBtn.style.display = "none";
    }
}
function toTop(){
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    }); 
}