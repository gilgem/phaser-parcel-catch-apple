import Phaser from "phaser"  

class Game extends Phaser.Scene 
{
    appleSprite
    appleImage 
    groundSPrite
    kartSprite
    platforms
    arrowSprite
    isOver = false

    cursors
    circle 

    gameOverText
    scoreText

    score = 0
    

    preload()
    {
        this.load.image('appleObj', 'assets/apple.png')
        this.load.image('kart',  'assets/kart.png')
        this.load.image('sky',  'assets/sky.png') 
        this.load.image('ground',  'assets/ground.png') 
        this.load.image('arrow', 'assets/arrow.png')
        this.load.image('basket', 'assets/basket.png')
    }

    create()
    {
        
        this.add.image(240, 0, 'sky') .setScrollFactor(1, 0) 
        this.appleSprite    =   this.physics.add.sprite(250, 20, 'appleObj').setScale(0.045) 
         
        this.add.image(250, 490, 'basket').setScale(0.2)
        
        this.platforms = this.physics.add.staticGroup()
        for (let i = 0; i < 2; ++i)
        {
            const platform = this.platforms.create(100 + i * 360, 580, 'ground') 
            const body = platform.body
            body.updateFromGameObject()
        } 
        
        this.arrowSprite = this.physics.add.sprite(0, 250, 'arrow').setScale(0.13).setVelocity(400, 0)
        this.arrowSprite.body.allowGravity = false 

        this.cursors = this.input.keyboard.createCursorKeys(); 
        this.input.on('pointerdown', this.spawn) 
 
        this.physics.add.collider(this.platforms, this.appleSprite, this.resetApple)
        this.physics.add.collider(this.arrowSprite, this.appleSprite,   this.gameOver ) 


        this.gameOverText = this.add.text(250, 250, 'Game Over', {fontSize: '32px', fill: '#000'})
        this.gameOverText.setOrigin(0.5)
        this.gameOverText.visible = false

        this.scoreText = this.add.text(80, 30, 'Score:0', {fontSize: '32px', fill: '#000'})
        this.scoreText.setOrigin(0.5)
    }

    update()
    {  
        console.log(this.isOver)
        this.horizontalWrap(this.arrowSprite)  
    }  
    
    spawn = () => {   
        if (this.isOver == false) {
            this.appleSprite.setVelocity(0, 200)
        }else{
            this.isOver = false
            this.scene.restart()
        }  
    }

    horizontalWrap(sprite)
    {
        const yy =  Phaser.Math.Between(100, 400)
        const halfWidth = sprite.displayWidth * 0.5
        const gameWidth = this.scale.width
        if (sprite.x < -halfWidth)
        { 
            sprite.x = 0
            sprite.y = yy
        }
        else if (sprite.x > gameWidth + halfWidth)
        {
          sprite.x = -halfWidth
          sprite.y = yy
        }
    }
    
    resetApple = () => 
    {  
        this.score += 1
        this.scoreText.setText("Score:" + this.score)
        this.appleSprite.y = 20
        this.appleSprite.x = 250 
    } 

    gameOver = () => 
    {
        this.gameOverText.visible = true
        this.appleSprite.destroy()
        this.arrowSprite.destroy()
        this.isOver = true
        this.score = 0 
    }
}

export default Game