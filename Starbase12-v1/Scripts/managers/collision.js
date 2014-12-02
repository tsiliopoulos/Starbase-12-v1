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
        // Method to determine if an attack object hits a defender's shields
        Collision.prototype._shieldCollider = function (attackObject, defendObject) {
            var attackerPosition = attackObject.location;
            var shield = defendObject.shield;

            // Check if current Shield Arc is up
            if (utility.distance(attackerPosition, shield.location) < (shield.radius + attackObject.radius)) {
                var incomingAngle = 0;
                var attackerDirection = attackObject.direction;
                var arcNum;

                // Determine Angle of Attack (i.e. which shield is being attacked)
                incomingAngle = utility.oppositeAngle(attackerDirection);
                incomingAngle += defendObject.rotation;
                incomingAngle %= 360;
                arcNum = utility.Quadrant(incomingAngle);
                var currentArc = shield.arcs[arcNum];

                // check if shield arc is up
                if ((currentArc.integrity > 0) && (currentArc.alpha > 0)) {
                    if (attackObject.name == "ship") {
                        currentArc.integrity -= attackObject.damage * (hud.phaserEnergy * 0.01);
                    } else {
                        currentArc.integrity -= attackObject.damage;
                    }
                    createjs.Sound.play("shield");
                    if (defendObject.name == "klingon") {
                        currentArc.alpha = currentArc.integrity * 0.01;
                    } else {
                        var arcString = utility.getArcString(defendObject.name, arcNum);
                        if ((currentArc.integrity > 35) && (currentArc.integrity < 61)) {
                            arcString += "Y";
                            currentArc.gotoAndPlay(arcString);
                        } else if ((currentArc.integrity > 1) && (currentArc.integrity < 36)) {
                            arcString += "R";
                            currentArc.gotoAndPlay(arcString);
                        }
                    }
                    if (currentArc.integrity < 1) {
                        currentArc.alpha = 0;
                    }
                    attackObject.speed = 0;
                }
            }
        };

        // Method to determine if an attack object hits a defender's hull
        Collision.prototype._hullCollider = function (attackObject, defendObject, defenderIndex) {
            var attackerPosition = attackObject.location;
            if (utility.distance(attackerPosition, defendObject.location) < (attackObject.radius + (defendObject.radius * 0.7))) {
                var hullString = defendObject.name;
                if (attackObject.name == "tracer") {
                    defendObject.integrity -= attackObject.damage * (hud.phaserEnergy * 0.01);
                } else {
                    defendObject.integrity -= attackObject.damage;
                }
                if (defendObject.name != "klingon") {
                    if ((defendObject.integrity > 35) && (defendObject.integrity < 61)) {
                        hullString += "Y";
                        defendObject.gotoAndPlay(hullString);
                    }
                    if ((defendObject.integrity > 1) && (defendObject.integrity < 35)) {
                        hullString += "R";
                        defendObject.gotoAndPlay(hullString);
                    }
                }
                if (defendObject.integrity < 1) {
                    // Display Particle Explosion
                    particleExplosion.addExplosion(defendObject.x, defendObject.y);

                    createjs.Sound.play("explosion");
                    defendObject.shieldsDown();
                    if (defendObject.name == "klingon") {
                        enemies.splice(defenderIndex, 1);
                    }
                    game.removeChild(defendObject.integrityLabel);
                    game.removeChild(defendObject);

                    switch (defendObject.name) {
                        case "starbase":
                            beamWeapon.starbaseAlive = false;
                            break;
                        case "ship":
                            beamWeapon.playerAlive = false;
                            break;
                    }
                }
                attackObject.speed = 0;
            }
        };

        // Check for collisions between phasers and enemy shields
        Collision.prototype._checkPhaserAndEnemyShields = function () {
            for (var enemyNum = 0; enemyNum < enemies.length; enemyNum++) {
                var enemy = enemies[enemyNum];
                this._shieldCollider(this._currentTracer, enemy);
            }
        };

        // Check for collisions between phasers and enemy ship
        Collision.prototype._checkPhaserAndEnemy = function () {
            var tracerPosition = this._currentTracer.location;
            for (var enemyNum = 0; enemyNum < enemies.length; enemyNum++) {
                var enemy = enemies[enemyNum];
                this._hullCollider(this._currentTracer, enemy, enemyNum);
            }
        };

        // Check for collisions between photons and enemy shields
        Collision.prototype._checkPhotonAndEnemyShields = function () {
            for (var enemyNum = 0; enemyNum < enemies.length; enemyNum++) {
                var enemy = enemies[enemyNum];
                this._shieldCollider(this._currentPhoton, enemy);
            }
        };

        // Check for collisions between photons and enemy ship
        Collision.prototype._checkPhotonAndEnemy = function () {
            var photonPosition = this._currentPhoton.location;
            for (var enemyNum = 0; enemyNum < enemies.length; enemyNum++) {
                var enemy = enemies[enemyNum];
                this._hullCollider(this._currentPhoton, enemy, enemyNum);
            }
        };

        // Collision between Disruptor and Starbase Shields
        Collision.prototype._checkDisruptorAndStarbaseShields = function () {
            this._shieldCollider(this._currentDisruptor, starbase);
        };

        // Check for collisions between Disruptor and Starbase Hull
        Collision.prototype._checkDisruptorAndStarbase = function () {
            this._hullCollider(this._currentDisruptor, starbase, 0);
        };

        // Collision between Disruptor and Starbase Shields
        Collision.prototype._checkDisruptorAndPlayerShields = function () {
            this._shieldCollider(this._currentDisruptor, player);
        };

        // Check for collisions between Disruptor and Starbase Hull
        Collision.prototype._checkDisruptorAndPlayer = function () {
            this._hullCollider(this._currentDisruptor, player, 0);
        };

        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++++++++
        // Update Method
        Collision.prototype.update = function () {
            // Check Phaser Collisions
            if ((beamWeapon.phasers.length > 0) && (beamWeapon.tracers.length > 0)) {
                this._currentTracer = beamWeapon.tracers[beamWeapon.phasers.length - 1];
                if (enemies.length > 0) {
                    this._checkPhaserAndEnemyShields();
                    this._checkPhaserAndEnemy();
                }
            }

            // Check Photon Collisions
            if (beamWeapon.photons.length > 0) {
                this._currentPhoton = beamWeapon.photons[beamWeapon.photons.length - 1];
                if (enemies.length > 0) {
                    this._checkPhotonAndEnemyShields();
                    this._checkPhotonAndEnemy();
                }
            }

            // Check Disruptor Collisions
            if (beamWeapon.disruptors.length > 0) {
                this._currentDisruptor = beamWeapon.disruptors[beamWeapon.disruptors.length - 1];
                if (starbase.integrity > 0) {
                    this._checkDisruptorAndStarbaseShields();
                    this._checkDisruptorAndStarbase();
                }
                if (player.integrity > 0) {
                    this._checkDisruptorAndPlayerShields();
                    this._checkDisruptorAndPlayer();
                }
            }
        };
        return Collision;
    })();
    managers.Collision = Collision;
})(managers || (managers = {}));
//# sourceMappingURL=collision.js.map
