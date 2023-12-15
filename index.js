/**
 * @format
 */

import {AppRegistry, Settings} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Splash from './src/screens/Splash';
import Home from './src/screens/Home';
import HeaderComp from './src/components/HeaderComp';
import ChangePassword from './src/screens/ChangePassword';
import DeleteCard from './src/screens/DeleteCard';
import customColorPicker from './src/components/customColorPicker';

AppRegistry.registerComponent(appName, () => App);
