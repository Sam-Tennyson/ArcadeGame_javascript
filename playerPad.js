export class PlayerPad {
    constructor(game) {
        this.game = game
        this.paddle_width = 20,
        this.paddle_height = 150
        this.left_paddle_speed= 2
        this.left_paddle_X = 0,
        this.left_paddle_Y = this.game.height/2
    }

    updatePadLeft() {
        this.left_paddle_Y += this.left_paddle_speed
        if (this.left_paddle_Y >= 0 && this.left_paddle_Y < this.game.height/2) {
            this.left_paddle_speed = this.left_paddle_speed+1
        } else if (this.left_paddle_Y <this.game.height/2 && this.left_paddle_Y > this.game.height) {
            this.left_paddle_speed = this.left_paddle_speed-1
        } else {
            this.left_paddle_speed=0
        }
        console.log(this.left_paddle_Y)
        // this.x = this.game.width-this.paddle_width
        
    }
    drawPad(context, color) {
        context.fillStyle = color
        context.fillRect(this.left_paddle_X, this.left_paddle_Y, this.paddle_width, this.paddle_height)
    }

}