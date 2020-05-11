import { d, get, listen } from './utils/CzarK.js'
import showControls from '../index.js'

const videoContnr = get.Id('video-container')
const progressBar = get.Id('progress-bar')
const volSlider   = get.Id('vol-slider')

$('.back-5-sec').click(returnFiveSec)
$('.vol-contrl').click(toogleMute)
$('.playr-seek').click(seekVideo)
$('.play-pause').click(playPause)
$('.add-10-sec').click(addTenSec)
$('.fullscreen').click(toogleFS)

listen('input', changeVol)

const keyboard = {
  ArrowRight: addTenSec,
  ArrowDown: decreaseVolume,
  ArrowLeft: returnFiveSec,
  ArrowUp: increaseVolume,
  Space: playPause,
  KeyM: toogleMute,
  KeyF: toogleFS
}

/**
 * Função que modifica o estado de reprodução do video
 */
function playPause() {
  const { paused } = player 

  if (paused)
    player.play ()
  else
    player.pause()
}

/**
 * Function that increase the player volume by 1/20
 */
function increaseVolume() {
  if (player.volume < 0.94 )
    player.volume += parseFloat(1/20)
  else
    player.volume = parseFloat(1)
}

/**
 * Function that descrease the player volume by 1/20
 */
function decreaseVolume() {
  if (player.volume > 0.05 )
    player.volume -= parseFloat(1/20)
  else
    player.volume  = parseFloat(0)
}

/**
 * function that toogle the fullscreen status of the player
 */
function toogleFS() {
  if (d.fullscreenElement)
    d.exitFullscreen()
  else
    videoContnr.requestFullscreen()
}

/**
 * function that toogle the muted status of the player 
 */
function toogleMute() {
  player.muted = !player.muted
}

/**
 * function that add 10s to the current time of the player
 */
function addTenSec() {
  player.currentTime += parseFloat( 10.0 )
}

/**
 * function that remove 5s to the current time of the player
 */
function returnFiveSec() {
  player.currentTime -= parseFloat(  5.0 )
}

/**
 * Function with the responsability of seeking the video playback when the progressbar is clicked
 * @param {{offsetX: Number}} param0 offsetX contains the click position that user clicked
 */
function seekVideo({ offsetX: clickXPos }) {
  // get from the player the current video duration
  const { duration } = player

  // get from the progressBar the current width
  const { offsetWidth: barWidth } = progressBar

  // get the new time 
  const newTime = (clickXPos / barWidth) * duration

  // apply the new time to the player
  player.currentTime = newTime
}

function changeVol() {
  // prevents the controls from hide while the volume is modified
  showControls()

  // get the current input value at the volume slider
  const { value } = volSlider

  // apply the value to the player
  player.volume = value / 100
}

export default keyboard