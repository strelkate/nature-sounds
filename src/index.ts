import './index.scss'
import rainSound from '../assets/sounds/rain.mp3'
import winterSound from '../assets/sounds/winter.mp3'
import summerSound from '../assets/sounds/summer.mp3'

type SoundKey = 'rain' | 'winter' | 'summer'

const sounds: Record<SoundKey, string> = {
  rain: rainSound,
  winter: winterSound,
  summer: summerSound
}

let currentAudio: HTMLAudioElement | null = null
let isPlaying: boolean = false
let currentKey: SoundKey | null = null
let currentIcon: HTMLImageElement | null = null

const buttons = document.querySelectorAll('[data-sound]') as NodeListOf<HTMLElement>
const volumeSlider = document.getElementById('volume') as HTMLInputElement
const wrapper = document.querySelector('.wrapper') as HTMLElement

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const key = button.dataset.sound as SoundKey
    const icon = button.querySelector('img') as HTMLImageElement

    if (!key || !icon) return

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
      if (currentIcon && currentKey) {
        currentIcon.src = `../assets/icons/${currentKey}.svg`
      }
    }

    // Play new
    currentAudio = new Audio(sounds[key])
    currentAudio.volume = parseFloat(volumeSlider.value)
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
    currentAudio.volume = parseFloat(volumeSlider.value)
  }
})