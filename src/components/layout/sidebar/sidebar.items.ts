import type { SidebarItemsType } from "./model";

export const sidebarItems: SidebarItemsType = [
  {
    text: 'Inicio'
  },
  {
    text: 'Pokédex',
    icon: '/poke-icons/pokedex.png',
    items: [
      { text: 'Todos los Pokémon' },
      { text: 'Por tipo' },
      { text: 'Favoritos' },
    ]
  },
  {
    text: 'Entrenadores',
    icon: '/poke-icons/game.png',
    items: [
      { text: 'Mis Pokémon' },
      { text: 'Medallas' },
      { text: 'Registro de combates' },
    ]
  },
  {
    text: 'Minijuegos',
    icon: '/poke-icons/battle.png',
    items: [
      { text: 'Adivina el Pokémon' },
      { text: 'Batalla rápida' },
      { text: 'Trivia Pokémon' },
    ]
  },
  {
    text: 'Exploración',
    icon: 'poke-icons/medalla.png',
    items: [
      { text: 'Regiones' },
      { text: 'Pokémon por región' },
      { text: 'Avistamientos' },
    ]
  },
  {
    text: 'Configuración',
  }
]
