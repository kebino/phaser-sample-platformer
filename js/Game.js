var TopDownGame = TopDownGame || {};

TopDownGame.Game = function(){};

TopDownGame.Game.prototype = {
    create: function() {
        this.map = this.game.add.tilemap('level1');
        this.map.addTilesetImage('tile', 'gameTiles');

        this.backgroundlayer = this.map.createLayer('backgroundLayer');
        this.blockedlayer = this.map.createLayer('blockedLayer');
        
        //collision on blockedLayer
        this.map.setCollisionBetween(248, 800, true, 'blockedLayer');

        this.backgroundlayer.resizeWorld();
        
        //create player
        var startLoc = this.findObjectsByType('player', this.map, 'objectsLayer');
        this.player = this.game.add.sprite(startLoc[0].x, startLoc[0].y, 'player');
        //enable physics for player
        this.game.physics.arcade.enable(this.player);
        this.player.body.gravity.y = 800;
        this.player.body.collideWorldBounds =true;
        //player size will be scaled to half
        this.player.scale.setTo(0.5,0.5);
        //add animations to player
        this.player.animations.add('left',[0,1,2,3], 10, true);
        this.player.animations.add('right',[5,6,7,8], 10, true);
        //the camera will follow the player in the world
        this.game.camera.follow(this.player);
        
        //move player with cursor keys
        this.cursors = this.game.input.keyboard.createCursorKeys();

        //create stars
        this.createStars();
    },
    update: function() {
        var hitBlocks = this.game.physics.arcade.collide(this.player, this.blockedlayer);
        this.game.physics.arcade.overlap(this.player, this.stars, this.collectStar, null, this);
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
            this.player.animations.play('left');
        }
        else if(this.cursors.right.isDown) {
            this.player.body.velocity.x += 80;
            this.player.animations.play('right');
        }
        else {
            this.player.frame = 4;
        }
    },
    findObjectsByType: function(type, map, layer) {
        return map.objects[layer].filter(element => element.properties.type === type);
    },
    createStars: function() {
        this.stars = this.game.add.group();
        this.stars.enableBody = true;
        var starList = this.findObjectsByType('star', this.map, 'objectsLayer');
        starList.forEach(s => {
            var star = this.stars.create(s.x, s.y, 'star');
            star.scale.setTo(0.5,0.5);
        });
    },
    collectStar: function(player, star) {
        star.kill();
    },
    render: function() {  
        this.game.time.advancedTiming = true;
        this.game.debug.text(this.game.time.fps +' fps' || '-- fps', 2, 14, "#ffffff");
    }
}