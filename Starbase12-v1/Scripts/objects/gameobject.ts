/// <reference path="../managers/asset.ts" />
module objects {
    export class GameObject extends createjs.Sprite {
        width: number;
        height: number;
        constructor(SpriteName: string) {
            super(managers.Assets.atlas, SpriteName); 
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.regX = this.width * 0.5;
            this.regY = this.height * 0.5;
        }

    }
} 