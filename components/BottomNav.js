import React, {Component} from 'react'
import { View } from 'react-native'
import BottomNavigation, { FullTab, ShiftingTab } from 'react-native-material-bottom-navigation'
import { Icon } from 'react-native-elements'
import Inicio from './Inicio'
import ListMapa from './ListMapa';
import Configuracion from './Configuracion'
  
  export default class BottomNav extends React.Component {
    tabs = [
      {
        key: 'home',
        icon: 'home',
        label: 'Inicio',
        screen: <Inicio navigation = {this.props.navigation}/>,
        barColor: '#141f8d',
        pressColor: 'rgba(255, 255, 255, 0.16)'
      },
      {
        key: 'map',
        icon: 'map',
        label: 'Mapa',
        screen: <ListMapa navigation = {this.props.navigation}/>,
        barColor: '#141f8d',
        pressColor: 'rgba(255, 255, 255, 0.16)'
      },
      {
        key: 'settings',
        icon: 'settings',
        label: 'Configuración',
        screen: <Configuracion navigation = {this.props.navigation}/>,
        barColor: '#141f8d',
        pressColor: 'rgba(255, 255, 255, 0.16)'
      }
    ]
  
    state = {
      activeTab: 'home'
    }
  
    renderIcon = icon => ({ isActive }) => (
      <Icon size={24} color="white" name={icon} />
    )
  
    renderTab = ({ tab, isActive }) => (
      <ShiftingTab
        isActive={isActive}
        key={tab.key}
        label={tab.label}
        renderIcon={this.renderIcon(tab.icon)}
      />
    )

    renderScreen = () => (
      this.state.activeTab == 'home' && this.tabs[0].screen ||
      this.state.activeTab == 'map' && this.tabs[1].screen ||
      this.tabs[2].screen
    )
  
    render() {
      return (
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            {this.renderScreen()}
          </View>
          <BottomNavigation
            activeTab={this.state.activeTab}
            onTabPress={newTab => this.setState({ activeTab: newTab.key })}
            renderTab={this.renderTab}
            tabs={this.tabs}
          />
        </View>
      )
    }
  }