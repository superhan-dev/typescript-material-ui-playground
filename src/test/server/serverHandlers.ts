import { rest } from 'msw'

export const handlers = [
  rest.get('https://pokeapi.co/api/v2/bulbasaur', (req, res, ctx) => {
    const mockApiResponse = {
      specied: {
        name: 'bulbasaur',
      },
      sprites: {
        front_shiny:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png',
      }
    }
    return res(ctx.json(mockApiResponse))
  })
]
