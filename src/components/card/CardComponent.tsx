import React from 'react'
import SingleCard from './SingleCard'

export const carouselSize = {
  width: '100%',
  height: '900px'
}

function CardComponent() {
  return (
    <div id="carouselExample" className="carousel slide" style={carouselSize}>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <SingleCard />
        </div>
        <div className="carousel-item">
          <SingleCard />
        </div>
        <div className="carousel-item">
          <SingleCard />
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
  </div>
  )
}

export default CardComponent