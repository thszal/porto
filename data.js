/* =========================================================
   SITE_DATA — edit everything here. No need to touch the
   HTML files for content changes: photos, tracks, and your
   Instagram handle all live in this one file.
   ========================================================= */
const SITE_DATA = {

  /* ---- Home hero portrait ----
     "main"   -> the normal photo shown by default
     "alt"    -> revealed inside the liquid-glass lens on hover
                 (this is where you'd drop your AI-edited version) */
  heroPortrait: {
    main: "https://picsum.photos/seed/ijal-portrait/900/1125",
    alt:  "https://picsum.photos/seed/ijal-portrait-alt/900/1125"
  },

  /* ---- Instagram ---- */
  instagram: {
    handle: "@your_username",
    url: "https://instagram.com/"
  },

  /* ---- Home page "Selected Work" teaser (first item is the large one) ---- */
  selectedWork: [
    { src: "https://picsum.photos/seed/ijal-1/900/1200", label: "Portrait, 2026" },
    { src: "https://i.ibb.co.com/8RDqh53/IMG-1347-1.jpg",  label: "Landscape, 2025" },
    { src: "https://picsum.photos/seed/ijal-4/700/560",  label: "Event, 2025" },
    { src: "https://picsum.photos/seed/ijal-6/700/560",  label: "Street, 2025" },
    { src: "https://picsum.photos/seed/ijal-8/700/560",  label: "Event, 2026" }
  ],

  /* ---- Full gallery ----
     category: "portrait" | "landscape" | "event" | "street" */
  gallery: [
    { src:"https://picsum.photos/seed/ijal-1/600/750",  full:"https://picsum.photos/seed/ijal-1/1200/1500", category:"portrait",  caption:"Portrait · 2026" },
    { src:"https://i.ibb.co.com/8RDqh53/IMG-1347-1.jpg",  full:"https://i.ibb.co.com/8RDqh53/IMG-1347-1.jpg",  category:"landscape", caption:"Landscape · 2025" },
    { src:"https://picsum.photos/seed/ijal-3/600/800",  full:"https://picsum.photos/seed/ijal-3/1200/1600", category:"street",    caption:"Candid · 2026" },
    { src:"https://picsum.photos/seed/ijal-4/600/600",  full:"https://picsum.photos/seed/ijal-4/1200/1200", category:"event",     caption:"Event · 2025" },
    { src:"https://picsum.photos/seed/ijal-5/600/750",  full:"https://picsum.photos/seed/ijal-5/1200/1500", category:"portrait",  caption:"Portrait · 2026" },
    { src:"https://picsum.photos/seed/ijal-6/600/450",  full:"https://picsum.photos/seed/ijal-6/1200/900",  category:"street",    caption:"Street · 2025" },
    { src:"https://picsum.photos/seed/ijal-7/600/800",  full:"https://picsum.photos/seed/ijal-7/1200/1600", category:"landscape", caption:"Detail · 2026" },
    { src:"https://picsum.photos/seed/ijal-8/600/450",  full:"https://picsum.photos/seed/ijal-8/1200/900",  category:"event",     caption:"Event · 2026" },
    { src:"https://picsum.photos/seed/ijal-9/600/750",  full:"https://picsum.photos/seed/ijal-9/1200/1500", category:"portrait",  caption:"Portrait · 2025" },
    { src:"https://picsum.photos/seed/ijal-10/600/450", full:"https://picsum.photos/seed/ijal-10/1200/900", category:"landscape", caption:"Landscape · 2026" }
  ],

  /* ---- Music page playlist ----
     "src" should point to your own audio file, e.g. "audio/song-1.mp3".
     Put an /audio folder next to these HTML files and drop your mp3s in.
     Nothing will play until a real file exists at that path. */
  tracks: [
    { title:"Track One",   artist:"Artist Name", cover:"https://picsum.photos/seed/track-1/300/300", src:"audio/track-1.mp3", duration:"0:00" },
    { title:"Track Two",   artist:"Artist Name", cover:"https://picsum.photos/seed/track-2/300/300", src:"audio/track-2.mp3", duration:"0:00" },
    { title:"Track Three", artist:"Artist Name", cover:"https://picsum.photos/seed/track-3/300/300", src:"audio/track-3.mp3", duration:"0:00" },
    { title:"Track Four",  artist:"Artist Name", cover:"https://picsum.photos/seed/track-4/300/300", src:"audio/track-4.mp3", duration:"0:00" }
  ]
};
