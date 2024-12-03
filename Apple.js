class Apple extends Snake {
    createApple() {
        document.querySelectorAll('.div').forEach((el) => { el.classList.remove('apple') }); // чтобы на 30-40+ не создавал больше 1 яблока
        const randomX = Math.ceil(Math.random() * (10 - 0));
        const randomY = Math.ceil(Math.random() * (10 - 0));
        const cellApple = document.querySelector(`[data-x ='${randomX}'][ data-y = '${randomY}']`);
        cellApple.classList.add('apple');
        this.body.forEach((el) => {
            if (el.x == randomX && el.y == randomY) {
                cellApple.classList.remove('apple');
                this.createApple();
            }
        })
    };
    grow() {
        const head = this.body[0];
        let newHead;
        if (this.direction == 'right') {
            newHead = { x: head.x + 1 > 10 ? 1 : head.x + 1, y: head.y };
        } else if (this.direction == 'left') {
            newHead = { x: head.x - 1 < 1 ? 10 : head.x - 1, y: head.y };
        } else if (this.direction == 'top') {
            newHead = { x: head.x, y: head.y + 1 > 10 ? 1 : head.y + 1 };
        } else if (this.direction == 'down') {
            newHead = { x: head.x, y: head.y - 1 < 1 ? 10 : head.y - 1 };
        }
        this.body.push(newHead);
    };
    _over = false;
    #bump(i = 0, q = 0) {
        for (i = 0; i < this.body.length - 1; i++)
            for (q = i + 1; q < this.body.length; q++)
                if (this.body[i].x == this.body[q].x && this.body[i].y == this.body[q].y) {
                    this._over = true;
                }
    }
    eatingApples() {
        const divs = document.querySelectorAll('.div');
        divs.forEach((el) => { el.classList.remove('apple') }); // чтобы на 30-40+ не создавал больше 1 яблока
        this.createApple()
        let score = 0;
        const int1 = setInterval(() => {
            this.#bump();
            divs.forEach((el) => {
                if (el.classList.contains('apple') && el.classList.contains('active')) {
                    el.classList.remove('apple');
                    this.createApple();
                    this.grow();
                    (function () {
                        score += 1;
                        document.querySelector('.section-1__current').innerHTML = `<p>${score}</p>`;
                        if (score > +document.querySelector('.section-1__best').textContent) {
                            localStorage.clear();
                            localStorage.setItem('key', score);
                        }
                    }());
                }
            })
            if (this._over) {
                clearInterval(int1);
                divs.forEach((el) => { el.classList.remove('apple') });
            }
        }, 500)
    }

    startMoving(x = 500, i = 3) {
        this.changeClass();
        const int2 = setInterval(() => {
            this.move();
            this.changeClass();
            if (this._over) {
                clearInterval(int2);
                document.querySelectorAll('.div').forEach((el) => { el.classList.remove('active') });
                for (i = 0; i < 100; i++) {
                    this.body.pop();
                }
                this.body.push({ x: 6, y: 6 }, { x: 5, y: 6 });
                document.querySelector('.section-1__replay').style = 'display: block';
            }
        }, x);
    }
}
//---------------------------------ниже обработчики событий, не хочу делать отдельный документ для них-------------------------------------
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
const play = document.querySelector('.section-1__play');

play.addEventListener('click', function () {
    apple.createField(10);
    apple.startMoving();
    apple.eatingApples();
    play.style = 'display : none';
    if ('null' == document.querySelector('.section-1__best').textContent) {
        localStorage.setItem('key', 0); // на случай очищения localStorage() начать игру и все будет норм
        window.location.reload();
    }
})

document.querySelector('.section-1__restart-btn').addEventListener('click', () => {
    if (apple._over) {
        apple._over = false;
        apple.startMoving();
        apple.eatingApples();
        document.querySelector('.section-1__best').innerHTML = `<p>${localStorage.getItem('key')}</p>`;
        document.querySelector('.section-1__current').innerHTML = `<p>${0}</p>`;
        document.querySelector('.section-1__replay').style = 'display: none';
    };
});
document.querySelector('.section-1__best').innerHTML = `<p>${localStorage.getItem('key')}</p>`;


