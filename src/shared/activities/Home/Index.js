import React, { Component } from 'react'

import ElementTitle   from './Elements/ElementTitle'
import ElementSearch  from './Elements/ElementSearch'
import ElementData    from './Elements/ElementData'
import ElementFooter  from './Elements/ElementFooter'

import fetch from 'isomorphic-fetch'
const baseUrl = 'http://www.amiiboapi.com'

import { catalogueLanguages } from '../../utility/Languages.js'

class Home extends Component {

  constructor(props) {
    super(props)

    this.fetchAmiiboStart     = this.fetchAmiiboStart.bind(this)
    this.fetchAmiiboElements  = this.fetchAmiiboElements.bind(this)
    this.handleChangeType     = this.handleChangeType.bind(this)
    this.handleChangeUniverse = this.handleChangeUniverse.bind(this)
    this.handleChangeSearch   = this.handleChangeSearch.bind(this)
    this.handleChangeLanguage = this.handleChangeLanguage.bind(this)

    this.funFetchAmiiboElements = this.funFetchAmiiboElements.bind(this)

    let amiiboType
    let amiiboUniverse
    let amiiboElements

    let languages = catalogueLanguages('es')

    this.state = {
      languages,
      loading: false,
      amiiboType,
      amiiboUniverse,
      amiiboElements,
      selectType: null,
      selectUniverse: null,
      selectName: null,
      nofFound: [
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
    }

  }

  componentDidMount(){
    this.fetchAmiiboStart()
    this.fetchAmiiboElements()
  }

  componentDidUpdate (prevProps, prevState) {

    if (prevState.loading !== this.state.loading) {
      
      var loading = this.state.loading

      setTimeout(function() {
        document.getElementById("rootElementLoader").classList.remove("RootElementLoader");
      }.bind(this), 500)

    }
  }

  fetchAmiiboStart() {

    this.props.fetchAmiiboType()
      .then((data) => this.setState(() => ({
        amiiboType: data.amiibo,
      })))

    this.props.fetchAmiiboUniverse()
      .then((data) => this.setState(() => ({
        amiiboUniverse: data.amiibo,
      })))
  }

  fetchAmiiboElements() {

    this.setState(() => ({
      loading: true
    }))

    document.getElementById("rootElementLoader").classList.add("RootElementLoader");

    var amiiboType      = this.state.selectType
    var amiiboUniverse  = this.state.selectUniverse
    var amiiboName      = this.state.selectName

    this.funFetchAmiiboElements( amiiboType, amiiboUniverse, amiiboName )
      .then((data) => this.setState(() => ({
        amiiboElements: typeof( data.amiibo ) === 'undefined' ? this.state.nofFound : data.amiibo,
        loading: false,
      })))
      .catch((error) => this.setState(() => ({
        amiiboElements: this.state.nofFound,
        loading: false,
      })))
  }

  handleChangeType( e ){

    var type = e.target.value

    const state = this.state
    state['selectType'] = type
    this.setState(state);

    this.fetchAmiiboElements()

  }

  handleChangeUniverse( e ){

    var univers = e.target.value

    const state = this.state
    state['selectUniverse'] = univers
    this.setState(state);

    this.fetchAmiiboElements()

  }

  handleChangeSearch( value ) {

    var name = value

    const state = this.state
    state['selectName'] = name
    this.setState(state);

    this.fetchAmiiboElements()

  }

  handleChangeLanguage( e ){

    const state = this.state
    state['languages'] = catalogueLanguages( e.target.id )
    this.setState(state);

  }

  funFetchAmiiboElements(amiiboType=null, amiiboUniverse=null, amiiboName=null) {

    var params = '';

    if( ( amiiboType !== null && amiiboType !== '') ){
      params += this.concatGet( params )
      params += `type=${ amiiboType }`
    }

    if( ( amiiboUniverse !== null && amiiboUniverse !== '') ){
      params += this.concatGet( params )
      params += `gameseries=${ amiiboUniverse }`
    }

    if( ( amiiboName !== null && amiiboName !== '') ){
      params += this.concatGet( params )
      params += `name=${ amiiboName }`
    }

    const encodedURI = encodeURI(`${baseUrl}/api/amiibo/${ params }`)

    return fetch(encodedURI)
      .then((data) => data.json())
      .catch((error) => {
        console.warn(error)
        return null
    });
  }

  concatGet( string ) {

    var newParam = '&'

    if( string.length === 0 ){
      newParam = '?'
    }

    return newParam
  }

  render() {

    let staticContext = this.props.staticContext

    let handleChangeLanguage = this.handleChangeLanguage

    let amiiboType = this.state.amiiboType
    let amiiboUniverse = this.state.amiiboUniverse
    let amiiboElements = this.state.amiiboElements
    let handleChangeType = this.handleChangeType
    let handleChangeUniverse = this.handleChangeUniverse
    let handleChangeSearch = this.handleChangeSearch
    let loading = this.state.loading

    let languages = this.state.languages

    return (
    	<div className="container">
    		
        <ElementTitle
          handleChangeLanguage ={ handleChangeLanguage }
        />
        <ElementSearch
          staticContext ={ staticContext }
          amiiboType= { amiiboType }
          amiiboUniverse ={ amiiboUniverse }
          handleChangeType ={ handleChangeType }
          handleChangeUniverse ={ handleChangeUniverse }
          handleChangeSearch ={ handleChangeSearch }
          languages ={ languages }
        />
        <ElementData
          staticContext ={ staticContext }
          amiiboElements= { amiiboElements }
          languages ={ languages }
        />
        <ElementFooter
        />

    	</div>
    )
  }
}

export default Home
