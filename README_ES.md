# 🚀 APLICACIÓN POKÉDEX  

## 🌟 CARACTERÍSTICAS PRINCIPALES  

### 🔍 EXPLORACIÓN DE POKÉMON  

✅ Busca Pokémon por nombre, tipo, generación o habilidades  
✅ Visualiza estadísticas, evoluciones y variantes (Mega, Gigamax, regionales)  
✅ Diseño responsive para móvil y escritorio  

---

### ⚖️ COMPARACIÓN AVANZADA  

✅ Crea y compara Pokémones simultáneamente  
✅ Tabla detallada con stats, tipos y habilidades  

---

### 👥 GESTIÓN DE EQUIPOS  

✅ Guarda tus equipos favoritos  
✅ Edita nombres y composición fácilmente  



---

## 🔐 SISTEMA DE USUARIOS  

###✅ SISTEMA DE AUTENTICACION BASICO
Guarda usuarios con ayuda de Redux y localStorage
Incluye logeo, registro y deslogeo de usuarios

---
### ✅ USUARIO POR DEFECTO  
```typescript
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
---
## 🌟 INSTALACION Y USO
### PREREQUISITOS
Node.js (v18+)
npm or yarn
---
### INSTALACION
---
git clone https://github.com/alexisNahu/pokedex.git
cd pokedex
npm install
npm run dev

### ESTRUCTURA DEL PROYECTO
---
src/  
├── api/                  # Llamadas a la APIS 
├── components/           # Componentes reutilizables  
├── contexts/             # Contextos de React  
├── guards/               #Protección de rutas  
├── hooks/                # Hooks personalizados   (Incluye las useQueries)
├── models/               #  Tipos e interfaces  
├── pages/                # Vistas principales  
├── redux/                #  Store, slices, reducers  
├── services/             #  Lógica de negocio  
└── styles/               #  Estilos globales  

