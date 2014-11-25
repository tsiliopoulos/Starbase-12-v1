// Shield Arc Object Super Class
module objects {
    export class ShieldArcObject extends createjs.Sprite {
         // PUBLIC PROPERTIES +++++++++++++++++++++++++++++++++++++++++++++++++++++
        public width: number;
        public height: number;
        public center: createjs.Point;
        public radius: number;
        public strength: number;

        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        constructor(SpriteName: string) {
            super(managers.Assets.atlas, SpriteName);
            this.name = SpriteName;
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.center = new createjs.Point();
            this.center.x = this.width * 0.5;
            this.center.y = this.height * 0.5;
            this.radius = Math.sqrt(Math.pow(this.width, 2) + Math.pow(this.height, 2)) * 0.5;
            this.strength = 100;
        }
    }
} 