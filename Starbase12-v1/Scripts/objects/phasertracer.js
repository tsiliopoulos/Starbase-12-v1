var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
// Phaser Tracer Class
var objects;
(function (objects) {
    var PhaserTracer = (function (_super) {
        __extends(PhaserTracer, _super);
        // CONSTRUCTOR +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        function PhaserTracer() {
            this._target = new createjs.Point();
            this.position = new createjs.Point();
            this._drawBullet();
            _super.call(this, this._tracer);
            this._init();
            game.addChild(this);
        }
        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // Tracer update
        PhaserTracer.prototype.update = function () {
            this.position.x = this.x;
            this.position.y = this.y;
            this._calcVector();
            this._calcPosition();
            this._checkBounds();
            if (this._speed == 0) {
                this.destroy();
            }
            stage.update();
        };

        PhaserTracer.prototype.destroy = function () {
            game.removeChild(this);
        };

        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        PhaserTracer.prototype._init = function () {
            this.x = player.x;
            this.y = player.y;
            this._dx = 0;
            this._dy = 0;
            this._direction = player.targetAngle;
            this._speed = 10;
            this._target.x = crosshair.x;
            this._target.y = crosshair.y;
            //this.alpha = 0.1;
        };

        PhaserTracer.prototype._drawBullet = function () {
            this._tracer = new createjs.Graphics();
            this._tracer.beginFill("#FFF").drawCircle(0, 0, 10);
        };

        // Calculate the game object's new x and y coordinates
        PhaserTracer.prototype._calcVector = function () {
            var radians = this._direction * (Math.PI / 180);
            this._dx = this._speed * Math.cos(radians);
            this._dy = this._speed * Math.sin(radians);
            this._dy *= -1;
        };

        // Calculate the game object's new position
        PhaserTracer.prototype._calcPosition = function () {
            this.x += this._dx;
            this.y += this._dy;
        };

        // Make Sure tracer stays on screen
        PhaserTracer.prototype._checkBounds = function () {
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
        };
        return PhaserTracer;
    })(createjs.Shape);
    objects.PhaserTracer = PhaserTracer;
})(objects || (objects = {}));
//# sourceMappingURL=phasertracer.js.map
