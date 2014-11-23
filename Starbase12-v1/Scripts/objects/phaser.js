var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="crosshair.ts" />
// Phaser Object Class
var objects;
(function (objects) {
    var Phaser = (function (_super) {
        __extends(Phaser, _super);
        function Phaser() {
            this._drawPhaser();
            _super.call(this, this._phaserBeam);
            game.addChildAt(this, layer.PHASER);
        }
        // PRIVATE METHODS
        // Create the Phaser Beam
        Phaser.prototype._drawPhaser = function () {
            this._phaserBeam = new createjs.Graphics();
            this._phaserBeam.beginStroke("#FFF4CC").setStrokeStyle(2);
            this._phaserBeam.moveTo(player.x, player.y - 15).lineTo(crosshair.x, crosshair.y);
            this._phaserBeam.beginStroke("#AA4312").setStrokeStyle(5);
            this._phaserBeam.moveTo(player.x, player.y - 15).lineTo(crosshair.x, crosshair.y);
            this._phaserBeam.beginStroke("#FFF4CC").setStrokeStyle(2);
            this._phaserBeam.moveTo(player.x, player.y - 15).lineTo(crosshair.x, crosshair.y);
        };
        return Phaser;
    })(createjs.Shape);
    objects.Phaser = Phaser;
})(objects || (objects = {}));
//# sourceMappingURL=phaser.js.map
