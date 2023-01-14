let dynamicwidth
// function checkDim() {
//     let canvasContainer = document.getElementById('canvasContainer')
//     let canvas_work = document.getElementById('canvas_work')
//     console.log(canvasContainer.getClientRects())
//     console.log(canvas_work.getClientRects())
//     dynamicwidth = canvasContainer.getClientRects()[0]
//     canvas_work.style.width=dynamicwidth
// }

let canvas;
let canvas_ID;
let canvasWidth = dynamicwidth || 800;
let canvasHeight = 600;
let isStart = false

let WINNING = 3
let winner_name
let player_1 = 0
let player_2 = 0

let ballX = 20;
let ball_speed_X = 20;

let ballY = 50;
let ball_speed_Y = 8;

let paddle_width = 20;
let paddle_height = 150;

let border_width = 200;
let border_height = 200;

let paddle_left_X = 0;
let paddle_left_Y = canvasHeight/2;

let paddle_right_X = canvasWidth-paddle_width;
let paddle_right_Y = canvasHeight/2;

function handleMousePosition(e) {
    let {left, top} = canvas_ID.getBoundingClientRect()
    let root = document.documentElement
    let mouse_x = e.clientX - left - root.scrollLeft;
    let mouse_y = e.clientY - top - root.scrollTop;
    return {
        x: mouse_x,
        y: mouse_y
    }
}

window.onload = function() {
    canvas_ID = document.getElementById('canvas_work')
    canvas = canvas_ID.getContext('2d')
    canvas.font = "48px serif";

    setInterval(()=> {
        if (!isStart) {
            
            let imgTagg = document.getElementById('ggoommuuuu')
            if (imgTagg) imgTagg.remove()
            ballMovementController()    
            drawEverything()
        }
    }, 33)


    if (navigator.userAgentData.mobile) {
        // let {x, y} = handleMousePosition(e.changedTouches[0])
        // if (x >=0 && x <= canvasWidth && y >=0 && y <= canvasHeight) {

            canvas_ID.addEventListener('touchmove', (e)=> {
            let {x, y} = handleMousePosition(e.changedTouches[0])
            // paddle_left_X = x
            
            paddle_left_Y = y-(paddle_height/2)

            })
            canvas_ID.addEventListener('touchstart', (e)=> {
                player_1=0
                player_2=0
                isStart = false
        
            }) 
        // }
    }

    canvas_ID.addEventListener('mousemove', (e)=> {
        let {x, y} = handleMousePosition(e)
        paddle_left_Y = y-(paddle_height/2)

    })   

    canvas_ID.addEventListener('mousedown touchstart', (e)=> {
        player_1=0
        player_2=0
        isStart = false

    })   


}

function ballReset() {
    if (player_1 == WINNING || player_2 == WINNING) {
        if (player_1 >  player_2) {
            winner_name = "Player 1"
        } else {
            winner_name = "Gomu wins 😎"
        }
        isStart = true
        player_1 = 0
        player_2 = 0
        let imgTagg = document.getElementById('ggoommuuuu')
            if (imgTagg) imgTagg.remove()
    }
    ballX = canvasWidth / 2
    ballY = canvasHeight / 2
    ball_speed_X = -ball_speed_X
    ball_speed_Y = 1
}

function aiLogic() {
    let paddleCenter = paddle_right_Y + (paddle_height/2)
    if (paddleCenter < ballY) {
        paddle_right_Y = paddle_right_Y + 6
    } else {
        paddle_right_Y = paddle_right_Y - 6
    }
}

function ballMovementController() {
    aiLogic()
    ballX = ballX + ball_speed_X
    ballY = ballY + ball_speed_Y

    if (ballX > canvasWidth) {
        if (ballY > paddle_right_Y && ballY < paddle_right_Y+paddle_height) {
            ball_speed_X = -ball_speed_X
            let newY = ballY - (paddle_left_Y+ paddle_height/2)
            ball_speed_Y = newY * 0.2
        } else {
            player_1 = player_1 + 1
            ballReset()
        }
    }
    if (ballX < 0) {
        if (ballY > paddle_left_Y && ballY < paddle_left_Y+paddle_height) {
            ball_speed_X = -ball_speed_X
            let newY = ballY - (paddle_left_Y+ paddle_height/2)
            ball_speed_Y = newY * 0.2
        } else {
            player_2 = player_2 + 1
            ballReset()
        }
    }

    if (ballY > canvasHeight) {
        ball_speed_Y = -ball_speed_Y
    }
    if (ballY < 0) {
        ball_speed_Y = -ball_speed_Y
    }
}

function drawEverything() {
    canvas.fillStyle = '#06801f'
    canvas.fillRect(0, 0, canvasWidth, canvasHeight )
    if (isStart) {
        start()
        return ;
    }

    canvas.fillStyle = '#ebae34'
    canvas.fillRect(paddle_left_X, paddle_left_Y, paddle_width, paddle_height )

    canvas.fillStyle = 'red'
    canvas.setLineDash([10,2]);
    canvas.beginPath();
    canvas.moveTo(400, 0);
    canvas.lineTo(400, 600);
    canvas.stroke();

    canvas.fillStyle = '#ebae34'
    canvas.fillRect(paddle_right_X, paddle_right_Y, paddle_width, paddle_height )

    canvas.fillStyle = 'white'
    canvas.beginPath();
    canvas.arc(ballX, ballY, 10, 0, 2 * Math.PI )
    canvas.fill()

    canvas.fillText(player_1, 200, 150)
    canvas.fillText(player_2, 600, 150)

}

function start() {

    canvas.font = "48px serif";

    canvas.fillStyle="#ebae34"
    canvas.fillText(winner_name,300, 400)

    canvas.fillStyle="#ebae34"
    canvas.fillText(`Ready To Start Again`,200, 500)

    let imgTag = document.createElement('img');
    let imgTagg = document.getElementById('ggoommuuuu')
    if (imgTagg) imgTagg.remove()
    imgTag.style.position='absolute';
    imgTag.id = "ggoommuuuu"
    if (!navigator.userAgentData.mobile) {
        imgTag.style.top ='100px';
        imgTag.style.left='400px';
    } else {
        imgTag.style.top ='100px';
        imgTag.style.left='200px';
    }
    imgTag.src = 'gomu.jpg'
    imgTag.width= '150';
    imgTag.height= '150';
    imgTag.alt= "askdfslasdfkj";
    document.getElementById('canvasContainer').appendChild(imgTag);

}
