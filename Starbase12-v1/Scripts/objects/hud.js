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

            this._drawBorders();
            this._drawStatLabels();
        }
        // PRIVATE METHODS
        // Draw labels onto the HUD
        Hud.prototype._drawStatLabels = function () {
            this._phaserEnergy = new createjs.Text("PHASER ENERGY", config.FONT_SIZE + " " + config.FONT, config.FONT_COLOUR);
            this._phaserEnergy.x = 40;
            this.addChild(this._phaserEnergy);
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
