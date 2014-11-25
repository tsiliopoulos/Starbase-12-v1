/// <reference path="../utility/distance.ts" />
/// <reference path="beamweapon.ts" />

// Collision Manager Class
module managers {
    export class Collision {

        // PRIVATE PROPERTIES ++++++++++++++++++++++++++++++++++++++++++++
        private _currentTracer: objects.PhaserTracer;

        // CONSTRUCTOR +++++++++++++++++++++++++++++++++++++++++++++++++++ 
        constructor() {
        }

        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++++++++

        // Check for collisions between phasers and enemy shields
        private checkPhaserAndShields() {
            for (var enemyNum = 0; enemyNum < config.ENEMY_COUNT; enemyNum++) {
                for (var arcNum = 0; arcNum < config.ARC_COUNT; arcNum++) {
                    var distance = utility.Distance.calculate;

                    var tracerPosition = enemies[enemyNum].shield.arcs[arcNum].localToLocal(0, 0, this._currentTracer);
                    var arcCenter = enemies[enemyNum].shield.arcs[arcNum].center;
                    var arcRadius = enemies[enemyNum].shield.arcs[arcNum].radius;

                    if (distance(tracerPosition, arcCenter) < arcRadius) {
                        enemies[enemyNum].shield.removeChild(enemies[enemyNum].shield.arcs[arcNum]);
                        console.log(enemies[enemyNum].shield.arcs[arcNum] + " is hit!");
                    }
                }
            }

        }

        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++++++++

        // Update Method
        public update() {
            if (beamWeapon.phasers.length > 0) {
                this._currentTracer = beamWeapon.tracers[beamWeapon.phasers.length - 1];
                this.checkPhaserAndShields();
            }
            
        }


    }
} 