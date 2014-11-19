/// <reference path="../config/controls.ts" />
/// <reference path="../config/keys.ts" />
/// <reference path="shield.ts" />

module objects {
    export class Player extends objects.GameObject {
        turnRate: number;
        speed: number;
        direction: number;
        dx: number;
        dy: number;
        shield: objects.Shield;
        constructor() {
            this.x = config.WIDTH * 0.5;
            this.y = config.HEIGHT * 0.5;
            super("ship");

            this.name = "ship";
            this.init();
            this.assignControls();
            this.shieldsUp();
        }

        // Initialize player properties
        private init() {
            this.turnRate = 3;
            this.speed = 0;
            this.direction = 90;
            this.dx = 0;
            this.dy = 0;
        }

        // Bind key actions to player events
        private assignControls() {
            window.onkeydown = this.onControlDown;
            window.onkeyup = this.onControlUp;
        }

        // Switch statement to activate movement and rotation
        private onControlDown(event: KeyboardEvent) {
            switch (event.keyCode) {
                case keys.A:
                case keys.LEFT:
                    controls.TURN_LEFT = true;
                    break;
                case keys.D:
                case keys.RIGHT:
                    controls.TURN_RIGHT = true;
                    break;
                case keys.W:
                case keys.UP:
                    controls.FORWARD = true;
                    break;
                case keys.S:
                case keys.DOWN:
                    controls.REVERSE = true;
                    break;
                case keys.SPACE:
                    controls.PHOTON = true;
                    break;
            }
        }

        // switch statement to reset controls
        private onControlUp(event: KeyboardEvent) {
            switch (event.keyCode) {
                case keys.A:
                case keys.LEFT:
                    controls.TURN_LEFT = false;
                    break;
                case keys.D:
                case keys.RIGHT:
                    controls.TURN_RIGHT = false;
                    break;
                case keys.W:
                case keys.UP:
                    controls.FORWARD = false;
                    break;
                case keys.S:
                case keys.DOWN:
                    controls.REVERSE = false;
                    break;
                case keys.SPACE:
                    controls.PHOTON = false;
                    break;
            }
        }

        // Calculate the new x and y coordinates
        private calcVector() {
            var radians: number = this.direction * (Math.PI / 180);
            this.dx = this.speed * Math.cos(radians);
            this.dy = this.speed * Math.sin(radians);
            this.dy *= -1;
        }

        // Calculate player's new position
        private calcPosition() {
            this.x += this.dx;
            this.y += this.dy;
        }

        // Make Sure player stays on screen
        private checkBounds() {
            // Check Right Bounds
            if (this.x >= config.WIDTH - (this.width * 0.5) - 31) {
                this.x = config.WIDTH - (this.width * 0.5) - 31;
            }
            // Check Left Bounds
            if (this.x <= (this.width * 0.5) + 31) {
                this.x = (this.width * 0.5) + 31;
            }
            // Check Lower Bounds
            if (this.y >= config.HEIGHT - (this.height * 0.5)) {
                this.y = config.HEIGHT - (this.height * 0.5);
            }
            // Check Upper Bounds
            if (this.y <= (this.height * 0.5)) {
                this.y = (this.height * 0.5);
            }
        }

        // Respond to player key presses
        private controlAction() {
            // Execute left turn
            if (controls.TURN_LEFT) {
                this.rotation -= this.turnRate;
                this.direction += this.turnRate;
                if (this.direction > 360) {
                    this.direction = this.turnRate;
                }
                this.shield.rotation = this.rotation;
                this.width = this.getTransformedBounds().width;
                this.height = this.getTransformedBounds().height;
            }

            // Execute right turn
            if (controls.TURN_RIGHT) {
                this.rotation += this.turnRate;
                this.direction -= this.turnRate;
                if (this.direction < 0) {
                    this.direction = 360 - this.turnRate;
                }
                this.shield.rotation = this.rotation;
                this.width = this.getTransformedBounds().width;
                this.height = this.getTransformedBounds().height;
            }

            // Forward Movement
            if (controls.FORWARD) {
                this.speed = 5;
            }

            // Reverse Movement
            if (controls.REVERSE) {
                this.speed = -2;
            } 

            // Forward Stop
            if ((controls.FORWARD == false) && (controls.REVERSE == false)) {
                this.speed = 0;
            }

        }

        shieldsUp() {
            this.shield = new objects.Shield(this);
            this.shield.regX = this.shield.width * 0.5;
            this.shield.regY = this.shield.height * 0.5;
            this.shield.x = this.x;
            this.shield.y = this.y;
            game.addChild(this.shield);
        }

        shieldsDown() {
            game.removeChildAt(layer.PLAYER_SHIELD);
        }

        // Update player position and condition on screen
        update() {
            this.controlAction();
            this.calcVector();
            this.calcPosition();
            this.checkBounds();
            this.shield.update();
        }

    }
} 