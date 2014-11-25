/// <reference path="config/config.ts" />
/// <reference path="config/keys.ts" />
/// <reference path="config/layer.ts" />
/// <reference path="config/controls.ts" />
/// <reference path="managers/asset.ts" />
/// <reference path="utility/distance.ts" />
/// <reference path="interfaces/iobject.ts" />
/// <reference path="objects/gameobject.ts" />
/// <reference path="objects/hud.ts" />
/// <reference path="objects/crosshair.ts" />
/// <reference path="objects/explosion.ts" />
/// <reference path="objects/label.ts" />
/// <reference path="objects/shieldarcobject.ts" />
/// <reference path="objects/shield.ts" />
/// <reference path="objects/player.ts" />
/// <reference path="objects/enemy.ts" />
/// <reference path="objects/starbase.ts" />
/// <reference path="objects/phasertracer.ts" />
/// <reference path="objects/phaser.ts" />
/// <reference path="managers/beamweapon.ts" />
/// <reference path="managers/collision.ts" />


var stage: createjs.Stage;
var canvas;

var emitter: objects.Explosion[] = [];
var myBoom: createjs.Container[] = [];  

var gameTiles: createjs.Point[] = [];

var stats: Stats;
var started: boolean = false;
var count: number = 0;

// Game Objects
var player: objects.Player;
var starbase: objects.Starbase;
var enemies: objects.Enemy[] = [];
var background: createjs.Bitmap;
var hud: objects.Hud;

// Game Managers
var beamWeapon: managers.BeamWeapon;
var collision: managers.Collision;

var crosshair: objects.Crosshair;
var game: createjs.Container;

function preload(): void {
    managers.Assets.init();
    managers.Assets.loader.addEventListener("complete", init);
}

function init(): void {
    canvas = config.ARCADE_CANVAS;
    
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20);
    
    createjs.Ticker.setFPS(config.FPS);
    createjs.Ticker.addEventListener("tick", gameLoop);

    gameStart();
}

// Toggle mouse events when mouse enters / leaves stage
function checkMouse() {
    if ((stage.mouseX > config.WIDTH - 31) || (stage.mouseX < 31) || (stage.mouseY > config.HEIGHT - 31) || (stage.mouseY < 31)) {
        game.mouseEnabled = false;
    }
    else {
        game.mouseEnabled = true;
    }
}

function gameLoop(event) {
    // Start counting for FPS stats
    this.stats.begin();

    if (started) {
        for (var i = 0; i < emitter.length; i++) {
            emitter[i].update();
            if (emitter[i].lifeTime >= 15) {
                //destroyEmitter();
                game.removeChild(myBoom[i]);
            }
        }
    }

    starbase.update();

    player.update();


    for (var count = 0; count < config.ENEMY_COUNT; count++) {
        enemies[count].update();
    }

    beamWeapon.update();

    collision.update();

    crosshair.update();

    

    game.updateCache();

    stage.update(event);

    return this.stats.end();
}

// Setup Game Stats using Stats.js
function setupStats() {
    stats = new Stats();
    stats.setMode(0)
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
function getLocationFromTile(entity: objects.GameObject) {
    var TileLocation: number = Math.floor(Math.random() * gameTiles.length);

    entity.location.x = gameTiles[TileLocation].x + config.TILE_WIDTH * 0.5;
    entity.location.y = gameTiles[TileLocation].y + config.TILE_HEIGHT * 0.5;
    gameTiles.splice(TileLocation, 1);
    entity.x = entity.location.x;
    entity.y = entity.location.y;
    entity.shield.x = entity.x;
    entity.shield.y = entity.y;
}

// Create new enemy ships
function spawnEnemies() {

    for (var count = 0; count < config.ENEMY_COUNT; count++) {
        enemies[count] = new objects.Enemy();
        game.addChild(enemies[count]);
        getLocationFromTile(enemies[count]);
    }
}

function gameStart(): void {
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
    starbase.cache(0, 0, starbase.width, starbase.height);
    getLocationFromTile(starbase);

    // Create player
    player = new objects.Player();
    game.addChild(player);
    player.cache(0, 0, player.width, player.height);
    getLocationFromTile(player);




    // Create enemies
    this.spawnEnemies();

    game.addEventListener("click", function () {
        started = true;

        createjs.Sound.play("explosion");
        myBoom[count] = new createjs.Container();
        game.addChild(myBoom[count]);
        emitter[count] = new objects.Explosion(stage.mouseX, stage.mouseY);
        
        myBoom[count].addChild(emitter[count]);
        count++;
    });

    // Instantiate the Beamweapon Manager
    beamWeapon = new managers.BeamWeapon();

    collision = new managers.Collision();

    crosshair = new objects.Crosshair();
    game.addChild(crosshair);
    crosshair.cache(stage.mouseX, stage.mouseY, crosshair.width, crosshair.height);

    /*var myLabel = new objects.Label(config.MIDDLE_X, config.MIDDLE_Y, "Starbase 12");
    game.addChild(myLabel);*/
    
    stage.addChild(game);
    game.cache(0, 0, config.WIDTH, config.HEIGHT);

}