

export interface AllSpritesDAO {
      static: {
        shiny: {
          d2: {
            front: string,
            back: string,
          },
          d3: string
        },
        normal: {
          d2: {
            front: string,
            back: string,
          },
          d3: string
        },
      },
      animated: {
        shiny: {
          d2: {
            front: string,
            back: string,
          },
          d3?: string
        },
        normal: {
          d2: {
            front: string,
            back: string,
          },
          d3?: string
        },
      }
    }
