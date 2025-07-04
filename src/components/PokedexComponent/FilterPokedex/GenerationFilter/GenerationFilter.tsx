import React, { useEffect } from 'react'

interface Props {
    generation: string[],
    setGeneration: React.Dispatch<React.SetStateAction<string[]>>
}

function GenerationFilter({generation, setGeneration}: Props) {
    const handleGenerationsClick = (value: string) => {
        if (!generation.includes(value)) {
            setGeneration(prev => [...prev, value])
            return
        }
        const updatedGenerationArray = generation.filter(gen => gen !== value)
        setGeneration(updatedGenerationArray)
    }

    return (
        <div>
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

        </div>
    )
}

export default GenerationFilter