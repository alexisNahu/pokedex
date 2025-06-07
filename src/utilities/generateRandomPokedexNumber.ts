export function generateRandomPokedexNumber(limit: number, howMany: number): Array<number> {
    const randomPokedexNumbers: Array<number> = []
    
    for (let index = 0; index < howMany; index++) {
        randomPokedexNumbers.push(Math.floor(Math.random() * (limit+1)))
    }

    return randomPokedexNumbers
}