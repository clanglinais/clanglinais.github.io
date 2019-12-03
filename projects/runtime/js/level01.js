var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            name: "Robot Romp",
            number: 1, 
            speed: -3,
            gameItems: [
                {type: 'sawblade',x:400,y:groundY},
                {type: 'sawblade',x:600,y:groundY},
                {type: 'sawblade',x:900,y:groundY},
                {type: 'box', x:500, y:groundY},
                {type: 'enemy', x:550, y:groundY},
                {type: 'reward', x: 450, y:groundY-10}
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // BEGIN EDITING YOUR CODE HERE
        function createSawBlade(x,y) {
            var hitZoneSize = 25;
            var damageFromObstacle = 10;
            var myObstacle = game.createObstacle(hitZoneSize,damageFromObstacle);
            myObstacle.x = x;
            myObstacle.y = y;
            game.addGameItem(myObstacle);  
            var obstacleImage = draw.bitmap('img/sawblade.png');
            myObstacle.addChild(obstacleImage);
            obstacleImage.x = -25;
            obstacleImage.y = -25;
        }
        
        for (var i = 0; i <= levelData.gameItems.length-1; i++){
            var gameItem = levelData.gameItems[i];
            if (gameItem.type ==="sawblade") {
                createSawBlade(gameItem.x, gameItem.y);
    
            }
            if(gameItem.type === "box") {
                createBox(gameItem.x, gameItem.y);
            }
            if(gameItem.type === "enemy") {
                createEnemy(gameItem.x, gameItem.y);
            }
            if(gameItem.type === "reward") {
                createReward(gameItem.x, gameItem.y); 
            }
        } 
        function createBox(x,y) {
            var hitZoneSize = 25;
            var damageFromObstacle = 10;
            var myObstacle = game.createObstacle(hitZoneSize,damageFromObstacle);
            myObstacle.x = x;
            myObstacle.y = y;
            game.addGameItem(myObstacle);  
            var obstacleImage = draw.rect(100, 100, "red", "black" );
            myObstacle.addChild(obstacleImage);
            obstacleImage.x = -25;
            obstacleImage.y = -25;
        }
        
        function createEnemy(x, y) {
    
            var enemy =  game.createGameItem('enemy',25);
            var redSquare = draw.rect(50,50,'red');
            redSquare.x = -25;
            redSquare.y = -25;
            enemy.addChild(redSquare);
            enemy.x = x;
            enemy.y = y;
            game.addGameItem(enemy);
            
            enemy.velocityX = -1;
            enemy.rotationalVelocity = 1; 
            
            enemy.onPlayerCollision = function() {
                console.log('The enemy has hit Halle');
                game.changeIntegrity(-50); 
            };
            enemy.onProjectileCollision = function() {
                game.increaseScore(100);
                console.log("Halle has hit the enemy");
                enemy.fadeOut();
            };
        };
        
        function createReward(x,y) {
            var reward = game.createGameItem("reward", 20)
            var yellowCircle = draw.circle(20, "yellow", "yellow", 2);
            yellowCircle.x = -20;
            yellowCircle.y = -20;
            reward.addChild(yellowCircle);
            reward.x = x;
            reward.y = y;
            game.addGameItem(reward);
            
            
            reward.velocityX = - 1;
            
            reward.onPlayerCollision = function() {
                console.log('The reward has reached Halle');
                game.changeIntegrity(50);
                reward.fadeOut();
            };
        }
        
        

    };
   

};
// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}