




📌 Overview / Visión General
EN: A complete application for exploring, comparing, and managing Pokémon teams.
ES: Una aplicación completa para explorar, comparar y gestionar equipos de Pokémon.





✨ Features / Características Principales
🔍 Pokémon Exploration / Exploración de Pokémon


✅ EN:

Search Pokémon by name, type, generation, or abilities

View stats, evolutions, and variants (Mega, Gigantamax, regional forms)

Responsive design for mobile and desktop



✅ ES:

Busca Pokémon por nombre, tipo, generación o habilidades

Visualiza estadísticas, evoluciones y variantes (Mega, Gigamax, regionales)

Diseño responsive para móvil y desktop




⚖️ Advanced Comparison / Comparación Avanzada

✅ EN:

Create and compare multiple Pokémon simultaneously

Detailed table with stats, types, and abilities


✅ ES:

Crea y compara Pokémones simultáneamente

Tabla detallada con stats, tipos y habilidades




👥 Team Management / Gestión de Equipos


✅ EN:

Save your favorite teams

Easily edit team names and composition



✅ ES:

Guarda tus equipos favoritos

Edita nombres y composición fácilmente





🔐 User System / Sistema de Usuarios


✅ EN:

Register, login, and logout

Save favorite Pokémon

Public/private route protection



✅ ES:

Registro, login y logout

Guardado de Pokémon favoritos

Protección de rutas públicas/privadas




💻 Modern Technologies / Tecnologías Modernas


✅ EN:

React 19 + TypeScript

Redux Toolkit + React Query

Bootstrap 5 + Sass



✅ ES:

React 19 + TypeScript

Redux Toolkit + React Query

Bootstrap 5 + Sass




🚀 How to Run / Cómo Ejecutarlo
Prerequisites / Requisitos Previos
Node.js (v18+)

npm or yarn

Installation / Instalación
bash
git clone https://github.com/your-username/pokedex.git
cd pokedex
npm install
npm run dev





🛠️ Project Structure / Estructura del Proyecto
text
src/  
├── api/                  # EN: Pokémon API calls / ES: Llamadas a la API de Pokémon  
├── components/           # EN: Reusable components / ES: Componentes reutilizables  
├── contexts/             # EN: React contexts / ES: Contextos de React  
├── guards/               # EN: Route protection / ES: Protección de rutas  
├── hooks/                # EN: Custom hooks / ES: Hooks personalizados  
├── models/               # EN: Types and interfaces / ES: Tipos e interfaces  
├── pages/                # EN: Main views / ES: Vistas principales  
├── redux/                # EN: Store, slices, reducers / ES: Store, slices, reducers  
├── services/             # EN: Business logic / ES: Lógica de negocio  
└── styles/               # EN: Global styles / ES: Estilos globales  




👤 User System / Sistema de Usuarios


✅ Default User Configuration / Usuario por Defecto

The app includes a pre-configured demo user for easy testing:
La aplicación incluye un usuario demo preconfigurado para pruebas fáciles:

typescript
{
  id: 1,
  username: 'alexis',
  password: '123456789',
  email: 'alexisnahuelidoyaga@gmail.com',
  role: 'USER',
  favorites: [],
  teams: [
    { id: 1, name: "main", pokemons: ['charizard', 'greninja'] },
    { id: 2, name: "saeloo", pokemons: ['squirtle', 'eevee'] }
  ]
}




🔒 Authentication Features / Funcionalidades de Autenticación


✅ EN:

Auto-login enabled by default (stored in localStorage)

Protected routes for logged-in users

Team persistence across sessions



✅ ES:

Auto-login habilitado por defecto (almacenado en localStorage)

Rutas protegidas para usuarios registrados

Equipos persisten entre sesiones

🛠️ Technical Implementation / Implementación Técnica
typescript
// Redux slice configuration:
export const userSlice = createSlice({
  name: 'user',
  initialState: localStorage.getItem('user') 
    ? JSON.parse(localStorage.getItem('user') 
    : initialState,
  reducers: {
    loginUser, logoutUser, registerUser,
    addTeam, updateTeam, deleteTeam
  }
});
