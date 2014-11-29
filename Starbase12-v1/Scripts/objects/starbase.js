var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
// Starbase Class
var objects;
(function (objects) {
    var Starbase = (function (_super) {
        __extends(Starbase, _super);
        // CONSTRUCTOR +++++++++++++++++++++++++++++++++++++++++++++++++++++
        function Starbase() {
            _super.call(this, "starbase");

            this.name = "starbase";
            this.init();
            this._showHealth();
            this.shieldsUp();
            this.randomRotation();
        }
        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++++++++
        // Update Method
        Starbase.prototype.update = function () {
            switch (this._turnDirection) {
                case config.CLOCKWISE:
                    this.turnRight();
                    break;
                case config.COUNTERCLOCKWISE:
                    this.turnLeft();
                    break;
            }
            this.calcHitArea();
            this.shield.update();
            this.integrityLabel.x = this.x;
            this.integrityLabel.y = this.y;
            this.integrityLabel.text = Math.floor(this.integrity).toString();
        };

        // remove the starbase object from the game
        Starbase.prototype.destroy = function () {
            this.shield.destroy();
            game.removeChild(this);
        };

        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++++++++
        // Initialize starbase properties
        Starbase.prototype.init = function () {
            this.turnRate = 0.1;
            this.speed = 0;
            this.direction = 90;
            this.dx = 0;
            this.dy = 0;
        };

        // Show Health of Starbase Ship
        Starbase.prototype._showHealth = function () {
            this.integrityLabel = new createjs.Text(this.integrity.toString(), config.FONT_SIZE + " " + config.FONT, "#000");
            this.integrityLabel.regX = this.integrityLabel.getBounds().width * 0.5;
            this.integrityLabel.regY = this.integrityLabel.getBounds().height * 0.5;
        };

        // Rotate the Starbase in a random direction
        Starbase.prototype.randomRotation = function () {
            var turnProbability = Math.floor(Math.random() * 100 + 1);
            if (turnProbability > 50) {
                this._turnDirection = config.CLOCKWISE;
            } else {
                this._turnDirection = config.COUNTERCLOCKWISE;
            }
        };
        return Starbase;
    })(objects.GameObject);
    objects.Starbase = Starbase;
})(objects || (objects = {}));
//# sourceMappingURL=starbase.js.map
