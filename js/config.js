/* ============================================================
   SAMUNIVERSE — SITE SETTINGS
   This is the only file you need to edit to update the site.
   ============================================================ */

window.SAM = {

  /* ---- Contact ------------------------------------------------
     email:        where the "Email us" link and the form go
     whatsapp:     full number with country code, digits only
                   (e.g. "919876543210"). Leave "" to hide it.
     formEndpoint: optional. Create a free form at formspree.io,
                   paste its URL here (https://formspree.io/f/xxxx)
                   and messages arrive in your inbox. If left "",
                   the form opens the visitor's email app instead. */
  email: "hello@samuniverse.in",
  whatsapp: "",
  formEndpoint: "",

  /* ---- Channels ---------------------------------------------- */
  youtube: {
    url: "https://www.youtube.com/@samuniverseofficial",
    handle: "@samuniverseofficial",
    channelId: "UC47wO5ZnsU-I-RiOLwZ117A"   // powers the "latest uploads" player
  },

  instagram: {
    url: "https://www.instagram.com/samuniverse12/",
    handle: "@samuniverse12",
    /* Paste links to up to 3 of your best reels or posts.
       On Instagram: open the reel → ••• → Copy link.
       Example: "https://www.instagram.com/reel/C8xYz12AbCd/"   */
    reels: [
      // "https://www.instagram.com/reel/XXXXXXXXXXX/",
    ]
  },

  /* ---- Portfolio ----------------------------------------------
     One entry per video. To add a YouTube video, copy the part
     after "v=" (or after "youtu.be/" / "shorts/") into youtubeId.
       https://www.youtube.com/watch?v=dQw4w9WgXcQ  → "dQw4w9WgXcQ"
     category: "business" | "education" | "shorts"
     size:     "wide" (big card), "tall" (vertical reel) or ""
     Entries with an empty youtubeId show a designed poster and
     link to your channel — replace them with real videos.       */
  work: [
    {
      title: "How black holes bend light",
      category: "education",
      client: "Sam Universe original",
      length: "4:12",
      youtubeId: "",
      size: "wide"
    },
    {
      title: "Product launch explainer",
      category: "business",
      client: "Client project",
      length: "1:30",
      youtubeId: "",
      size: ""
    },
    {
      title: "60-second science reel",
      category: "shorts",
      client: "Instagram reel",
      length: "0:58",
      youtubeId: "",
      size: "tall"
    },
    {
      title: "Chemistry lesson: chemical bonding",
      category: "education",
      client: "Course animation",
      length: "6:05",
      youtubeId: "",
      size: ""
    },
    {
      title: "Brand story for a local startup",
      category: "business",
      client: "Client project",
      length: "1:10",
      youtubeId: "",
      size: ""
    },
    {
      title: "Logo reveal",
      category: "business",
      client: "Brand motion",
      length: "0:08",
      youtubeId: "",
      size: ""
    },
    {
      title: "YouTube intro for a coaching channel",
      category: "education",
      client: "Brand motion",
      length: "0:12",
      youtubeId: "",
      size: ""
    }
  ]
};
