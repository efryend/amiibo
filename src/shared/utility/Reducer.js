const initialState = {
  amiiboIndex: 0,
  successful: false,
  data: [{
        name: '-',
        gameSeries: '-',
        character:'-',
        type: '-',
        release:{
          'au': '-',
          'eu': '-',
          'jp': '-',
          'na': '-'
        }
      }],
};

const reducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    
    case "INDEX_UP":

      var index = action.value.index;
      var total = action.value.total;

      if( newState.amiiboIndex < total-1 ){
        newState.amiiboIndex += index;
      }
      else{
        newState.amiiboIndex = 0;
      }
      break;

    case "INDEX_DOWN":

      var index = action.value.index;
      var total = action.value.total;

      if( newState.amiiboIndex > 0 ){
        newState.amiiboIndex -= index;
      }
      else{
        newState.amiiboIndex = total - 1;
      }
      break;

    case "INDEX_CLEAR":
      
      newState.amiiboIndex = 0;
      
      break;

    case 'ELEMENTS_REQUESTING':
      newState.successful = false;
      newState.data = action.data;

      break;

    case 'DATA_SUCCESS':
      newState.successful = true;
      newState.data = action.data;

      break;
  }
  return newState;
};

export default reducer;