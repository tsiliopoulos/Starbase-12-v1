// Crosshair object
module objects {
    export class Crosshair extends objects.GameObject {
        constructor() {
            super("crosshair");
        }

        // Make Sure the crosshair stays on screen
        private checkBounds() {
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

        update() {
            this.x = stage.mouseX;
            this.y = stage.mouseY;
            this.checkBounds();
        }
    }
} 