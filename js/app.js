//query for the number of sections on the page
const sections = document.querySelectorAll("section");

//query for the main nav menu
const mainNav = document.querySelector(".main__nav_list");

//convert the NodeList to an array
const sectionsArry = Array.from(sections);

//declration of the list item array
let listItems = [];

//iterate over the sections array to get add navigation items according to 
//the number of sections.
for(let i = 0; i< sectionsArry.length; i++){
    let Item = document.createElement("li");
    listItems.push(Item);
    listItems[i].classList.add("nav__item");
    listItems[i].innerHTML = `<a>Section ${i+1}</a>`
    mainNav.appendChild(listItems[i]);
}

//add an eventlistener for each navigation button and navigate to its section.
for(let i =0; i <listItems.length; i++){
    listItems[i].addEventListener("click", function(){
        location.href= `#section${i+1}`;
        
    });
}

//function to check if the section is in the view port and highlight it
function checkSelectedSection(){
    let bounding;
    document.addEventListener("scroll", function(){

        
        for(let i = 0; i<sectionsArry.length; i++){
            
            bounding = sectionsArry[i].getBoundingClientRect();
            
            if (checkSectionPositon(bounding)) {
                
                sectionsArry[i].style.background = "linear-gradient(0deg, rgba(51, 204, 51, 0.5) 0%, rgba(0, 0, 0, 0) 100%)";
            }
            else {
                sectionsArry[i].style.background = "none"
            }
        }
    });
}
// if statement conditon refactor to detect the section boundries.
function checkSectionPositon(boundries){
    return boundries.top >= 0 && boundries.left >=0 && boundries.right <= (window.innerWidth || document.documentElement.clientWidth) && boundries.bottom <= (window.innerHeight || document.documentElement.clientHeight);
}
checkSelectedSection();
