module objects {
    export class Hud extends createjs.Container {
        private leftBorder: createjs.Bitmap;
        private rightBorder: createjs.Bitmap;
        private phaserEnergy: createjs.Text;
        constructor() {
            super();

            this.drawBorders();
            this.drawStatLabels();
        }

        private drawStatLabels() {
            this.phaserEnergy = new createjs.Text("PHASER ENERGY", config.FONT_SIZE + " " + config.FONT, config.FONT_COLOUR);
            this.phaserEnergy.x = 40;
            this.addChild(this.phaserEnergy);
        }

        private drawBorders() {
            this.leftBorder = new createjs.Bitmap(managers.Assets.loader.getResult("hudLS"));
            this.rightBorder = new createjs.Bitmap(managers.Assets.loader.getResult("hudRS"));
            this.rightBorder.x = stage.canvas.width - this.rightBorder.getBounds().width;
            this.addChild(this.leftBorder, this.rightBorder);
        }
    }
} 