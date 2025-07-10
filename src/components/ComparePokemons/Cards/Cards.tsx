import { ModelData, PokemonStat, Stat } from '@models/pokemon.model'
import { useState } from 'react';

function Cards<T>({ data, columns }: { data: T[]; columns: ModelData<T>[] }) {

  return (
    <div className="container py-4">
      {columns.length > 0 && (
        <div className="row fw-bold border-bottom pb-2 mb-3 text-center">
          {columns.map((col, index) => (
            <div key={index} className="col">
              {col.column.toUpperCase()}
            </div>
          ))}
        </div>
      )}
      <div className='pokemon-list overflow-y-auto overflow-x-hidden' style={{height: '600px'}}>
        {data.length > 0 ? (
          data.map((item, i) => (
            <div>
              <div
                key={i}
                className="row align-items-center text-center py-2 mb-3 shadow-sm rounded bg-poke-blue text-white"
              >
                {columns.map((col, j) => (
                  <div key={j} className="col">
                    {typeof col.data === 'function' ? <p className='col'>{col.data(item)}</p>  : (item as any)[col.data]}
                  </div>
                ))}
              </div>
            </div>
            
          ))
        ) : (
          <div className="text-muted text-center mt-4">Nothing yet</div>
        )}

      </div>
    </div>
  )
}

export default Cards