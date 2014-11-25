var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../managers/asset.ts" />
// GAME OBJECT SUPERCLASS
var objects;
(function (objects) {
    var GameObject = (function (_super) {
        __extends(GameObject, _super);
        // CONSTRUCTOR +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        function GameObject(SpriteName) {
            _super.call(this, managers.Assets.atlas, SpriteName);
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.regX = this.width * 0.5;
            this.regY = this.height * 0.5;
            this.location = new createjs.Point();
            this.width >= this.height ? this.radius = this.width * 0.5 : this.radius = this.height * 0.5;
            this.hit = new createjs.Shape();
            this.hit.graphics.beginFill("#FFF").drawCircle(this.x, this.y, this.radius);
        }
        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // Calculate the game object's new x and y coordinates
        GameObject.prototype.calcVector = function () {
            var radians = this.direction * (Math.PI / 180);
            this.dx = this.speed * Math.cos(radians);
            this.dy = this.speed * Math.sin(radians);
            this.dy *= -1;
        };

        // Calculate the game object's new position
        GameObject.prototype.calcPosition = function () {
            this.x += this.dx;
            this.y += this.dy;
        };

        // Calculate the game object's hit area
        GameObject.prototype.calcHitArea = function () {
            this.hit.x = this.x;
            this.hit.y = this.y;
            this.hitArea = this.hit;
        };

        GameObject.prototype.shieldsUp = function () {
            this.shield = new objects.Shield(this);
            this.shield.regX = this.shield.width * 0.5;
            this.shield.regY = this.shield.height * 0.5;
            this.shield.x = this.x;
            this.shield.y = this.y;
            game.addChild(this.shield);
        };

        GameObject.prototype.shieldsDown = function () {
            game.removeChild(this.shield);
        };

        GameObject.prototype.turnLeft = function () {
            this.rotation -= this.turnRate;
            this.direction += this.turnRate;
            if (this.direction > 360) {
                this.direction = this.turnRate;
            }
            this.shield.rotation = this.rotation;
            this.width = this.getTransformedBounds().width;
            this.height = this.getTransformedBounds().height;
            this.width >= this.height ? this.radius = this.width * 0.5 : this.radius = this.height * 0.5;
        };

        GameObject.prototype.turnRight = function () {
            this.rotation += this.turnRate;
            this.direction -= this.turnRate;
            if (this.direction < 0) {
                this.direction = 360 - this.turnRate;
            }
            this.shield.rotation = this.rotation;
            this.width = this.getTransformedBounds().width;
            this.height = this.getTransformedBounds().height;
            this.width >= this.height ? this.radius = this.width * 0.5 : this.radius = this.height * 0.5;
        };
        return GameObject;
    })(createjs.Sprite);
    objects.GameObject = GameObject;
})(objects || (objects = {}));
//# sourceMappingURL=gameobject.js.map
