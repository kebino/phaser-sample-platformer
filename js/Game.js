var TopDownGame = TopDownGame || {};

TopDownGame.Game = function(){};

TopDownGame.Game.prototype = {
    create: function() {
        this.map = this.game.add.tilemap('level1');
        this.map.addTilesetImage('tile', 'gameTiles');

        this.backgroundlayer = this.map.createLayer('backgroundLayer');
        this.blockedlayer = this.map.createLayer('blockedLayer');
        //collision on blockedLayer
        this.map.setCollisionBetween(769, 769, true, 'blockedLayer');

        this.backgroundlayer.resizeWorld();
        
        this.player = this.game.add.sprite(0, 0, 'player');
        this.game.physics.arcade.enable(this.player);
        this.player.body.gravity.y = 800;
        
        this.player.body.collideWorldBounds =true;
        this.player.scale.setTo(0.5,0.5);
        //the camera will follow the player in the world
        this.game.camera.follow(this.player);
        
        //move player with cursor keys
        this.cursors = this.game.input.keyboard.createCursorKeys();
    },
    update: function() {
        var hitBlocks = this.game.physics.arcade.collide(this.player, this.blockedlayer);
        //player movement
        this.player.body.velocity.x = 0;
    
        if(this.cursors.up.isDown && this.player.body.blocked.down && hitBlocks) {
            this.player.body.velocity.y -= 250;
        }
        else if(this.cursors.down.isDown) {
            this.player.body.velocity.y += 50;
        }
        if(this.cursors.left.isDown) {
            this.player.body.velocity.x -= 80;
        }
        else if(this.cursors.right.isDown) {
            this.player.body.velocity.x += 80;
        }
    },
    render: function() {  
        this.game.time.advancedTiming = true;
        this.game.debug.text(this.game.time.fps +' fps' || '-- fps', 2, 14, "#ffffff");}
}