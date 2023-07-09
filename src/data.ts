export interface IVideoAudioObject {
  video: string;
  audio: string;
}
export type IVideoAudioMap = Record<string, IVideoAudioObject>;

export const VIDEO_AUDIO_MAP: IVideoAudioMap = {
  intro: {
    video: "M_multiverse_of_sadness.mp4",
    audio: "audio/artnouveau.mp3",
  },
  a: { video: "A_art_nouveau.mp4", audio: "audio/artnouveau.mp3" },
  b: { video: "B_bauhaus.mp4", audio: "audio/bauhaus.mp3" },
  c: { video: "C_cubism.mp4", audio: "audio/cubism.mp3" },
  d: { video: "D_dadaism.mp4", audio: "audio/dadaism.mp3" },
  e: { video: "E_expressionism.mp4", audio: "audio/expressionism.mp3" },
  f: { video: "F_fauvism.mp4", audio: "audio/Fauvism.mp3" },
  g: { video: "G_glass_painting.mp4", audio: "audio/glasspainting.mp3" },
  h: { video: "H_handrawing.mp4", audio: "audio/handrawing.mp3" },
  i: { video: "I_impressionism.mp4", audio: "audio/Impressionism.mp3" },
  j: { video: "J_japonism.mp4", audio: "audio/Japonism.mp3" },
  k: { video: "K_kawaii.mp4", audio: "audio/kawaii.mp3" },
  l: { video: "L_lofi.mp4", audio: "audio/lofi.mp3" },
  m: { video: "M_mosaic.mp4", audio: "audio/Mosaic.mp3" },
  n: { video: "N_nostagia.mp4", audio: "audio/nostagia.mp3" },
  o: { video: "O_op_art.mp4", audio: "audio/op_art.mp3" },
  p: { video: "P_Psychedelic.mp4", audio: "audio/PSYCHEDELIA.mp3" },
  q: { video: "Q_queencore.mp4", audio: "audio/queencore.mp3" },
  r: { video: "R_retro_futurism.mp4", audio: "audio/retro_futurism.mp3" },
  s: { video: "S_surrealism.mp4", audio: "audio/surrealism.mp3" },
  t: { video: "S_surreaT_textilelism.mp4", audio: "audio/Textile.mp3" },
  u: { video: "U_utopia.mp4", audio: "audio/utopia.mp3" },
  v: { video: "V_Vaporwave.mp4", audio: "audio/vaporwave.mp3" },
  w: { video: "W_woodcut.mp4", audio: "audio/woodcut.mp3" },
  x: { video: "X_xenomorph.mp4", audio: "audio/xenomorph.mp3" },
  y: { video: "Y_y2k.mp4", audio: "audio/y2k.mp3" },
  z: { video: "Z_zine.mp4", audio: "audio/zine.mp3" },
};
