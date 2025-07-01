import React, { ReactNode } from 'react'
import { getStatic3dSprite } from '@services/pokemonSprites.service'
import { useNavigate } from 'react-router-dom'
import { PUBLIC } from '@models/routes/routes'
import './Card.css'

function Card({ text }: { text: ReactNode }) {
  const navigator = useNavigate()

  return (
    <div
      className="card custom-card"
      onClick={() => navigator(`/${PUBLIC.DESCRIPTION}/${text as string}`)}
    >
      <div className="card-image-container custom-card-image-container">
        <img
          src={getStatic3dSprite(text as string, false)}
          className="card-image custom-card-image"
          alt={`${text}`}
        />
      </div>
      <span className="card-text custom-card-text">{text}</span>
    </div>
  )
}

export default Card
