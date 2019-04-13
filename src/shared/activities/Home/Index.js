import React, { Component } from 'react'
import { connect } from "react-redux"

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
    
    /*Comida*/
    
    this.fetchAmiiboStart     = this.fetchAmiiboStart.bind(this)
    this.fetchAmiiboElements  = this.fetchAmiiboElements.bind(this)
    this.handleChangeType     = this.handleChangeType.bind(this)
    this.handleChangeUniverse = this.handleChangeUniverse.bind(this)
    this.handleChangeSearch   = this.handleChangeSearch.bind(this)
    this.handleChangeLanguage = this.handleChangeLanguage.bind(this)

    let amiiboType
    let amiiboUniverse
    let amiiboElements

    let languages = catalogueLanguages('es')

    this.state = {
      languages,
      amiiboType,
      amiiboUniverse,
      amiiboElements,
      selectType: null,
      selectUniverse: null,
      selectName: null,
    }
  }

  componentWillMount(){
    this.fetchAmiiboStart()
    this.fetchAmiiboElements()
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.requestSuccessful !== this.props.requestSuccessful) {
      
      setTimeout( () => {
        document.getElementById("rootElementLoader").classList.remove("RootElementLoader");
      }, 500)

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

    var amiiboType      = this.state.selectType
    var amiiboUniverse  = this.state.selectUniverse
    var amiiboName      = this.state.selectName

    var values = {
      amiiboType,
      amiiboUniverse,
      amiiboName
    };

    this.props.onRequestData(values)

  }

  handleChangeType( e ){

    document.getElementById("rootElementLoader").classList.add("RootElementLoader");

    var type = e.target.value

    const state = this.state
    state['selectType'] = type
    this.setState(state);

    this.fetchAmiiboElements()

  }

  handleChangeUniverse( e ){

    document.getElementById("rootElementLoader").classList.add("RootElementLoader");

    var univers = e.target.value

    const state = this.state
    state['selectUniverse'] = univers
    this.setState(state);

    this.fetchAmiiboElements()

  }

  handleChangeSearch( value ) {

    document.getElementById("rootElementLoader").classList.add("RootElementLoader");

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

  render() {

    console.log(  this.props.requestSuccessful );

    let staticContext = this.props.staticContext

    let handleChangeLanguage = this.handleChangeLanguage

    let amiiboType = this.state.amiiboType
    let amiiboUniverse = this.state.amiiboUniverse
    let amiiboElements = this.props.amiiboElements
    let handleChangeType = this.handleChangeType
    let handleChangeUniverse = this.handleChangeUniverse
    let handleChangeSearch = this.handleChangeSearch

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

const mapStateToProps = state => {
  return {
    requestSuccessful: state.successful,
    amiiboElements: state.data
  };
};

const mapDispachToProps = dispatch => {
  return {
    onRequestData: ( amiiboType, amiiboUniverse, amiiboName ) => dispatch({ 
      type: "ELEMENTS_REQUESTING", 
      amiiboType,
      amiiboUniverse,
      amiiboName
    })
  };
};

export default connect(mapStateToProps, mapDispachToProps)(Home)
