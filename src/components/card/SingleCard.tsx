import { carouselSize } from "./CardCarousel"

function SingleCard() {
  return (
    <div className="card d-flex bg-transparent" style={carouselSize}>
        <img src="..." className="card-img-top" alt="..." />
        <div className="card-body d-flex justify-content-center align-items-center flex-column">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
            <a href="#" className="btn btn-primary">Go somewhere</a>
        </div>
    </div>
  )
}

export default SingleCard