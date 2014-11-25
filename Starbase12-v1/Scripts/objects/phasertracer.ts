// Phaser Tracer Class
module objects {
    export class PhaserTracer extends createjs.Shape {

        // PUBLIC PROPERTIES
        public position: createjs.Point;
        public radius: number;
        public speed: number;
        public range: number;

        // PRIVATE PROPERTIES ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        private _tracer: createjs.Graphics;
        private _dx: number;
        private _dy: number;
        private _direction: number;
        private _travelled: number;
       
        private _origin: createjs.Point;
        private _target: createjs.Point;
        private _width: number;
        private _height: number;
        
        
        // CONSTRUCTOR +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            this.name = "tracer";
            this._origin = new createjs.Point();
            this._target = new createjs.Point();
            this.position = new createjs.Point();
           
            this._drawBullet();
            super(this._tracer);
            this._init();
        }

        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // Tracer update
        update() {
            this.position.x = this.x;
            this.position.y = this.y;
            this._calcVector();
            this._calcPosition();
            this._checkBounds();
            this._travelled = utility.Distance.calculate(this._origin, this.position);
            if (this._travelled >= this.range) {
                this.speed = 0;
            }
        }

        // Remove the tracer
        destroy() {
            game.removeChild(this);
        }

        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

        private _init() {
            this.x = player.x;
            this.y = player.y;
            this._origin.x = this.x;
            this._origin.y = this.y;
            this.setBounds(this.x, this.y, 20, 20);
            this._width = this.getBounds().width;
            this._height = this.getBounds().height;
            this.regX = this._width * 0.5;
            this.regY = this._height * 0.5;

            this._dx = 0;
            this._dy = 0;
            this._direction = player.targetAngle;
            this.speed = 20;
            this._target.x = stage.mouseX;
            this._target.y = stage.mouseY;

            this.range = utility.Distance.calculate(this._origin, this._target);
            
            this.alpha = 0;
        }

        private _drawBullet() {
            this.radius = 10;
            this._tracer = new createjs.Graphics();
            this._tracer.beginFill("#000").drawCircle(0, 0, this.radius);
        }

        // Calculate the game object's new x and y coordinates
        private _calcVector() {
            var radians: number = this._direction * (Math.PI / 180);
            this._dx = this.speed * Math.cos(radians);
            this._dy = this.speed * Math.sin(radians);
            this._dy *= -1;
        }

        // Calculate the game object's new position
        private _calcPosition() {
            this.x += this._dx;
            this.y += this._dy;
        }

        // Make Sure tracer stays on screen
        private _checkBounds() {
            // Check Right Bounds
            if (this.x >= config.WIDTH - 31) {
                this.x = config.WIDTH - 31;
                this.speed = 0;
            }
            // Check Left Bounds
            if (this.x <= 31) {
                this.x = 31;
                this.speed = 0;
            }
            // Check Lower Bounds
            if (this.y >= config.HEIGHT - 31) {
                this.y = config.HEIGHT - 31;
                this.speed = 0;
            }
            // Check Upper Bounds
            if (this.y <= 31) {
                this.y = 31;
                this.speed = 0;
            }

            

        }
    } 
} 