import {createStore, registerStore, Dispatcher} from 'lego-flux';

var FavoritesStore = createStore({

  actions: {
    'FAVORITES_RECEIVED': '_onFavoritesReceived'
  },

  favorites: [],

  getState: function() {
    return {
      favorites: this.favorites
    };
  },

  getAll: function() {
    return this.favorites;
  },

  _onFavoritesReceived: function(action) {
    this.favorites = action.favorites;
    this.emitChange();
  },
});

registerStore(Dispatcher, FavoritesStore);

export default FavoritesStore;