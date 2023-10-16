import { gql } from "@apollo/client"


export const GET_POKEMON = gql`
query GetPokemon {
  pokemon_v2_pokemon {
    id
    name
  }
}
`