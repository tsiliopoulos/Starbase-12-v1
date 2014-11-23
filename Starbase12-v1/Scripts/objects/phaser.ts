/// <reference path="crosshair.ts" />
// Phaser Object Class
module objects {
    export class Phaser extends createjs.Shape {
        // PRIVATE PROPERTIES
        private _phaserBeam: createjs.Graphics;
        constructor() {
            this._drawPhaser();
            super(this._phaserBeam);
            game.addChildAt(this, layer.PHASER);
        }

        // PRIVATE METHODS

        // Create the Phaser Beam
        private _drawPhaser() {
            this._phaserBeam = new createjs.Graphics();
            this._phaserBeam.beginStroke("#FFF4CC").setStrokeStyle(2);
            this._phaserBeam.moveTo(player.x, player.y - 15).lineTo(crosshair.x, crosshair.y);
            this._phaserBeam.beginStroke("#AA4312").setStrokeStyle(5);
            this._phaserBeam.moveTo(player.x, player.y - 15).lineTo(crosshair.x, crosshair.y);
            this._phaserBeam.beginStroke("#FFF4CC").setStrokeStyle(2);
            this._phaserBeam.moveTo(player.x, player.y - 15).lineTo(crosshair.x, crosshair.y);
        }

    }
} 