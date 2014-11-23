// Shield Class
module objects {
    export class Shield extends createjs.Container implements interfaces.IObject {
        // PUBLIC PROPERTIES +++++++++++++++++++++++++++++++++++++++++++++++
        public width: number;
        public height: number;
        public topLeft: createjs.Sprite;
        public topRight: createjs.Sprite;
        public botLeft: createjs.Sprite;
        public botRight: createjs.Sprite;

        // PRIVATE PROPERTIES ++++++++++++++++++++++++++++++++++++++++++++++
        private _shipName: string;
        private _entity: objects.GameObject;

        // CONSTRUCTOR +++++++++++++++++++++++++++++++++++++++++++++++++++++
        constructor(entity: objects.GameObject) { 
            super();
            this._entity = entity;
            this._shipName = this._entity.name;

            this._createShields();
            this.width = this.topLeft.getBounds().width + this.topRight.getBounds().width;
            this.height = this.topLeft.getBounds().height + this.botLeft.getBounds().height;
        }

        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++++++++

        // Update Method
        public update() {
            this.x = this._entity.x;
            this.y = this._entity.y;
        }

        // Remove Shield Object from game
        public destroy() {
            game.removeChild(this);
        }

        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++++++++++

        // Create the Shield Objects
        private _createShields() {
            this.topLeft = new createjs.Sprite(managers.Assets.atlas, this._shipName + "TL");
            this.topRight = new createjs.Sprite(managers.Assets.atlas, this._shipName + "TR");
            this.topRight.x = this.topLeft.getBounds().width;
            this.botLeft = new createjs.Sprite(managers.Assets.atlas, this._shipName + "BL");
            this.botLeft.y = this.topLeft.getBounds().height;
            this.botRight = new createjs.Sprite(managers.Assets.atlas, this._shipName + "BR");
            this.botRight.x = this.topLeft.getBounds().width;
            this.botRight.y = this.topLeft.getBounds().height;
            this.addChild(this.topLeft, this.topRight, this.botLeft, this.botRight);
        }


    }
} 