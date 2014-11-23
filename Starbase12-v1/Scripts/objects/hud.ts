// HUD Class
module objects {
    export class Hud extends createjs.Container {
        // PRIVATE PROPERTIES ++++++++++++++++++++++++++++++++++++++++++++++
        private _leftBorder: createjs.Bitmap;
        private _rightBorder: createjs.Bitmap;
        private _phaserEnergy: createjs.Text;

        // CONSTRUCTOR +++++++++++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            super();

            this._drawBorders();
            this._drawStatLabels();
        }

        // PRIVATE METHODS

        // Draw labels onto the HUD
        private _drawStatLabels() {
            this._phaserEnergy = new createjs.Text("PHASER ENERGY", config.FONT_SIZE + " " + config.FONT, config.FONT_COLOUR);
            this._phaserEnergy.x = 40;
            this.addChild(this._phaserEnergy);
        }

        // Draw HUD Borders (Yellow)
        private _drawBorders() {
            this._leftBorder = new createjs.Bitmap(managers.Assets.loader.getResult("hudLS"));
            this._rightBorder = new createjs.Bitmap(managers.Assets.loader.getResult("hudRS"));
            this._rightBorder.x = stage.canvas.width - this._rightBorder.getBounds().width;
            this.addChild(this._leftBorder, this._rightBorder);
        }
    }
} 