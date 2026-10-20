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
  email: "urkudesam12@gmail.com",
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
      "https://www.instagram.com/reel/DetNanLtc0E/",
      "https://www.instagram.com/reel/DeqpdJutegO/",
      "https://www.instagram.com/reel/DeqCU6mi3kW/"
    ]
  },

  /* ---- Portfolio ----------------------------------------------
     One entry per video. To add a YouTube video, copy the part
     after "v=" (or after "youtu.be/" / "shorts/") into youtubeId.
       https://www.youtube.com/watch?v=dQw4w9WgXcQ  → "dQw4w9WgXcQ"
     category: "business" | "education" | "shorts" | "films"
     size:     "wide" (big card), "tall" (vertical reel) or ""
     Entries with an empty youtubeId show a designed poster and
     link to your channel — replace them with real videos.       */
  work: [
    { title: "The world of space travel", category: "education", client: "Science explainer for Scimit Media", length: "3:03", youtubeId: "Hhc2kOyztLw", size: "wide" },
    { title: "What if every resistor vanished tomorrow?", category: "shorts", client: "Science short · 1.3K views", length: "Short", youtubeId: "1Sh4j9ZftIw", size: "tall" },
    { title: "Real flying cars", category: "education", client: "Science explainer for Scimit Media", length: "5:01", youtubeId: "Gn4JfZHCwpU", size: "" },
    { title: "Why do electric vehicles catch fire?", category: "education", client: "Science explainer for Scimit Media", length: "7:24", youtubeId: "vA9U3R1zFkQ", size: "" },
    { title: "Temporal Continuum", category: "films", client: "Samuniverse short film", length: "9:23", youtubeId: "Ql9A8ciCjuY", size: "wide" },
    { title: "Why the blue LED took 31 years", category: "shorts", client: "Science short · 1.2K views", length: "Short", youtubeId: "kBKxbIY90fY", size: "tall" },
    { title: "Predestination paradox explained", category: "education", client: "Science explainer in Hindi", length: "3:22", youtubeId: "WSN3snuTdZM", size: "" },
    { title: "Escorts Training & Development Centre", category: "business", client: "Corporate film", length: "3:21", youtubeId: "avyBHl7SUUg", size: "" },
    { title: "SSIPMT college tour", category: "business", client: "Institution promo · 9.9K views", length: "3:57", youtubeId: "nWsgP5b546w", size: "" },
    { title: "Computer vs quantum computer", category: "shorts", client: "Science short", length: "Short", youtubeId: "XzFKZFQcV9c", size: "tall" },
    { title: "Zindagi", category: "films", client: "Motivational short film", length: "14:24", youtubeId: "DREfvBqg38I", size: "" },
    { title: "A Tesla just flew over five cars", category: "shorts", client: "Tech short", length: "Short", youtubeId: "42DSPUKRAXA", size: "tall" },
    { title: "Welcome to my universe", category: "films", client: "Channel trailer", length: "0:47", youtubeId: "HEeuVzuph2E", size: "" }
  ]
};
