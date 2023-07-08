import React, { KeyboardEvent, useEffect, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";

const videoMap = {
  a: "character_a.mp4",
  b: "character_b.mp4",
  c: "character_c.mp4",
  d: "character_d.mp4",
  e: "character_e.mp4",
  f: "character_f.mp4",
  g: "character_g.mp4",
  h: "character_h.mp4",
  i: "character_i.mp4",
  j: "character_j.mp4",
  k: "character_k.mp4",
  l: "character_l.mp4",
  m: "character_m.mp4",
  n: "character_n.mp4",
  o: "character_o.mp4",
  p: "character_p.mp4",
  q: "character_q.mp4",
  r: "character_r.mp4",
  s: "character_s.mp4",
  t: "character_t.mp4",
  u: "character_u.mp4",
  v: "character_v.mp4",
  w: "character_w.mp4",
  x: "character_x.mp4",
  y: "character_y.mp4",
  z: "character_z.mp4",
};
function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const handleKeyPress = (ev: any) => {
    const key = ev.key as keyof typeof videoMap;
    const listCharacter = Object.keys(videoMap) as [keyof typeof videoMap];
    if (listCharacter.includes(key)) {
      if (videoRef && videoRef.current) {
        videoRef.current.setAttribute("src", videoMap[key]);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress, false);
  }, []);

  return (
    <div className="App">
      <video
        width="100%"
        height="100%"
        controls={false}
        loop
        muted
        autoPlay
        preload="auto"
        ref={videoRef}
      >
        <source src="character_a.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default App;
