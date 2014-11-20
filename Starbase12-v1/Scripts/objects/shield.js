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
        function Shield(entity) {
            _super.call(this);
            this.entity = entity;
            this.shipName = this.entity.name;

            this.createShields();
            this.width = this.topLeft.getBounds().width + this.topRight.getBounds().width;
            this.height = this.topLeft.getBounds().height + this.botLeft.getBounds().height;
        }
        Shield.prototype.createShields = function () {
            this.topLeft = new createjs.Sprite(managers.Assets.atlas, this.shipName + "TL");
            this.topRight = new createjs.Sprite(managers.Assets.atlas, this.shipName + "TR");
            this.topRight.x = this.topLeft.getBounds().width;
            this.botLeft = new createjs.Sprite(managers.Assets.atlas, this.shipName + "BL");
            this.botLeft.y = this.topLeft.getBounds().height;
            this.botRight = new createjs.Sprite(managers.Assets.atlas, this.shipName + "BR");
            this.botRight.x = this.topLeft.getBounds().width;
            this.botRight.y = this.topLeft.getBounds().height;
            this.addChild(this.topLeft, this.topRight, this.botLeft, this.botRight);
        };

        Shield.prototype.update = function () {
            this.x = this.entity.x;
            this.y = this.entity.y;
        };

        Shield.prototype.destroy = function () {
            game.removeChild(this);
        };
        return Shield;
    })(createjs.Container);
    objects.Shield = Shield;
})(objects || (objects = {}));
//# sourceMappingURL=shield.js.map
