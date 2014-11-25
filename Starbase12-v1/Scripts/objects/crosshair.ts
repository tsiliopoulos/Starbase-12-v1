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
            this.calcHitArea();

            /*var pt1 = new createjs.Point();
            var pt2 = new createjs.Point();
            pt2.x = this.x;
            pt2.y = this.y;

            var hit = new createjs.Shape();
            hit.graphics.beginFill("#000").drawRect(0, 0, label2.getMeasuredWidth(), label2.getMeasuredHeight());

            var distance = utility.Distance.calculate(player.location, pt2);
            console.log("ship to crosshair " + distance);
            var distance2 = utility.Distance.calculate(player.location, starbase.location);
            console.log("ship to starbase " + distance2);*/

            
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