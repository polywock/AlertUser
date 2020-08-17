let loadedSounds = new Map()
let enabled = true

function playAudio(soundName) {
  let sound = loadedSounds.get(soundName)
  if (!sound) {
    try {
      sound = new Audio(chrome.runtime.getURL(`./sounds/${soundName}`))
      loadedSounds.set(soundName, sound)
    } catch (err) {
      speechSynthesis.speak(new SpeechSynthesisUtterance(`failed to load ${soundName}`))
      return 
    }
  } 

  sound.currentTime = 0
  sound.play()
}



chrome.tabs.onCreated.addListener(() => {
  if (!enabled) return
  playAudio("good.wav")
  // speechSynthesis.speak(new SpeechSynthesisUtterance("created"))
})

chrome.tabs.onRemoved.addListener(() => {
  if (!enabled) return
  playAudio("bad.wav")
  // speechSynthesis.speak(new SpeechSynthesisUtterance("removed"))
})

chrome.windows.onCreated.addListener(() => {
  if (!enabled) return
  playAudio("good.wav")
  // speechSynthesis.speak(new SpeechSynthesisUtterance("new window"))
})

chrome.windows.onRemoved.addListener(() => {
  if (!enabled) return
  playAudio("bad.wav")
  // speechSynthesis.speak(new SpeechSynthesisUtterance("removed window"))
})


chrome.browserAction.onClicked.addListener(() => {
  enabled = !enabled
  chrome.browserAction.setIcon({path: enabled ? {"128": `icons/128.png`} : {"128": `icons/128g.png`}})
})


