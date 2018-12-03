import React, { Component } from 'react'

class ElementSearch extends Component {

  constructor(props) {
    super(props)

    let amiiboType
    if (__isBrowser__) {
      var temp = window.__INITIAL_DATA__
      amiiboType = temp.contextTwo.amiibo
    } else {
      amiiboType = this.props.staticContext.contextTwo.amiibo
    }

    let amiiboUniverse
    if (__isBrowser__) {
      var temp = window.__INITIAL_DATA__
      amiiboUniverse = temp.contextThree.amiibo
    } else {
      amiiboUniverse = this.props.staticContext.contextThree.amiibo
    }

    this.state = {
      amiiboType,
      amiiboUniverse
    }

  }

  componentDidMount(){

    let handleChangeSearch = this.props.handleChangeSearch

    const node = document.getElementById("idSearch");
    node.addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            handleChangeSearch( node.value )
        }
    });

  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.amiiboType !== this.props.amiiboType) {
      this.setState({
        amiiboType: this.props.amiiboType
      })
    }
    if (prevProps.amiiboUniverse !== this.props.amiiboUniverse) {
      this.setState({
        amiiboUniverse: this.props.amiiboUniverse
      })
    }
  }

  render() {

    let handleChangeType      = this.props.handleChangeType;
    let handleChangeUniverse  = this.props.handleChangeUniverse

    let amiiboType = this.state.amiiboType
    let amiiboUniverse = this.state.amiiboUniverse

    let languages = this.props.languages

    return (
    	<div className="containerSearch">
        <div className="elementSearch">
          <div className="elementSearchContainer">
            <i className="fas fa-search iconSearch"></i>
            <input className="inputSearch" type="text" name="search" placeholder={ languages.searchPlaceSerach } id="idSearch"/>          
          </div>
        </div>
        <div className="elementSearch elementSearchTag">
          <span>{ languages.searchTagType }: </span>
          <select className="inputSelect" onChange={ handleChangeType }>

            <option></option>
            {
              amiiboType.map(({ key, name, }) => (
              <option value={ key } key={ key }>{ name }</option>
              ))
            }

          </select>
        </div>
        <div className="elementSearch elementSearchTag">
          <span>{ languages.searchTagUniverse }: </span>
          <select className="inputSelect" onChange={ handleChangeUniverse }>

            <option></option>
            {
              amiiboUniverse.map(({ key, name, }) => (
              <option value={ key } key={ key }>{ name }</option>
              ))
            }

          </select>
        </div>
      </div>
    )
  }
}

export default ElementSearch