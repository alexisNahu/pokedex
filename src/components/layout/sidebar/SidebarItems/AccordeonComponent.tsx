import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';

import type { DropdownItem } from '../model';
import SidebarItem from './SidebarItem';

function AccordeonComponent({ item }: { item: DropdownItem }) {
  const safeId = item.text.replace(/\s+/g, '-').toLowerCase();

  return (
    <>
    <style>
        {`
          #flush-heading-${safeId} > .accordion-button::after {
            /* Cambia el color de la flechita (fill en SVG) */
            background-image: url(${'icon' in item ? item.icon : '/poke-icons/pokeball'});
            width: 2em;
            height: 2em;
            background-size: 1.9em 1.9em;
          }
        `}
      </style>
    
    <div className='accordion accordion-flush' id={`accordionFlush-${safeId}`}>
      <div className='accordion-item bg-poke-blue'>
        <h2 className='accordion-header container g-3' id={`flush-heading-${safeId}`}>
          <button 
            className="accordion-button collapsed btn text-white bg-poke-blue" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target={`#flush-collapse-${safeId}`} 
            aria-expanded="false" 
            aria-controls={`flush-collapse-${safeId}`}
          >
            {item.text}
          </button>
        </h2>
        <div 
          id={`flush-collapse-${safeId}`} 
          className="accordion-collapse collapse" 
          aria-labelledby={`flush-heading-${safeId}`}
          data-bs-parent={`#accordionFlush-${safeId}`}
        >
          {item.items.map((s_item, i) => (
            <div className='accordion-body p-1' key={i}>
              <SidebarItem item={s_item} />
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}

export default AccordeonComponent;
