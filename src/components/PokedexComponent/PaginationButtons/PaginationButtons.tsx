import { usePokedexContext } from '@contexts/pokedex.context'
import './PaginationButtons.css'

function PaginationButtons({ lastPage }: { lastPage: number }) {
  const { currentPage, setCurrentPage } = usePokedexContext()

  return (
    <div className="pagination-container">
      {currentPage !== 1 && (
        <button className="pagination-nav-button" onClick={() => setCurrentPage(prev => prev - 1)}>
          Prev Page
        </button>
      )}

      <div className="pagination-numbers">
        {Array.from({ length: 4 }).map((_, i) => {
          const val = currentPage - (i + 1)
          if (val > 0) {
            return (
              <button
                key={`prev-${val}`}
                className="pagination-number"
                onClick={() => setCurrentPage(val)}
              >
                {val}
              </button>
            )
          }
        })}

        <button className="pagination-number current" disabled>
          {currentPage}
        </button>

        {Array.from({ length: 4 }).map((_, i) => {
          const val = currentPage + (i + 1)
          return (
            <button
              key={`next-${val}`}
              className="pagination-number"
              onClick={() => setCurrentPage(val)}
            >
              {val}
            </button>
          )
        })}
      </div>

      {currentPage !== lastPage && (
        <button className="pagination-nav-button" onClick={() => setCurrentPage(prev => prev + 1)}>
          Next Page
        </button>
      )}
    </div>
  )
}

export default PaginationButtons
