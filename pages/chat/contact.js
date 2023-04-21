import React, { useState, useRef } from 'react';
import { StyleSheet, SectionList, View, Text, TouchableOpacity } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler } from 'react-native-reanimated';

const sections = [
    // 填充你的通讯录数据
    {
        title: 'A',
        data: ['Alice', 'Adam', 'Alex']
    },
    {
        title: 'B',
        data: ['Bob', 'Bill']
    },
    {
        title: 'C',
        data: ['Charlie', 'Cindy', 'Chris',]
    },
];

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const ContactList = () => {
    const sectionListRef = useRef(null);
    const [selectedLetter, setSelectedLetter] = useState(null);

    const onGestureEvent = useAnimatedGestureHandler({
        onStart: (_, ctx) => {
            ctx.startY = _.nativeEvent.y;
            setSelectedLetter(alphabet[Math.floor(ctx.startY / 20)]);
        },
        onActive: (_, ctx) => {
            const index = Math.floor((_.nativeEvent.y + (ctx.startY - _.nativeEvent.y)) / 20);
            if (index >= 0 && index < alphabet.length) {
                setSelectedLetter(alphabet[index]);
            }
        },
        onEnd: () => {
            setSelectedLetter(null);
        },
    });

    const scrollToSection = (letter) => {
        const index = sections.findIndex((section) => section.title === letter);
        if (index !== -1) {
            sectionListRef.current.scrollToLocation({ sectionIndex: index, itemIndex: 0, animated: true });
        }
    };

    return (
        <View style={styles.container}>
            <SectionList
                ref={sectionListRef}
                sections={sections}
                keyExtractor={(item) => item}
                renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
                renderSectionHeader={({ section: { title } }) => <Text style={styles.sectionHeader}>{title}</Text>}
            />
            <PanGestureHandler onGestureEvent={onGestureEvent}>
                <Animated.View style={styles.alphabetContainer}>
                    {alphabet.map((letter, index) => (
                        <TouchableOpacity key={index} onPress={() => scrollToSection(letter)}>
                            <Text style={styles.alphabetLetter}>{letter}</Text>
                        </TouchableOpacity>
                    ))}
                </Animated.View>
            </PanGestureHandler>
            {selectedLetter && <Text style={styles.selectedLetter}>{selectedLetter}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    item: {
        padding: 10,
        fontSize: 18,
    },
    sectionHeader: {
        backgroundColor: '#fff',
        padding: 5,
        fontWeight: 'bold',
        fontSize: 18,
    },
    alphabetContainer: {
        position: 'absolute',
        right: 10,
        top: 20,
        zIndex: 2,
    },
    alphabetLetter: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 5,
        width: 20,
    },
    selectedLetter: {
        position: 'absolute',
        alignSelf: 'center',
        top: '40%',
        fontWeight: 'bold',
        fontSize: 40,
        zIndex: 1,
        color: '#fff',
    },
});

export default ContactList;
