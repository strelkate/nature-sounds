import './index.scss'
import rainSound from '../assets/sounds/rain.mp3'
import winterSound from '../assets/sounds/winter.mp3'
import summerSound from '../assets/sounds/summer.mp3'

const sounds = {
  rain: rainSound,
  winter: winterSound,
  summer: summerSound
}

let currentAudio = null
let isPlaying = false
let currentKey = null
let currentIcon = null

const buttons = document.querySelectorAll('[data-sound]')
const volumeSlider = document.getElementById('volume')
const wrapper = document.querySelector('.wrapper')

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const key = button.dataset.sound
    const icon = button.querySelector('img')

    // Same button toggles
    if (currentKey === key && currentAudio) {
      if (isPlaying) {
        currentAudio.pause()
        isPlaying = false
        icon.src = `../assets/icons/${key}.svg`
      } else {
        currentAudio.play()
        isPlaying = true
        icon.src = `../assets/icons/pause.svg`
      }
      return
    }

    // Stop previous
    if (currentAudio) {
      currentAudio.pause()
      currentAudio.currentTime = 0
      currentIcon.src = `../assets/icons/${currentKey}.svg`
    }

    // Play new
    currentAudio = new Audio(sounds[key])
    currentAudio.volume = volumeSlider.value
    currentAudio.loop = true
    currentAudio.play()
    isPlaying = true
    currentKey = key

    icon.src = `../assets/icons/pause.svg`
    currentIcon = icon
    wrapper.style.backgroundImage = `url('../assets/images/${key}-bg.jpg')`

  })
})

volumeSlider.addEventListener('input', () => {
  if (currentAudio) {
    currentAudio.volume = volumeSlider.value
  }
})