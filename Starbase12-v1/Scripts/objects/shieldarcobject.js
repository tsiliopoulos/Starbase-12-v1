var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
// Shield Arc Object Super Class
var objects;
(function (objects) {
    var ShieldArcObject = (function (_super) {
        __extends(ShieldArcObject, _super);
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        function ShieldArcObject(SpriteName) {
            _super.call(this, managers.Assets.atlas, SpriteName);
            this.name = SpriteName;
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.center = new createjs.Point();
            this.center.x = this.width * 0.5;
            this.center.y = this.height * 0.5;
            this.width >= this.height ? this.radius = this.width * 0.5 : this.radius = this.height * 0.5;
            this.strength = 100;
        }
        return ShieldArcObject;
    })(createjs.Sprite);
    objects.ShieldArcObject = ShieldArcObject;
})(objects || (objects = {}));
//# sourceMappingURL=shieldarcobject.js.map
