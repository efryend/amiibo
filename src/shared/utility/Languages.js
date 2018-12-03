
export function catalogueLanguages( languages ) {

	var response = null
	
	var spanish = {
		searchPlaceSerach: 	'Buscar',
		searchTagType: 		'Tipo',
		searchTagUniverse: 	'Universo',
		dataTagName: 		'Nombre',
		dataTagUniverse: 	'Universo',
		dataTagCharacter:  	'Personaje',
		dataTagType: 		'Tipo',
		dataTagRelease: 	'Lanzamientos'
	}

	var english = {
		searchPlaceSerach: 	'Search',
		searchTagType: 		'Type',
		searchTagUniverse: 	'Universe',
		dataTagName: 		'Name',
		dataTagUniverse: 	'Universe',
		dataTagCharacter:  	'Character',
		dataTagType: 		'Type',
		dataTagRelease: 	'Releases'
	}

	if( languages === 'es' )
		response = spanish
	else if( languages === 'en' )
		response = english

	return response

}