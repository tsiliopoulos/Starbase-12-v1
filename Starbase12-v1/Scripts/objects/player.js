/// <reference path="../config/controls.ts" />
/// <reference path="../config/keys.ts" />
/// <reference path="shield.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player() {
            this.x = config.WIDTH * 0.5;
            this.y = config.HEIGHT * 0.5;
            _super.call(this, "ship");

            this.name = "ship";
            this.init();
            this.assignControls();
            this.shieldsUp();
        }
        // Initialize player properties
        Player.prototype.init = function () {
            this.turnRate = 3;
            this.speed = 0;
            this.direction = 90;
            this.dx = 0;
            this.dy = 0;
        };

        // Bind key actions to player events
        Player.prototype.assignControls = function () {
            window.onkeydown = this.onControlDown;
            window.onkeyup = this.onControlUp;
        };

        // Switch statement to activate movement and rotation
        Player.prototype.onControlDown = function (event) {
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
        };

        // switch statement to reset controls
        Player.prototype.onControlUp = function (event) {
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
        };

        // Calculate the new x and y coordinates
        Player.prototype.calcVector = function () {
            var radians = this.direction * (Math.PI / 180);
            this.dx = this.speed * Math.cos(radians);
            this.dy = this.speed * Math.sin(radians);
            this.dy *= -1;
        };

        // Calculate player's new position
        Player.prototype.calcPosition = function () {
            this.x += this.dx;
            this.y += this.dy;
        };

        // Make Sure player stays on screen
        Player.prototype.checkBounds = function () {
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
        };

        // Respond to player key presses
        Player.prototype.controlAction = function () {
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
        };

        Player.prototype.shieldsUp = function () {
            this.shield = new objects.Shield(this);
            this.shield.regX = this.shield.width * 0.5;
            this.shield.regY = this.shield.height * 0.5;
            this.shield.x = this.x;
            this.shield.y = this.y;
            game.addChild(this.shield);
        };

        Player.prototype.shieldsDown = function () {
            game.removeChildAt(layer.PLAYER_SHIELD);
        };

        // Update player position and condition on screen
        Player.prototype.update = function () {
            this.controlAction();
            this.calcVector();
            this.calcPosition();
            this.checkBounds();
            this.shield.update();
        };
        return Player;
    })(objects.GameObject);
    objects.Player = Player;
})(objects || (objects = {}));
//# sourceMappingURL=player.js.map
