/// <reference path="../managers/asset.ts" />
// GAME OBJECT SUPERCLASS
module objects {
    export class GameObject extends createjs.Sprite {
        // PUBLIC PROPERTIES ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        public width: number;
        public height: number;
        public turnRate: number;
        public speed: number;
        public direction: number;
        public dx: number;
        public dy: number;
        public location: createjs.Point;
        public radius: number;
        public shield: objects.Shield;
        public hit: createjs.Shape;
        public integrity: number;
        
        // CONSTRUCTOR +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        constructor(SpriteName: string) {
            super(managers.Assets.atlas, SpriteName); 
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.regX = this.width * 0.5;
            this.regY = this.height * 0.5;
            this.location = new createjs.Point();
            this.radius = Math.sqrt(Math.pow(this.width, 2) + Math.pow(this.height, 2)) * 0.5;
            this.hit = new createjs.Shape();
            this.hit.graphics.beginFill("#FFF").drawCircle(this.x, this.y, this.radius);
            this.integrity = 100;
        }

        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

        // Calculate the game object's new x and y coordinates
        public calcVector() {
            var radians: number = this.direction * (Math.PI / 180);
            this.dx = this.speed * Math.cos(radians);
            this.dy = this.speed * Math.sin(radians);
            this.dy *= -1;
        }

        // Calculate the game object's new position
        public calcPosition() {
            this.x += this.dx;
            this.y += this.dy;
        }

        // Calculate the game object's hit area
        public calcHitArea() {
            this.hit.x = this.x;
            this.hit.y = this.y;
            this.hitArea = this.hit;
        }

        public shieldsUp() {
            this.shield = new objects.Shield(this);
            this.shield.regX = this.shield.width * 0.5;
            this.shield.regY = this.shield.height * 0.5;
            this.shield.x = this.x;
            this.shield.y = this.y;
            game.addChild(this.shield);
        }

        public shieldsDown() {
            game.removeChild(this.shield);
        }

        public turnLeft() {
            this.rotation -= this.turnRate;
            this.direction += this.turnRate;
            if (this.direction > 360) {
                this.direction = this.turnRate;
            }
            this.shield.rotation = this.rotation;
            this.width = this.getTransformedBounds().width;
            this.height = this.getTransformedBounds().height;
            this.radius = Math.sqrt(Math.pow(this.width, 2) + Math.pow(this.height, 2)) * 0.5;
        }

        public turnRight() {
            this.rotation += this.turnRate;
            this.direction -= this.turnRate;
            if (this.direction < 0) {
                this.direction = 360 - this.turnRate;
            }
            this.shield.rotation = this.rotation;
            this.width = this.getTransformedBounds().width;
            this.height = this.getTransformedBounds().height;
            this.radius = Math.sqrt(Math.pow(this.width, 2) + Math.pow(this.height, 2)) * 0.5;
        }

    }
} 