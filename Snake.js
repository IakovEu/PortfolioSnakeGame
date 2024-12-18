class Snake extends Field {
    constructor(pointX, pointY) {
        super()
        this.body = [{ x: pointX, y: pointY }, { x: pointX - 1, y: pointY }];
        this.direction = 'right';
    }
    move() {
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

        this.body.unshift(newHead);
        this.body.pop();
    }
    changeClass() {
        document.querySelectorAll('.div').forEach((el) => {el.classList.remove('active');
            el.style = 'transform: rotate(0deg); border: 1px solid grey'});
        this.body.forEach((el) => {
            const choose = document.querySelector(`[data-x = '${el.x}'][ data-y = '${el.y}']`);
            choose.classList.add('active');
            if(this.direction === 'top'){
                choose.style ='transform: rotate(360deg);'
            } else if(this.direction === 'left'){
                choose.style ='transform: rotate(270deg);'
            } else if(this.direction === 'down'){
                choose.style ='transform: rotate(180deg);'
            } else {
                choose.style ='transform: rotate(90deg);'
            }
        })
    }
    changeDirection(newDirection) {
        const opposites = {
            right: 'left',
            left: 'right',
            top: 'down',
            down: 'top',
        };
        if (newDirection !== opposites[this.direction]) {
            this.direction = newDirection;
        }
    }
}




