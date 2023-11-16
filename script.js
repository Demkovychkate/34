const block = document.createElement('div');
block.className = 'block';
document.body.appendChild(block);

const input = document.createElement('input');
input.className = 'input';
document.body.appendChild(input);

const maxX = window.innerWidth - block.offsetWidth;
const maxY = window.innerHeight - block.offsetHeight;
const STEP = 50;

let score = 0; 

const operations = {
    37: () => {
        const leftPosition = parseInt(block.style.left || 0);
        if (leftPosition - STEP >= 0 && isAboveBottomEdge()) {
            block.style.left = `${leftPosition - STEP}px`;
        } showScore();
    },
    39: () => {
        const leftPosition = parseInt(block.style.left || 0);
        if (leftPosition + STEP <= maxX && isAboveBottomEdge()) {
            block.style.left = `${leftPosition + STEP}px`;
        } showScore();
    },
    40: () => {
         topPosition = parseInt(block.style.top || 0);
        if (topPosition + STEP <= maxY) {
            block.style.top = `${topPosition + STEP}px`;
        } 
    }
};

function isAboveBottomEdge() {
    const topPosition = parseInt(block.style.top || 0);
    return topPosition + block.offsetHeight < maxY;
}

function showScore() {
    if (isAboveBottomEdge()) {
        score += 1;
        input.value = `Бали: ${score}`;
    }
}

function handleKeyPress(e) {
    if (operations[e.keyCode]) {
        operations[e.keyCode]();
    }
}

document.addEventListener('keydown', handleKeyPress);

setInterval(() => {
    operations[40]();
}, 1000);

