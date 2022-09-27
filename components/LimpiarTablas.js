import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  { 
    name: 'UserDatabase.db',
    location: 'default',
  },
  () => { },
  error => { console.log(error) }
);


const LimpiarTablas = () => {
  useEffect(() => {
    dropTables();
  }, []);
  const dropTables = () => {
    db.transaction((tx) => {
      tx.executeSql('DROP TABLE IF EXISTS contribuyentes',[]);
    });
    db.transaction((tx) => {
      tx.executeSql('DROP TABLE IF EXISTS usuarios',[]);
    });
    db.transaction((tx) => {
      tx.executeSql('DROP TABLE IF EXISTS padrones',[]);
    });
    db.transaction((tx) => {
      tx.executeSql('DROP TABLE IF EXISTS padronestado',[]);
    });
    db.transaction((tx) => {
      tx.executeSql('DROP TABLE IF EXISTS padronplandepago',[]);
    });
    db.transaction((tx) => {
      tx.executeSql('DROP TABLE IF EXISTS locales',[]);
    });
    db.transaction((tx) => {
      tx.executeSql('DROP TABLE IF EXISTS domiciliolocal',[]);
    });
    db.transaction((tx) => {
      tx.executeSql('DROP TABLE IF EXISTS categoriaimporte',[]);
    });

  }
  return (
     <View>
       <Text>
           Eliminar Tablas
          www.jumpinsoft.com
        </Text>
      </View>
  );
};

export default LimpiarTablas;
