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


export async function UploadLocal (LocalData) {

  console.log(LocalData)
  const formData=new FormData()
  formData.append('idlocal',LocalData.idlocal)
  formData.append('latitud',LocalData.latitud)
  formData.append('longitud',LocalData.longitud)

  try{
    const response = await axios({
      url: 'http://186.109.83.13/ipla/sistemaipla/api/api_in/locales.php',
      method: 'POST',
      data: formData,

    })
    console.log(response)
    return response
  } catch (e) {
    console.log(e)
  }

}