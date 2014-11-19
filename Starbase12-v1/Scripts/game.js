/// <reference path="config/config.ts" />
/// <reference path="config/keys.ts" />
/// <reference path="config/layer.ts" />
/// <reference path="config/controls.ts" />
/// <reference path="managers/asset.ts" />
/// <reference path="utility/distance.ts" />
/// <reference path="objects/gameobject.ts" />
/// <reference path="objects/hud.ts" />
/// <reference path="objects/crosshair.ts" />
/// <reference path="objects/explosion.ts" />
/// <reference path="objects/label.ts" />
/// <reference path="objects/shield.ts" />
/// <reference path="objects/player.ts" />
var stage;
var canvas;
var context;
var emitter = [];
var myBoom = [];
var stats;
var started = false;
var count = 0;

// Game Objects
var player;
var background;
var hud;

var crosshair;
var game;

function preload() {
    managers.Assets.init();
    managers.Assets.loader.addEventListener("complete", init);
}

function init() {
    canvas = config.ARCADE_CANVAS;

    stage = new createjs.Stage(canvas);

    //stage.enableMouseOver(20);
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", gameLoop);

    gameStart();
}

function gameLoop(event) {
    // Start counting for FPS stats
    this.stats.begin();

    if (started) {
        for (var i = 0; i < emitter.length; i++) {
            emitter[i].update();
            if (emitter[i].lifeTime >= 30) {
                //destroyEmitter();
                game.removeChild(myBoom[i]);
            }
        }
    }

    player.update();

    crosshair.update();

    game.updateCache();
    stage.update(event);

    return this.stats.end();
}

function setupStats() {
    // Uses stats.js
    stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.right = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);
}

function setPhaserAim(event) {
    var shipOrigin = new createjs.Point();
    shipOrigin.x = player.x;
    shipOrigin.y = player.y;
    var phaserTarget = new createjs.Point();
    phaserTarget.x = stage.mouseX;
    phaserTarget.y = stage.mouseY;

    var range = Math.floor(utility.Distance.calculate(shipOrigin, phaserTarget));
    var phaserLine = new createjs.Graphics();
    phaserLine.beginStroke("#FFF4CC").setStrokeStyle(2);
    phaserLine.moveTo(player.x, player.y).lineTo(stage.mouseX, stage.mouseY);
    phaserLine.beginStroke("#AA4312").setStrokeStyle(5);
    phaserLine.moveTo(player.x, player.y).lineTo(stage.mouseX, stage.mouseY);
    phaserLine.beginStroke("#FFF4CC").setStrokeStyle(2);
    phaserLine.moveTo(player.x, player.y).lineTo(stage.mouseX, stage.mouseY);
    var phaserBeam = new createjs.Shape(phaserLine);
    game.addChildAt(phaserBeam, layer.PHASER);
}

function getPhaserResult(event) {
    game.removeChildAt(layer.PHASER);
}

function gameStart() {
    setupStats();

    // the Main object container
    game = new createjs.Container();

    //stage.cursor = "none";
    background = new createjs.Bitmap(managers.Assets.loader.getResult("background"));
    game.addChildAt(background, layer.BACKGROUND);
    background.cache(0, 0, 800, 600);

    hud = new objects.Hud();
    game.addChildAt(hud, layer.HUD);

    player = new objects.Player();
    game.addChild(player);
    player.cache(0, 0, player.width, player.height);

    /* game.addEventListener("click", function () {
    started = true;
    createjs.Sound.play("explosion");
    myBoom[count] = new createjs.Container();
    game.addChild(myBoom[count]);
    emitter[count] = new objects.Explosion(Math.random() * stage.canvas.width, Math.random() * stage.canvas.height);
    
    myBoom[count].addChild(emitter[count]);
    count++;
    });
    */
    game.addEventListener("mousedown", setPhaserAim);
    game.addEventListener("pressup", getPhaserResult);

    crosshair = new objects.Crosshair();
    game.addChild(crosshair);
    crosshair.cache(stage.mouseX, stage.mouseY, crosshair.width, crosshair.height);

    stage.addChild(game);
    game.cache(0, 0, 800, 600);

    console.log(game.getNumChildren());
}
//# sourceMappingURL=game.js.map
