import React, { useEffect, useRef } from "react";
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
  let db = useRef<any>(null);

  const prefetchVideos = () => {
    for (let key in videoMap) {
      const videoRequest = fetch(videoMap[key as keyof typeof videoMap]).then(
        (response) => response.blob()
      );
      videoRequest.then((blob) => {
        const request = indexedDB.open("videosDB", 3);

        request.onsuccess = (event: any) => {
          console.log(key);
          db.current = event.target.result;
          const transaction = db.current.transaction(["videos"]);
          const objectStore = transaction.objectStore("videos");
          objectStore.transaction.oncomplete = (event: any) => {
            console.log(key);
            console.log("key complete");
            const videoObjectStore = db.current
              .transaction("videos", "readwrite")
              .objectStore("videos");
            videoObjectStore.add({ name: key, blob: blob });
          };
          // const test = objectStore.get("test");
          // test.onerror = (event: any) => {
          //   console.log("error");
          // };
          // test.onsuccess = (event: any) => {
          //   if (videoRef && videoRef.current) {
          //     videoRef.current.setAttribute(
          //       "src",
          //       window.URL.createObjectURL(test.result.blob)
          //     );
          //   }
          // };
        };

        request.onupgradeneeded = (event: any) => {
          const db = event.target.result;
          db.createObjectStore("videos", {
            keyPath: "name",
          });
        };
      });
    }
  };

  const handleKeyPress = (ev: any) => {
    const key = ev.key as keyof typeof videoMap;
    const listCharacter = Object.keys(videoMap) as [keyof typeof videoMap];
    if (!listCharacter.includes(key)) {
      return;
    }
    if (db && db.current) {
      const transaction = db.current.transaction(["videos"]);
      const objectStore = transaction.objectStore("videos");
      const test = objectStore.get(key);
      test.onerror = (event: any) => {
        console.log("error");
      };
      test.onsuccess = (event: any) => {
        if (videoRef && videoRef.current) {
          videoRef.current.setAttribute(
            "src",
            window.URL.createObjectURL(test.result.blob)
          );
        }
      };
    }
  };

  useEffect(() => {
    console.log("START PREFETCH");
    prefetchVideos();
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
