
export const mapToPokemonNamesDAO = (results: {name: string, url: string}[]): string[] => {
    return results.map(result => result.name)
}