// BeamWeapon Manager Class
var managers;
(function (managers) {
    var BeamWeapon = (function () {
        // Constructor
        function BeamWeapon() {
            // Public Properties
            this.phasers = [];
            // Private Properties
            this._strafe = false;
            game.on("mousedown", this._phaserStart, this);
            game.on("pressup", this.destroy, this);
            game.on("pressmove", this._phaserStrafing, this);
        }
        // Set phaser state to Strafing
        BeamWeapon.prototype._phaserStrafing = function () {
            // check to see if phaser sound is still playing
            if (this._phaserSound.playState != createjs.Sound.PLAY_FINISHED) {
                this._strafe = true;
            }
        };

        // Fire Phaser and Play Sound
        BeamWeapon.prototype._phaserStart = function () {
            var phaser = new objects.Phaser();
            this.phasers.push(phaser);

            this._phaserSound = createjs.Sound.play("phaser");
            this._phaserSound.on("complete", this.destroy, this);
        };

        // Check if player is firing and moving mouse
        BeamWeapon.prototype._checkPhaserStrafe = function () {
            if (this._strafe) {
                var phaser = new objects.Phaser();
                this._removePhaser();
                this.phasers.push(phaser);
            }
        };

        // Remove last Phaser
        BeamWeapon.prototype._removePhaser = function () {
            game.removeChild(this.phasers[this.phasers.length - 1]);
            this.phasers.pop();
        };

        // Stop Phaser
        BeamWeapon.prototype.destroy = function () {
            this._strafe = false;
            this._removePhaser();
        };

        BeamWeapon.prototype.update = function () {
            this._checkPhaserStrafe();
        };
        return BeamWeapon;
    })();
    managers.BeamWeapon = BeamWeapon;
})(managers || (managers = {}));
//# sourceMappingURL=beamweapon.js.map
