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

/*const altaUsuario = (usr) => {
  try {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO usuarios (idusuario,documento, apellido, nombre, nombreusuario, password, telefono, mail, idnivel, idarea, habilitado, iddelegacion, idpuntoemision) VALUES (?,?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [usr.idusuario, usr.documento, usr.apellido, usr.nombre, usr.nombreusuario, usr.password, usr.telefono, usr.mail, usr.idnivel, usr.idarea, usr.habilitado, usr.iddelegacion, usr.idpuntoemision],
        (tx, results) => {
          console.log('Resultado Usuarios: ', results.rowsAffected);
        }
      );
    });
  }
  catch(e){
    console.log(e);
  }
};*/


const UploadLocal = () => {
    const [ loading, setLoading ] = useState(false)
    const [ usuarios, setUsuarios ]=useState([])

    useEffect(() => {
        const consultarApi = async () => {
            setLoading(true)
            const url = 'http://186.109.83.13/ipla/sistemaipla/api/api_in/locales.php';
            const resultado = await axios.get(url);
            setUsuarios(resultado.data.results);
            console.log(resultado.data.results);
            setLoading(false);
        }
        consultarApi();
        //obtenerUsuarios();
        
    },[]);
    useEffect(() => {
      listarUsuarios();
    },[usuarios]);

    const listarUsuarios = () => {
        console.log('Ejecuta esto');
        usuarios.map( (usuario) => {
          console.log(usuario.apellido)
            let usr={
                idusuario:usuario.idusuario,
                documento:usuario.documento,
                apellido:usuario.apellido,
                nombre:usuario.nombre,
                nombreusuario:usuario.nombreusuario,
                password:usuario.password,
                telefono:usuario.telefono,
                mail:usuario.mail,
                idnivel:usuario.idnivel,
                idarea:usuario.idarea,
                habilitado:usuario.habilitado,
                iddelegacion:usuario.iddelegacion,
                idpuntoemision:usuario.idpuntoemision
            };
            altaUsuario(usr);
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
            <Text style={styles.label}>Usuarios</Text>
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

export default SyncUsuarios;