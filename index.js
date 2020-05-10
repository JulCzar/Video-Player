import { get, listen } from './js/utils/CzarK.js'

import './js/updateVideoView.js'
import './js/controls.js'
import './js/player.js'

const vidContnr = get.Id('video-container')
const volSlider = get.Id('vol-slider')

let hideCtrlsId

listen('mousemove', showAndHideControls, vidContnr)
listen(  'click'  , showAndHideControls, vidContnr)
listen(  'input'  , changeVol)

function showAndHideControls() {
  // clear the last timeout to prevent the controlsBar to close
  clearTimeout(hideCtrlsId)
  
  // show the controlsBar
  $('#controls').addClass('show-controls')

  // shows the div that control the play/pause
  // event when clicking at the player-view
  //
  // Obs: This timeout is used to guarantee that
  // mobile users don't pause instantly at click
  setTimeout(a => $('.player-view').show(), 50)

  // activate a timeout and save its id to hide the controlsBar
  hideCtrlsId = setTimeout(hideControls, 2500)
}

/**
 * Function with the responsability to hide the controlsbar
 * and the play/pause div
 */
function hideControls() {
  $('#controls').removeClass('show-controls')
  setTimeout(a => $('.player-view').hide(), 350)
}

function changeVol() {
  // prevents the controls from hide while the volume is modified
  showAndHideControls()

  // get the current input value at the volume slider
  const { value } = volSlider

  // apply the value to the player
  player.volume = value / 100
}