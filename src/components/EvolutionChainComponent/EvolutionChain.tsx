interface Props {
  evolutionChain: {name: string, sprite: string}[]
}

function EvolutionChain({evolutionChain}: Props) {
  return (
    <div className="evolution-container">
      {evolutionChain.map((evo) => (
        <div key={evo.name} className="evolution-item">
          <img 
            src={evo.sprite} 
            alt={`${evo.name}-sprite`}
            className="evolution-img"
          />
          <p className="evolution-name">{evo.name}</p>
        </div>
      ))}
    </div>
  )
}

export default EvolutionChain;