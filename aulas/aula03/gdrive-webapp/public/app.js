import AppController from './src/appController.js';
import ConnectionManager from './src/connectionManager.js';
import DragAndDropManager from './src/dragAndDropManager.js';
import ViewManager from './src/viewManager.js';

const API_URL = 'https://localhost:3000/';
// const API_URL = 'https://gdrive-webapi-pe.herokuapp.com/';

const appController = new AppController({
  viewManager: new ViewManager(),
  dragAndDropManager: new DragAndDropManager(),
  connectionManager: new ConnectionManager({
    apiUrl: API_URL,
  }),
});

try {
  await appController.initialize();
} catch (error) {
  console.log('error on initializing', error);
}
