var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    var Shield = (function (_super) {
        __extends(Shield, _super);
        function Shield(x, y, width, height) {
            var startAngle = 0 * (Math.PI / 180);
            var endAngle = 20 * (Math.PI / 180);
            this.front = new createjs.Shape();
            this.front.graphics.beginStroke("#FFF");
            this.front.graphics.arc(x, y, height, startAngle, endAngle, false);
            stage.addChild(this.front);
            this.front.x = x;
            this.front.y = y;
        }
        return Shield;
    })(createjs.Shape);
    objects.Shield = Shield;
})(objects || (objects = {}));
//# sourceMappingURL=shields.js.map
