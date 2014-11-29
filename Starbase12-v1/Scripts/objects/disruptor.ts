// Disruptor Bullet Class
module objects {
    export class Disruptor extends createjs.Sprite {
        // PUBLIC PROPERTIES
        public position: createjs.Point;
        public radius: number;
        public speed: number;
        public width: number;
        public height: number;

        // PRIVATE PROPERTIES ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        private _dx: number;
        private _dy: number;
        private _direction: number;

        private _enemy: objects.Enemy;
        private _origin: createjs.Point;
        private _target: createjs.Point;



        // CONSTRUCTOR +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        constructor(enemy: objects.Enemy) {
            super(managers.Assets.atlas, "disruptorBolt");
            this.name = "disruptor";
            this._enemy = enemy;
            this._origin = new createjs.Point();
            this._origin = this._enemy.location;
            this._target = new createjs.Point();
            //this._target = this._enemy.target.location;
            this.position = new createjs.Point();
           
            this._init();
            this.radius = Math.sqrt(Math.pow(this.width, 2) + Math.pow(this.height, 2)) * 0.5;
        }

        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // disruptor update
        update() {
            this.position.x = this.x;
            this.position.y = this.y;
            this._calcVector();
            this._calcPosition();
            this._checkBounds();
        }

        // Remove the tracer
        destroy() {
            game.removeChild(this);
        }

        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

        private _init() {
            this.x = this._enemy.x;
            this.y = this._enemy.y;
            this._origin.x = this._enemy.x;
            this._origin.y = this._enemy.y;
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.regX = this.width * 0.5;
            this.regY = this.height * 0.5;

            this._dx = 0;
            this._dy = 0;
            this._direction = this._enemy.targetAngle;
            this.speed = 20;
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

        // Make Sure disruptor stays on screen
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