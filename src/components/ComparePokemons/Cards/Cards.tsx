import { CardData, PokemonStat } from '@models/pokemon.model';
import React from 'react';
import { useMobileContext } from '@contexts/isMobile.context';


function Cards({ data, columns }: { 
  data: CardData[]; 
  columns: Array<{
    column: string;
    data: (item: CardData) => React.ReactNode;
    width?: string;
  }>;
}) {
  const {isMobile} = useMobileContext()

  const PokemonStats: PokemonStat[] = [
  'hp',
  'attack',
  'defense',
  'specialattack',
  'specialdefense',
  'speed',
];


  return (
    <div className={`container ${isMobile ? '' : 'py-4'}`}>
      {/* Encabezados */}
      <div className={`fw-bold border-bottom pb-2 mb-3 text-center ${isMobile ? 'd-flex flex-column' : 'row'}`}>
        {columns.map((col, index) => (
          <div 
            key={index} 
            className={`col ${isMobile ? 'd-flex flex-column' : ''}`}
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
      <div className={`pokemon-list overflow-y-auto overflow-x-hidden ${isMobile ? 'w-100' : ''}`} style={{height: '600px'}}>
        {data.length > 0 ? (
          data.map((pokemon, i) => (
            <div key={`${pokemon.variant.name}-${i}`}>
              <div className={`row align-items-center text-center py-2 mb-3 shadow-sm rounded bg-poke-blue text-white ${isMobile ? 'd-flex flex-column' : ''}`}>
                {columns.map((col, j) => (
                  <div 
                    key={j} 
                    className={`${isMobile ? 'd-flex flex-column' : 'col'}`}
                    style={{
                      width: col.width || 'auto',
                      minWidth: col.width || 'auto',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    <div className="d-flex" style={{ gap: '1rem' }}>
                      <p style={{ margin:'0 2px' }}>
                        {(isMobile && PokemonStats.includes(col.column.toLowerCase().replace(' ','') as PokemonStat)) ? col.column : ''}
                      </p>
                      {col.data({ variant: pokemon.variant, original: pokemon.original })}
                    </div>
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