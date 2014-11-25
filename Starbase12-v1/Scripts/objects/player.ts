﻿/// <reference path="../config/controls.ts" />
/// <reference path="../config/keys.ts" />
/// <reference path="shield.ts" />

// Player Object Class
module objects {
    export class Player extends objects.GameObject implements interfaces.IObject {
        // PUBLIC PROPERTIES ++++++++++++++++++++++++++++++++++++++++++++++
        public target: createjs.Point;
        public targetAngle: number;

        // CONSTRUCTOR +++++++++++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            super("ship");

            this.name = "ship";
            this._init();
            this._assignControls();
            this.shieldsUp();
        }

        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++++++++

        // Update player position and condition on screen
        public update() {
            this._controlAction();
            this.calcVector();
            this.calcPosition();
            this.calcHitArea();
            this.target.x = stage.mouseX;
            this.target.y = stage.mouseY;
            this._calculateTargetAngle();
            this._checkBounds();
            this.shield.update();
            
        }

        // Remove Player Object
        public destroy() {
            this.shield.destroy();
            game.removeChild(this);
        }

        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++++++++

        // Initialize player properties
        private _init() {
            this.turnRate = 1;
            this.speed = 0;
            this.direction = 90;
            this.dx = 0;
            this.dy = 0;
            this.target = new createjs.Point();
        }

        // Calculate the angle to the target
        private _calculateTargetAngle() {
            this.dx = this.x - this.target.x;
            this.dy = this.y - this.target.y;
            this.dy *= -1;

            var radians = Math.atan2(this.dy, this.dx);
            this.targetAngle = radians * 180 / Math.PI;
            this.targetAngle += 180;
        }

        // Bind key actions to player events
        private _assignControls() {
            window.onkeydown = this._onControlDown;
            window.onkeyup = this._onControlUp;
        }

        // Switch statement to activate movement and rotation
        private _onControlDown(event: KeyboardEvent) {
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
        private _onControlUp(event: KeyboardEvent) {
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

        // Make Sure player stays on screen
        private _checkBounds() {
            // Check Right Bounds
            if (this.x >= config.WIDTH - (this.width * 0.5) - 31) {
                this.x = config.WIDTH - (this.width * 0.5) - 31;
            }
            // Check Left Bounds
            if (this.x <= (this.width * 0.5) + 31) {
                this.x = (this.width * 0.5) + 31;
            }
            // Check Lower Bounds
            if (this.y >= config.HEIGHT - (this.height * 0.5) -31) {
                this.y = config.HEIGHT - (this.height * 0.5) -31;
            }
            // Check Upper Bounds
            if (this.y <= (this.height * 0.5) +31) {
                this.y = (this.height * 0.5) +31 ;
            }
        }

        // Respond to player key presses
        private _controlAction() {
            // Execute left turn
            if (controls.TURN_LEFT) {
                this.turnLeft();
            }

            // Execute right turn
            if (controls.TURN_RIGHT) {
                this.turnRight();
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

    }
} 