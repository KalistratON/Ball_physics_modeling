
const { mat2, mat3, mat4, vec2, vec3, vec4 } = glMatrix;
 
function Ball(position, radius) {
	
    this.position = position
    this.positionStart = vec3.clone(position)
    this.radius = radius
    this.vx = 0;
    this.vy = 0
	
    this.bounce = 1;
	
    this.setStartPosition = function () {
        this.position = vec3.clone(this.positionStart)
    }
}

function Wall(x, y) {
    this.x = x;
    this.y = y
}

function Phisic() {
	
    this.ball = new Ball(vec3.fromValues(0, 4, 0), 1)	 
    this.wall = new Wall(5, 0)
 
    this.coeffFriction = 0
    this.gravity = 9.81

    this.setPositionBallByTime = function (time) {

        var isDown=false;
        this.ball.setStartPosition()
        var startTime = 0
        var speedY = this.ball.vy
        var y = this.ball.position[1]
		
        while (true) {
			
            timeMove = 0.01
            startTime += timeMove
			
			speedY = (this.ball.vy + this.gravity / this.coeffFriction) * Math.exp(-this.coeffFriction * startTime) -
						this.gravity / this.coeffFriction

            y = -1 / this.coeffFriction * (this.ball.vy + this.gravity / this.coeffFriction) * 
				Math.exp(-this.coeffFriction * startTime) - this.gravity / this.coeffFriction * startTime +
				1 / this.coeffFriction * (this.ball.vy + this.gravity / this.coeffFriction) + this.ball.positionStart[1]

            if (y <= this.wall.y + this.ball.radius) {
                isDown=true
                time = startTime
                break
            }
            if (startTime >= time) {
                break;
            }
        }

        this.ball.position[1] = y

        //Лимит для функции
        var limitDistance = 9999999;
		var scalar = this.ball.vx / Math.abs(this.ball.vx);

		if (scalar > 0) {
			limitDistance = this.wall.x - (this.ball.positionStart[0] + this.ball.radius)
		}
		
		var paramMove = this.getDistance(time, Math.abs(this.ball.vx), Math.abs(limitDistance))
		this.ball.position[0] = this.ball.positionStart[0] + (paramMove["len"]) * scalar;
		
		if (paramMove["time"] < time) {

                paramMove = this.getDistance(time - paramMove["time"], paramMove["speed"] * this.ball.bounce, 99999)


                this.ball.position[0] -= paramMove["len"]
        }
        return isDown
    }
	 
    this.getDistance = function (time, speed, limitDistance) {


        var len = 0

        var timeTotal = 0;
		
        potentialDistance = 1 / this.coeffFriction * speed * (1 - Math.exp(-this.coeffFriction * time))
		
		if (potentialDistance < limitDistance) {
			timeTotal = time
			len = potentialDistance
			speed = 0
		} else {
			timeTotal = -1 / this.coeffFriction * Math.log(1 - this.coeffFriction / speed * limitDistance)
			len = limitDistance
			speed = speed * Math.exp(-this.coeffFriction * timeTotal)
		}

        return { "len": len, "time": timeTotal, "speed": speed };
    }
}