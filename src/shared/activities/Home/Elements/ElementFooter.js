import React, { Component } from 'react'
import Sound from 'react-sound';

class ElementFooter extends Component {

  constructor(props) {
    super(props)

    this.handleMuteSound = this.handleMuteSound.bind(this)

    this.state = {
      flagAudio: null,
      volume: 100,
    }

  }

  componentDidMount () {

    setTimeout(function() { //Start the timer
      document.getElementById("en").click()
      this.setState( { flagAudio: Sound.status.PLAYING } )
    }.bind(this), 5000)

  }

  handleMuteSound() {

    var volume = this.state.volume;

    if( volume === 100 ){
      volume = 1
    }else{
      volume = 100
    }

    this.setState( { volume: volume } )
  }

  render() {

    let flagAudio = this.state.flagAudio
    let volume    = this.state.volume

    return (
    	<div className="containerFooter">
        <div>
          <div className="containerSound" onClick={ this.handleMuteSound }>
            { volume !== 1 &&
            <i className="fas fa-volume-up"></i>
            }
            { volume === 1 &&
            <i className="fas fa-volume-mute"></i>
            }
          </div>
        </div>
        <div className="containerBranch">
          © 2018 Efryend corporation
        </div>
        <div>
          { this.state.flagAudio != null && 
            <Sound
              url="sound/main.mp3"
              playStatus={ this.state.flagAudio }
              
              volume={ this.state.volume }
              autoLoad={ true }
            />
          }

        </div>
      </div>
    )
  }
}

export default ElementFooter