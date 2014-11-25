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
            this.arcs = [];
            this._entity = entity;
            this._shipName = this._entity.name;
            this.location = new createjs.Point();

            this._createShields();
            this.width = this.arcs[config.TOP_LEFT].getBounds().width + this.arcs[config.TOP_RIGHT].getBounds().width;
            this.height = this.arcs[config.TOP_LEFT].getBounds().height + this.arcs[config.BOT_LEFT].getBounds().height;
        }
        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++++++++
        // Update Method
        Shield.prototype.update = function () {
            this.x = this._entity.x;
            this.y = this._entity.y;
            this.location.x = this.x;
            this.location.y = this.y;
        };

        // Remove Shield Object from game
        Shield.prototype.destroy = function () {
            game.removeChild(this);
        };

        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++++++++++
        // Create the Shield Objects
        Shield.prototype._createShields = function () {
            // Top Left Arc
            this.arcs[config.TOP_LEFT] = new objects.ShieldArcObject(this._shipName + "TL");

            // Top Right Arc
            this.arcs[config.TOP_RIGHT] = new objects.ShieldArcObject(this._shipName + "TR");
            this.arcs[config.TOP_RIGHT].x = this.arcs[config.TOP_LEFT].x + this.arcs[config.TOP_LEFT].width;
            this.arcs[config.TOP_RIGHT].center.x += this.arcs[config.TOP_LEFT].width;

            // Bottom Left Arc
            this.arcs[config.BOT_LEFT] = new objects.ShieldArcObject(this._shipName + "BL");
            this.arcs[config.BOT_LEFT].y = this.arcs[config.TOP_LEFT].height;
            this.arcs[config.BOT_LEFT].center.y += this.arcs[config.TOP_LEFT].height;

            // Bottom Right Arc
            this.arcs[config.BOT_RIGHT] = new objects.ShieldArcObject(this._shipName + "BR");
            this.arcs[config.BOT_RIGHT].x = this.arcs[config.TOP_LEFT].width;
            this.arcs[config.BOT_RIGHT].y = this.arcs[config.TOP_LEFT].height;
            this.arcs[config.BOT_RIGHT].center.x += this.arcs[config.TOP_LEFT].width;
            this.arcs[config.BOT_RIGHT].center.y += this.arcs[config.TOP_LEFT].height;

            for (var arcNum = 0; arcNum < 4; arcNum++) {
                this.addChild(this.arcs[arcNum]);
            }
        };
        return Shield;
    })(createjs.Container);
    objects.Shield = Shield;
})(objects || (objects = {}));
//# sourceMappingURL=shield.js.map
