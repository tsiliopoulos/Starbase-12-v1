// Starbase Class
module objects {
    export class Starbase extends objects.GameObject implements interfaces.IObject {
        // PUBLIC PROPERTIES +++++++++++++++++++++++++++++++++++++++++++++++
        public integrityLabel: createjs.Text;

        // PRIVATE PROPERTIES ++++++++++++++++++++++++++++++++++++++++++++++
        private _turnDirection: number;

        // CONSTRUCTOR +++++++++++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            super("starbase");

            this.name = "starbase";
            this.init();
            this._showHealth();
            this.shieldsUp();
            this.randomRotation();

            
        }

        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++++++++

        // Update Method
        public update() {
            switch (this._turnDirection) {
                case config.CLOCKWISE:
                    this.turnRight();
                    break;
                case config.COUNTERCLOCKWISE:
                    this.turnLeft();
                    break;
            }
            this.calcHitArea();
            this.shield.update();
            this.integrityLabel.x = this.x;
            this.integrityLabel.y = this.y;
            this.integrityLabel.text = Math.floor(this.integrity).toString();
        }

        // remove the starbase object from the game
        public destroy() {
            this.shield.destroy();
            game.removeChild(this);
        }

        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++++++++

        // Initialize starbase properties
        private init() {
            this.turnRate = 0.1;
            this.speed = 0;
            this.direction = 90;
            this.dx = 0;
            this.dy = 0;
        }

        // Show Health of Starbase Ship
        private _showHealth() {
            this.integrityLabel = new createjs.Text(this.integrity.toString(), config.FONT_SIZE + " " + config.FONT, "#000");
            this.integrityLabel.regX = this.integrityLabel.getBounds().width * 0.5;
            this.integrityLabel.regY = this.integrityLabel.getBounds().height * 0.5;
        }

        // Rotate the Starbase in a random direction
        private randomRotation() {
            var turnProbability = Math.floor(Math.random() * 100 + 1);
            if(turnProbability > 50) {
                this._turnDirection = config.CLOCKWISE;
            }
            else {
                this._turnDirection = config.COUNTERCLOCKWISE;
            }
        }

    }
} 