export interface IVideoAudioObject {
  video: string;
  audio: string;
}
export type IVideoAudioMap = Record<string, IVideoAudioObject>;

export const VIDEO_AUDIO_MAP: IVideoAudioMap = {
  intro: {
    video: "video/Homepage.mp4",
    audio: "audio/homepage2.mp3",
  },
  a: { video: "video/A_art_nouveau_1.mp4", audio: "audio/artnouveau.mp3" },
  b: { video: "video/B_bauhaus_1.mp4", audio: "audio/bauhaus.mp3" },
  c: { video: "video/C_cubism_1.mp4", audio: "audio/cubism.mp3" },
  d: { video: "video/D_dadaism_1.mp4", audio: "audio/dadaism.mp3" },
  e: { video: "video/E_expressionism_1.mp4", audio: "audio/expressionism.mp3" },
  f: { video: "video/F_fauvism_1.mp4", audio: "audio/Fauvism.mp3" },
  g: {
    video: "video/G_glass_painting_1.mp4",
    audio: "audio/glasspainting.mp3",
  },
  h: { video: "video/H_handrawing_1.mp4", audio: "audio/handrawing.mp3" },
  i: { video: "video/I_impressionism_1.mp4", audio: "audio/Impressionism.mp3" },
  j: { video: "video/J_japonism_1.mp4", audio: "audio/Japonism.mp3" },
  k: { video: "video/K_kawaii_1.mp4", audio: "audio/kawaii.mp3" },
  l: { video: "video/L_lofi_1.mp4", audio: "audio/lofi.mp3" },
  m: { video: "video/M_mosaic_1.mp4", audio: "audio/Mosaic.mp3" },
  n: { video: "video/N_nostagia_1.mp4", audio: "audio/nostagia.mp3" },
  o: { video: "video/O_op_art_1.mp4", audio: "audio/op_art.mp3" },
  p: { video: "video/P_Psychedelic_1.mp4", audio: "audio/PSYCHEDELIA.mp3" },
  q: { video: "video/Q_queencore_1.mp4", audio: "audio/queencore.mp3" },
  r: {
    video: "video/R_retro_futurism_1.mp4",
    audio: "audio/retro_futurism.mp3",
  },
  s: { video: "video/S_surrealism_1.mp4", audio: "audio/surrealism.mp3" },
  t: { video: "video/S_surreaT_textilelism_1.mp4", audio: "audio/Textile.mp3" },
  u: { video: "video/U_utopia_1.mp4", audio: "audio/utopia.mp3" },
  v: { video: "video/V_Vaporwave_1.mp4", audio: "audio/vaporwave.mp3" },
  w: { video: "video/W_woodcut_1.mp4", audio: "audio/woodcut.mp3" },
  x: { video: "video/X_xenomorph_1.mp4", audio: "audio/xenomorph.mp3" },
  y: { video: "video/Y_y2k_1.mp4", audio: "audio/y2k.mp3" },
  z: { video: "video/Z_zine_1.mp4", audio: "audio/zine.mp3" },
};
