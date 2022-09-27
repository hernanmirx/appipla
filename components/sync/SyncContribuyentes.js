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

const altaContribuyente = (usr) => {
  try {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO contribuyentes (idcontribuyente,dni, apellido, nombre, telefono, fechasync, horasync) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [usr.idcontribuyente, usr.dni, usr.apellido, usr.nombre, usr.telefono, usr.fechasync, usr.horasync],
        (tx, results) => {
          console.log('Resultado Contribuyentes: ', results.rowsAffected);
        }
      );
    });
  }
  catch(e){
    console.log(e);
  }
};


const SyncContribuyentes = () => {
    const [ loading, setLoading ] = useState(false)
    const [ contribuyentes, setContribuyentes ]=useState([])

    useEffect(() => {
        const consultarApi = async () => {
            setLoading(true)
            const url = 'http://186.109.83.13/ipla/sistemaipla/api/api_out/contribuyentes.php';
            const resultado = await axios.get(url);
            setContribuyentes(resultado.data.results);
            console.log(resultado.data.results);
            setLoading(false);
        }
        consultarApi();
    },[]);
    useEffect(() => {
      listarContribuyentes();
    },[contribuyentes]);

    const listarContribuyentes = () => {
        console.log('Ejecuta esto contribuyentes');
        contribuyentes.map( (contribuyente) => {
          console.log(contribuyente.apellido)
            let usr={
                idcontribuyente:contribuyente.idcontribuyente,
                dni:contribuyente.dni,
                apellido:contribuyente.apellido,
                nombre:contribuyente.nombre,
                telefono:contribuyente.telefono,
                fechasync:contribuyente.fechasync,
                horasync:contribuyente.horasync
            };
            altaContribuyente(usr);
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
            <Text style={styles.label}>Contribuyentes</Text>
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

export default SyncContribuyentes;