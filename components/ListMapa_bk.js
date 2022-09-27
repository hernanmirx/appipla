import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet,FlatList, TextInput, Ionicons,Button, TouchableOpacity, Image } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { Modalize } from 'react-native-modalize';


const db = openDatabase({ name: 'UserDatabase.db' });

const ListMapa = () => {
  const [ locales, setCoordLocales] = useState ([]);
  const [ lat, setLat] = useState(-26.8244322);
  const [ latMin, setLatMin] = useState(-26.8299322);
  const [ latMax, setLatMax] = useState(-26.8182322);
  const [ lon, setLon] = useState(-65.2061525);
  const [ lonMin, setLonMin] = useState(-65.2123525);
  const [ lonMax, setLonMax] = useState(-65.2001525);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPadronVisible, setModalPadronVisible] = useState(false);
  const [idpadron,setPadron] = useState(0);
  const [observaciones,setObservaciones] = useState("");
  const [PadronGeoLoc,setPadronGeoLoc] = useState(0);
  const modalizeRef = useRef(null);


  const geoLocalizar = () => {
    Geolocation.getCurrentPosition(
      (position) => {
          console.log(position)
          setLat(position.coords.latitude)
          setLon(position.coords.longitude)
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }
  

  useEffect(()=>{
    geoLocalizar()
    db.transaction((tx) => {
        tx.executeSql(`SELECT padrones.idpadron,domiciliolocal.*,padronestado.idcategoria,padronestado.markercolor,z_padronobservaciones.observaciones FROM domiciliolocal 
        INNER JOIN padrones ON domiciliolocal.idlocal=padrones.idpadron 
        INNER JOIN padronestado ON padrones.idpadron=padronestado.idpadron 
        LEFT JOIN z_padronobservaciones ON padrones.idpadron=z_padronobservaciones.idpadron
        WHERE domiciliolocal.latitud>=${latMin} AND domiciliolocal.latitud<=${latMax} AND
        domiciliolocal.longitud>=${lonMin} AND domiciliolocal.longitud<=${lonMax}
        
        `, [], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
            setCoordLocales(temp);
        });
    });
  },[]);
  useEffect(()=>{
    setLatMax(lat+0.0062)
    setLatMin(lat-0.0062)
  },[lat])

  useEffect(()=>{
    setLonMax(lon+0.0062)
    setLonMin(lon-0.0062)
  },[lon])

  const onOpen = () => {
    modalizeRef.current?.open();
  }

  const asignMarkers =  () =>{
        return(
          locales.map((marker,index) => (
                      
            <MapView.Marker
              key={marker.idlocal}
              coordinate={{latitude:marker.latitud,longitude:marker.longitud}}
              title={marker.idpadron.toString()}
              description={'Categoría: '+marker.idcategoria.toString()}
              image={
                marker.markercolor===0 ? require('../assets/markers/0.png') : marker.markercolor===1 ? require('../assets/markers/1.png') : marker.markercolor===2 ? require('../assets/markers/2.png') : marker.markercolor===3 ? require('../assets/markers/3.png') : require('../assets/markers/4.png')
              }
              onPress={() => console.log(marker.idpadron.toString())}
            >
              <MapView.Callout tooltip style={styles.customView}
              onPress={() => {
                setPadron(marker.idpadron)
                setObservaciones(marker.observaciones)
                //setModalVisible(true)
                onOpen
                }
              }>
                <View style={styles.bubble}>
                  <View>
                    <Text style={styles.name}>
                      {'Padrón: '+marker.idpadron.toString()}
                    </Text>
                    <Text>{'Categoría: '+marker.idcategoria.toString()}</Text>
                  </View>
                </View>
              </MapView.Callout>
            </MapView.Marker>
          ))
        )
  }
    
    return (
      <>
        <View style={styles.container}>
            <MapView
                  provider={PROVIDER_GOOGLE} 
                  style={styles.map}
                  region={{
                    latitude: -26.8244322, 
                  longitude: -65.2061525,
                  latitudeDelta: 0.015,
                  longitudeDelta: 0.0121,
                  }}
                >
                {asignMarkers()}
            </MapView>
            <TouchableOpacity onPress={setModalVisible(true)}>
              <Image source={require('../assets/markers/current.png')}/>
            </TouchableOpacity>

        </View>

        <View style={styles.centeredView}>
          <Modalize
            ref={modalizeRef}
            snapPoint={180}
            ></Modalize>
            <View 
              style={{
                flex:1,
                height:180,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <TouchableOpacity style={[styles.boton,{ backgroundColor: '#29ae19'}]}>
                <Text>Guardar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.boton,{ backgroundColor: '#ff0000'}]}>
                <Text>Salir</Text>
              </TouchableOpacity>
            </View>
          {/*}
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Información de Padrón</Text>
                  <Text>Padrón Número: {idpadron}</Text>
                  <Text>Observaciones: {observaciones}</Text>
                  <TextInput placeholder="Observaciones" value={observaciones}
                    onChangeText={text => setObservaciones(text)}
                  />
                  <Button title="Actualizar Observaciones"
                    onPress={() => {
                      db.transaction((tx) => {
                        tx.executeSql(`SELECT * FROM z_padronobservaciones WHERE idpadron=${idpadron}`, [], (tx, results) => {
                          console.log(results.rows.length)
                          if (results.rows.length>0)
                          {
                            tx.executeSql(`UPDATE z_padronobservaciones SET observaciones='${observaciones}' WHERE idpadron=${idpadron}`,[]);
                          }
                          else
                          {
                            tx.executeSql(`INSERT INTO z_padronobservaciones (idpadron,observaciones,fecha,hora) VALUES (${idpadron},'${observaciones}','2021-07-01','20:00:00')`,[]);
                          }
                        });
                      });
                      console.log(observaciones)
                    }}
                  />
                  <View style={styles.colors}>
                    <TouchableOpacity style={styles.buttonImg} onPress={()=>{
                      db.transaction((tx) => {
                        tx.executeSql(`UPDATE padronestado SET markercolor=0, sync=0 WHERE idpadron=${idpadron}`,[]);
                      });
                    }}>
                      <Image source={require('../assets/markers/0.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonImg} onPress={()=>{
                      db.transaction((tx) => {
                        tx.executeSql(`UPDATE padronestado SET markercolor=1, sync=0 WHERE idpadron=${idpadron}`,[]);
                      });
                    }}>
                      <Image source={require('../assets/markers/1.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonImg} onPress={()=>{
                      db.transaction((tx) => {
                        tx.executeSql(`UPDATE padronestado SET markercolor=2, sync=0 WHERE idpadron=${idpadron}`,[]);
                      });
                    }}>
                      <Image source={require('../assets/markers/2.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonImg} onPress={()=>{
                      db.transaction((tx) => {
                        tx.executeSql(`UPDATE padronestado SET markercolor=3, sync=0 WHERE idpadron=${idpadron}`,[]);
                      });
                    }}>
                      <Image source={require('../assets/markers/3.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonImg} onPress={()=>{
                      db.transaction((tx) => {
                        tx.executeSql(`UPDATE padronestado SET markercolor=4, sync=0 WHERE idpadron=${idpadron}`,[]);
                      });
                    }}>
                      <Image source={require('../assets/markers/4.png')}/>
                    </TouchableOpacity>
                  </View>

                  <Button 
                    title="Cerrar"

                    onPress={() => setModalVisible(!modalVisible)}
                  />
                </View>
              </View>
            </Modal>


            <Modal
              animationType="slide"
              transparent={true}
              visible={modalPadronVisible}
              onRequestClose={() => {
                setModalPadronVisible(!modalPadronVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Geolocalizar Padrón</Text>
                  <TextInput placeholder="Número de Padrón"
                    onChangeText={text => setPadronGeoLoc(text)}
                  />
                  <Button title="Asignar Ubicación"
                    onPress={() => {
                      db.transaction((tx) => {
                          tx.executeSql(`UPDATE domiciliolocal SET latitud=${lat}, longitud=${lon} WHERE idlocal=(SELECT idlocal FROM padrones WHERE idpadron=${idpadron})`,[]);
                      });
                      console.log(PadronGeoLoc)
                    }}
                  />

                  <Button 
                    title="Cerrar"

                    onPress={() => setModalPadronVisible(!modalPadronVisible)}
                  />
                </View>
              </View>
            </Modal>
            {*/}
        </View>
        </>
    );
    
}
const styles = StyleSheet.create({
  
  boton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 7
  },

  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  colors: {
    flexDirection: 'row',
  },
  bubble: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 0.5,
    padding: 15,
    width: 200
  },
  name: {
    fontSize: 16,
    marginBottom: 5
  },
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5,
  },
  searchBox: {
    backgroundColor: '#fff',
    position: 'absolute',
    marginTop: 80,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  buttonImg: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
    shadowColor: '#303838',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35,
  },

});


export default ListMapa;