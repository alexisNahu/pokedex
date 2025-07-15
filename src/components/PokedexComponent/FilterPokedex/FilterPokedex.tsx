import { useModalContext } from '@components/Modal/context/UseModalContext'
import { Modal } from '@components/Modal/CustomModal'
import { usePokedexContext } from '@contexts/pokedex.context'
import { filterPokemonList } from '@services/index'
import { usePokemonNamesContext } from '@contexts/pokemonNames.context'
import './FilterPokedex.css'
import GenerationFilter from './GenerationFilter/GenerationFilter'
import { usePokedexPaginationContext } from '@contexts/pokedexPagination.context'
import TypesFilter from './TypesFilter/TypesFilter'
import AbilityFilter from './AbilityFilter/AbilityFilter'

function FilterPokedex({ dataFont }: { dataFont: Set<string> }) {

    const { setState } = useModalContext()
    const { setCurrentPage } = usePokedexPaginationContext()
    const { setPokedexList, filters, setFilters } = usePokedexContext()

    const applyFilters = async () => {
        console.log(filters)
        const filteredList = filters ? await filterPokemonList(filters, dataFont) : null

        if (!filteredList?.size) {
            alert('Not a result for these filters')
            return
        }

        setCurrentPage(1)
        setPokedexList([...filteredList])
        setFilters({
            generationFilter: [],
            typesFilter: [null, null],
            abilitiesFilter: []
        })
        setState(false)
    }

    const resetFilter = () => {
        setPokedexList([...dataFont])
        setFilters({
            generationFilter: [],
            typesFilter: [null, null],
            abilitiesFilter: []
        })
    }

    return (
        <>
            <i
                className="bi bi-filter-square-fill filter-icon"
                onClick={() => setState(true)}
                style={{color: 'black'}}
                title="Filter Pokémon"
            ></i>

            <Modal>
                <div className='filter' style={{width: 1000}}>
                    {/* filters */}
                    <GenerationFilter />
                    <TypesFilter  />
                    <AbilityFilter  />

                    <div className="d-flex justify-content-center gap-3">
                        <button
                            className="btn filter-action-btn apply-btn"
                            onClick={applyFilters}
                            disabled={!filters}
                        >
                            Apply
                        </button>
                        <button
                            className="btn filter-action-btn reset-btn"
                            onClick={resetFilter}
                        >
                            Reset Filter
                        </button>
                    </div>
                </div>
            </Modal>
            </>

    )
}

export default FilterPokedex
