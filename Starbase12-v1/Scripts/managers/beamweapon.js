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
            for (var tracerNum = 0; tracerNum < this.tracers.length; tracerNum++) {
                this.tracers[tracerNum].update();
            }
            this._checkPhaserStrafe();
        };

        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // Set phaser state to Strafing
        BeamWeapon.prototype._phaserStrafing = function () {
            // check to see if phaser sound is still playing
            if (this.phaserSound.playState != createjs.Sound.PLAY_FINISHED) {
                this._strafe = true;
            }
        };

        // Fire Phaser and Play Sound
        BeamWeapon.prototype._phaserStart = function () {
            var tracer = new objects.PhaserTracer();
            this.tracers.push(tracer);

            this.phaserSound = createjs.Sound.play("phaser");
            this.phaserSound.on("complete", this.destroy, this);

            var phaser = new objects.Phaser(tracer);
            this.phasers.push(phaser);
        };

        // Check if player is firing and moving mouse
        BeamWeapon.prototype._checkPhaserStrafe = function () {
            if (this._strafe) {
                var tracer = new objects.PhaserTracer();
                var phaser = new objects.Phaser(tracer);

                this._removePhaser();
                this.tracers.push(tracer);
                this.phasers.push(phaser);
            }
        };

        // Remove last Phaser
        BeamWeapon.prototype._removePhaser = function () {
            game.removeChild(this.phasers[this.phasers.length - 1]);
            this.phasers.pop();

            //game.removeChild(this.tracers[this.tracers.length - 1]);
            this.tracers.pop();
        };
        return BeamWeapon;
    })();
    managers.BeamWeapon = BeamWeapon;
})(managers || (managers = {}));
//# sourceMappingURL=beamweapon.js.map
