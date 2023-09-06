import { InputHandler } from "./inputHandler.js"
import { PlayerPad } from "./playerPad.js"

window.addEventListener('load', () => {
    let canvas = document.getElementById('canvas_work')
    let canvas_context = canvas.getContext('2d')

    canvas.width = 500
    canvas.height = 400

    class Game {
        constructor(width, height) {
            this.width = width,
            this.height = height,
            this.input = new InputHandler(),
            this.pad = new PlayerPad(this),
            this.player_1_count = 0,
            this.player_2_count = 0,

            this.ballX = 20,
            this.ball_speed_X = 20,
            
            this.ballY = 50,
            this.ball_speed_Y = 8,

            // this.left_paddle_X = 0,
            // this.left_paddle_Y = this.height/2;
    
            this.right_paddle_X = this.canvas-this.paddle_width,
            this.right_paddle_Y = this.height/2;
        }
        update() {
            this.pad.updatePadLeft()
        }
        drawPlayer(context, color) {
            this.pad.drawPad(context,  color)
        }
        drawCanvasStyle(context, color,) {
            context.fillStyle = color
            context.fillRect(0, 0, this.width, this.height)   
        }
        drawCanvasCenterLine(context, color,) {
            context.fillStyle = color
            context.setLineDash([10,2]);
            context.beginPath();
            context.moveTo(this.width/2, 0);
            context.lineTo(this.width/2, this.height);
            context.stroke();  
        }
        
    }

    const game = new Game(canvas.width, canvas.height)
    console.log(game)
    function animate() {
        canvas_context.clearRect(0, 0, canvas.width, canvas.height)
        game.drawCanvasStyle(canvas_context, 'green')
        game.drawCanvasCenterLine(canvas_context, 'red')
        game.drawPlayer(canvas_context, 'yellow')
        game.update()
        requestAnimationFrame(animate)
    }
    animate()
    
})