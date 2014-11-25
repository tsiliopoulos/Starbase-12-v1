// Phaser Tracer Class
module objects {
    export class PhaserTracer extends createjs.Shape {

        // PUBLIC PROPERTIES
        public position: createjs.Point;

        // PRIVATE PROPERTIES ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        private _tracer: createjs.Graphics;
        private _dx: number;
        private _dy: number;
        private _direction: number;
        private _speed: number;
        private _target: createjs.Point;

        // CONSTRUCTOR +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            this._target = new createjs.Point();
            this.position = new createjs.Point();
            this._drawBullet();
            super(this._tracer);
            this._init();
            game.addChild(this);
        }

        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // Tracer update
        update() {
            this.position.x = this.x;
            this.position.y = this.y;
            this._calcVector();
            this._calcPosition();
            this._checkBounds();
            if (this._speed == 0) {
                this.destroy();
            }
            stage.update();
        }

        destroy() {
            game.removeChild(this);
        }

        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

        private _init() {
            this.x = player.x;
            this.y = player.y;
            this._dx = 0;
            this._dy = 0;
            this._direction = player.targetAngle;
            this._speed = 10;
            this._target.x = crosshair.x;
            this._target.y = crosshair.y;
            
            //this.alpha = 0.1;
        }

        private _drawBullet() {
            this._tracer = new createjs.Graphics();
            this._tracer.beginFill("#FFF").drawCircle(0, 0, 10);
        }

        // Calculate the game object's new x and y coordinates
        private _calcVector() {
            var radians: number = this._direction * (Math.PI / 180);
            this._dx = this._speed * Math.cos(radians);
            this._dy = this._speed * Math.sin(radians);
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
                this._speed = 0;
            }
            // Check Left Bounds
            if (this.x <= 31) {
                this.x = 31;
                this._speed = 0;
            }
            // Check Lower Bounds
            if (this.y >= config.HEIGHT - 31) {
                this.y = config.HEIGHT - 31;
                this._speed = 0;
            }
            // Check Upper Bounds
            if (this.y <= 31) {
                this.y = 31;
                this._speed = 0;
            }


        }
    } 
} 