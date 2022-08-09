import React, { useContext, useEffect, useReducer } from "react";
import { DrumContext } from "./DrumProvider";

/**
 * The component creates a drum pad that triggers a corresponding sound and changes styles when clicked.
 */
export default function DrumPad({keyCode, keyTrigger, url}) {
  const { volume, power, saveRecording } = useContext(DrumContext);
  const [ active, togglePad ] = useReducer(active => !active, false);

  /**
   * Triggers a function, that is responsible for playing a sound, when a Key is pressed.
   */
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    }
  }, []);

  /**
   * A function plays a sound if the key that is pressed corresponds to the keyCode of a drum pad.
   */
  const handleKeyPress = (event) => {
    if(event.keyCode === keyCode) {
        playSound();
    }
  };

/**
 * A function checks if the drum machine is turned on before playing a sound.
 * It turns an active style for the button for some time to show that the sound is playing. 
 * The sound is saved to the recording state and can be reproduced later.
 */
  const playSound = () => {
    const playTag = document.getElementById(keyTrigger);
    if (power) {
      togglePad();
      setTimeout(() => togglePad(), 200);
      playTag.currentTime = 0;
      playTag.volume = volume;
      playTag.play();
      saveRecording(prev => prev + keyTrigger + ' ');
    } 
  }

  return (
    <button onClick={playSound} className={`drum-pad btn btn-secondary text-center ${active && 'btn-warning'}`}>
        <audio className="clip" id={keyTrigger} src={url} />
          {keyTrigger}
    </button>
  )
}