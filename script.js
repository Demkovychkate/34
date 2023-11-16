const block = document.createElement('div');
block.className = 'block';
document.body.appendChild(block);

const STEP = 50;

const operations = {
    37: (block) => block.style.left = `${parseInt(block.style.left || 0) - STEP}px `,  
    39: (block) =>block.style.left = `${parseInt(block.style.left || 0) + STEP}px `,
    40: (block) => block.style.top = `${parseInt(block.style.top || 0) + STEP}px `,
}

function setStepToBlock(e) {
    operations[e.keyCode](block);
}

document.addEventListener('keydown', setStepToBlock);


setInterval(() => {
    setStepToBlock({ keyCode: 40});  
}, 1000);
   