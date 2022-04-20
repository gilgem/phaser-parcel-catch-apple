import Phaser from "phaser"

export default class TitlteScreen extends Phaser.Scene
{
    preload()
    {

    }

    create()
    {
        const text = this.add.text(250,  200, "Hello World!")
        text.setOrigin(0.5,0.5)
    }
}

