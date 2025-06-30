import React, { ReactNode } from 'react'
import { getStatic3dSprite } from '@services/pokemonSprites.service'
import { useNavigate } from 'react-router-dom'
import { PUBLIC } from '@models/routes/routes'
import './Card.css'

function Card({ text }: { text: ReactNode }) {
  const navigator = useNavigate()

  return (
    <div
      className="card-container mx-2 my-2 p-2 rounded shadow-sm text-black text-center d-flex flex-column align-items-center justify-content-between"
      onClick={() => navigator(`/${PUBLIC.DESCRIPTION}/${text as string}`)}
    >
      <div className="pokemon-sprite-container d-flex justify-content-center">
        <img
          src={getStatic3dSprite(text as string, false)}
          className="img-fluid"
          alt={`${text}`}
        />
      </div>
      <span className="fst-italic mt-2 text-capitalize">{text}</span>
    </div>
  )
}

export default Card
