import React from 'react';
import { Text, TextBase, StyleSheet, Platform } from 'react-native';

const Header = () => (
    <Text style={styles.encabezado}>Sistema IPLA</Text>
);

const styles = StyleSheet.create({
    encabezado: {
        paddingTop: Platform.OS === 'ios' ? 50 :10,
        backgroundColor : '#5E49E2',
        paddingBottom: 10,
        textAlign: 'center',
        textTransform: 'uppercase',
        fontSize: 20,
        color: '#FFF'
    }
})

export default Header;