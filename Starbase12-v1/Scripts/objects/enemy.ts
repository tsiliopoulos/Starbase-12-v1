module objects {
    export class Enemy extends objects.GameObject implements interfaces.IObject {
        // PUBLIC PROPERTIES ++++++++++++++++++++++++++++++++++++++++++++++
        public target: objects.GameObject;
        public integrityLabel: createjs.Text;
        public targetAngle: number;
        public disruptorFire: boolean;
        public rateOfFire: number;

        // PRIVATE PROPERTIES +++++++++++++++++++++++++++++++++++++++++++++
        private _firingAngle: number;

        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            super("klingon");
            this.name = "klingon";
            this.shieldsUp();
            this.spawn();
            this._init();
            this._showHealth();
            this._selectTarget();
        }

        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++++++++++

        // create enemy
        public spawn() {
            this.x = Math.floor(Math.random() * (config.WIDTH - 62) + config.BORDER);
            this.y = Math.floor(Math.random() * (config.HEIGHT - 62) + config.BORDER);
            this.location.x = this.x;
            this.location.y = this.y;
            this.shieldsDown();
            this.shieldsUp();
        }

        // Update Method
        public update() {
            this._turnToFaceTarget();
            this._fireDisruptor();
            this.calcHitArea();
            this.shield.update();
            this.integrityLabel.x = this.x;
            this.integrityLabel.y = this.y;
            this.integrityLabel.text = Math.floor(this.integrity).toString();
            this._checkTargetAlive();
        }

        // Destroy Enemy
        public destroy() {
            game.removeChild(this);
            game.removeChild(this.shield);
        }

        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++++++++++

        // Initialize player properties
        private _init() {
            this.turnRate = 0.5;
            this.speed = 0;
            this.direction = 90;
            this._firingAngle = this.direction;
            this.disruptorFire = false;
            this.dx = 0;
            this.dy = 0;
            this.rateOfFire = Math.floor(Math.random() * 20 + 50);
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

        // Show Health of Enemy Ship
        private _showHealth() {
            this.integrityLabel = new createjs.Text(this.integrity.toString(), config.FONT_SIZE + " " + config.FONT, config.FONT_COLOUR);
            this.integrityLabel.regX = this.integrityLabel.getBounds().width * 0.5;
            this.integrityLabel.regY = this.integrityLabel.getBounds().height * 0.5;
        }

        // Select a Random Target
        private _selectTarget() {
            var targetProbability = Math.floor(Math.random() * 100 + 1);
            if (targetProbability > 66) {
                this.target = player;
            }
            else {
                this.target = starbase;
            }
        }

        // Check to see if target is still alive
        private _checkTargetAlive() {
            if (!beamWeapon.starbaseAlive) {
                this.target = player;
            }

        }

        // Turn to face the current target at the turn rate
        private _turnToFaceTarget() {
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
                    }
                    else {
                        this.turnLeft();
                        this._firingAngle = this.targetAngle - this.direction
                    }
                }

                if (enemyQuadrant == config.BOT_RIGHT) {
                    if (targetQuadrant == config.TOP_RIGHT) {
                        this.turnLeft();
                        this._firingAngle = (this.targetAngle + 360) - this.direction;
                    }
                    else {
                        this.turnRight();
                        this._firingAngle = this.direction - this.targetAngle;
                    }
                }
            }
        }

        // If firing angle is less than 30 degrees then fire disruptors
        private _fireDisruptor() {
            if (this._firingAngle <= 30) {
                this.disruptorFire = true;
            }
            else {
                this.disruptorFire = false;
            }
        }

    }
}