import React, { Component } from 'react'

class ElementData extends Component {

  constructor(props) {
    super(props)

    this.handleClickLeft = this.handleClickLeft.bind(this)
    this.handleClickRight = this.handleClickRight.bind(this)

    let amiiboElements
    if (__isBrowser__) {
      var temp = window.__INITIAL_DATA__
      amiiboElements = temp.contextOne.amiibo
    } else {
      amiiboElements = this.props.staticContext.contextOne.amiibo
    }

    var int = [{
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
      }]

    amiiboElements = Array.isArray( amiiboElements ) ? amiiboElements : int

    this.state = {
      amiiboElements,
      amiiboIndex: 0,
      animateClass: ''
    }
  }

  componentDidUpdate (prevProps, prevState) {

    if (prevState.amiiboIndex !== this.state.amiiboIndex) {
      const state = this.state
      state['animateClass'] = 'figure-animation';
      setTimeout(function() {
        this.setState(state);
      }.bind(this), 5)
    }

    if (prevProps.amiiboElements !== this.props.amiiboElements) {

      this.setState({
        amiiboElements: this.props.amiiboElements,
        amiiboIndex: 0,
      })
    }
  }

  handleClickLeft() {

    var amiiboIndex = this.state.amiiboIndex - 1
    var amiiboElements = this.state.amiiboElements

    if( amiiboIndex < 0 ){
      amiiboIndex = amiiboElements.length - 1
    }

    this.setState(() => ({
      amiiboIndex: amiiboIndex,
      animateClass: ''
    }))

  }

  handleClickRight() {

    var amiiboIndex = this.state.amiiboIndex + 1
    var amiiboElements = this.state.amiiboElements

    if( amiiboIndex === amiiboElements.length){
      amiiboIndex = 0
    }

    this.setState(() => ({
      amiiboIndex: amiiboIndex,
      animateClass: ''
    }))

  }

  render() {

    let animateClass = this.state.animateClass

    let totalEle  = this.state.amiiboElements.length
    let index     = this.state.amiiboIndex
    let name      = this.state.amiiboElements[index].name
    let univers   = this.state.amiiboElements[index].gameSeries
    let character = this.state.amiiboElements[index].character
    let release   = this.state.amiiboElements[index].release
    let type      = this.state.amiiboElements[index].type

    let image     = this.state.amiiboElements[index].image

    let languages = this.props.languages

    return (
    	<div className="containerContent">
        <div className="containerData">
          <div className="tableData">
            <figure>
              <div className="text">
                <div className="name">
                  { languages.dataTagName } :
                </div>
                <div className="value">
                  { name }
                </div>
              </div>
              <div className="text">
                <div className="name">
                  { languages.dataTagUniverse } :
                </div>
                <div className="value">
                  { univers }
                </div>
              </div>
              <div className="text">
                <div className="name">
                  { languages.dataTagCharacter } :
                </div>
                <div className="value">
                  { character }
                </div>
              </div>
              <div className="text">
                <div className="name">
                  { languages.dataTagType } :
                </div>
                <div className="value">
                  { type }
                </div>
              </div>
              <div className="text">
                <div className="name">
                  { languages.dataTagRelease } :
                </div>
                <div className="value">
                  <div>au : { release.au  === null ? '-' : release.au }</div>
                  <div>eu : { release.eu  === null ? '-' : release.eu }</div>
                  <div>jp : { release.jp  === null ? '-' : release.jp }</div>
                  <div>na : { release.na  === null ? '-' : release.na }</div>
                </div>
              </div>
            </figure>
          </div>
        </div>
        <div className="containerFigure">
          <div className="containerCounter">
            { index + 1 } / { totalEle }
          </div>
          <div className="figureArrow figureArrowLeft" onClick={ this.handleClickLeft }>
            <i className="fas fa-chevron-circle-left"></i>
          </div>
          <div className={ `figureElement ${ animateClass }` } id='animateFigure'>
            <img src={ image } />
          </div>
          <div className="figureArrow figureArrowRight" onClick={ this.handleClickRight }>
            <i className="fas fa-chevron-circle-right"></i>
          </div>
        </div>
      </div>
    )
  }
}

export default ElementData