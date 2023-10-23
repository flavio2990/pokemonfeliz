import React, { useState } from "react"
import { View, Text, StyleSheet, ScrollView, Image, TextInput, Dimensions, ImageBackground } from 'react-native'
import { useQuery } from "@apollo/client"

import { GET_POKEMON } from '../GQL/pokemonAPI.gql'
import BackToTop from "../Components/BackToTop"

const backgroundImage = require('../assets/pokeball.png')

const windowWidth = Dimensions.get('window').width

export default function HomeScreen() {
    const { data } = useQuery(GET_POKEMON)
    const [scrollPosition, setScrollPosition] = useState(0)
    const [searchInput, setSearchInput] = useState('')

    const handleScroll = (event) => {
        setScrollPosition(event.nativeEvent.contentOffset.y)
    }

    const scrollToTop = () => {
        scrollViewRef.current.scrollTo({ x: 0, y: 0 })
    }

    const scrollViewRef = React.createRef()

    const filteredPokemon = data
        ? data.pokemon_v2_pokemon.filter(({ name }) => name.toLowerCase().includes(searchInput.toLowerCase()))
        : []

    return (
        <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
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
                        onChangeText={setSearchInput}
                    />
                </View>
                <ScrollView ref={scrollViewRef} onScroll={handleScroll} scrollEventThrottle={16} >
                    {filteredPokemon.length > 0 ? (
                        filteredPokemon.map(({ id, name }) => (
                            <View key={id} style={styles.pokemonItems}>
                                <View style={styles.pokemonContent}>
                                    <Text style={styles.pokemonText}>
                                        {name.charAt(0).toUpperCase() + name.slice(1)}
                                    </Text>
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
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    headerText: {
        paddingTop: 20,
        fontSize: 60,
        fontWeight: 'bold',
        color: 'red',
        textShadowColor: 'black',
        textShadowOffset: { height: 3 },
        textShadowRadius: 5,
    },
    subText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'blue'
    },
    pokemonItems: {
        backgroundColor: '#FFFFFF',
        width: windowWidth * 0.9,
        height: windowWidth * 0.3,
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
        fontSize: 40,
        fontWeight: 'regular',
        color: 'black',
        fontWeight: 'bold',
    },
    loadText: {
        paddingTop: 20,
        fontSize: 40,
        fontWeight: 'bold',
        color: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pokeImage: {
        height: 90,
        width: 90
    },
    inputStyle: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: 'blue',
        height: 40,
        borderRadius: 20,
        paddingHorizontal: 10,
        width: windowWidth * 0.9,
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    }
});