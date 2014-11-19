module objects {
    export class Hud extends createjs.Container {
        private leftBorder: createjs.Bitmap;
        private rightBorder: createjs.Bitmap;
        constructor() {
            super();

            this.drawBorders();
        }

        private drawBorders() {
            this.leftBorder = new createjs.Bitmap(managers.Assets.loader.getResult("hudLS"));
            this.rightBorder = new createjs.Bitmap(managers.Assets.loader.getResult("hudRS"));
            this.rightBorder.x = stage.canvas.width - this.rightBorder.getBounds().width;
            this.addChild(this.leftBorder, this.rightBorder);
        }
    }
} 