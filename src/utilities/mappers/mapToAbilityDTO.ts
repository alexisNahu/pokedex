import {AbilityDAO} from "@models/dao";
import {  AbilityDTO, DescriptionLanguages } from "@models/pokemon.model";


export function mapToAbilityDTO(abilityDAO: AbilityDAO): AbilityDTO {
  function mapEntriesByLang(lang: DescriptionLanguages) {
    const entries = abilityDAO.effect_entries.filter(entry => entry.language.name === lang);
    
    if (entries.length === 0) return [];

    return entries.map(entry => ({
      name: abilityDAO.name, // Si tienes traducción de nombres, aquí la usas
      pokedex_description: entry.short_effect,
      in_game_effect: entry.effect
    }));
  }

  return {
    en: mapEntriesByLang('en'),
    es: mapEntriesByLang('es'),
    jp: mapEntriesByLang('jp'),  // o 'jp' si usas ese código
  };
}



