// BeamWeapon Manager Class
module managers {
    export class BeamWeapon {
        // PUBLIC PROPERTIES +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        public phasers: objects.Phaser[] = [];
        public tracers: objects.PhaserTracer[] = [];
        public phaserSound: createjs.SoundInstance;

        // PRIVATE PROPERTIES ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        private _strafe: boolean = false;

        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            game.on("mousedown", this._phaserStart, this);
            game.on("pressup", this.destroy, this);
            game.on("pressmove", this._phaserStrafing, this);
        }

        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

        // Stop Phaser
        public destroy() {
            this._strafe = false;
            this._removePhaser();
        }

        // Update Phaser
        public update() {
            for (var tracerNum = 0; tracerNum < this.tracers.length; tracerNum++) {
                this.tracers[tracerNum].update();
            }
            this._checkPhaserStrafe();

        }

        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

        // Set phaser state to Strafing
        private _phaserStrafing() {
            // check to see if phaser sound is still playing
            if (this.phaserSound.playState != createjs.Sound.PLAY_FINISHED) {
                this._strafe = true;
            }
        }

        // Fire Phaser and Play Sound
        private _phaserStart() {
            var tracer = new objects.PhaserTracer();
            this.tracers.push(tracer);

            this.phaserSound = createjs.Sound.play("phaser");
            this.phaserSound.on("complete", this.destroy, this);

            var phaser = new objects.Phaser(tracer);
            this.phasers.push(phaser);

        }

        // Check if player is firing and moving mouse
        private _checkPhaserStrafe() {
            if (this._strafe) {
                var tracer = new objects.PhaserTracer();
                var phaser = new objects.Phaser(tracer);
                
                this._removePhaser();
                this.tracers.push(tracer);
                this.phasers.push(phaser);

            }
        }

        // Remove last Phaser
        private _removePhaser() {
            
            game.removeChild(this.phasers[this.phasers.length - 1]);
            this.phasers.pop();

            //game.removeChild(this.tracers[this.tracers.length - 1]);
            this.tracers.pop();
        }


    }
}