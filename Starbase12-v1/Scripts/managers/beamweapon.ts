// BeamWeapon Manager Class
module managers {
    export class BeamWeapon {
        // PUBLIC PROPERTIES +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        public phasers: objects.Phaser[] = [];
        public tracers: objects.PhaserTracer[] = [];
        public disruptors: objects.Disruptor[] = [];
        public phaserSound: createjs.SoundInstance;
        public disruptorSound: createjs.SoundInstance;
        public randomShot: number[] = [];

        // PRIVATE PROPERTIES ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        private _strafe: boolean = false;
        private _disruptorNum: number = 0;

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
            this._checkPhaserStrafe();
            this._updateTracer();
            this._regeneratePhaser();

            this._checkDisruptorFire();
            this._updateDisruptor();

            
        }

        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

        // Create Phaser Tracer Objects
        private _createTracer() {
            var tracer = new objects.PhaserTracer();
            this.tracers.push(tracer);
            game.addChild(tracer);
        }

        // Update Tracer Position on screen and remove if tracer stops
        private _updateTracer() {
            for (var tracerNum = 0; tracerNum < this.tracers.length; tracerNum++) {
                var tracer = this.tracers[tracerNum];
                tracer.update();
                if (tracer.speed == 0) {
                    this.tracers.splice(tracerNum, 1);
                    game.removeChild(tracer);
                }
            }

        }

        private _regeneratePhaser() {
            hud.phaserEnergy = hud.phaserEnergy + 0.25;
            if (hud.phaserEnergy > 100) {
                hud.phaserEnergy = 100;
            }
        }

        // Set phaser state to Strafing
        private _phaserStrafing() {
            // check to see if phaser sound is still playing
            if ((hud.phaserEnergy > 0) && (this.phaserSound.playState != createjs.Sound.PLAY_FINISHED)) {
                this._strafe = true;
            }
        }

        // Fire Phaser and Play Sound
        private _phaserStart() {

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

        }

        // Check if player is firing and moving mouse
        private _checkPhaserStrafe() {
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
        }

        // Check if enemy is firing disruptor
        private _checkDisruptorFire() {
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
        }

        // Update Disruptor
        private _updateDisruptor() {
            for (var Num = 0; Num < this.disruptors.length; Num++) {
                var disruptor = this.disruptors[Num];
                disruptor.update();
                if (disruptor.speed == 0) {
                    this.disruptors.splice(Num, 1);
                    game.removeChild(disruptor);
                }
            }
        }

        // Remove last Phaser
        private _removePhaser() {
            game.removeChild(this.phasers[this.phasers.length - 1]);
            this.phasers.pop();
        }


    }
}