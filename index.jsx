import { registerRootComponent } from 'expo';

// Import the Tarefa component from src folder (where pages are located)
import App from './src/app/App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
