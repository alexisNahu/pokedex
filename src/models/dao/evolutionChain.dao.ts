interface BasicChain {
    is_baby: false
    species: {name: string, url: string}
    evolves_to: Array<BasicChain>
}

export interface PokemonChainEvolutionDAO {
    id: number
    chain: BasicChain
}