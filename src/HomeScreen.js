import React from "react"
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useQuery, gql } from "@apollo/client"

import { GET_POKEMON } from '../GQL/pokemonAPI.gql'


export default function HomeScreen() {
    // const GET_POKEMON = gql`
    // query GetPokemon {
    //   pokemon_v2_pokemon {
    //     id
    //     name
    //   }
    // }
    // `;

    const { data } = useQuery(GET_POKEMON);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Pokemón!</Text>
                <Text style={styles.subText}>Tengo que atraparlos!</Text>
            </View>

            <ScrollView>
                {data ? (
                    data.pokemon_v2_pokemon.map(({ id, name }) => (
                        <View key={id} style={styles.pokemonItems}>
                            <Text style={styles.pokemonText}>{id} {name}</Text>
                        </View>
                    ))
                ) : (
                    <Text style={styles.loadText}>Loading...</Text>
                )}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    headerText: {
        paddingTop: 20,
        fontSize: 60,
        fontWeight: 'bold',
        color: 'red'
    },
    subText: {
        fontSize: 20,
        fontWeight: 'regular',
        color: 'blue'
    },
    pokemonItems: {
        marginVertical: 10,
        padding: 20,
        borderWidth: 2,
        borderColor: 'blue',
        borderRadius: 20,
    },
    pokemonText: {
        fontSize: 20,
        fontWeight: 'regular',
        color: 'black',
        fontWeight: 'bold',
    },
    loadText:{
        paddingTop: 20,
        fontSize: 40,
        fontWeight: 'bold',
        color: '#FFA500',
        alignItems: 'center',
        justifyContent: 'center',
    }
});