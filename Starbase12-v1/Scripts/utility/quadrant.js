﻿// Utility function to determine angle of attack
var utility;
(function (utility) {
    function Quadrant(angle) {
        var sector;

        // Adjust the angle to be within 0 to 360 degrees
        if (angle > 360) {
            angle -= 360;
        }

        if (angle < 0) {
            angle += 360;
        }

        // Determine the sector
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
    utility.Quadrant = Quadrant;
})(utility || (utility = {}));
//# sourceMappingURL=quadrant.js.map
