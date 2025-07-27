export function generateRandomPokedexNumber(limit: number, howMany: number): Array<number> {
    const randomPokedexNumbers = new Set<number>();
    
    while (randomPokedexNumbers.size < howMany) {
        // Genera números entre 1 y limit (ambos incluidos)
        const randomNum = Math.floor(Math.random() * limit) + 1;
        randomPokedexNumbers.add(randomNum);
    }

    return Array.from(randomPokedexNumbers);
}