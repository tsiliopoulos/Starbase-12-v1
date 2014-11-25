var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    var PhaserBullet = (function (_super) {
        __extends(PhaserBullet, _super);
        // CONSTRUCTOR +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        function PhaserBullet() {
            this._drawBullet();
            _super.call(this, this._bullet);
        }
        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        PhaserBullet.prototype._drawBullet = function () {
            this._bullet = new createjs.Graphics();
            this._bullet.beginFill("#FFF").drawCircle(0, 0, 1);
        };
        return PhaserBullet;
    })(createjs.Shape);
    objects.PhaserBullet = PhaserBullet;
})(objects || (objects = {}));
//# sourceMappingURL=phaserbullet.js.map
