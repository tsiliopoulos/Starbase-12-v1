module utility {
    export function Quadrant(angle: number): number {
        var sector: number;

        if (angle <= 90) {
            sector = config.TOP_RIGHT;
        }
        if ((angle <= 180) && (angle > 90)) {
            sector = config.TOP_LEFT;
        }
        if ((angle <= 270) && (angle > 180)) {
            sector = config.BOT_LEFT;
        }
        if ((angle < 360) && (angle > 270)) {
            sector = config.BOT_RIGHT;
        }
        return sector;
    }
} 