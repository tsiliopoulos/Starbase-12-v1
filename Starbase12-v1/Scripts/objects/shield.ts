module objects {
    export class Shield extends createjs.Container implements interfaces.IObject {
        width: number;
        height: number;
        topLeft: createjs.Sprite;
        topRight: createjs.Sprite;
        botLeft: createjs.Sprite;
        botRight: createjs.Sprite;
        private shipName: string;
        private entity: objects.GameObject;
        constructor(entity: objects.GameObject) { 
            super();
            this.entity = entity;
            this.shipName = this.entity.name;

            this.createShields();
            this.width = this.topLeft.getBounds().width + this.topRight.getBounds().width;
            this.height = this.topLeft.getBounds().height + this.botLeft.getBounds().height;
        }

        private createShields() {
            this.topLeft = new createjs.Sprite(managers.Assets.atlas, this.shipName + "TL");
            this.topRight = new createjs.Sprite(managers.Assets.atlas, this.shipName + "TR");
            this.topRight.x = this.topLeft.getBounds().width;
            this.botLeft = new createjs.Sprite(managers.Assets.atlas, this.shipName + "BL");
            this.botLeft.y = this.topLeft.getBounds().height;
            this.botRight = new createjs.Sprite(managers.Assets.atlas, this.shipName + "BR");
            this.botRight.x = this.topLeft.getBounds().width;
            this.botRight.y = this.topLeft.getBounds().height;
            this.addChild(this.topLeft, this.topRight, this.botLeft, this.botRight);
        }

        update() {
            this.x = this.entity.x;
            this.y = this.entity.y;
        }

        destroy() {
            game.removeChild(this);
        }
    }
} 