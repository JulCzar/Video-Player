import { d, get } from "./utils/CzarK.js"

const player = get.Id('player')

const progressBar = $('#progress')
const fullscreen = $('.fullscreen')
const playBtn = $('#play-btn')
const volIcon = $('#volume')

const VOL_HIG = 'fa-volume-up'
const VOL_OFF = 'fa-volume-off'
const VOL_LOW = 'fa-volume-down'
const VOL_MUT = 'fa-volume-mute'
const PLAY_BTN = 'fa-play'
const PAUSE_BT = 'fa-pause'
const MAXIMIZE = 'fa-expand'
const MINIMIZE = 'fa-compress'

const updateVideoView = () => {
  const { muted, paused, progress, volume } = getVideoState()
  // update progressBar with the current time of the player
  progressBar.width(progress + '%')

  // update the play/pause button to the current video state
  playBtn
    .removeClass([ PLAY_BTN, PAUSE_BT ])
    .addClass(paused ? PLAY_BTN:PAUSE_BT)

  // remove the current icon of volume indicator
  volIcon.removeClass([ VOL_HIG, VOL_LOW, VOL_MUT, VOL_OFF ])

  // update the current icon of volume indicator
  if (muted)
    volIcon.addClass(VOL_MUT)
  else if (!volume) 
    volIcon.addClass(VOL_OFF)
  else if (volume < 0.5)
    volIcon.addClass(VOL_LOW)
  else
    volIcon.addClass(VOL_HIG)

  // update the fullscreen indicator
  if (d.fullscreenElement)
    fullscreen.removeClass(MAXIMIZE).addClass(MINIMIZE)
  else
    fullscreen.removeClass(MINIMIZE).addClass(MAXIMIZE)

  // Recusively and optimaly calls its function again to keep the player updated
  requestAnimationFrame(updateVideoView)
}

/**
 * function that get and return the state of the video with some tweaks
 * @returns {{ muted: Boolean, paused: Boolean, progress: Number, volume: Number }}
 */
function getVideoState() {
  // get Video infos about current state of player
  const {
    currentTime,
    duration,
    paused,
    volume,
    muted
  } = player

  // convert a ms time to the watched percentage
  const progress = parseFloat((currentTime / duration * 100).toFixed(2))

  return { paused, muted, progress, volume }
}

requestAnimationFrame(updateVideoView)