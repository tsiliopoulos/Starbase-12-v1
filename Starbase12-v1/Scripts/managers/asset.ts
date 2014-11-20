module managers {
    // Image and Sound Manifest;
    var assetManifest = [
        { id: "particle", src: "assets/images/particle_base.png" },
        { id: "background", src: "assets/images/hexagon.jpg" },
        { id: "hudLS", src: "assets/images/hudLS.png" },
        { id: "hudRS", src: "assets/images/hudRS.png" },
        { id: "phaser", src: "assets/sounds/phaser.mp3" },
        { id: "explosion", src: "assets/sounds/smallexplosion.mp3" }
    ];

    // SpriteSheet Data Object
    var objectData = {
        "images": ["assets/images/atlas.png"],
        "frames": [

            [281, 2, 36, 66],
            [281, 70, 36, 66],
            [319, 2, 36, 66],
            [319, 70, 36, 66],
            [357, 2, 36, 66],
            [357, 70, 36, 66],
            [327, 138, 36, 66],
            [296, 206, 36, 66],
            [233, 258, 36, 66],
            [233, 326, 36, 66],
            [334, 206, 36, 66],
            [271, 274, 36, 66],
            [355, 274, 34, 38],
            [2, 308, 52, 76],
            [281, 138, 44, 51],
            [271, 342, 44, 51],
            [309, 274, 44, 47],
            [317, 323, 44, 47],
            [104, 2, 47, 101],
            [104, 105, 47, 101],
            [120, 272, 47, 101],
            [2, 2, 100, 100],
            [56, 308, 62, 62],
            [104, 208, 62, 62],
            [153, 2, 62, 62],
            [153, 66, 62, 62],
            [153, 130, 62, 62],
            [168, 194, 62, 62],
            [2, 104, 100, 100],
            [169, 258, 62, 62],
            [169, 322, 62, 62],
            [217, 2, 62, 62],
            [217, 66, 62, 62],
            [217, 130, 62, 62],
            [232, 194, 62, 62],
            [2, 206, 100, 100]
        ],
        "animations": {

            "shipBL": [0],
            "shipBLR": [1],
            "shipBLY": [2],
            "shipBR": [3],
            "shipBRR": [4],
            "shipBRY": [5],
            "shipTL": [6],
            "shipTLR": [7],
            "shipTLY": [8],
            "shipTR": [9],
            "shipTRR": [10],
            "shipTRY": [11],
            "crosshair": [12],
            "klingon": [13],
            "klingonBL": [14],
            "klingonBR": [15],
            "klingonTL": [16],
            "klingonTR": [17],
            "ship": [18],
            "shipR": [19],
            "shipY": [20],
            "startbase": [21],
            "startbaseBL": [22],
            "startbaseBLR": [23],
            "startbaseBLY": [24],
            "startbaseBR": [25],
            "startbaseBRR": [26],
            "startbaseBRY": [27],
            "startbaseR": [28],
            "startbaseTL": [29],
            "startbaseTLR": [30],
            "startbaseTLY": [31],
            "startbaseTR": [32],
            "startbaseTRR": [33],
            "startbaseTRY": [34],
            "startbaseY": [35]
        }
    };



    // BitMap Font SpriteSheet Data object
    var fontData = {
        "images": ["assets/fonts/fontAtlas.png"],
        "frames": [

            [50, 1658, 18, 76],
            [2, 2, 75, 76],
            [94, 272, 27, 90],
            [2, 1649, 27, 90],
            [94, 237, 31, 33],
            [86, 535, 38, 76],
            [70, 1747, 27, 76],
            [2, 477, 38, 76],
            [42, 552, 38, 76],
            [2, 555, 38, 76],
            [99, 1747, 17, 76],
            [82, 613, 38, 76],
            [42, 630, 38, 76],
            [2, 633, 38, 76],
            [82, 691, 38, 76],
            [42, 708, 38, 76],
            [2, 711, 38, 76],
            [82, 769, 38, 76],
            [42, 786, 38, 76],
            [2, 789, 38, 76],
            [2, 1492, 34, 76],
            [77, 1499, 34, 76],
            [82, 847, 38, 76],
            [42, 864, 38, 76],
            [50, 1736, 18, 76],
            [2, 867, 38, 76],
            [79, 2, 45, 77],
            [74, 1577, 33, 76],
            [2, 80, 58, 76],
            [82, 925, 38, 76],
            [42, 942, 38, 76],
            [2, 945, 38, 76],
            [2, 393, 40, 82],
            [49, 237, 43, 77],
            [82, 1003, 38, 76],
            [46, 316, 41, 76],
            [42, 1020, 38, 76],
            [2, 236, 45, 76],
            [62, 81, 58, 76],
            [2, 314, 42, 77],
            [2, 1023, 38, 76],
            [80, 1173, 36, 76],
            [2, 1741, 27, 90],
            [71, 1655, 27, 90],
            [40, 1190, 36, 76],
            [2, 1259, 36, 76],
            [78, 1251, 36, 76],
            [2, 1101, 36, 77],
            [40, 1268, 36, 76],
            [40, 1424, 35, 76],
            [89, 364, 36, 90],
            [2, 1180, 36, 77],
            [31, 1747, 17, 77],
            [100, 1655, 23, 90],
            [86, 456, 39, 77],
            [31, 1658, 17, 77],
            [2, 158, 54, 76],
            [2, 1337, 36, 76],
            [2, 1415, 36, 75],
            [82, 1081, 36, 90],
            [42, 1098, 36, 90],
            [38, 1502, 34, 76],
            [78, 1329, 36, 76],
            [2, 1570, 33, 77],
            [40, 1346, 36, 76],
            [44, 394, 40, 77],
            [58, 159, 54, 76],
            [44, 473, 40, 77],
            [78, 1407, 35, 90],
            [37, 1580, 32, 76]
        ],
        "animations": {

            "!": [0],
            "%": [1],
            "(": [2],
            ")": [3],
            "*": [4],
            "0": [5],
            "1": [6],
            "2": [7],
            "3": [8],
            "4": [9],
            ".": [10],
            "5": [11],
            "6": [12],
            "7": [13],
            "8": [14],
            "9": [15],
            "A": [16],
            "B": [17],
            "C": [18],
            "D": [19],
            "E": [20],
            "F": [21],
            "G": [22],
            "H": [23],
            "I": [24],
            "J": [25],
            "K": [26],
            "L": [27],
            "M": [28],
            "N": [29],
            "O": [30],
            "P": [31],
            "Q": [32],
            "R": [33],
            "S": [34],
            "T": [35],
            "U": [36],
            "V": [37],
            "W": [38],
            "X": [39],
            "Y": [40],
            "Z": [41],
            "[": [42],
            "]": [43],
            "a": [44],
            "b": [45],
            "c": [46],
            "d": [47],
            "e": [48],
            "f": [49],
            "g": [50],
            "h": [51],
            "i": [52],
            "j": [53],
            "k": [54],
            "l": [55],
            "m": [56],
            "n": [57],
            "o": [58],
            "p": [59],
            "q": [60],
            "r": [61],
            "s": [62],
            "t": [63],
            "u": [64],
            "v": [65],
            "w": [66],
            "x": [67],
            "y": [68],
            "z": [69]
        }
    };




    // Asset Manager Class
    export class Assets {
        public static manifest;
        public static data;

        public static loader;
        public static atlas: createjs.SpriteSheet;
        public static bitMapFont: createjs.SpriteSheet;

        public static init() {
            createjs.Sound.initializeDefaultPlugins();
            createjs.Sound.alternateExtensions = ["mp3"];
            this.loader = new createjs.LoadQueue(false);
            this.loader.installPlugin(createjs.Sound);
            this.loader.loadManifest(assetManifest);
            this.loader.setUseXHR(false);

            this.atlas = new createjs.SpriteSheet(objectData);
            this.bitMapFont = new createjs.SpriteSheet(fontData);
        }

    }
} 