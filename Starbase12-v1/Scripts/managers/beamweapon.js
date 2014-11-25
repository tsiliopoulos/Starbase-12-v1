// BeamWeapon Manager Class
var managers;
(function (managers) {
    var BeamWeapon = (function () {
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        function BeamWeapon() {
            // PUBLIC PROPERTIES +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            this.phasers = [];
            this.tracers = [];
            // PRIVATE PROPERTIES ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            this._strafe = false;
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
