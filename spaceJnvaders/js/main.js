window.addEventListener("load", function(event) {

    "use strict";

    var keyDownUp = function(event) {
  
      controller.keyDownUp(event.type, event.keyCode);
  
    };

    var resize = function(event) {
  
      display.resize(document.documentElement.clientWidth - 32, document.documentElement.clientHeight - 32, game.world.height / game.world.width);
      display.render();
  
    };
  
    var renderPlayer = function(){
        display.drawRectangle(game.world.player.x, game.world.player.y, game.world.player.width, game.world.player.height, game.world.player.color);
        if(game.world.player.shooting) { display.drawRectangle(game.world.player.currentBullet.x, game.world.player.currentBullet.y, game.world.player.currentBullet.width, game.world.player.currentBullet.height, game.world.player.currentBullet.color) }
    }

    var renderEnemy = function(enemy){
        display.drawRectangle(enemy.x, enemy.y, enemy.width, enemy.height, enemy.color);
        if(enemy.shooting) { display.drawRectangle(enemy.currentBullet.x, enemy.currentBullet.y, enemy.currentBullet.width, enemy.currentBullet.height, enemy.currentBullet.color) }
    }

    var renderEnemies = function(){
        if(game.world.enemies){
            game.world.enemies.forEach(enemy => {
                renderEnemy(enemy);
            });
        }
    }

    var renderHud = function(){
        var size = 50
        var color = "#1fbcff"
        var w = 4000
        var h = 2251

        display.drawText("Lives : " + game.world.player.lives, w*0.1, h*0.05, size, color)
        display.drawText("Score : " + game.world.player.score, w*0.3, h*0.05, size, color)
        display.drawText("High Score : " + game.world.highscore, w*0.6, h*0.05, size, color)
        display.drawText("Enemies : " + game.world.enemies.length, w*0.8, h*0.05, size, color)
    }

    var render = function() {
      if(game.world.enemies === undefined){
          game.world.enemies = game.world.createEnemies(4,10,24);
      }
      //display.fill(game.world.background_color);
      //display.fillImage(game.world.bgImage);
      display.clear();
      renderPlayer();
      renderEnemies();
      renderHud();
      display.render();
      if(game.world.player.score > 0){
        var instructions = document.getElementById("instructions");
        instructions.classList.add("hidden");
      }
  
    };
  
    var update = function() {
  
      if (controller.left.active) { game.world.player.moveLeft(); }
      if (controller.right.active) { game.world.player.moveRight(); }
      if (controller.spacebar.active) { game.world.player.shoot(game.world.level); controller.spacebar.active = false; }
  
      try{
          game.update();
      }catch{}
  
    };
  
    var controller = new Controller();
    var display    = new Display(document.querySelector("canvas"));
    var game       = new Game();
    var engine     = new Engine(1000/30, render, update);

    display.buffer.canvas.height = game.world.height;
    display.buffer.canvas.width = game.world.width;
  
    window.addEventListener("keydown", keyDownUp);
    window.addEventListener("keyup",   keyDownUp);
    window.addEventListener("resize",  resize);
  
    resize();
  
    engine.start();
  
  });