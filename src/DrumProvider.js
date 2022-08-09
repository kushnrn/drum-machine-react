import React, { createContext, useState, useReducer } from "react";
import { audioClips } from "./audio-clips";

/**
 * Context is created to store state data in a single location, so there is no need to pass that data through a bunch of components.
 */
export const DrumContext = createContext();

/**
 * The component that will be used to wrap the App with the provider.
 */
export default function DrumProvider({children}) {
  const [volume, setVolume] = useState(1);
  const [recording, setRecording] = useState('');
  const [speed, setSpeed] = useState(0.5);
  const [power, togglePower] = useReducer(power => !power, true);

  /**
   * Adjusts the volume of the keys and recording.
   */
  const adjustVolume = (e) => {
    if (power) {
      setVolume(e.target.value);
    }
  }

  /**
   * Adjusts the speed of the keys and the recording.
   */
  const adjustSpeed = (e) => {
    if (power) {
      setSpeed(e.target.value);
    }
  }

  /**
   * Cleans the recording.
   */
  const stopRecording = () => {
    if (power) {
      setRecording('');
    }
  }

  /**
   * Saves the drum key to the recording state and can be reproduced later.
   */
  const saveRecording = (value) => {
    if (power) {
      setRecording(value);
    }
  }

  /**
   * The function checks if the power is on and reproduces the recorded sounds altogether according to the speed and volume which are selected. It triggers button styles to show which exact buttons are playing.
   */
  const playRecording = () => {
    if (power) {
      let recordArray = recording.split(' ');
      let index = 0;
      const interval = setInterval(() => {
        const playTag = document.getElementById(recordArray[index]);
        playTag.parentElement.classList.add('btn-warning');
        setTimeout(() => playTag.parentElement.classList.remove('btn-warning'), 200);
        playTag.currentTime = 0;
        playTag.volume = volume;
        playTag.play();
        index++;
      }, (1.2 - speed) * 600)
      setTimeout(
        () => { clearInterval(interval)
        }, 600 * (1.2 - speed) * recordArray.length - 1)
    }
  }

  /**
   * Controls the style of the power slider that can turn the drum machine on and off.
   */
  const powerSlider = power ?
  {float: 'right',
  backgroundColor: '#198753'} 
  : {float: 'left',
  backgroundColor: '#DC3545'
  };

  /**
   * The Provider is the App component’s parent, and it’s providing values in context. The App component’s children can obtain these values directly on their own.
   */
  return (
    <DrumContext.Provider value={{ audioClips, volume, recording, speed, adjustVolume, adjustSpeed, stopRecording, saveRecording, togglePower, powerSlider, power, playRecording }}>
      {children}
    </DrumContext.Provider>
  )
}