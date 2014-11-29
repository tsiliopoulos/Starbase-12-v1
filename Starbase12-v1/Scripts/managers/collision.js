﻿/// <reference path="../utility/distance.ts" />
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
        Collision.prototype._checkPhaserAndEnemyShields = function () {
            var tracerPosition = this._currentTracer.position;
            for (var enemyNum = 0; enemyNum < enemies.length; enemyNum++) {
                var enemy = enemies[enemyNum];
                if (utility.distance(this._currentTracer.position, enemy.shield.location) < (this._currentTracer.radius + enemy.shield.radius)) {
                    for (var arcNum = 0; arcNum < config.ARC_COUNT; arcNum++) {
                        var currentArc = enemy.shield.arcs[arcNum];

                        // Check if current Shield Arc is up
                        if ((currentArc.integrity > 0) && (currentArc.alpha > 0)) {
                            // Declare Alias Variables in limited scope
                            var arcX = currentArc.x;
                            var arcY = currentArc.y;

                            var arcPosition = currentArc.localToGlobal(arcX, arcY);
                            var arcRadius = currentArc.radius;

                            // Check if there is a hit
                            if (utility.distance(tracerPosition, arcPosition) < (arcRadius + this._currentTracer.radius)) {
                                currentArc.integrity -= 5 * (hud.phaserEnergy * 0.01);
                                currentArc.alpha = currentArc.integrity * 0.01;
                                createjs.Sound.play("shield");
                                if (currentArc.integrity <= 1) {
                                    currentArc.alpha = 0;
                                }
                                this._currentTracer.speed = 0;
                            }
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
                if (utility.distance(tracerPosition, enemy.location) < (enemy.radius * 0.5 + this._currentTracer.radius)) {
                    enemy.integrity -= 5 * (hud.phaserEnergy * 0.01);

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

        // Collision between Disruptor and Starbase Shields
        Collision.prototype._checkDisruptorAndStarbaseShields = function () {
            var disruptorPosition = this._currentDisruptor.position;
            for (var arcNum = 0; arcNum < config.ARC_COUNT; arcNum++) {
                var currentArc = starbase.shield.arcs[arcNum];

                // Check if current Shield Arc is up
                if ((currentArc.integrity > 0) && (currentArc.alpha > 0)) {
                    // Declare Alias Variables in limited scope
                    var arcX = currentArc.x;
                    var arcY = currentArc.y;

                    var arcPosition = currentArc.localToGlobal(arcX, arcY);
                    var arcRadius = currentArc.radius;

                    // Check if there is a hit
                    if (utility.distance(disruptorPosition, arcPosition) < (arcRadius + this._currentDisruptor.radius)) {
                        currentArc.integrity -= 5;
                        createjs.Sound.play("shield");
                        var arcString = utility.getArcString("starbase", arcNum);
                        if ((currentArc.integrity > 36) && (currentArc.integrity <= 60)) {
                            arcString += "Y";
                            currentArc.gotoAndPlay(arcString);
                        } else if ((currentArc.integrity > 1) && (currentArc.integrity <= 35)) {
                            arcString += "R";
                            currentArc.gotoAndPlay(arcString);
                        } else if (currentArc.integrity <= 1) {
                            currentArc.alpha = 0;
                        }
                        this._currentDisruptor.speed = 0;
                    }
                }
            }
        };

        // Check for collisions between Disruptor and Starbase Hull
        Collision.prototype._checkDisruptorAndStarbase = function () {
            var disruptorPosition = this._currentDisruptor.position;
            var distance = utility.distance(disruptorPosition, starbase.location);
            if (utility.distance(disruptorPosition, starbase.location) < (starbase.radius * 0.5 + this._currentDisruptor.radius)) {
                starbase.integrity -= 5;
                if (starbase.integrity <= 60) {
                    starbase.gotoAndPlay("starbaseY");
                }
                if (starbase.integrity <= 35) {
                    starbase.gotoAndPlay("starbaseR");
                }
                if (starbase.integrity <= 1) {
                    beamWeapon.starbaseAlive = false;
                    createjs.Sound.play("explosion");
                    starbase.shieldsDown();
                    game.removeChild(starbase.integrityLabel);
                    game.removeChild(starbase);
                }
                this._currentDisruptor.speed = 0;
            }
        };

        // Collision between Disruptor and Starbase Shields
        Collision.prototype._checkDisruptorAndPlayerShields = function () {
            var disruptorPosition = this._currentDisruptor.position;
            for (var arcNum = 0; arcNum < config.ARC_COUNT; arcNum++) {
                var currentArc = player.shield.arcs[arcNum];

                // Check if current Shield Arc is up
                if ((currentArc.integrity > 0) && (currentArc.alpha > 0)) {
                    // Declare Alias Variables in limited scope
                    var arcX = currentArc.x;
                    var arcY = currentArc.y;

                    var arcPosition = currentArc.localToGlobal(arcX, arcY);
                    var arcRadius = currentArc.radius;

                    // Check if there is a hit
                    if (utility.distance(disruptorPosition, arcPosition) < (arcRadius + this._currentDisruptor.radius)) {
                        currentArc.integrity -= 5;
                        createjs.Sound.play("shield");
                        var arcString = utility.getArcString("ship", arcNum);
                        if ((currentArc.integrity > 36) && (currentArc.integrity <= 60)) {
                            arcString += "Y";
                            currentArc.gotoAndPlay(arcString);
                        } else if ((currentArc.integrity > 1) && (currentArc.integrity <= 35)) {
                            arcString += "R";
                            currentArc.gotoAndPlay(arcString);
                        } else if (currentArc.integrity <= 1) {
                            currentArc.alpha = 0;
                        }
                        this._currentDisruptor.speed = 0;
                    }
                }
            }
        };

        // Check for collisions between Disruptor and Starbase Hull
        Collision.prototype._checkDisruptorAndPlayer = function () {
            var disruptorPosition = this._currentDisruptor.position;
            var distance = utility.distance(disruptorPosition, player.location);
            if (utility.distance(disruptorPosition, player.location) < (player.radius * 0.5 + this._currentDisruptor.radius)) {
                player.integrity -= 5;
                hud.hullIntegrity = player.integrity;
                if ((player.integrity > 36) && (player.integrity <= 60)) {
                    player.gotoAndPlay("shipY");
                } else if ((player.integrity > 1) && (player.integrity <= 35)) {
                    player.gotoAndPlay("shipR");
                } else if (player.integrity <= 1) {
                    beamWeapon.playerAlive = false;
                    createjs.Sound.play("explosion");
                    player.shieldsDown();
                    game.removeChild(player);
                }
                this._currentDisruptor.speed = 0;
            }
        };

        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++++++++
        // Update Method
        Collision.prototype.update = function () {
            if ((beamWeapon.phasers.length > 0) && (beamWeapon.tracers.length > 0)) {
                this._currentTracer = beamWeapon.tracers[beamWeapon.phasers.length - 1];
                if (enemies.length > 0) {
                    this._checkPhaserAndEnemyShields();
                    this._checkPhaserAndEnemy();
                }
            }

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
