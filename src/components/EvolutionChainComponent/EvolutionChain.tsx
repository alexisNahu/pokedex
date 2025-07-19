import { EvolutionChainDTO } from "@models";
import { PUBLIC } from "@models/routes/routes";
import { useNavigate } from "react-router-dom";

interface Props {
  evolutionChain: EvolutionChainDTO[]
}

function EvolutionChain({evolutionChain}: Props) {

  const navigator = useNavigate()

  return (
    <div className="d-flex flex-row">
      {evolutionChain.map((evo) => (
        <span
          key={evo.name}
          className="mx-4 d-flex justify-content-center align-items-center flex-column"
          onClick={() => {navigator(`/${PUBLIC.DESCRIPTION}/${evo.name}`)}}
          style={{cursor: 'pointer'}}
        >
          <img 
            src={evo.sprite.animated.normal.d2.front} 
            alt={`${evo.name}-sprite`}
            className="evolution-img"
            style={{width: '100px'}}
            onError={(e) => {
              const img = e.currentTarget;
              img.src = `${evo.sprite.static.normal.d3}`
            }}
          />
          <p className="evolution-name">{evo.name}</p>
        </span>
      ))}

    </div>
  )
}

export default EvolutionChain;