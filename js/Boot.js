var TopDownGame = TopDownGame || {};

TopDownGame.Boot = function() {};

TopDownGame.Boot.prototype = {
    preload: function() {

    },
    create: function() {
        //loading screen will have a white background
        //this.game.stage.backgroundColor = '#fff';
    
        //scaling options
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        //have the game centered horizontally
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
    
        //physics system
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.state.start('Preload');
    }
}