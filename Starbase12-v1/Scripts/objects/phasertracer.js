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
            _super.call(this, managers.Assets.atlas, "tracer");
            this.name = "tracer";
            this._origin = new createjs.Point();
            this._target = new createjs.Point();
            this.position = new createjs.Point();

            this._init();
            this.radius = Math.sqrt(Math.pow(this.width, 2) + Math.pow(this.height, 2)) * 0.5;
        }
        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // Tracer update
        PhaserTracer.prototype.update = function () {
            this._calcVector();
            this._calcPosition();
            this.position.x = this.x;
            this.position.y = this.y;
            this._checkBounds();
            this._travelled = utility.distance(this._origin, this.position);
            if (this._travelled >= this.range) {
                this.speed = 0;
            }
        };

        // Remove the tracer
        PhaserTracer.prototype.destroy = function () {
            game.removeChild(this);
        };

        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        PhaserTracer.prototype._init = function () {
            this.x = player.x;
            this.y = player.y;
            this._origin.x = this.x;
            this._origin.y = this.y;
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.regX = this.width * 0.5;
            this.regY = this.height * 0.5;

            this._dx = 0;
            this._dy = 0;
            this._direction = player.targetAngle;
            this.speed = 20;
            this._target.x = stage.mouseX;
            this._target.y = stage.mouseY;

            this.range = utility.distance(this._origin, this._target);

            this.alpha = 0;
        };

        // Calculate the game object's new x and y coordinates
        PhaserTracer.prototype._calcVector = function () {
            var radians = this._direction * (Math.PI / 180);
            this._dx = this.speed * Math.cos(radians);
            this._dy = this.speed * Math.sin(radians);
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
        };
        return PhaserTracer;
    })(createjs.Sprite);
    objects.PhaserTracer = PhaserTracer;
})(objects || (objects = {}));
//# sourceMappingURL=phasertracer.js.map
