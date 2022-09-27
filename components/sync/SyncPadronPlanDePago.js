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

const altaPadronplandepago = (usr) => {
    try {
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO padronplandepago (id ,idpadron ,idconcepto ,fechainicio , fechavto, numerocuota, pagorealizado, idrecibo, monto, idgasto, numero, idplan, idpuntoemision, idusuario, fechasync,horasync) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
          [usr.id,usr.idpadron, usr.idconcepto, usr.fechainicio,usr.fechavto,usr.numerocuota,usr.pagorealizado,usr.idrecibo,usr.monto,usr.idgasto,usr.numero,usr.idplan,usr.idpuntoemision,usr.idusuario,usr.fechasync,usr.horasync],
          (tx, results) => {
            console.log('Resultado Padron Plan de Pago: ', results.rowsAffected);
          }
        );
      });
    }
    catch(e){
      console.log(e);
    }
  };
  
  
  const SyncPadronPlanDePago = () => {
      const [ loading, setLoading ] = useState(false)
      const [ padrones, setPadrones ]=useState([])
  
      useEffect(() => {
          const consultarApi = async () => {
              setLoading(true)
              const url = 'http://186.109.83.13/ipla/sistemaipla/api/api_out/padronplandepago.php';
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
                  id:padron.id,
                  idpadron:padron.idpadron,
                  idconcepto:padron.idconcepto,
                  fechainicio:padron.fechainicio,
                  fechavto:padron.fechavto,
                  numerocuota:padron.numerocuota,
                  pagorealizado:padron.pagorealizado,
                  idrecibo:padron.idrecibo,
                  monto:padron.monto,
                  idgasto:padron.idgasto,
                  numero:padron.numero,
                  idplan:padron.idplan,
                  idpuntoemision:padron.idpuntoemision,
                  idusuario:padron.idusuario,
                  fechasync:padron.fechasync,
                  horasync:padron.horasync
              };
              altaPadronplandepago(pad);
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
              <Text style={styles.label}>Padron Plan de Pago</Text>
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
  
  export default SyncPadronPlanDePago;