module config {
    // Canvas
    export var ARCADE_CANVAS = document.getElementById("arcade");

    // Game Initialization 
    export var FPS: number = 60;

    // Screen Constants
    export var WIDTH: number = 800;
    export var HEIGHT: number = 600;
    export var MIDDLE_X: number = 400;
    export var MIDDLE_Y: number = 300;
    export var BORDER: number = 31;

    // Tile Constants
    export var TILE_WIDTH: number = 146;
    export var TILE_HEIGHT: number = 133;
    export var TILE_COL: number = 5;
    export var TILE_ROW: number = 4;

    // Used for stats
    export var SHOW_FPS: boolean = true;

    // Position Constants
    export var TOP_RIGHT: number = 0;
    export var TOP_LEFT: number = 1;
    export var BOT_LEFT: number = 2;
    export var BOT_RIGHT: number = 3;

    // Rotation Constants
    export var COUNTERCLOCKWISE: number = 0;
    export var CLOCKWISE: number = 1;

    // Font Constants
    export var FONT_COLOUR: string = "#FFDE73";
    export var FONT: string = "startrek";
    export var FONT_SIZE: string = "26px";

    // Game Play Constants
    export var PHASER_LEVEL: number = 100;
    export var PHOTON_NUM: number = 8;
    export var INTEGRITY: number = 100;
    export var ARC_COUNT: number = 4;
    export var ENEMY_COUNT: number = 1;

    // Colour Constants
    export var GREEN: string = "#0F0";
    export var YELLOW: string = "#FF0";
    export var RED: string = "#F00";
}