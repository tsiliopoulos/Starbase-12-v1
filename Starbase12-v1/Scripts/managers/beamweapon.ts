// BeamWeapon Manager Class
module managers {
    export class BeamWeapon {
        // Public Properties
        public phasers: objects.Phaser[] = [];

        // Private Properties
        private _strafe: boolean = false;
        private _phaserSound: createjs.SoundInstance;

        // Constructor
        constructor() {

            game.on("mousedown", this._phaserStart, this);
            game.on("pressup", this.destroy, this);
            game.on("pressmove", this._phaserStrafing, this);
        }

        // Set phaser state to Strafing
        private _phaserStrafing() {
            // check to see if phaser sound is still playing
            if (this._phaserSound.playState != createjs.Sound.PLAY_FINISHED) {
                this._strafe = true;
            }
        }

        // Fire Phaser and Play Sound
        private _phaserStart() {

            var phaser = new objects.Phaser();
            this.phasers.push(phaser);

            this._phaserSound = createjs.Sound.play("phaser");
            this._phaserSound.on("complete", this.destroy, this);

        }

        // Check if player is firing and moving mouse
        private _checkPhaserStrafe() {
            if (this._strafe) {
                var phaser = new objects.Phaser();
                this._removePhaser();
                this.phasers.push(phaser);
            }
        }

        // Remove last Phaser
        private _removePhaser() {
            game.removeChild(this.phasers[this.phasers.length - 1]);
            this.phasers.pop();
        }

        // Stop Phaser
        public destroy() {
            this._strafe = false;
            this._removePhaser();
        }

        public update() {
            this._checkPhaserStrafe();

        }
    }
}