import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet,FlatList } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';

const db = openDatabase({ name: 'UserDatabase.db' });

const ListDomicilioLocal = () => {
    const [ flatListItems, setFlatListItems] = useState ([]);

    useEffect(()=>{
        db.transaction((tx) => {
            tx.executeSql(`SELECT * FROM domiciliolocal 
            INNER JOIN locales ON domiciliolocal.idlocal=locales.idlocal 
            INNER JOIN padrones ON locales.idlocal=padrones.idlocal
            INNER JOIN padronestado ON padrones.idpadron=padronestado.idpadron
            WHERE padrones.idpadron=77325`, [], (tx, results) => {
              var temp = [];
              console.log(results.rows.length);
              for (let i = 0; i < results.rows.length; ++i)
                temp.push(results.rows.item(i));
              setFlatListItems(temp);
            });
          });
    },[]);
    let listViewItemSeparator = () => {
        return (
          <View
            style={{ height: 0.2, width: '100%', backgroundColor: '#808080' }}
          />
        );
    };
    let listItemView = (item) => {
      return (
        <View key={item.idpadron}>
            <Text>IdPadron: {item.idpadron}</Text>
            <Text>IdLocal: {item.idlocal}</Text>
            <Text>Direccion completa: {item.direccioncompleta}</Text>
            <Text>Latitud: {item.latitud}</Text>
            <Text>Longitud: {item.longitud}</Text>
          </View>
        );
    };
    return (
        <View>
         <Text>Listado</Text>
            <View>
              <FlatList
                data={flatListItems}
                ItemSeparatorComponent={listViewItemSeparator}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => listItemView(item)}
              />
            </View>
          </View>
    );
    
}

export default ListDomicilioLocal;