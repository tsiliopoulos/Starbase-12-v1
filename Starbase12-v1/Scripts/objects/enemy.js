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
            this._showHealth();
            this._selectTarget();
        }
        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++++++++++
        // create enemy
        Enemy.prototype.spawn = function () {
            this.x = Math.floor(Math.random() * (config.WIDTH - 62) + config.BORDER);
            this.y = Math.floor(Math.random() * (config.HEIGHT - 62) + config.BORDER);
            this.location.x = this.x;
            this.location.y = this.y;
            this.shieldsDown();
            this.shieldsUp();
        };

        // Update Method
        Enemy.prototype.update = function () {
            this._turnToFaceTarget();
            this._fireDisruptor();
            this.calcHitArea();
            this.shield.update();
            this.integrityLabel.x = this.x;
            this.integrityLabel.y = this.y;
            this.integrityLabel.text = Math.floor(this.integrity).toString();
            this._checkTargetAlive();
        };

        // Destroy Enemy
        Enemy.prototype.destroy = function () {
            game.removeChild(this);
            game.removeChild(this.shield);
        };

        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++++++++++
        // Initialize player properties
        Enemy.prototype._init = function () {
            this.turnRate = 0.5;
            this.speed = 0;
            this.direction = 90;
            this._firingAngle = this.direction;
            this.disruptorFire = false;
            this.dx = 0;
            this.dy = 0;
            this.rateOfFire = Math.floor(Math.random() * 20 + 50);
        };

        // Calculate the angle to the target
        Enemy.prototype._calculateTargetAngle = function () {
            this.dx = this.x - this.target.x;
            this.dy = this.y - this.target.y;
            this.dy *= -1;

            var radians = Math.atan2(this.dy, this.dx);
            this.targetAngle = radians * 180 / Math.PI;
            this.targetAngle += 180;
        };

        // Show Health of Enemy Ship
        Enemy.prototype._showHealth = function () {
            this.integrityLabel = new createjs.Text(this.integrity.toString(), config.FONT_SIZE + " " + config.FONT, config.FONT_COLOUR);
            this.integrityLabel.regX = this.integrityLabel.getBounds().width * 0.5;
            this.integrityLabel.regY = this.integrityLabel.getBounds().height * 0.5;
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

        // Check to see if target is still alive
        Enemy.prototype._checkTargetAlive = function () {
            if (!beamWeapon.starbaseAlive) {
                this.target = player;
            }
        };

        // Turn to face the current target at the turn rate
        Enemy.prototype._turnToFaceTarget = function () {
            this._calculateTargetAngle();

            var targetQuadrant = utility.Quadrant(this.targetAngle);
            var enemyQuadrant = utility.Quadrant(this.direction);

            if ((targetQuadrant == enemyQuadrant) || (enemyQuadrant == config.TOP_LEFT) || (enemyQuadrant == config.BOT_LEFT)) {
                if (this.direction > this.targetAngle) {
                    this.turnRight();
                    this._firingAngle = this.direction - this.targetAngle;
                }
                if (this.direction < this.targetAngle) {
                    this.turnLeft();
                    this._firingAngle = this.targetAngle - this.direction;
                }
                if (this.direction == this.targetAngle) {
                    this._firingAngle = 0;
                }
            } else {
                if (enemyQuadrant == config.TOP_RIGHT) {
                    if (targetQuadrant == config.BOT_RIGHT) {
                        this.turnRight();
                        this._firingAngle = this.direction - (360 - this.targetAngle);
                    } else {
                        this.turnLeft();
                        this._firingAngle = this.targetAngle - this.direction;
                    }
                }

                if (enemyQuadrant == config.BOT_RIGHT) {
                    if (targetQuadrant == config.TOP_RIGHT) {
                        this.turnLeft();
                        this._firingAngle = (this.targetAngle + 360) - this.direction;
                    } else {
                        this.turnRight();
                        this._firingAngle = this.direction - this.targetAngle;
                    }
                }
            }
        };

        // If firing angle is less than 30 degrees then fire disruptors
        Enemy.prototype._fireDisruptor = function () {
            if (this._firingAngle <= 30) {
                this.disruptorFire = true;
            } else {
                this.disruptorFire = false;
            }
        };
        return Enemy;
    })(objects.GameObject);
    objects.Enemy = Enemy;
})(objects || (objects = {}));
//# sourceMappingURL=enemy.js.map
