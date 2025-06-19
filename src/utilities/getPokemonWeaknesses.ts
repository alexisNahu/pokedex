    import { Type, TypeDAO } from "@models/dao";
    import { POKEMON_TYPES, pokemonWeaknesses } from "@models/pokemonTypes.model";
    import * as pokeApiService from '@services/index'

    export async function getPokemonWeaknesses(pokemon_types: Type[]): Promise<pokemonWeaknesses> {
        async function getTypeInfo () {
            const typePromises: Promise<TypeDAO>[] = pokemon_types.map(async (type) => {
            try {
                return await pokeApiService.getPokemonWeaknesses(type.type.url);
            } catch (e) {
                throw new Error(`error fetching type: ${e}`)
            }
            });
        
            return await Promise.all(typePromises);
        }  

        const typesdao = await getTypeInfo(); //TypeDAO[] ya que recordemos que tienen uno o dos tipos, por eso es un array
        
        function getMultipliterByType (type: POKEMON_TYPES, i: number): number {
            if (typesdao[i].damage_relations.double_damage_from.some(item => item.name == type)) return 2

            if (typesdao[i].damage_relations.no_damage_from.some(item => item.name == type)) return 0
            
            if (typesdao[i].damage_relations.half_damage_from.some(item => item.name == type)) return 0.5 

            return 1
        }

        const types_damage_table: {type: string, table: {name: string, multiplier: number}[]}[] = []

        const response = {
            x0: {},
            x05: {},
            x025: {},
            x1: {},
            x2: {},
            x4: {}
        }

        typesdao.forEach((typeDAO, i) => {
    // Limpia el array antes de comenzar con el nuevo tipo
    const types_damage_data: {name: string, multiplier: number}[] = [];

    Object.keys(POKEMON_TYPES).forEach((typeKey) => {
        const attackType = POKEMON_TYPES[typeKey as keyof typeof POKEMON_TYPES];
        const multiplier = getMultipliterByType(attackType, i);

        types_damage_data.push({ name: attackType, multiplier });
    });

    types_damage_table.push({type: typeDAO.name, table: types_damage_data});
});


        const x0: POKEMON_TYPES[] = []
        const x05: POKEMON_TYPES[] = []
        const x025: POKEMON_TYPES[] = []
        const x1: POKEMON_TYPES[] = []
        const x2: POKEMON_TYPES[] = []
        const x4: POKEMON_TYPES[] = []


        
        for (let i = 0; i < types_damage_table[0].table.length; i++) {
                const attack = types_damage_table[0].table[i].name;
                const mult1 = types_damage_table[0].table[i].multiplier;
                let mult2 = 1;
                if (types_damage_table.length == 2) mult2 = types_damage_table[1].table[i].multiplier
    
    
                const total = mult1 * mult2;

    
                if (total === 0) x0.push(POKEMON_TYPES[attack.toUpperCase() as keyof typeof POKEMON_TYPES])
        
    
                if (total === 1) x1.push(POKEMON_TYPES[attack.toUpperCase() as keyof typeof POKEMON_TYPES])

    
                if (total === 0.5) x05.push(POKEMON_TYPES[attack.toUpperCase() as keyof typeof POKEMON_TYPES])

    
                if (total === 0.25) x025.push(POKEMON_TYPES[attack.toUpperCase() as keyof typeof POKEMON_TYPES])

    
                if (total === 2) x2.push(POKEMON_TYPES[attack.toUpperCase() as keyof typeof POKEMON_TYPES])

    
                if (total === 4) x4.push(POKEMON_TYPES[attack.toUpperCase() as keyof typeof POKEMON_TYPES])
            }



        response.x0 = x0
        response.x05 = x05
        response.x025 = x025
        response.x1 = x1
        response.x2 = x2
        response.x4 = x4


        return response as pokemonWeaknesses    
    }