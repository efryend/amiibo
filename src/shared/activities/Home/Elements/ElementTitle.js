import React, { Component } from 'react'

class ElementTitle extends Component {

  constructor(props) {
    super(props)
  }

  render() {

    let handleChangeLanguage = this.props.handleChangeLanguage

    return (
    	<div className="containerTitle">
        <div className="logo">
          <a href="https://www.nintendo.com/">
            <img src="img/nintendo.png" className="elementImg" />
          </a>
        </div>
        <div className="languages">
          <div className="contentButtonLanguages">
            <button className="buttonLanguages" id='es' onClick={ handleChangeLanguage }>
              ES
            </button>
            <button className="buttonLanguages" id='en' onClick={ handleChangeLanguage }>
              ENG
            </button>
          </div>
        </div>
        <div className="logo">
          <a href="https://www.nintendo.com/amiibo/">
            <img src="img/amiibo.png" className="elementImg"/>
          </a>
        </div>
      </div>
    )
  }
}

export default ElementTitle