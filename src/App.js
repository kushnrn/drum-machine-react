import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import DrumProvider from "./DrumProvider"
import Header from "./Header";
import Footer from "./Footer";
import DrumClips from "./DrumClips";
import DrumSettings from "./DrumSettings";

/**
 * The component sits at the root of the tree. 
 * @returns components that make up the whole structure of the app – header/footer, drum container, with drum pads and settings, and the provider which keeps states of the whole app.
 */
export default function App() {
  return (
    <DrumProvider>
      <Header />
      <div id="drum-container">
        <div className="text-center" id="drum-machine">
        <DrumClips />
        <DrumSettings />
        </div>
      </div>
      <Footer />
  </DrumProvider>
  );
}