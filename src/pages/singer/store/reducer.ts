import * as actionTypes from './constants'

const defaultState = {
    artist: {},
    songsOfArtist: [],
    loading: true
}



export default (state = defaultState, action) => {
    switch(action.type) {
      case actionTypes.CHANGE_ARTIST:
        return {...state,artist:action.data}
      case actionTypes.CHANGE_SONGS_OF_ARTIST:
        return {...state,songsOfArtist:action.data}
      case actionTypes.CHANGE_ENTER_LOADING:
        return {...state,loading:action.data}
      default:
        return state;
    }
  }