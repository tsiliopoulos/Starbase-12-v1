var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
// HUD Class
var objects;
(function (objects) {
    var Hud = (function (_super) {
        __extends(Hud, _super);
        // CONSTRUCTOR +++++++++++++++++++++++++++++++++++++++++++++++++++++
        function Hud() {
            _super.call(this);

            this._init();
            this._drawBorders();
            this._drawStatLabels();
        }
        // PUBLIC METHODS
        Hud.prototype.update = function () {
            this._phaserEnergyValue.text = Math.floor(this.phaserEnergy).toString();
            this._phaserEnergyValue.color = utility.textColour(this.phaserEnergy);
            this._hullIntegrityValue.text = Math.floor(this.hullIntegrity).toString();
            this._hullIntegrityValue.color = utility.textColour(this.hullIntegrity);
            this._photonValue.text = Math.floor(this.photonNumber).toString();
            if (this.photonNumber < 1) {
                this._photonValue.color = config.RED;
            } else {
                this._photonValue.color = config.GREEN;
            }
        };

        // PRIVATE METHODS
        // Initialize values
        Hud.prototype._init = function () {
            this.phaserEnergy = config.PHASER_LEVEL;
            this.hullIntegrity = config.INTEGRITY;
            this.photonNumber = config.PHOTON_NUM;
        };

        // Draw labels onto the HUD
        Hud.prototype._drawStatLabels = function () {
            this._phaserEnergyLabel = new createjs.Text("PHASERS", config.FONT_SIZE + " " + config.FONT, config.FONT_COLOUR);
            this._phaserEnergyLabel.x = 40;
            this.addChild(this._phaserEnergyLabel);

            this._phaserEnergyValue = new createjs.Text(this.phaserEnergy.toString(), config.FONT_SIZE + " " + config.FONT, config.GREEN);
            this._phaserEnergyValue.x = 120;
            this.addChild(this._phaserEnergyValue);

            this._hullIntegrityLabel = new createjs.Text("HULL", config.FONT_SIZE + " " + config.FONT, config.FONT_COLOUR);
            this._hullIntegrityLabel.x = 180;
            this.addChild(this._hullIntegrityLabel);

            this._hullIntegrityValue = new createjs.Text(this.hullIntegrity.toString(), config.FONT_SIZE + " " + config.FONT, config.GREEN);
            this._hullIntegrityValue.x = 230;
            this.addChild(this._hullIntegrityValue);

            this._photonLabel = new createjs.Text("PHOTONS", config.FONT_SIZE + " " + config.FONT, config.FONT_COLOUR);
            this._photonLabel.x = 290;
            this.addChild(this._photonLabel);

            this._photonValue = new createjs.Text(this.photonNumber.toString(), config.FONT_SIZE + " " + config.FONT, config.GREEN);
            this._photonValue.x = 370;
            this.addChild(this._photonValue);
        };

        // Draw HUD Borders (Yellow)
        Hud.prototype._drawBorders = function () {
            this._leftBorder = new createjs.Bitmap(managers.Assets.loader.getResult("hudLS"));
            this._rightBorder = new createjs.Bitmap(managers.Assets.loader.getResult("hudRS"));
            this._rightBorder.x = stage.canvas.width - this._rightBorder.getBounds().width;
            this.addChild(this._leftBorder, this._rightBorder);
        };
        return Hud;
    })(createjs.Container);
    objects.Hud = Hud;
})(objects || (objects = {}));
//# sourceMappingURL=hud.js.map
