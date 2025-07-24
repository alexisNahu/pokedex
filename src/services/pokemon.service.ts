
import { PokedexFilters, PokemonDTO } from '@models/pokemon.model'
import * as pokeApiService from '@services/pokeapi.service'
import * as spritesService from '@services/pokemonSprites.service'
import { mapToPokemonDTO, mapToPokemonNamesDAO } from '@utilities/mappers'
import { filterRegionalPokemon, filterGigamaxPokemon, filterMegaPokemon } from '@utilities/filters'

export const getPokemonDTOByNameOrId = async (name: string, signal?: AbortSignal): Promise<PokemonDTO | null> => {
  try {
    const pokemon = await pokeApiService.getPokemonByNameOrId(name, signal)
    const species = await pokeApiService.getPokemonSpecies(name, signal)
    const chainEvolution = await pokeApiService.getPokemonChainEvolution(species.evolution_chain.url, signal)
    const allSprites = spritesService.getAllSprites(pokemon.name)

    const megaPromises = filterMegaPokemon(species.varieties, true).map(async (mega) => {
      return await pokeApiService.getPokemonByNameOrId(mega.pokemon.name, signal)
    })

    const variantPromises = filterRegionalPokemon(species.varieties).map(async (variant) => {
      return await pokeApiService.getPokemonByNameOrId(variant.pokemon.name, signal)
    })

    const gigamaxesPromises = filterGigamaxPokemon(species.varieties).map(async (gmax) => {
      return await pokeApiService.getPokemonByNameOrId(gmax.pokemon.name, signal)
    })

    const abilitiesPromises = pokemon.abilities.map(async (ability) => {
      return await pokeApiService.getPokemonAbility(ability.ability.name, signal)
    })

    const [megas, variants, gmaxs, abilities] = await Promise.all([
      Promise.all(megaPromises),
      Promise.all(variantPromises),
      Promise.all(gigamaxesPromises),
      Promise.all(abilitiesPromises),
    ])

    return mapToPokemonDTO(species, chainEvolution, pokemon, allSprites, megas, variants, gmaxs, abilities, spritesService.getAllSprites)
  } catch (e) {
    if (e === 'Aborted') return null
    throw e
  }
}

export const filterPokemonList = async (
  request: PokedexFilters,
  pokemonList: Set<string>,
  signal?: AbortSignal
): Promise<Set<string> | null> => {
  const results: Set<string>[] = []

  try {
    if (request.generationFilter) {
      const generationPokes = await Promise.all(
        request.generationFilter.map(gen => pokeApiService.getPokemonGeneration(gen, signal))
      )
      const generationPokesNames = generationPokes.flatMap((poke) => mapToPokemonNamesDAO(poke.pokemon_species))
      const filteredGen = generationPokesNames.filter(name => pokemonList.has(name))
      results.push(new Set(filteredGen))
    }

    if (request.typesFilter) {
      const [firstTypeName, secondTypeName] = request.typesFilter
      const firstType = firstTypeName ? await pokeApiService.getPokemonType(firstTypeName, signal) : null
      const secondType = secondTypeName ? await pokeApiService.getPokemonType(secondTypeName, signal) : null

      if (firstType && secondType) {
        const secondSet = new Set(secondType.pokemon.map(p => p.pokemon.name))
        const shared = firstType.pokemon
          .filter(p => secondSet.has(p.pokemon.name))
          .map(p => p.pokemon.name)
        const filteredTypes = shared.filter(name => pokemonList.has(name))
        results.push(new Set(filteredTypes))
      } else if (firstType || secondType) {
        const typeData = firstType || secondType
        const typeNames = typeData?.pokemon.map(p => p.pokemon.name)
        const filteredTypes = typeNames?.filter(name => pokemonList.has(name))
        results.push(new Set(filteredTypes))
      }
    }

    if (request.abilitiesFilter) {
      const abilitiesData = await Promise.all(
        request.abilitiesFilter.map(ability => pokeApiService.getPokemonAbility(ability, signal))
      )
      let abilitiesPokemons = abilitiesData.map((data) => data.pokemon)
      const names = abilitiesPokemons.flatMap((data) => data.map((poke) => poke.pokemon.name))
      const filteredAbilities = names.filter(name => pokemonList.has(name))
      
      results.push(new Set(filteredAbilities))
    }

    const activeFilters = results.filter((filter) => filter.size > 0)
    if (activeFilters.length === 0) return null

    const finalResult = activeFilters.reduce((acc, curr) =>
      new Set([...acc].filter(poke => curr.has(poke)))
    )

    return new Set([...finalResult].filter(poke => pokemonList.has(poke)))
  } catch (e) {
    if (e === 'Aborted') return null
    throw e
  }
}
