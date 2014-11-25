﻿// Phaser Object Class
module objects {
    export class Phaser extends createjs.Shape {
        // PUBLIC PROPERTIES ++++++++++++++++++++++++++++++++++++++++++++++++++++++
        public target: createjs.Point;

        // PRIVATE PROPERTIES +++++++++++++++++++++++++++++++++++++++++++++++++++++
        private _phaserBeam: createjs.Graphics;
        private _tracer: objects.PhaserTracer;

        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        constructor(tracer) {
            this.target = new createjs.Point();
            this._tracer = tracer;

            this._drawPhaser();
            super(this._phaserBeam);
            game.addChildAt(this, layer.PHASER);
        }

        
        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++

        // Create the Phaser Beam
        private _drawPhaser() {
            this.target.x = stage.mouseX;
            this.target.y = stage.mouseY;
            this._phaserBeam = new createjs.Graphics();
            this._phaserBeam.beginStroke("#FFF4CC").setStrokeStyle(2);
            this._phaserBeam.moveTo(player.x, player.y - 15).lineTo(this.target.x, this.target.y);
            this._phaserBeam.beginStroke("#AA4312").setStrokeStyle(5);
            this._phaserBeam.moveTo(player.x, player.y - 15).lineTo(this.target.x, this.target.y);
            this._phaserBeam.beginStroke("#FFF4CC").setStrokeStyle(2);
            this._phaserBeam.moveTo(player.x, player.y - 15).lineTo(this.target.x, this.target.y);
        }

    }
} 