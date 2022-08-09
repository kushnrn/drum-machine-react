import React, { useContext } from "react";
import DrumPad from "./DrumPad";
import { DrumContext } from "./DrumProvider";

/**
 * The component is mapping the audio clips file and creating the corresponding drum pads. 
 */
export default function DrumClips() {
  const { audioClips } = useContext(DrumContext);
  return (
    <div id="drum-clips">
      <div id="clips">
        {audioClips.map((pad, i) => (
          <DrumPad key={i} keyCode={pad.keyCode} keyTrigger={pad.keyTrigger} url={pad.url}/>
        ))}
      </div>
  </div>
  )
}
