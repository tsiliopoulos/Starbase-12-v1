var config;
(function (config) {
    // Canvas
    config.ARCADE_CANVAS = document.getElementById("arcade");

    // Game Initialization
    config.FPS = 60;

    // Screen Constants
    config.WIDTH = 800;
    config.HEIGHT = 600;
    config.MIDDLE_X = 400;
    config.MIDDLE_Y = 300;
    config.BORDER = 31;

    // Tile Constants
    config.TILE_WIDTH = 146;
    config.TILE_HEIGHT = 133;
    config.TILE_COL = 5;
    config.TILE_ROW = 4;

    // Used for stats
    config.SHOW_FPS = true;

    // Position Constants
    config.TOP_RIGHT = 0;
    config.TOP_LEFT = 1;
    config.BOT_LEFT = 2;
    config.BOT_RIGHT = 3;

    // Rotation Constants
    config.COUNTERCLOCKWISE = 0;
    config.CLOCKWISE = 1;

    // Font Constants
    config.FONT_COLOUR = "#FFDE73";
    config.FONT = "startrek";
    config.FONT_SIZE = "26px";

    // Game Play Constants
    config.PHASER_LEVEL = 100;
    config.PHOTON_NUM = 8;
    config.INTEGRITY = 100;
    config.ARC_COUNT = 4;
    config.ENEMY_COUNT = 1;

    // Colour Constants
    config.GREEN = "#0F0";
    config.YELLOW = "#FF0";
    config.RED = "#F00";
})(config || (config = {}));
//# sourceMappingURL=config.js.map
