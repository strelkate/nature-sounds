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

const buttons = document.querySelectorAll('[data-sound]')
const volumeSlider = document.getElementById('volume')
const wrapper = document.querySelector('.wrapper')

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const key = button.dataset.sound

    // Same button toggles
    if (currentKey === key && currentAudio) {
      if (isPlaying) {
        currentAudio.pause()
        isPlaying = false
      } else {
        currentAudio.play()
        isPlaying = true
      }
      return
    }

    // Stop previous
    if (currentAudio) {
      currentAudio.pause()
      currentAudio.currentTime = 0
    }

    // Play new
    currentAudio = new Audio(sounds[key])
    currentAudio.volume = volumeSlider.value
    currentAudio.loop = true
    currentAudio.play()
    isPlaying = true
    currentKey = key

    wrapper.style.backgroundImage = `url('../assets/images/${key}-bg.jpg')`

  })
})

volumeSlider.addEventListener('input', () => {
  if (currentAudio) {
    currentAudio.volume = volumeSlider.value
  }
})
