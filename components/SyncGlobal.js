import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';

const db = openDatabase({ name: 'UserDatabase.db' });


import Header from './Header';
import IniciarBaseDeDatos from './IniciarBaseDeDatos';
import SyncUsuarios from './sync/SyncUsuarios';
import SyncCategoriaImporte from './sync/SyncCategoriaImporte';
import SyncContribuyentes from './sync/SyncContribuyentes';
import SyncDomiciliolocal from './sync/SyncDomicilioLocal';
import SyncLocales from './sync/SyncLocales';
import SyncPadrones from './sync/SyncPadrones';
import SyncPadronEstado from './sync/SyncPadronEstado';
import SyncPadronPlanDePago from './sync/SyncPadronPlanDePago';


const SyncGlobal = () => {
    return (
        <>
          <View>
            <IniciarBaseDeDatos />
    {
    db.transaction((tx) => {
        tx.executeSql('SELECT * FROM usuarios LIMIT 10', [], (tx, results) => {
          if (results.rows.length===0)
          {
              return (
                <SyncUsuarios />
              )
          }
        });
        tx.executeSql('SELECT * FROM categoriaimporte LIMIT 10', [], (tx, results) => {
            if (results.rows.length===0)
            {
                return (
                  <SyncCategoriaImporte />
                )
            }
          });
          tx.executeSql('SELECT * FROM contribuyentes LIMIT 10', [], (tx, results) => {
            if (results.rows.length===0)
            {
                return (
                  <SyncContribuyentes />
                )
            }
          });
          tx.executeSql('SELECT * FROM domiciliolocal LIMIT 10', [], (tx, results) => {
            if (results.rows.length===0)
            {
                return (
                  <SyncDomiciliolocal />
                )
            }
          });
          tx.executeSql('SELECT * FROM locales LIMIT 10', [], (tx, results) => {
            if (results.rows.length===0)
            {
                return (
                  <SyncLocales />
                )
            }
          });
          tx.executeSql('SELECT * FROM padrones LIMIT 10', [], (tx, results) => {
            if (results.rows.length===0)
            {
                return (
                  <SyncPadrones />
                )
            }
          });
          tx.executeSql('SELECT * FROM padronestado LIMIT 10', [], (tx, results) => {
            if (results.rows.length===0)
            {
                return (
                  <SyncPadronEstado />
                )
            }
          });
          tx.executeSql('SELECT * FROM padronplandepago LIMIT 10', [], (tx, results) => {
            if (results.rows.length===0)
            {
                return (
                  <SyncPadronPlanDePago />
                )
            }
          });
        })
        }
        </View>
    </>)
}

export default SyncGlobal;