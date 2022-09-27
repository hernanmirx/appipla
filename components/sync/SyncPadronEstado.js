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

const altaPadron = (usr) => {
    try {
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO padronestado (idpadron,idcategoria,subcategoria,idestado,markercolor) VALUES (?,?,?,?,?)',
          [usr.idpadron, usr.idcategoria, usr.subcategoria, usr.idestado, usr.markercolor],
          (tx, results) => {
            console.log('Resultado Padron Estado: ', results.rowsAffected);
          }
        );
      });
    }
    catch(e){
      console.log(e);
    }
  };
  
  
  const SyncPadronEstado = () => {
      const [ loading, setLoading ] = useState(false)
      const [ padrones, setPadrones ]=useState([])
  
      useEffect(() => {
          const consultarApi = async () => {
              setLoading(true)
              const url = 'http://186.109.83.13/ipla/sistemaipla/api/api_out/padronestado.php';
              const resultado = await axios.get(url);
              setPadrones(resultado.data.results);
              console.log(resultado.data.results);
              setLoading(false);
          }
          consultarApi();
          
      },[]);
      useEffect(() => {
        listarPadrones();
      },[padrones]);
  
      const listarPadrones = () => {
          console.log('Ejecuta esto');
          padrones.map( (padron) => {
            console.log(padron.idpadron)
              let pad={
                  idpadron:padron.idpadron,
                  idcategoria:padron.idcategoria,
                  subcategoria:padron.subcategoria,
                  idestado:padron.idestado,
                  markercolor:padron.markercolor
              };
              altaPadron(pad);
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
              <Text style={styles.label}>Padron Estado</Text>
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
  
  export default SyncPadronEstado;