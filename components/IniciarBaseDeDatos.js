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


const IniciarBaseDeDatos = () => {
  useEffect(() => {
    createTable();
  }, []);
  const createTable = () => {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM sqlite_master WHERE type = "table"',[]);
    })
    db.transaction((tx) => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS usuarios (idusuario INTEGER PRIMARY KEY,documento INTEGER,apellido VARCHAR(30), nombre VARCHAR(30),nombreusuario VARCHAR(30),password VARCHAR(35),telefono VARCHAR(15) DEFAULT NULL,mail VARCHAR(50) DEFAULT NULL,  idnivel INTEGER, idarea INTEGER, habilitado INTEGER, iddelegacion INTEGER, idpuntoemision INTEGER, fechasync VARCHAR(10),horasync VARCHAR(8), sync INTEGER DEFAULT 0)',[]);
    });


    db.transaction((tx) => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS contribuyentes (idcontribuyente INTEGER PRIMARY KEY,apellido VARCHAR(30), nombre VARCHAR(30),dni VARCHAR(15),telefono VARCHAR(15),fechasync VARCHAR(10),horasync VARCHAR(8), sync INTEGER DEFAULT 0)',[]);
    });
    db.transaction((tx) => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS locales (idlocal INTEGER PRIMARY KEY,razonsocial VARCHAR(50))',[]);
    });
    db.transaction((tx) => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS domiciliolocal (idlocal INTEGER PRIMARY KEY,direccioncompleta TEXT, latitud REAL, longitud REAL, referencia TEXT, fechasync VARCHAR(10),horasync VARCHAR(8), sync INTEGER DEFAULT 0)',[]);
    });


    db.transaction((tx) => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS padrones (idpadron INTEGER PRIMARY KEY,idcontribuyente INTEGER,idlocal INTEGER)',[]);
    });
    db.transaction((tx) => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS padronestado (idpadron INTEGER PRIMARY KEY,idcategoria INTEGER,subcategoria INTEGER, idestado INTEGER, markercolor INTEGER, fechasync VARCHAR(10),horasync VARCHAR(8), sync INTEGER DEFAULT 0)',[]);
    });
    /*db.transaction((tx) => {
      tx.executeSql('UPDATE padronestado SET sync=1 WHERE idpadron>=10000',[]);
    });*/
    db.transaction((tx) => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS padronplandepago (id INTEGER PRIMARY KEY, idpadron INTEGER,idconcepto INTEGER,fechainicio VARCHAR(10), fechavto VARCHAR(10), numerocuota INTEGER, pagorealizado INTEGER, idrecibo INTEGER, monto INTEGER, idgasto INTEGER, numero INTEGER, idplan INTEGER, idpuntoemision INTEGER, idusuario INTEGER, fechasync VARCHAR(10),horasync VARCHAR(8), sync INTEGER DEFAULT 0)',[]);
    });

    db.transaction((tx) => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS categoriaimporte (id INTEGER PRIMARY KEY, idcategoria INTEGER, idsubcategoria INTEGER,idoperacion INTEGER, importe INTEGER)',[]);
    });
    db.transaction((tx) => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS z_padronobservaciones (idpadron INTEGER PRIMARY KEY,observaciones TEXT, fecha VARCHAR(10), hora VARCHAR(8), fechasync VARCHAR(10),horasync VARCHAR(8), sync INTEGER DEFAULT 0)',[]);
    });

  }
  return (
     <View>
      </View>
  );
};

export default IniciarBaseDeDatos;
