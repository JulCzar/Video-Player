import { d, get } from "./utils/CzarK.js"

const player = get.Id('player')

const updateVideoView = () => {
  const { muted, paused, progress, volume } = getVideoState()

  // update progressBar with the current time of the player
  $('#progress').width(progress)

  // update the play/pause button to the current video state
  $('#play-btn')
    .removeClass('fa-play fa-pause')
    .addClass(paused ? 'fa-play':'fa-pause')

  // remove the current icon of volume indicator
  $('#volume').removeClass('fa-volume-off fa-volume-down fa-volume-up fa-volume-mute')

  // update the current icon of volume indicator
  if (muted)
    $('#volume').addClass('fa-volume-mute')
  else if (!volume) 
    $('#volume').addClass('fa-volume-off')
  else if (volume < 0.5)
    $('#volume').addClass('fa-volume-down')
  else
    $('#volume').addClass('fa-volume-up')

  // update the fullscreen indicator
  if (d.fullscreenElement)
    $('.fullscreen').removeClass('fa-expand').addClass('fa-compress')
  else
    $('.fullscreen').removeClass('fa-compress').addClass('fa-expand')

  // Recusively and optimaly calls its function again to keep the player updated
  requestAnimationFrame(updateVideoView)
}

/**
 * function that get and return the state of the video with some tweaks
 * @returns {{ muted: Boolean, paused: Boolean, progress: String, volume: Number }}
 */
function getVideoState() {
  // Pega as informações do estado do player de vídeo
  const {
    currentTime,
    duration,
    paused,
    volume,
    muted
  } = player

  // convert a ms time to the watched percentage
  const progress = `${( (currentTime / duration) * 100).toFixed(2)}%`

  return { paused, muted, progress, volume }
}

;(updateVideoView)()