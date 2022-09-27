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
import Header from './components/Header';
import IniciarBaseDeDatos from './components/IniciarBaseDeDatos';
import SyncGlobal from './components/SyncGlobal';/*
import SyncUsuarios from './components/sync/SyncUsuarios';
import SyncCategoriaImporte from './components/sync/SyncCategoriaImporte';
import SyncContribuyentes from './components/sync/SyncContribuyentes';
import SyncDomiciliolocal from './components/sync/SyncDomicilioLocal';
import SyncLocales from './components/sync/SyncLocales';
import SyncPadrones from './components/sync/SyncPadrones';
import SyncPadronEstado from './components/sync/SyncPadronEstado';
import SyncPadronPlanDePago from './components/sync/SyncPadronPlanDePago';

import ListUsuarios from './components/list/ListUsuarios';
import ListCategoriaImporte from './components/list/ListCategoriaImporte';
import ListPadronPlanDePago from './components/list/ListPadronPlanDePago';
import ListDomicilioLocal from './components/list/ListDomicilioLocal';
import ListPadrones from './components/list/ListPadrones';
import ListPadronEstado from './components/list/ListPadronEstado';*/
//import ListMapa from './components/ListMapa';
/*import ListLocales from './components/list/ListLocales';

import ModalStart from './components/ModalStart';
import GeoLoc from './components/GeoLoc';
import LimpiarTablas from './components/LimpiarTablas';*/
import BottomNav from './components/BottomNav';




const App = () => {
  return (
    <>
      <View>
        <SyncGlobal />
      </View>
      <BottomNav />
    </>
  );
};

const styles = StyleSheet.create({
  contenido:{
    marginHorizontal: '2.5%'
  }
});

export default App;
