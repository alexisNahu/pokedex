import './PaginationButtons.css'
import { usePokedexPaginationContext } from '@contexts/pokedexPagination.context'

function PaginationButtons() {
  const { currentPage, setCurrentPage, lastPage } = usePokedexPaginationContext()

  return (
    <div className="pagination-container">
      <button className="pagination-nav-button" onClick={() => setCurrentPage(prev => prev - 1)} style={{visibility: currentPage !== 1 ? 'visible' : 'hidden'}}>
        Prev Page
      </button>

      <div className="pagination-numbers">
        {Array.from({ length: 4 }).map((_, i) => {
          console.log(i + 1)
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
        }).reverse()}

        <button className="pagination-number current" disabled>
          {currentPage}
        </button>

        {Array.from({ length: 4 }).map((_, i) => {
          const val = currentPage + (i + 1)
          return (
            val <= lastPage && <button
              key={`next-${val}`}
              className="pagination-number"
              onClick={() => setCurrentPage(val)}
            >
              {val}
            </button>
          )
        })}
      </div>

      <button className="pagination-nav-button" onClick={() => setCurrentPage(prev => prev + 1)} style={{visibility: currentPage !== lastPage ? 'visible' : 'hidden'}}>
        Next Page
      </button>
    </div>
  )
}

export default PaginationButtons
