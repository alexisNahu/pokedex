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
import { SetURLSearchParams, useNavigate } from 'react-router-dom'

function FilterPokedex({ dataFont}: { dataFont: Set<string>}) {

    const { setState } = useModalContext()
    const { setCurrentPage } = usePokedexPaginationContext()
    const { setPokedexList, filters, setFilters } = usePokedexContext()

    const navigate = useNavigate()

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
        navigate(window.location.pathname, { replace: true });
    }

    return (
        <>
            <div className='filter-buttons d-flex align-content-center'>
                <button
                    className="btn btn-outline-dark align-self-center"
                    onClick={resetFilter}
                >
                    Show all
                </button>
                <i
                    className="bi bi-filter-square-fill filter-icon mx-3"
                    onClick={() => setState(true)}
                    style={{color: 'black'}}
                    title="Filter Pokémon"
                ></i>

            </div>

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
                        
                    </div>
                </div>
            </Modal>
            </>

    )
}

export default FilterPokedex
