const blockWrapper = document.querySelector('.blockWrapper');
const blockList = [createNewBlock()];

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

function createNewBlock() {
    const newBlock = document.createElement('div');
    newBlock.className = 'block';
    blockWrapper.appendChild(newBlock);
    return newBlock;
}

function moveLeft() {
    const leftPosition = parseInt(blockList[0].style.left || 0);
    if (leftPosition - STEP >= 0) {
        blockList[0].style.left = `${leftPosition - STEP}px`;
        showScore();
    }
}

function moveRight() {
    const leftPosition = parseInt(blockList[0].style.left || 0);
    if (leftPosition + STEP <= maxX) {
        blockList[0].style.left = `${leftPosition + STEP}px`;
        showScore();
    }
}

function moveDown() {
    const topPosition = parseInt(blockList[0].style.top || 0);
    if (topPosition + STEP <= maxY && bottomEdge(blockList[0])) {
        blockList[0].style.top = `${topPosition + STEP}px`;
        checkEdge();
    } else {
        blockList.unshift(createNewBlock());
        
    }
}

function checkEdge() {
    if (blockList.length > 1) {
        for (let i = 1; i < blockList.length; i++) {
            
            const currentBlock = blockList[0];
            const otherBlock = blockList[i];
            const topPosition = parseInt(currentBlock.style.top || 0);
            const otherTopPosition = parseInt(otherBlock.style.top || 0);

            if (
                topPosition + currentBlock.offsetHeight >= otherTopPosition &&
                topPosition < otherTopPosition + otherBlock.offsetHeight
            ) {
                
                blockList.unshift(createNewBlock());
                showScore();
               
            } 
            
        }
    }
}

function bottomEdge(block) {
    const topPosition = parseInt(block.style.top || 0);
    return topPosition + block.offsetHeight < maxY;
}

function showScore() {
    score += 1;
    input.value = `${score}`;
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
