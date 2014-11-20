module objects {
    export class Phaser extends createjs.Shape {
        private shipOrigin: createjs.Point;
        private phaserTarget: createjs.Point;
        private phaserRange: number;
        private phaserBeam: createjs.Graphics;
        constructor() {
            this.drawPhaser();
            super(this.phaserBeam);
            game.addChildAt(this, layer.PHASER);
        }

        drawPhaser() {
            this.phaserBeam = new createjs.Graphics();
            this.phaserBeam.beginStroke("#FFF4CC").setStrokeStyle(2);
            this.phaserBeam.moveTo(player.x, player.y - 15).lineTo(stage.mouseX, stage.mouseY);
            this.phaserBeam.beginStroke("#AA4312").setStrokeStyle(5);
            this.phaserBeam.moveTo(player.x, player.y - 15).lineTo(stage.mouseX, stage.mouseY);
            this.phaserBeam.beginStroke("#FFF4CC").setStrokeStyle(2);
            this.phaserBeam.moveTo(player.x, player.y - 15).lineTo(stage.mouseX, stage.mouseY);
            
        }

    }
} 