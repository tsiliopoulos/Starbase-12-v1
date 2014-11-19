﻿/// <reference path="../managers/asset.ts" />
module objects {
    export class Explosion extends createjs.ParticleEmitter {
        particle: createjs.Bitmap;
        lifeTime: number;
        constructor(x, y) {
            this.particle = new createjs.Bitmap(managers.Assets.loader.getResult("particle"));
            this.lifeTime = 0;
            super(this.particle.image);
            this.position = new createjs.Point(x, y);
            this.emitterType = createjs.ParticleEmitterType.Emit;
            this.emissionRate = 100;
            this.maxParticles = 500;
            //this.life = 590;
            //this.lifeVar = 380;

            this.life = 590;
            this.lifeVar = 380;
            this.speed = 100;
            this.speedVar = 30;
            this.positionVarX = 0;
            this.positionVarY = 0;
            this.accelerationX = 0;
            this.accelerationY = 0;
            this.radialAcceleration = 0;
            this.radialAccelerationVar = 0;
            this.tangentalAcceleration = 0;
            this.tangentalAccelerationVar = 0;
            this.angle = 270;
            this.angleVar = 360;
            this.startSpin = 0;
            this.startSpinVar = 0;
            this.endSpin = null;
            this.endSpinVar = null;
            this.startColor = [255, 0, 35];
            this.startColorVar = [255, 125, 0];
            this.startOpacity = 0.5;
            this.endColor = [255, 255, 255];
            this.endColorVar = [0, 0, 0];
            this.endOpacity = 0;
            this.startSize = 65;
            this.startSizeVar = 33;
            this.endSize = 0;
            this.endSizeVar = 5;

        }

        update() {
            this.lifeTime++;
        }

    }
} 