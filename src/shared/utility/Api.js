import fetch from 'isomorphic-fetch'

const baseUrl = 'http://www.amiiboapi.com'

export function fetchAmiiboType () {
	const encodedURI = encodeURI(`${baseUrl}/api/type`)

	console.log( encodedURI );

	return fetch(encodedURI)
		.then((data) => { 
			return data.json() 
		})
		.catch((error) => {
		  console.warn(error)
		  return null
	});
}

export function fetchAmiiboUniverse () {
	const encodedURI = encodeURI(`${baseUrl}/api/amiiboseries`)

	console.log( encodedURI );

	return fetch(encodedURI)
		.then((data) => data.json())
		.catch((error) => {
		  console.warn(error)
		  return null
	});
}

export function fetchAmiiboElements(amiiboType=null, amiiboUniverse=null, amiiboName=null) {

	var params = '';

	console.log( 'API' );
	console.log( amiiboType );

	if( ( amiiboType !== null && amiiboType !== '') ){
		params += concatGet( params )
		params += `type=${ amiiboType }`
	}

	const encodedURI = encodeURI(`${baseUrl}/api/amiibo/${ params }`)

	console.log( 'hola' )
	console.log( encodedURI );

	return fetch(encodedURI)
		.then((data) => data.json())
		.catch((error) => {
		  console.warn(error)
		  return null
	});
}

function concatGet( string ) {

	var newParam = '&'

	if( string.length === 0 ){
		newParam = '?'
	}

	return newParam
}