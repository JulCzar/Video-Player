import { d, get } from './utils/CzarK.js'

const videoContnr = get.Id('video-container')
const progressBar = get.Id('progress-bar')

$('.back-5-sec').click(backFiveSec)
$('.vol-contrl').click(toogleMute)
$('.playr-seek').click(seekVideo)
$('.play-pause').click(playPause)
$('.add-10-sec').click(addTenSec)
$('.fullscreen').click(toogleFS)

const keyboard = {
  ArrowRight: addTenSec,
  ArrowDown: decVolume,
  ArrowLeft: backFiveSec,
  ArrowUp: incVolume,
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
function incVolume() {
  if (player.volume < 0.94 )
    player.volume += parseFloat(1/20)
  else
    player.volume = parseFloat(1)
}

/**
 * Function that descrease the player volume by 1/20
 */
function decVolume() {
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
function backFiveSec() {
  player.currentTime -= parseFloat(  5.0 )
}

/**
 * Function with the responsability of seeking the video playback when the progressbar is clicked
 * @param {{offsetX: Number}} param0 offsetX contains the click position user clicked
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

export default keyboard