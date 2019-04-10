import React, { Component } from 'react'
import { connect } from "react-redux"

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
      animateClass: ''
    }
  }

  componentDidUpdate (prevProps, prevState) {

    if ( prevProps.amiiboIndex !== this.props.amiiboIndex) {
      const state = this.state
      state['animateClass'] = 'figure-animation';
      setTimeout(function() {
        this.setState(state);
      }.bind(this), 5)
    }

    if (prevProps.amiiboElements !== this.props.amiiboElements) {

      this.props.onIndexClear();

      this.setState({
        amiiboElements: this.props.amiiboElements,
      })
    }
  }

  handleClickLeft() {

    let amiiboElements = this.state.amiiboElements;

    this.props.onIndexDown(1, amiiboElements.length);

    this.setState(() => ({
      animateClass: ''
    }))

  }

  handleClickRight() {

    let amiiboElements = this.state.amiiboElements

    this.props.onIndexUp(1, amiiboElements.length);

    this.setState(() => ({
      animateClass: ''
    }))

  }

  render() {

    let animateClass = this.state.animateClass

    let totalEle  = this.state.amiiboElements.length
    let index     = this.props.amiiboIndex
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
          <div className="containerCounter  ">
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

const mapStateToProps = state => {
  return {
    amiiboIndex: state.amiiboIndex
  };
};

const mapDispachToProps = dispatch => {
  return {
    onIndexClear: ( ) => dispatch({ type: "INDEX_CLEAR" }),
    onIndexUp: ( index, total ) => dispatch({ type: "INDEX_UP", value: { index, total } }),
    onIndexDown: ( index, total ) => dispatch({ type: "INDEX_DOWN", value:{ index, total } })
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(ElementData);
