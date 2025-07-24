import * as spritesService from '@services/pokemonSprites.service'
import { AllSpritesDAO } from '@models/dao'
import { useQuery } from '@tanstack/react-query';
interface SpriteQueryParams {
  pokemonName: string;
  isShiny: boolean;
}

const useGetAllSprites = (pokemonName: string) => 
  useQuery({
    queryKey: ['pokemon', 'sprites', 'all', pokemonName],
    queryFn: () => spritesService.getAllSprites(pokemonName),
    staleTime: 24 * 60 * 60 * 1000 // 1 día
  });

const useGetStaticFrontwardsSprite = ({ pokemonName, isShiny }: SpriteQueryParams) => 
  useQuery({
    queryKey: ['pokemon', 'sprites', 'static', 'front', pokemonName, isShiny ? 'shiny' : 'normal'],
    queryFn: () => spritesService.getStaticFrontwardsSprite(pokemonName, isShiny)
  });

const useGetStaticBackwardsSprite = ({ pokemonName, isShiny }: SpriteQueryParams) => 
  useQuery({
    queryKey: ['pokemon', 'sprites', 'static', 'back', pokemonName, isShiny ? 'shiny' : 'normal'],
    queryFn: () => spritesService.getStaticBackwardsSprite(pokemonName, isShiny)
  });

const useGetAnimatedFrontwardsSprite = ({ pokemonName, isShiny }: SpriteQueryParams) => 
  useQuery({
    queryKey: ['pokemon', 'sprites', 'animated', 'front', pokemonName, isShiny ? 'shiny' : 'normal'],
    queryFn: () => spritesService.getAnimatedFrontwardsSprite(pokemonName, isShiny)
  });

const useGetAnimatedBackwardsSprite = ({ pokemonName, isShiny }: SpriteQueryParams) => 
  useQuery({
    queryKey: ['pokemon', 'sprites', 'animated', 'back', pokemonName, isShiny ? 'shiny' : 'normal'],
    queryFn: () => spritesService.getAnimatedBackwardsSprite(pokemonName, isShiny)
  });

const useGet3dSprite = ({ pokemonName, isShiny }: SpriteQueryParams) => 
  useQuery({
    queryKey: ['pokemon', 'sprites', '3d', pokemonName, isShiny ? 'shiny' : 'normal'],
    queryFn: () => spritesService.getStatic3dSprite(pokemonName, isShiny),
    staleTime: 24 * 60 * 60 * 1000 // 1 día
  });

const useGetAll3dSprites = ({ pokemonName, isShiny }: SpriteQueryParams) => 
  useQuery({
    queryKey: ['pokemon', 'sprites', '3d', 'all', pokemonName, isShiny ? 'shiny' : 'normal'],
    queryFn: () => spritesService.getAll3dSprites(pokemonName, isShiny)
  });

export {
  useGetAllSprites,
  useGetStaticFrontwardsSprite,
  useGetStaticBackwardsSprite,
  useGetAnimatedBackwardsSprite,
  useGetAnimatedFrontwardsSprite,
  useGet3dSprite,
  useGetAll3dSprites
}