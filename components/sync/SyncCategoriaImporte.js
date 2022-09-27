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

const altaCategoriaimporte = (usr) => {
    try {
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO categoriaimporte (id,idcategoria,idsubcategoria,idoperacion, importe) VALUES (?,?,?,?,?)',
          [usr.id,usr.idcategoria, usr.idsubcategoria, usr.idoperacion,usr.importe],
          (tx, results) => {
            console.log('Resultado Categoría Importe: ', results.rowsAffected);
          }
        );
      });
    }
    catch(e){
      console.log(e);
    }
  };
  
  
  const SyncCategoriaImporte = () => {
      const [ loading, setLoading ] = useState(false)
      const [ categoriaimporte, setCategoriaimporte ]=useState([])
  
      useEffect(() => {
          const consultarApi = async () => {
              setLoading(true)
              const url = 'http://186.109.83.13/ipla/sistemaipla/api/api_out/categoriaimporte.php';
              const resultado = await axios.get(url);
              setCategoriaimporte(resultado.data.results);
              console.log(resultado.data.results);
              setLoading(false);
          }
          consultarApi();
          
      },[]);
      useEffect(() => {
        listarCategoriaimporte();
      },[categoriaimporte]);
  
      const listarCategoriaimporte = () => {
          console.log('Ejecuta esto');
          categoriaimporte.map( (catimp) => {
            console.log(catimp.idcategoria)
              let categoImp={
                id:catimp.id,
                idcategoria:catimp.idcategoria,
                idsubcategoria:catimp.idsubcategoria,
                idoperacion:catimp.idoperacion,
                importe:catimp.importe
              };
              altaCategoriaimporte(categoImp);
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
              <Text style={styles.label}>Categoria Importe</Text>
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
  
  export default SyncCategoriaImporte;