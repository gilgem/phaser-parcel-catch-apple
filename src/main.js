import Phaser from "phaser"
import TitlteScreen from "./scenes/TitleScreen"
import Game from "./scenes/game"



const config = {
    width: 500,
    height: 560,
    type: Phaser.AUTO,
    physics: {
        default: 'arcade',
        arcade: {
            gravity :{
                y: 0
            },
            debug: false
        } 
    }
}

const game = new Phaser.Game(config)

// SCENE
game.scene.add('titlescreen', TitlteScreen)
game.scene.add('game', Game)

//game.scene.start('titlescreen')
game.scene.start('game')