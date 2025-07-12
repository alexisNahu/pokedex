
export const mapToPokemonNamesDAO = (results: {name: string, url: string}[]): string[] => {
    console.log(results)
    return results.map(result => result.name)
}