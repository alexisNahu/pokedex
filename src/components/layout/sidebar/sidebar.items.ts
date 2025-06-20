import type { SidebarItemsType } from "@models/sidebar.model";
import { PUBLIC } from "@models/routes/routes";

export const sidebarItems: SidebarItemsType = [
  {
    text: 'Inicio',
    url: `/${PUBLIC.LANDING_PAGE}`,
    type: 'single'
  },
  {
    text: 'Search pokemon',
    type: 'input',
    bootstrapIcon: 'bi bi-search'
  },
  {
    text: 'Pokédex',
    icon: 'charizard',
    bootstrapIcon: 'bi-journal-bookmark',
    items: [
      { text: 'Todos los Pokémon' },
      { text: 'Por tipo' },
      { text: 'Favoritos' },
    ],
    type: 'accordeon'
  },
  {
    text: 'Entrenadores',
    icon: 'tyranitar',
    bootstrapIcon: 'bi-person-lines-fill',
    items: [
      { text: 'Mis Pokémon' },
      { text: 'Medallas' },
      { text: 'Registro de combates' },
    ],
    type: 'accordeon'
  },
  {
    text: 'Minijuegos',
    icon: 'gengar',
    bootstrapIcon: 'bi bi-controller',
    items: [
      { text: 'Adivina el Pokémon' },
      { text: 'Batalla rápida' },
      { text: 'Trivia Pokémon' },
    ],
    type: 'accordeon'
  },
  {
    text: 'Exploración',
    icon: 'venusaur',
    bootstrapIcon: 'bi bi-compass',
    items: [
      { text: 'Regiones' },
      { text: 'Pokémon por región' },
      { text: 'Avistamientos' },
    ],
    type: 'accordeon'

  },
  {
    text: 'Configuración',
    type: 'single'
  }
]
