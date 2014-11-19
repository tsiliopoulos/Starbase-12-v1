var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
// Crosshair object
var objects;
(function (objects) {
    var Crosshair = (function (_super) {
        __extends(Crosshair, _super);
        function Crosshair() {
            _super.call(this, "crosshair");
        }
        // Make Sure the crosshair stays on screen
        Crosshair.prototype.checkBounds = function () {
            // Check Right Bounds
            if (this.x >= config.WIDTH - (this.width * 0.5) - 31) {
                this.x = config.WIDTH - (this.width * 0.5) - 31;
            }

            // Check Left Bounds
            if (this.x <= (this.width * 0.5) + 31) {
                this.x = (this.width * 0.5) + 31;
            }

            // Check Lower Bounds
            if (this.y >= config.HEIGHT - (this.height * 0.5)) {
                this.y = config.HEIGHT - (this.height * 0.5);
            }

            // Check Upper Bounds
            if (this.y <= (this.height * 0.5)) {
                this.y = (this.height * 0.5);
            }
        };

        Crosshair.prototype.update = function () {
            this.x = stage.mouseX;
            this.y = stage.mouseY;
            this.checkBounds();
        };
        return Crosshair;
    })(objects.GameObject);
    objects.Crosshair = Crosshair;
})(objects || (objects = {}));
//# sourceMappingURL=crosshair.js.map
