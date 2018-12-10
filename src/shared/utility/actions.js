

const elemntsRequest = function elemntsRequest ({ amiiboType, amiiboUniverse, amiiboName }) {
  return {
    type: 'ELEMENTS_REQUESTING',
    	,
    amiiboUniverse,
    amiiboName,
  }
}

// Since it's the only one here
export default elemntsRequest
