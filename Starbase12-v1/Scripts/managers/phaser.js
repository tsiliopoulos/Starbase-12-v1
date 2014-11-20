var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var managers;
(function (managers) {
    var Phaser = (function (_super) {
        __extends(Phaser, _super);
        function Phaser() {
            this.shipOrigin = new createjs.Point();
            this.shipOrigin.x = player.x;
            this.shipOrigin.y = player.y;
            this.phaserTarget = new createjs.Point();
            this.phaserTarget.x = stage.mouseX;
            this.phaserTarget.y = stage.mouseY;

            this.phaserRange = Math.floor(utility.Distance.calculate(this.shipOrigin, this.phaserTarget));

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
            createjs.Sound.play("phaser");
        };
        return Phaser;
    })(createjs.Shape);
    managers.Phaser = Phaser;
})(managers || (managers = {}));
//# sourceMappingURL=phaser.js.map
