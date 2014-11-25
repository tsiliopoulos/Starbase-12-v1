var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    var Enemy = (function (_super) {
        __extends(Enemy, _super);
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++++++
        function Enemy() {
            _super.call(this, "klingon");

            this.name = "klingon";

            this.shieldsUp();
            this.spawn();
            this._init();
            this._selectTarget();
        }
        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++++++++++
        // create enemy
        Enemy.prototype.spawn = function () {
            this.x = Math.floor(Math.random() * (config.WIDTH - 62) + 31);
            this.y = Math.floor(Math.random() * (config.HEIGHT - 62) + 31);
            this.location.x = this.x;
            this.location.y = this.y;
            this.shieldsDown();
            this.shieldsUp();
        };

        // Update Method
        Enemy.prototype.update = function () {
            this._turnToFaceTarget();
            this.calcHitArea();
            this.shield.update();
        };

        // Destroy Enemy
        Enemy.prototype.destroy = function () {
            game.removeChild(this);
            game.removeChild(this.shield);
        };

        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++++++++++
        // Initialize player properties
        Enemy.prototype._init = function () {
            this.turnRate = 0.25;
            this.speed = 0;
            this.direction = 90;
            this.dx = 0;
            this.dy = 0;
        };

        // Calculate the angle to the target
        Enemy.prototype._calculateTargetAngle = function () {
            this.dx = this.x - this.target.x;
            this.dy = this.y - this.target.y;
            this.dy *= -1;

            var radians = Math.atan2(this.dy, this.dx);
            this._targetAngle = radians * 180 / Math.PI;
            this._targetAngle += 180;
        };

        // Select a Random Target
        Enemy.prototype._selectTarget = function () {
            var targetProbability = Math.floor(Math.random() * 100 + 1);
            if (targetProbability > 66) {
                this.target = player;
            } else {
                this.target = starbase;
            }
        };

        // Turn to face the current target at the turn rate
        Enemy.prototype._turnToFaceTarget = function () {
            this._calculateTargetAngle();

            // Perform Right Turn;
            if (this._targetAngle > this.direction) {
                this.turnLeft();
            }

            // Perform Left Turn
            if (this._targetAngle < this.direction) {
                this.turnRight();
            }
        };
        return Enemy;
    })(objects.GameObject);
    objects.Enemy = Enemy;
})(objects || (objects = {}));
//# sourceMappingURL=enemy.js.map
