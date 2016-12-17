var TopDownGame = TopDownGame || {};

TopDownGame.Preload = function(){};

TopDownGame.Preload.prototype = {
    preload: function() {
        this.load.tilemap('level1', 'assets/tilemap/first.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('gameTiles', 'assets/map.png');
        this.load.image('player', 'assets/star.png');
    },
    create: function() {
        this.state.start('Game');
    }
}