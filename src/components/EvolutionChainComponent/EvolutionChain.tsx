import { AllSpritesDAO } from "@models/dao";

interface Props {
  evolutionChain: {name: string, sprite: AllSpritesDAO}[]
}

function EvolutionChain({evolutionChain}: Props) {
  return (
    <div className="evolution-container">
      {evolutionChain.map((evo) => (
        <div key={evo.name} className="evolution-item">
          <img
            src={evo.sprite.animated.normal.d2.front}
            onError={(e) => {
              const imgElement = e.currentTarget;
              imgElement.src = evo.sprite.static.normal.d3;
              // Si el sprite estático también falla, podemos agregar otro manejador
              imgElement.onerror = () => {
                imgElement.src = '/path/to/placeholder.png';
              };
            }}
            alt={`${evo.name} sprite`}
          />
          <p className="evolution-name">{evo.name}</p>
        </div>
      ))}
    </div>
  )
}

export default EvolutionChain;