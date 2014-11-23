var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
// Shield Class
var objects;
(function (objects) {
    var Shield = (function (_super) {
        __extends(Shield, _super);
        // CONSTRUCTOR +++++++++++++++++++++++++++++++++++++++++++++++++++++
        function Shield(entity) {
            _super.call(this);
            this._entity = entity;
            this._shipName = this._entity.name;

            this._createShields();
            this.width = this.topLeft.getBounds().width + this.topRight.getBounds().width;
            this.height = this.topLeft.getBounds().height + this.botLeft.getBounds().height;
        }
        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++++++++
        // Update Method
        Shield.prototype.update = function () {
            this.x = this._entity.x;
            this.y = this._entity.y;
        };

        // Remove Shield Object from game
        Shield.prototype.destroy = function () {
            game.removeChild(this);
        };

        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++++++++++
        // Create the Shield Objects
        Shield.prototype._createShields = function () {
            this.topLeft = new createjs.Sprite(managers.Assets.atlas, this._shipName + "TL");
            this.topRight = new createjs.Sprite(managers.Assets.atlas, this._shipName + "TR");
            this.topRight.x = this.topLeft.getBounds().width;
            this.botLeft = new createjs.Sprite(managers.Assets.atlas, this._shipName + "BL");
            this.botLeft.y = this.topLeft.getBounds().height;
            this.botRight = new createjs.Sprite(managers.Assets.atlas, this._shipName + "BR");
            this.botRight.x = this.topLeft.getBounds().width;
            this.botRight.y = this.topLeft.getBounds().height;
            this.addChild(this.topLeft, this.topRight, this.botLeft, this.botRight);
        };
        return Shield;
    })(createjs.Container);
    objects.Shield = Shield;
})(objects || (objects = {}));
//# sourceMappingURL=shield.js.map
