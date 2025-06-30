import { usePokedexContext } from '@contexts/pokedex.context'

function PaginationButtons({lastPage}: {lastPage: number}) {
    const {currentPage, setCurrentPage} = usePokedexContext()

    return (
    <div className="buttons p-3 w-100 d-flex justify-content-around">
        { currentPage !== 1 && <button className='btn bg-poke-blue text-white' onClick={() => setCurrentPage(prev => prev - 1)}>prev page</button>}
        <div className='d-flex'>
        {
            Array.from({length: 4}).map((_,i) => {
            const val = currentPage - (i+1)
            if (val>0) return <button className='mx-2 my-2 p-2 rounded shadow-sm text-black bg-poke-blue' style={{border: '1px solid var(--bs-blue)'}} onClick={() => setCurrentPage(val)}>{val}</button>
            })
        }
        {<button className='mx-2 my-2 p-2 rounded shadow-sm text-black bg-poke-yellow' style={{border: '1px solid var(--bs-blue)'}} >{currentPage}</button>}
        {
            Array.from({length: 4}).map((_,i) => {
            return <button className='mx-2 my-2 p-2 rounded shadow-sm text-black bg-poke-blue' style={{border: '1px solid var(--bs-blue)'}} onClick={() => setCurrentPage(currentPage + (i+1))}>{currentPage + (i+1)}</button>
            })
        }
        </div>
        { currentPage !== lastPage  &&  <button className='btn bg-poke-blue text-white' onClick={() => setCurrentPage(prev => prev + 1)}>next page</button>}
    </div>
    )
}

export default PaginationButtons