import prodStore from './store.prod';
import devStore from './store.dev';

let Store;
if (process.env.NODE_ENV === 'production') {
  Store = prodStore;
} else {
  Store = devStore;
}

let preLoadState = {

};
export default Store(preLoadState);
