import React, { useContext } from "react";
import { DrumContext } from "./DrumProvider";

/**
 * The component controls the settings of the whole drum machine – can turn the machine on and off, adjust speed and volume, reproduce the recording, or clean and start recording again.
 */
export default function DrumSettings() {
  const { power, recording, volume, speed, adjustVolume, adjustSpeed, stopRecording, togglePower, powerSlider, playRecording } = useContext(DrumContext);

  return (
    <div id="drum-settings">
        <div className='control'>
    <h5>Power</h5>
      <div className='select' value={power} onClick={togglePower}>
        <div className='inner' style={powerSlider}/>
      </div>
    </div>
    <h5>Volume</h5>
    <input type='range' onChange={adjustVolume} step='0.1' max='1' min='0' value={volume}/>
    <h5>Speed</h5>
      <input type='range' onChange={adjustSpeed} value={speed} step='0.01' max='1.2' min='0.1' />
    {recording && (
      <div id="button-settings">
      <button onClick={playRecording} className="btn btn-success">play</button>
      <button onClick={stopRecording} className="btn btn-danger">clear</button>
      <br />
      </div>
    )}
  <div id="text-recording">
      <textarea id="recording" rows="30" cols="30" placeholder={recording || 'Press drum keys to start recording'}></textarea>
      </div>
  </div>
  )
}