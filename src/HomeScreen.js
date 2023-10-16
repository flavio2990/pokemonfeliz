import React, {useState}from "react"
import { View, Text, StyleSheet, ScrollView, Image, TextInput } from 'react-native'
import { useQuery } from "@apollo/client"

import { GET_POKEMON } from '../GQL/pokemonAPI.gql'
import BackToTop from "../Components/BackToTop"

export default function HomeScreen() {
    const { data } = useQuery(GET_POKEMON)
    const [scrollPosition, setScrollPosition] = useState(0)

    const handleScroll = (event) => {
        setScrollPosition(event.nativeEvent.contentOffset.y);
      }

      const scrollToTop = () => {
        // Mueve el ScrollView al principio
        scrollViewRef.current.scrollTo({ x: 0, y: 0});
      };
    
      const scrollViewRef = React.createRef();


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>PokéMon!</Text>
                <Text style={styles.subText}>Tengo que atraparlos!</Text>
            </View>
            <View >
                <TextInput 
                style={styles.inputStyle}
                placeholder="Search"
                multiline={false}
                fontSize={18}
                placeholderTextColor="black"
                />
            </View>

            <ScrollView>
                {data ? (data.pokemon_v2_pokemon.map(({ id, name }) => (
                    <View key={id} style={styles.pokemonItems}>
                        <View style={styles.pokemonContent}>
                        <Text style={styles.pokemonText}>{id} {name.charAt(0).toUpperCase() + name.slice(1)}</Text>
                        <Image
                            style={styles.pokeImage}
                            source={{
                                uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
                            }}
                        />
                        </View>
                    </View>
                ))
                ) : (
                    <Text style={styles.loadText}>Loading...</Text>
                )}

            </ScrollView>
            {scrollPosition > 20 && <BackToTop scrollToTop={scrollToTop} />}
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
    pokemonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    pokemonText: {
        fontSize: 20,
        fontWeight: 'regular',
        color: 'black',
        fontWeight: 'bold',
    },
    loadText: {
        paddingTop: 20,
        fontSize: 40,
        fontWeight: 'bold',
        color: '#FFA500',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pokeImage: {
        height: 90,
        width: 90
    },
    inputStyle: {
        borderWidth: 1,
        borderColor: 'blue',
        height: 40,
        width: 200,
        borderRadius:5,
        paddingHorizontal: 10,

    },

});