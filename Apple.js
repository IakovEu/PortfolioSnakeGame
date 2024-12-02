class Apple extends Snake{
    createApple(){
        let randomX = Math.ceil(Math.random() * (10 - 0));
        let randomY = Math.ceil(Math.random() * (10 - 0));
        const cellApple = document.querySelector(`[data-x = '${randomX}'][ data-y = '${randomY}']`);
        cellApple.classList.add('apple');
        this.body.forEach((el)=>{
            if (el.x == randomX && el.y == randomY){
                cellApple.classList.remove('apple');
                this.createApple();
            } 
        })
    }
}

document.addEventListener('keydown', event => {
    switch (event.key) {
        case 'ArrowUp':
            apple.changeDirection('top');
        break;
        case 'ArrowRight':
            apple.changeDirection('right');
        break;
        case 'ArrowDown':
            apple.changeDirection('down');
        break;
        case 'ArrowLeft':
            apple.changeDirection('left');
        break;
    }
});

const apple = new Apple(6, 6);
apple.createField(10);
apple.startMoving();
apple.createApple();

console.log(apple)