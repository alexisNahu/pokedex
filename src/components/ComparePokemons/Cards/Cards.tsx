import { CardData, ModelData, PokemonDTO, VariantPokemonDTO } from '@models/pokemon.model';
import React from 'react';


function Cards({ data, columns }: { 
  data: CardData[]; 
  columns: Array<{
    column: string;
    data: (item: CardData) => React.ReactNode;
    width?: string; // Nueva propiedad opcional
  }>;
}) {
  return (
    <div className="container py-4">
      {/* Encabezados */}
      <div className="row fw-bold border-bottom pb-2 mb-3 text-center">
        {columns.map((col, index) => (
          <div 
            key={index} 
            className="col"
            style={{ 
              width: col.width || 'auto',
              minWidth: col.width || 'auto',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {col.column.toUpperCase()}
          </div>
        ))}
      </div>
      
      {/* Filas de datos */}
      <div className='pokemon-list overflow-y-auto overflow-x-hidden' style={{height: '600px'}}>
        {data.length > 0 ? (
          data.map((pokemon, i) => (
            <div key={`${pokemon.variant.name}-${i}`}>
              <div className="row align-items-center text-center py-2 mb-3 shadow-sm rounded bg-poke-blue text-white">
                {columns.map((col, j) => (
                  <div 
                    key={j} 
                    className="col"
                    style={{
                      width: col.width || 'auto',
                      minWidth: col.width || 'auto',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {col.data({variant: pokemon.variant, original: pokemon.original})}
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
  );
}

export default Cards