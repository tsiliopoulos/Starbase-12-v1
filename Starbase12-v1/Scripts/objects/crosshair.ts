// Crosshair object Class
module objects {
    export class Crosshair extends objects.GameObject implements interfaces.IObject {

        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            super("crosshair");
        }

        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++++++

        // Update Method
        public update() {
            this.x = stage.mouseX;
            this.y = stage.mouseY;
            this._checkBounds();
        }

        // Remove Crosshair object from game
        public destroy() {
            game.removeChild(this);
        }

        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++++++

        // Make Sure the crosshair stays on screen
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
            if (this.y >= config.HEIGHT - (this.height * 0.5)) {
                this.y = config.HEIGHT - (this.height * 0.5);
            }
            // Check Upper Bounds
            if (this.y <= (this.height * 0.5)) {
                this.y = (this.height * 0.5);
            }
        }

    }
} 