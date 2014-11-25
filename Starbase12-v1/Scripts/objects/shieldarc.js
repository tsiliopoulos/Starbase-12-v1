var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    var ShieldArcObject = (function (_super) {
        __extends(ShieldArcObject, _super);
        function ShieldArcObject(SpriteName) {
            _super.call(this, managers.Assets.atlas, SpriteName);
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.location = new createjs.Point();
            this.width >= this.height ? this.radius = this.width * 0.5 : this.radius = this.height * 0.5;
        }
        return ShieldArcObject;
    })(createjs.Sprite);
    objects.ShieldArcObject = ShieldArcObject;
})(objects || (objects = {}));
//# sourceMappingURL=shieldarc.js.map
