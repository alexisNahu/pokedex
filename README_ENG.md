# 🚀 POKÉDEX APPLICATION  

## 🌟 MAIN FEATURES  

### 🔍 POKÉMON EXPLORATION  

✅ Search Pokémon by name, type, generation, or abilities  
✅ View stats, evolutions, and variants (Mega, Gigantamax, regional forms)  
✅ Responsive design for mobile and desktop  

---

### ⚖️ ADVANCED COMPARISON  

✅ Create and compare multiple Pokémon simultaneously  
✅ Detailed table with stats, types, and abilities  

---

### 👥 TEAM MANAGEMENT  

✅ Save your favorite teams  
✅ Easily edit team names and composition  

---

## 🔐 USER SYSTEM  

### ✅ BASIC AUTHENTICATION SYSTEM  
Saves users using Redux and localStorage  
Includes login, registration, and logout functionality  

---
### ✅ DEFAULT USER  
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
```
---
## 🌟 INSTALLATION AND USAGE
### PREREQUISITES
Node.js (v18+)
npm or yarn
---
### INSTALLATION
---
git clone https://github.com/alexisNahu/pokedex.git


cd pokedex


npm install


npm run dev

### PROJECT STRUCTURE
---
src/  
├── api/                  # API calls 
├── components/           # Reusable components  
├── contexts/             # React contexts  
├── guards/               # Route protection  
├── hooks/                # Custom hooks (Includes useQueries)  
├── models/               # Types and interfaces  
├── pages/                # Main views  
├── redux/                # Store, slices, reducers  
├── services/             # Business logic  
└── styles/               # Global styles  
