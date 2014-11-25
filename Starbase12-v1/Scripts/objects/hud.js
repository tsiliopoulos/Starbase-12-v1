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
        };

        // PRIVATE METHODS
        // Initialize values
        Hud.prototype._init = function () {
            this.phaserEnergy = 100;
        };

        // Draw labels onto the HUD
        Hud.prototype._drawStatLabels = function () {
            this._phaserEnergyLabel = new createjs.Text("PHASER ENERGY", config.FONT_SIZE + " " + config.FONT, config.FONT_COLOUR);
            this._phaserEnergyLabel.x = 40;
            this.addChild(this._phaserEnergyLabel);

            this._phaserEnergyValue = new createjs.Text(this.phaserEnergy.toString(), config.FONT_SIZE + " " + config.FONT, config.FONT_COLOUR);
            this._phaserEnergyValue.x = 170;
            this.addChild(this._phaserEnergyValue);
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
