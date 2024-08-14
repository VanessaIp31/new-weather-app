const flipBox_inner = document.querySelector('#flipBox_inner');
const btn_turnLeft = document.querySelector('#btn_turnLeft');
const btn_turnRight = document.querySelector('#btn_turnRight');

/* let flipBox_inner_status = '' */
/* let flipBox_inner_status = { */
const flipBox_flat = ['front', 'right', 'back', 'left'];
let flipBox_status = 'front';
let flipBox_turn = {
    'front': {
        'formR':'translate(0, 0) rotateY(0)', 
        'formL':'translate(0, 0) rotateY(0)'
    }, 
    'right': {
        'formR':'translate(50%, 0) rotateY(90deg) translate(50%, 0)', 
        'formL':'translate(-50%, 0) rotateY(-90deg) translate(-50%, 0)'
    }, 
    'back': {
        'formR':'translate(50%, 0) rotateY(90deg) translate(100%, 0) rotateY(90deg) translate(50%, 0);', 
        'formL':'translate(-50%, 0) rotateY(-90deg) translate(-100%, 0) rotateY(-90deg) translate(-50%, 0)'
    }, 
    'left': {
        'formR':'translate(-50%, 0) rotateY(270deg) translate(-50%, 0)', 
        'formL':'translate(-50%, 0) rotateY(-90deg) translate(-100%, 0) rotateY(-90deg) translate(-100%, 0) rotateY(-90deg) translate(-50%, 0)' 
    }
};

btn_turnRight.addEventListener('click', () => {
    /* if(flipBox_inner_status !== '') {
        flipBox_inner.classList.remove(flipBox_inner_status);
    }
    flipBox_inner.classList.add('flipBox_inner-goRight');
    flipBox_inner_status = 'flipBox_inner-goRight';
    setTimeout(() => {
        flipBox_inner.classList.remove(flipBox_inner_status);
        flipBox_inner.classList.add('flipBox_inner-goLeft180');
        flipBox_inner_status = 'flipBox_inner-goLeft180';
    }, 1000);
    console.log('hi'); */

    console.log(flipBox_inner.style.transform);
    /* flipBox_inner.style.transform = 'translate(50%, 0) rotateY(90deg) translate(50%, 0)'; */
    console.log('hi');
    /* checkFlipBox_flatStatus('+'); */
    turnFlipBox_right(checkFlipBox_flatStatus('+'), 'formR');
});

btn_turnLeft.addEventListener('click', () => {
    /* flipBox_inner.classList.remove('flipBox_inner-goLeft');
    flipBox_inner.classList.remove('flipBox_inner-goRight'); */
    /* flipBox_inner.classList.add('flipBox_inner-goLeft');
    setTimeout(() => {
        flipBox_inner.classList.remove('flipBox_inner-goLeft');
    }, 1000); */

    console.log(flipBox_inner.style.transform);
    /* flipBox_inner.style.transform = 'translate(-50%, 0) rotateY(-90deg) translate(-50%, 0)'; */
    /* flipBox_inner.style.transform = 'translate(0, 0) rotateY(0)'; */
    console.log('hi');
    checkFlipBox_flatStatus('-');
    turnFlipBox_left(flipBox_status, 'formL');
});

function checkFlipBox_flatStatus(symbel) {
    if(symbel === '+') {
        if(flipBox_status === 'front') {
            flipBox_status = 'right';
        } else if(flipBox_status === 'right') {
            flipBox_status = 'back';
        } else if(flipBox_status === 'back') {
            flipBox_status = 'left';
        } else if(flipBox_status === 'left') {
            flipBox_status = 'front';
        }
        console.log('1')
    } else if(symbel === '-') {
        if(flipBox_status === 'left') {
            flipBox_status = 'front';
        } else if(flipBox_status === 'front') {
            flipBox_status = 'right';
        } else if(flipBox_status === 'right') {
            flipBox_status = 'back';
        } else if(flipBox_status === 'back') {
            flipBox_status = 'left';
        }
        console.log('2')
    }
    return flipBox_status;
}

function turnFlipBox_right(flat, direction) {
    console.log(flipBox_turn[flat][direction]);
    flipBox_inner.style.transform = flipBox_turn[flat][direction]
}

function turnFlipBox_left(flat, direction) {
    console.log(flipBox_turn[flat][direction]);
    flipBox_inner.style.transform = flipBox_turn[flat][direction]
}