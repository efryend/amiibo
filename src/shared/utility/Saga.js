import "regenerator-runtime/runtime";
import { delay } from "redux-saga";
import { take, fork, takeLatest, put, call } from "redux-saga/effects";

function* indexUpAsync() {
  yield delay(4000);
  yield put({ type: "INDEX_UP_ASYNC", value: 1 });
}

function getAmiiboData( data ) {

	document.getElementById("rootElementLoader").classList.add("RootElementLoader");

	var amiiboType = data.amiiboType
	var amiiboUniverse = data.amiiboUniverse
	var amiiboName = data.amiiboName

	var params = '';

    if( ( amiiboType !== null && amiiboType !== '' && typeof(amiiboType) !== 'undefined' ) ){
      params += concatGet( params )
      params += `type=${ amiiboType }`
    }

    if( ( amiiboUniverse !== null && amiiboUniverse !== '' && typeof(amiiboUniverse) !== 'undefined') ){
      params += concatGet( params )
      params += `gameseries=${ amiiboUniverse }`
    }

    if( ( amiiboName !== null && amiiboName !== '' && typeof(amiiboName) !== 'undefined') ){
      params += concatGet( params )
      params += `name=${ amiiboName }`
    }

    const baseUrl = 'http://www.amiiboapi.com'
    const encodedURI = encodeURI(`${baseUrl}/api/amiibo/${ params }`)

    return fetch(encodedURI)
      .then((response) => {
      	console.log('BienPromise')
      	setTimeout(function() {
	        document.getElementById("rootElementLoader").classList.remove("RootElementLoader");
	      }.bind(this), 500)
      	if (!response.ok) throw Error(response.statusText)
  		return response
      })
      .then( response => response.json() )
      .then( json => json )
      .catch((error) => {
      	console.log('MalPromise')
        console.warn(error)
        return null
    });

}

function* dataFlow (request) {

  let data
  let dataEmpty = [
      {
        image: '/img/notfound.png',
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
      }
    ]

  try {

  	console.log('Bien')
  	yield put({ type: 'DATA_SUCCESS', data: dataEmpty })
    data = yield call(getAmiiboData, request)
	yield put({ type: 'DATA_SUCCESS', data: data.amiibo })

  } catch (error) {
    console.log('Mal')
    yield put({ type: 'DATA_SUCCESS', data: dataEmpty})

  }

  // return the token for health and wealth
  return true
}

function concatGet( string ) {

	var newParam = '&'

	if( string.length === 0 ){
	  newParam = '?'
	}

	return newParam
}

/*
export function* watchAgeUp() {

  yield takeLatest("INDEX_UP_UP", indexUpAsync);

}
*/

export function* watchFetchData(){

	while (true) {

		const { amiiboType, amiiboUniverse, amiiboName } = yield take('ELEMENTS_REQUESTING')
		const task = yield fork(dataFlow, amiiboType, amiiboUniverse, amiiboName)

	}

	//yield takeLatest('FETCH_REQUESTED', fetchData)

}