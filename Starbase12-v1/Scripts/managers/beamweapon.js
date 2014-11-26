// BeamWeapon Manager Class
var managers;
(function (managers) {
    var BeamWeapon = (function () {
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        function BeamWeapon() {
            // PUBLIC PROPERTIES +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            this.phasers = [];
            this.tracers = [];
            this.disruptors = [];
            this.randomShot = [];
            // PRIVATE PROPERTIES ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            this._strafe = false;
            this._disruptorNum = 0;
            game.on("mousedown", this._phaserStart, this);
            game.on("pressup", this.destroy, this);
            game.on("pressmove", this._phaserStrafing, this);
        }
        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // Stop Phaser
        BeamWeapon.prototype.destroy = function () {
            this._strafe = false;
            this._removePhaser();
        };

        // Update Phaser
        BeamWeapon.prototype.update = function () {
            this._checkPhaserStrafe();
            this._updateTracer();
            this._regeneratePhaser();

            this._checkDisruptorFire();
            this._updateDisruptor();
        };

        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // Create Phaser Tracer Objects
        BeamWeapon.prototype._createTracer = function () {
            var tracer = new objects.PhaserTracer();
            this.tracers.push(tracer);
            game.addChild(tracer);
        };

        // Update Tracer Position on screen and remove if tracer stops
        BeamWeapon.prototype._updateTracer = function () {
            for (var tracerNum = 0; tracerNum < this.tracers.length; tracerNum++) {
                var tracer = this.tracers[tracerNum];
                tracer.update();
                if (tracer.speed == 0) {
                    this.tracers.splice(tracerNum, 1);
                    game.removeChild(tracer);
                }
            }
        };

        BeamWeapon.prototype._regeneratePhaser = function () {
            hud.phaserEnergy = hud.phaserEnergy + 0.25;
            if (hud.phaserEnergy > 100) {
                hud.phaserEnergy = 100;
            }
        };

        // Set phaser state to Strafing
        BeamWeapon.prototype._phaserStrafing = function () {
            // check to see if phaser sound is still playing
            if ((hud.phaserEnergy > 0) && (this.phaserSound.playState != createjs.Sound.PLAY_FINISHED)) {
                this._strafe = true;
            }
        };

        // Fire Phaser and Play Sound
        BeamWeapon.prototype._phaserStart = function () {
            if (hud.phaserEnergy > 0) {
                this.phaserSound = createjs.Sound.play("phaser");
                this.phaserSound.on("complete", this.destroy, this);
                hud.phaserEnergy = Math.floor(hud.phaserEnergy * 0.9);
                if (hud.phaserEnergy <= 0) {
                    hud.phaserEnergy = 0;
                }

                this._createTracer();

                var phaser = new objects.Phaser();
                this.phasers.push(phaser);
            }
        };

        // Check if player is firing and moving mouse
        BeamWeapon.prototype._checkPhaserStrafe = function () {
            if (this._strafe) {
                this._createTracer();

                var phaser = new objects.Phaser();
                this._removePhaser();
                this.phasers.push(phaser);
                hud.phaserEnergy--;
                if (hud.phaserEnergy <= 0) {
                    hud.phaserEnergy = 0;
                }
            }
        };

        // Check if enemy is firing disruptor
        BeamWeapon.prototype._checkDisruptorFire = function () {
            for (var enemyNum = 0; enemyNum < enemies.length; enemyNum++) {
                this.randomShot[enemyNum] = Math.floor(Math.random() * 30 + 20);
                if ((enemies[enemyNum].disruptorFire) && (this._disruptorNum % this.randomShot[enemyNum] == 0)) {
                    this.disruptorSound = createjs.Sound.play("disruptor");
                    var disruptor = new objects.Disruptor(enemies[enemyNum]);
                    disruptor.rotation = enemies[enemyNum].rotation;
                    this.disruptors.push(disruptor);
                    game.addChild(disruptor);
                }
            }
            this._disruptorNum++;
        };

        // Update Disruptor
        BeamWeapon.prototype._updateDisruptor = function () {
            for (var Num = 0; Num < this.disruptors.length; Num++) {
                var disruptor = this.disruptors[Num];
                disruptor.update();
                if (disruptor.speed == 0) {
                    this.disruptors.splice(Num, 1);
                    game.removeChild(disruptor);
                }
            }
        };

        // Remove last Phaser
        BeamWeapon.prototype._removePhaser = function () {
            game.removeChild(this.phasers[this.phasers.length - 1]);
            this.phasers.pop();
        };
        return BeamWeapon;
    })();
    managers.BeamWeapon = BeamWeapon;
})(managers || (managers = {}));
//# sourceMappingURL=beamweapon.js.map
