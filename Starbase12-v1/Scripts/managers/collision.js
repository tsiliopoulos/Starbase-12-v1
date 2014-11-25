/// <reference path="../utility/distance.ts" />
/// <reference path="beamweapon.ts" />
// Collision Manager Class
var managers;
(function (managers) {
    var Collision = (function () {
        // CONSTRUCTOR +++++++++++++++++++++++++++++++++++++++++++++++++++
        function Collision() {
        }
        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++++++++
        // Check for collisions between phasers and enemy shields
        Collision.prototype.checkPhaserAndShields = function () {
            for (var enemyNum = 0; enemyNum < config.ENEMY_COUNT; enemyNum++) {
                for (var arcNum = 0; arcNum < config.ARC_COUNT; arcNum++) {
                    var distance = utility.Distance.calculate;

                    var tracerPosition = enemies[enemyNum].shield.arcs[arcNum].localToLocal(0, 0, this._currentTracer);
                    var arcCenter = enemies[enemyNum].shield.arcs[arcNum].center;
                    var arcRadius = enemies[enemyNum].shield.arcs[arcNum].radius;

                    if (distance(tracerPosition, arcCenter) < arcRadius) {
                        enemies[enemyNum].shield.removeChild(enemies[enemyNum].shield.arcs[arcNum]);
                        console.log(enemies[enemyNum].shield.arcs[arcNum] + " is hit!");
                    }
                }
            }
        };

        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++++++++
        // Update Method
        Collision.prototype.update = function () {
            if (beamWeapon.phasers.length > 0) {
                this._currentTracer = beamWeapon.tracers[beamWeapon.phasers.length - 1];
                this.checkPhaserAndShields();
            }
        };
        return Collision;
    })();
    managers.Collision = Collision;
})(managers || (managers = {}));
//# sourceMappingURL=collision.js.map
