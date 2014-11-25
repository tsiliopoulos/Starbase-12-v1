// HUD Class
module objects {
    export class Hud extends createjs.Container {
        // PUBLIC PROPERTIES
        public phaserEnergy: number;

        // PRIVATE PROPERTIES ++++++++++++++++++++++++++++++++++++++++++++++
        private _leftBorder: createjs.Bitmap;
        private _rightBorder: createjs.Bitmap;
        private _phaserEnergyLabel: createjs.Text;
        private _phaserEnergyValue: createjs.Text;

        // CONSTRUCTOR +++++++++++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            super();

            this._init();
            this._drawBorders();
            this._drawStatLabels();
        }

        // PUBLIC METHODS
        update() {
            this._phaserEnergyValue.text = Math.floor(this.phaserEnergy).toString();
        }

        // PRIVATE METHODS

        // Initialize values
        private _init() {
            this.phaserEnergy = 100;
        }


        // Draw labels onto the HUD
        private _drawStatLabels() {
            this._phaserEnergyLabel = new createjs.Text("PHASER ENERGY", config.FONT_SIZE + " " + config.FONT, config.FONT_COLOUR);
            this._phaserEnergyLabel.x = 40;
            this.addChild(this._phaserEnergyLabel);

            this._phaserEnergyValue = new createjs.Text(this.phaserEnergy.toString(), config.FONT_SIZE + " " + config.FONT, config.FONT_COLOUR);
            this._phaserEnergyValue.x = 170;
            this.addChild(this._phaserEnergyValue);
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