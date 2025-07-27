import { usePokedexContext } from '@contexts/pokedex.context'
import { PokedexFilters } from '@models/pokemon.model'
import React, { useEffect, useState } from 'react'

function GenerationFilter() {
    const {filters, setFilters} = usePokedexContext()

    const [generation, setGeneration] = useState<string[]>([])

    useEffect(() => {
        const updatedFilter: PokedexFilters = {...filters, generationFilter: generation}
        setFilters(updatedFilter)
    }, [generation])

    const handleGenerationsClick = (value: string) => {
        if (!generation.includes(value)) {
            setGeneration(prev => [...prev, value])
            return
        }
        const updatedGenerationArray = generation.filter(gen => gen !== value)
        setGeneration(updatedGenerationArray)
    }

    return (
            <div className="generation-buttons" role="group" aria-label="Generation Selection">
                <span className="generation-label">Generation:</span>
                {Array.from({ length: 9 }).map((_, index) => {
                    const gen = `${index + 1}`
                    return (
                    <button
                        key={index}
                        type="button"
                        className={`btn generation-btn ${generation.includes(gen) ? 'active' : 'btn-outline-light'}`}
                        onClick={() => handleGenerationsClick(gen)}
                        aria-pressed={generation.includes(gen)}
                    >
                        {gen}
                    </button>
                    )
                })}
                </div>
    )
}

export default GenerationFilter