var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    var Hud = (function (_super) {
        __extends(Hud, _super);
        function Hud() {
            _super.call(this);

            this.drawBorders();
        }
        Hud.prototype.drawBorders = function () {
            this.leftBorder = new createjs.Bitmap(managers.Assets.loader.getResult("hudLS"));
            this.rightBorder = new createjs.Bitmap(managers.Assets.loader.getResult("hudRS"));
            this.rightBorder.x = stage.canvas.width - this.rightBorder.getBounds().width;
            this.addChild(this.leftBorder, this.rightBorder);
        };
        return Hud;
    })(createjs.Container);
    objects.Hud = Hud;
})(objects || (objects = {}));
//# sourceMappingURL=hud.js.map
