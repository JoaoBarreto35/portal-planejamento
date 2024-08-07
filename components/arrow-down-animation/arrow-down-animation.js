
function loadAnimationDownArrow(){
    console.log("animação arrow carrregada");

const linkArrowAnimation = document.createElement('link');
linkArrowAnimation.rel = 'stylesheet';
linkArrowAnimation.href = './components/arrow-down-animation/arrow-down-animation.css';
document.head.appendChild(linkArrowAnimation);


const elementsArrowAnimation = document.getElementsByClassName('animation-down-container');
for (let i = 0; i < elementsArrowAnimation.length; i++) {
    elementsArrowAnimation[i].innerHTML = `
        <div class="animation-down-back">
            <div class="animation-down-arrow">
                V
            </div>
            <div class="animation-down-arrow">
                V
            </div>
            <div class="animation-down-arrow">
                V
            </div>
        </div>
    `;
}

}

loadAnimationDownArrow();