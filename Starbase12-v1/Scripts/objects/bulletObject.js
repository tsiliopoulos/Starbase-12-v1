var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    var BulletObject = (function (_super) {
        __extends(BulletObject, _super);
        function BulletObject(bulletName) {
            _super.call(this, bulletName);
        }
        return BulletObject;
    })(objects.GameObject);
    objects.BulletObject = BulletObject;
})(objects || (objects = {}));
//# sourceMappingURL=bulletObject.js.map
