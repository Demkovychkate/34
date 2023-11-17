const blockWrapper = document.querySelector('.blockWrapper');
const blockList = [];

 const block = document.createElement('div');
block.className = 'block';
blockList.push(block);
blockWrapper.appendChild(block);

const inputContainer = document.createElement('div');
inputContainer.className = 'inputContainer';
document.body.appendChild(inputContainer);

const newYeartree = document.createElement('p');
newYeartree.className = 'newYeartree';
newYeartree.textContent = `Make your own New Year Tree`;
inputContainer.appendChild(newYeartree);

const scoreNumber = document.createElement('p');
scoreNumber.className = 'scoreNumber';
scoreNumber.textContent = `Your Score`;
inputContainer.appendChild(scoreNumber);

const input = document.createElement('input');
input.className = 'input';
inputContainer.appendChild(input);

const maxX = window.innerWidth - blockList[0].offsetWidth;
const maxY = window.innerHeight - blockList[0].offsetHeight;

const STEP = 50;

let score = 0;

const operations = {
    37: () => moveLeft(),
    39: () => moveRight(),
    40: () => moveDown(),
};

function moveLeft() {
    blockList.forEach((block) => {
        const leftPosition = parseInt(block.style.left || 0);
        if (leftPosition - STEP >= 0 && bottomEdge(block)) {
            block.style.left = `${leftPosition - STEP}px`;
            showScore();
        }
    });
}

function moveRight() {
    blockList.forEach((block) => {
        const leftPosition = parseInt(block.style.left || 0);
        if (leftPosition + STEP <= maxX && bottomEdge(block)) {
            block.style.left = `${leftPosition + STEP}px`;
            showScore();
        }
    });
}

function moveDown() {
    blockList.forEach((block) => {
        const topPosition = parseInt(block.style.top || 0);
        if (topPosition + STEP <= maxY && bottomEdge(block)) {
            block.style.top = `${topPosition + STEP}px`;
        }
    });
    createNewBlock();
}

function bottomEdge(block) {
    const topPosition = parseInt(block.style.top || 0);
    return topPosition + block.offsetHeight < maxY;
}

function showScore() {
    const topBlock = blockList[blockList.length - 1];
    if (bottomEdge(topBlock)) {
        score += 1;
        input.value = `${score}`;
    }
}

function createNewBlock() {
    const bottomBlock = blockList[blockList.length - 1];
    const topPosition = parseInt(bottomBlock.style.top || 0);
    if (topPosition + STEP >= maxY) {
        const newBlock = document.createElement('div');
        newBlock.className = 'block';
        blockList.push(newBlock);
        blockWrapper.appendChild(newBlock);        
    } 
    
}

function keyPress(e) {
    if (operations[e.keyCode]) {
        operations[e.keyCode]();
    }
}

document.addEventListener('keydown', keyPress);

setInterval(() => {
    moveDown();
}, 1000);


