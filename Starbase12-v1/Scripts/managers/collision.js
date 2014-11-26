/// <reference path="../utility/distance.ts" />
/// <reference path="beamweapon.ts" />
// Collision Manager Class
var managers;
(function (managers) {
    var Collision = (function () {
        // CONSTRUCTOR +++++++++++++++++++++++++++++++++++++++++++++++++++
        function Collision() {
            this._distance = utility.Distance.calculate;
        }
        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++++++++
        // Check for collisions between phasers and enemy shields
        Collision.prototype._checkPhaserAndShields = function () {
            var tracerPosition = this._currentTracer.position;
            for (var enemyNum = 0; enemyNum < enemies.length; enemyNum++) {
                for (var arcNum = 0; arcNum < config.ARC_COUNT; arcNum++) {
                    var currentArc = enemies[enemyNum].shield.arcs[arcNum];

                    // Check if current Shield Arc is up
                    if ((currentArc.strength > 0) && (currentArc.alpha > 0)) {
                        // Declare Alias Variables in limited scope
                        var arcX = enemies[enemyNum].shield.arcs[arcNum].center.x;
                        var arcY = enemies[enemyNum].shield.arcs[arcNum].center.y;

                        var arcPosition = currentArc.localToGlobal(arcX, arcY);
                        var arcRadius = currentArc.radius;

                        // Check if there is a hit
                        if (this._distance(tracerPosition, arcPosition) < (arcRadius + this._currentTracer.radius)) {
                            currentArc.strength -= (hud.phaserEnergy * 0.10);
                            currentArc.alpha = currentArc.strength * 0.01;
                            createjs.Sound.play("shield");
                            if (currentArc.strength <= 1) {
                                currentArc.alpha = 0;
                            }
                            this._currentTracer.speed = 0;
                        }
                    }
                }
            }
        };

        // Check for collisions between phasers and enemy ship
        Collision.prototype._checkPhaserAndEnemy = function () {
            var tracerPosition = this._currentTracer.position;
            for (var enemyNum = 0; enemyNum < enemies.length; enemyNum++) {
                var enemy = enemies[enemyNum];
                if (this._distance(tracerPosition, enemy.location) < (enemy.radius + this._currentTracer.radius)) {
                    enemy.integrity -= (hud.phaserEnergy * 0.05);

                    if (enemy.integrity <= 1) {
                        createjs.Sound.play("explosion");
                        enemies.splice(enemyNum, 1);
                        enemy.shieldsDown();
                        game.removeChild(enemy.integrityLabel);
                        game.removeChild(enemy);
                    }
                    this._currentTracer.speed = 0;
                }
            }
        };

        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++++++++
        // Update Method
        Collision.prototype.update = function () {
            if ((beamWeapon.phasers.length > 0) && (beamWeapon.tracers.length > 0)) {
                this._currentTracer = beamWeapon.tracers[beamWeapon.phasers.length - 1];
                if (enemies.length > 0) {
                    this._checkPhaserAndShields();
                    this._checkPhaserAndEnemy();
                }
            }
        };
        return Collision;
    })();
    managers.Collision = Collision;
})(managers || (managers = {}));
//# sourceMappingURL=collision.js.map
