var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    var Phaser = (function (_super) {
        __extends(Phaser, _super);
        function Phaser() {
            this.drawPhaser();
            _super.call(this, this.phaserBeam);
            game.addChildAt(this, layer.PHASER);
        }
        Phaser.prototype.drawPhaser = function () {
            this.phaserBeam = new createjs.Graphics();
            this.phaserBeam.beginStroke("#FFF4CC").setStrokeStyle(2);
            this.phaserBeam.moveTo(player.x, player.y - 15).lineTo(stage.mouseX, stage.mouseY);
            this.phaserBeam.beginStroke("#AA4312").setStrokeStyle(5);
            this.phaserBeam.moveTo(player.x, player.y - 15).lineTo(stage.mouseX, stage.mouseY);
            this.phaserBeam.beginStroke("#FFF4CC").setStrokeStyle(2);
            this.phaserBeam.moveTo(player.x, player.y - 15).lineTo(stage.mouseX, stage.mouseY);
        };
        return Phaser;
    })(createjs.Shape);
    objects.Phaser = Phaser;
})(objects || (objects = {}));
//# sourceMappingURL=phaser.js.map
