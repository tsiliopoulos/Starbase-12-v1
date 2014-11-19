// Static Utility Class to calculate the distance between two points
var utility;
(function (utility) {
    var Distance = (function () {
        function Distance() {
        }
        Distance.calculate = function (p1, p2) {
            return Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2));
        };
        return Distance;
    })();
    utility.Distance = Distance;
})(utility || (utility = {}));
//# sourceMappingURL=distance.js.map
