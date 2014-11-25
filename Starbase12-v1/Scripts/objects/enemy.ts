module objects {
    export class Enemy extends objects.GameObject implements interfaces.IObject {
        // PUBLIC PROPERTIES ++++++++++++++++++++++++++++++++++++++++++++++
        public target: objects.GameObject;

        // PRIVATE PROPERTIES +++++++++++++++++++++++++++++++++++++++++++++
        private _targetAngle: number;
         
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            super("klingon");
            
            this.name = "klingon";

            this.shieldsUp();
            this.spawn();
            this._init();
            this._selectTarget();

        }

        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++++++++++

        // create enemy
        public spawn() {
            this.x = Math.floor(Math.random() * (config.WIDTH - 62) + 31);
            this.y = Math.floor(Math.random() * (config.HEIGHT - 62) + 31);
            this.location.x = this.x;
            this.location.y = this.y;
            this.shieldsDown();
            this.shieldsUp();
        }

        // Update Method
        public update() {
            this._turnToFaceTarget();
            this.calcHitArea();
            this.shield.update();
        }

        // Destroy Enemy
        public destroy() {
            game.removeChild(this);
            game.removeChild(this.shield);
        }

        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++++++++++

        // Initialize player properties
        private _init() {
            this.turnRate = 0.25;
            this.speed = 0;
            this.direction = 90;
            this.dx = 0;
            this.dy = 0;
        }

        // Calculate the angle to the target
        private _calculateTargetAngle() {
            this.dx = this.x - this.target.x;
            this.dy = this.y - this.target.y;
            this.dy *= -1;

            var radians = Math.atan2(this.dy, this.dx);
            this._targetAngle = radians * 180 / Math.PI;
            this._targetAngle += 180;
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

        // Turn to face the current target at the turn rate
        private _turnToFaceTarget() {
            this._calculateTargetAngle();

            // Perform Right Turn;
            if (this._targetAngle > this.direction) {
                this.turnLeft();
            }

            // Perform Left Turn
            if (this._targetAngle < this.direction) {
                this.turnRight();
            }

        }

    }
}