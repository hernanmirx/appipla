import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import axios from 'axios';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  { 
    name: 'UserDatabase.db',
    location: 'default',
  },
  () => { },
  error => { console.log(error) }
);

const altaLocal = (usr) => {
    try {
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO locales (idlocal,razonsocial) VALUES (?,?)',
          [usr.idlocal, usr.razonsocial],
          (tx, results) => {
            console.log('Resultado Locales: ', results.rowsAffected);
          }
        );
      });
    }
    catch(e){
      console.log(e);
    }
  };
  
  
  const SyncLocales = () => {
      const [ loading, setLoading ] = useState(false)
      const [ locales, setLocales ]=useState([])
  
      useEffect(() => {
          const consultarApi = async () => {
              setLoading(true)
              const url = 'http://186.109.83.13/ipla/sistemaipla/api/api_out/locales.php';
              const resultado = await axios.get(url);
              setLocales(resultado.data.results);
              console.log(resultado.data.results);
              setLoading(false);
          }
          consultarApi();
          
      },[]);
      useEffect(() => {
        listarLocales();
      },[locales]);
  
      const listarLocales = () => {
          console.log('Ejecuta esto');
          locales.map( (local) => {
            console.log(local.idlocal)
              let loc={
                  idlocal:local.idlocal,
                  razonsocial:local.razonsocial
              };
              altaLocal(loc);
            });
      }
      //
      {
        if (loading===true){
          return(
            <View>
              <Text>Descargando</Text>
            </View>
          );
        }
      }
      return(
        
          <View>
              <Text style={styles.label}>Locales</Text>
          </View>
      );
  }
  
  const styles = StyleSheet.create({
      label: {
          textTransform: 'uppercase',
          fontSize: 22,
          marginVertical: 20,
          
      }
  })
  
  export default SyncLocales;