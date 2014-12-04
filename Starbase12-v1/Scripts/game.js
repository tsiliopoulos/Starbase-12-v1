/// <reference path="config/config.ts" />
/// <reference path="config/keys.ts" />
/// <reference path="config/layer.ts" />
/// <reference path="config/controls.ts" />
/// <reference path="managers/asset.ts" />
/// <reference path="utility/showlocation.ts" />
/// <reference path="utility/drawdebugrect.ts" />
/// <reference path="utility/distance.ts" />
/// <reference path="utility/getarcstring.ts" />
/// <reference path="utility/textcolour.ts" />
/// <reference path="utility/quadrant.ts" />
/// <reference path="utility/oppositeangle.ts" />
/// <reference path="interfaces/iobject.ts" />
/// <reference path="objects/gameobject.ts" />
/// <reference path="objects/hud.ts" />
/// <reference path="objects/crosshair.ts" />
/// <reference path="objects/explosion.ts" />
/// <reference path="objects/label.ts" />
/// <reference path="objects/shield.ts" />
/// <reference path="objects/player.ts" />
/// <reference path="objects/disruptor.ts" />
/// <reference path="objects/enemy.ts" />
/// <reference path="objects/starbase.ts" />
/// <reference path="objects/phasertracer.ts" />
/// <reference path="objects/phaser.ts" />
/// <reference path="objects/photon.ts" />
/// <reference path="managers/klingon.ts" />
/// <reference path="managers/particleexplosion.ts" />
/// <reference path="managers/beamweapon.ts" />
/// <reference path="managers/collision.ts" />
var stage;
var canvas;
var stats;

// Filters
var colorFilter = new createjs.ColorFilter(1, 1, 0);

// Game Objects
var player;
var starbase;
var background;
var hud;
var crosshair;

// Game Arrays
var emitters = [];
var explosions = [];
var gameTiles = [];
var enemies = [];

// Game Managers
var beamWeapon;
var collision;
var particleExplosion;
var klingon;

// Game Container
var game;

// Preload Assets
function preload() {
    managers.Assets.init();
    managers.Assets.loader.addEventListener("complete", init);
}

// Initialize Game
function init() {
    canvas = config.ARCADE_CANVAS;

    stage = new createjs.Stage(canvas);

    //stage.enableMouseOver(20);
    createjs.Ticker.setFPS(config.FPS);
    createjs.Ticker.addEventListener("tick", gameLoop);

    gameStart();
}

// Main Game Loop
function gameLoop(event) {
    // Start counting for FPS stats
    this.stats.begin();

    // Update Starbase
    starbase.update();
    starbase.integrityLabel.updateCache();
    starbase.updateCache();

    // Update Player
    player.update();
    player.integrityLabel.updateCache();
    player.updateCache();

    // Update Managers
    klingon.update();
    beamWeapon.update();
    particleExplosion.update();
    collision.update();

    // Update Crosshair
    crosshair.update();
    crosshair.updateCache();

    // Update HUD
    hud.update();

    stage.update(event);

    // Stop counting Stats
    return this.stats.end();
}

// Setup Game Stats using Stats.js
function setupStats() {
    stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.right = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);
}

// Setup Game Tile Array
function setupGameTiles() {
    var count = 0;
    for (var row = 0; row < config.TILE_ROW; row++) {
        for (var col = 0; col < config.TILE_COL; col++) {
            gameTiles[count] = new createjs.Point();
            gameTiles[count].x = 35 + (col * config.TILE_WIDTH);
            gameTiles[count].y = 34 + (row * config.TILE_HEIGHT);
            count++;
        }
    }
}

// Get Location for game entity from Game Tile Array
function getLocationFromTile(entity) {
    var TileLocation = Math.floor(Math.random() * gameTiles.length);

    entity.location.x = gameTiles[TileLocation].x + config.TILE_WIDTH * 0.5;
    entity.location.y = gameTiles[TileLocation].y + config.TILE_HEIGHT * 0.5;
    gameTiles.splice(TileLocation, 1);
    entity.x = entity.location.x;
    entity.y = entity.location.y;
    entity.shield.x = entity.x;
    entity.shield.y = entity.y;
}

// Main Game Function
function gameStart() {
    setupStats();
    setupGameTiles();

    // the Main object container
    game = new createjs.Container();

    //stage.cursor = "none";
    background = new createjs.Bitmap(managers.Assets.loader.getResult("background"));
    game.addChildAt(background, layer.BACKGROUND);
    background.cache(0, 0, config.WIDTH, config.HEIGHT);

    hud = new objects.Hud();
    game.addChildAt(hud, layer.HUD);

    // Create the starbase
    starbase = new objects.Starbase();
    game.addChild(starbase);
    game.addChild(starbase.integrityLabel);
    starbase.integrityLabel.shadow = new createjs.Shadow('#FFF', 2, 2, 8);
    starbase.integrityLabel.filters = [colorFilter];

    starbase.integrityLabel.cache(0, 0, starbase.integrityLabel.getBounds().width, starbase.integrityLabel.getBounds().height);
    starbase.cache(0, 0, starbase.width, starbase.height);
    getLocationFromTile(starbase);

    // Create player
    player = new objects.Player();
    game.addChild(player);
    game.addChild(player.integrityLabel);
    player.integrityLabel.shadow = new createjs.Shadow('#FFF', 2, 2, 8);
    player.integrityLabel.filters = [colorFilter];

    player.integrityLabel.cache(0, 0, player.integrityLabel.getBounds().width, player.integrityLabel.getBounds().height);
    player.cache(0, 0, player.width, player.height);
    getLocationFromTile(player);

    // Instantiate Enemy Manager and Create enemies
    klingon = new managers.Klingon();
    klingon.spawn();

    // Create the Crosshair
    crosshair = new objects.Crosshair();
    game.addChild(crosshair);
    crosshair.cache(stage.mouseX, stage.mouseY, crosshair.width, crosshair.height);

    // Instantiate the Beamweapon Manager
    beamWeapon = new managers.BeamWeapon();

    // Manage Explosions
    particleExplosion = new managers.ParticleExplosion();

    // Manage Collisions
    collision = new managers.Collision();

    stage.addChild(game);
}
//# sourceMappingURL=game.js.map
