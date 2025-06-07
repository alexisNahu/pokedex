interface SpritePosition {
    front: string,
    back: string
}


export interface AllSpritesDAO {
    static: {
        shiny: SpritePosition
        normal: SpritePosition
    },
    animated: {
        shiny: SpritePosition
        normal: SpritePosition
    }
}
