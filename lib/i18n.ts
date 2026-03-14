"use client"

import { createContext, useContext } from "react"

export type Locale = "en" | "sl"

export const LocaleContext = createContext<{
  locale: Locale
  setLocale: (l: Locale) => void
}>({ locale: "en", setLocale: () => {} })

export function useLocale() {
  return useContext(LocaleContext)
}

export const t = {
  loading: {
    en: "Initializing leadership profile...",
    sl: "Inicializacija profila...",
  },
  hero: {
    name: { en: "Luka Zlatečan", sl: "Luka Zlatečan" },
    headline: {
      en: "Engineering systems that scale from cloud to orbit.",
      sl: "Gradim sisteme, ki segajo od oblaka do orbite.",
    },
    sub: {
      en: "Co-founder of Indigo Labs & SpaceGuardian.\nAI \u2022 Product \u2022 Leadership \u2022 Impact",
      sl: "Soustanovitelj Indigo Labs & SpaceGuardian.\nAI \u2022 Produkt \u2022 Vodenje \u2022 Vpliv",
    },
    cta1: { en: "Explore my journey", sl: "Raziskuj mojo pot" },
    cta2: { en: "Why AmCham", sl: "Zakaj AmCham" },
  },
  metrics: {
    title: { en: "Impact at a glance", sl: "Vpliv na prvi pogled" },
    companies: { en: "Companies co-founded", sl: "Soustanovljena podjetja" },
    years: { en: "Years in software", sl: "Let v programski opremi" },
    products: {
      en: "Products delivered globally",
      sl: "Produkti dostavljeni globalno",
    },
    cassini: { en: "CASSINI winner for space innovation", sl: "CASSINI zmagovalec za vesoljske inovacije" },
  },
  narrative: {
    title: {
      en: "I build systems that make complexity work.",
      sl: "Gradim sisteme, ki obvladujejo kompleksnost.",
    },
    p1: {
      en: "My career has been driven by one question: how do we turn advanced technology into real-world impact?",
      sl: "Mojo kariero poganja eno vpra\u0161anje: kako napredno tehnologijo spremenimo v resnicni vpliv?",
    },
    p2: {
      en: "From building high-performing product teams at Indigo Labs to developing autonomous collision-avoidance infrastructure at SpaceGuardian, my focus is always the same: align people, technology and vision into scalable systems.",
      sl: "Od gradnje visoko ucinkovitih produktnih ekip v Indigo Labs do razvoja avtonomne infrastrukture za izogibanje trkom pri SpaceGuardian \u2013 moj fokus je vedno enak: uskladiti ljudi, tehnologijo in vizijo v skalabilne sisteme.",
    },
    p3: {
      en: "I am at my best where engineering, business and leadership meet.",
      sl: "Najboljsi sem tam, kjer se srecajo inzenirstvo, poslovanje in vodenje.",
    },
  },
  build: {
    indigo: {
      tag: { en: "CTO", sl: "CTO" },
      title: {
        en: "Building teams that build great products.",
        sl: "Gradim ekipe, ki gradijo odlicne produkte.",
      },
      p1: {
        en: "At Indigo Labs we partner with companies that need more than external vendors. We embed into their environment, take ownership and help them deliver complex digital products faster and better.",
        sl: "Pri Indigo Labs sodelujemo s podjetji, ki potrebujejo vec kot le zunanje izvajalce. Vkljucimo se v njihovo okolje, prevzamemo odgovornost in jim pomagamo hitreje in bolje dostaviti kompleksne digitalne produkte.",
      },
      p2: {
        en: "Our strength is not only in technology. It is in creating aligned, autonomous and high-performing teams.",
        sl: "Na\u0161a moc ni le v tehnologiji. Je v ustvarjanju usklajenih, avtonomnih in visoko ucinkovitih ekip.",
      },
    },
    space: {
      tag: { en: "CEO", sl: "CEO" },
      title: {
        en: "Making space sustainable through autonomous decision systems.",
        sl: "Trajnostni vesolje skozi avtonomne odlocitvene sisteme.",
      },
      p1: {
        en: "Space is becoming the next critical infrastructure layer for our society. At SpaceGuardian we are developing AI-driven coordination that enables satellites to avoid collisions automatically and fairly.",
        sl: "Vesolje postaja naslednja kriticna infrastrukturna plast na\u0161e druzbe. Pri SpaceGuardian razvijamo AI-vodeno koordinacijo, ki satelitom omogoca avtomatsko in posteno izogibanje trkom.",
      },
      p2: {
        en: "Our vision is clear: a safe, scalable and economically sustainable orbit.",
        sl: "Na\u0161a vizija je jasna: varna, skalabilna in ekonomsko trajnostna orbita.",
      },
    },
  },
  timeline: {
    title: { en: "My journey", sl: "Moja pot" },
    items: [
      {
        year: { en: "2016", sl: "2016" },
        title: {
          en: "Started in software engineering",
          sl: "Zacel v programskem inzenirstvu",
        },
        desc: {
          en: "Building foundations in full-stack development",
          sl: "Gradnja temeljev v full-stack razvoju",
        },
      },
      {
        year: { en: "2020", sl: "2020" },
        title: {
          en: "Co-founding Indigo Labs",
          sl: "Soustanovitev Indigo Labs",
        },
        desc: {
          en: "Building organisations that build great products",
          sl: "Gradnja organizacij, ki gradijo odlicne produkte",
        },
      },
      {
        year: { en: "2024", sl: "2024" },
        title: {
          en: "Winning CASSINI Hackathon",
          sl: "Zmaga na CASSINI Hackathonu",
        },
        desc: {
          en: "Validating a global deep-tech vision",
          sl: "Validacija globalne deep-tech vizije",
        },
      },
      {
        year: { en: "2025", sl: "2025" },
        title: {
          en: "CASSINI Challenge \u2013 1st place",
          sl: "CASSINI Challenge \u2013 1. mesto",
        },
        desc: {
          en: "Winning the EU space innovation challenge",
          sl: "Zmaga na EU vesoljskem inovacijskem izzivu",
        },
      },
      {
        year: { en: "2025", sl: "2025" },
        title: {
          en: "Co-founding SpaceGuardian",
          sl: "Soustanovitev SpaceGuardian",
        },
        desc: {
          en: "Creating infrastructure for the future of space",
          sl: "Ustvarjanje infrastrukture za prihodnost vesolja",
        },
      },
    ],
  },
  lead: {
    title: { en: "How I lead", sl: "Kako vodim" },
    cards: [
      {
        title: { en: "Systems thinking", sl: "Sistemsko razmisljanje" },
        desc: {
          en: "I connect technology, business goals and team dynamics into one coherent direction.",
          sl: "Povezujem tehnologijo, poslovne cilje in dinamiko ekipe v eno koherentno smer.",
        },
      },
      {
        title: { en: "Ownership culture", sl: "Kultura odgovornosti" },
        desc: {
          en: "The best results come from empowered teams, not control.",
          sl: "Najboljsi rezultati prihajajo iz opolnomocenih ekip, ne iz nadzora.",
        },
      },
      {
        title: {
          en: "Long-term value over short-term output",
          sl: "Dolgorocna vrednost pred kratkorocnim rezultatom",
        },
        desc: {
          en: "Sustainable impact always wins.",
          sl: "Trajnostni vpliv vedno zmaga.",
        },
      },
      {
        title: { en: "Clarity in complexity", sl: "Jasnost v kompleksnosti" },
        desc: {
          en: "My role as a leader is to make difficult things understandable and actionable.",
          sl: "Moja vloga vodje je narediti tezke stvari razumljive in izvedljive.",
        },
      },
    ],
  },
  testimonials: {
    title: {
      en: "How colleagues experience working with me",
      sl: "Kako sodelavci dozivljajo delo z mano",
    },
    items: [
      {
        quote: {
          en: "Luka is an excellent leader whom both colleagues and clients can trust. He transforms complex challenges into concrete, actionable steps. He stays calm and focused even under tight deadlines. His ability to recognize potential in people and entrust them with responsibility builds team confidence and fosters a culture of collaboration and mutual respect.",
          sl: "Luka predstavlja odličnega vodjo, ki mu lahko zaupamo tako sodelavci kot naročniki projekta. Kot vodja zna pretvoriti kompleksne izzive v konkretne, izvedljive korake. Pri tem ohranja mirnost in jasno usmeritev tudi takrat, ko so roki kratki ali okoliščine zahtevne. Posebej izstopa njegova sposobnost, da v ljudeh prepozna potencial in jim zaupa odgovornost. S tem gradi samozavest ekipe ter spodbuja kulturo sodelovanja in medsebojnega spoštovanja.",
        },
        author: { en: "Jan Krivec, Colleague", sl: "Jan Krivec, sodelavec" },
      },
      {
        quote: {
          en: "What stands out most about Luka is his ability to rapidly adopt new technologies. While others are still wondering if something is mature enough, he's already testing it and thinking about how to meaningfully integrate it. He leads by example — he doesn't talk about how things should be done, he shows it. His critical thinking means decisions are never made superficially. I'm convinced that Luka, with his combination of technical knowledge, vision, character, and attitude toward people, represents exactly what Top Potential should mean.",
          sl: "Pri Luki najbolj izstopa njegova sposobnost hitrega osvajanja novih tehnologij. Medtem ko se drugi še sprašujemo, ali je nekaj že dovolj zrelo za uporabo, on to že testira, razume in razmišlja, kako lahko to smiselno vključimo v naše projekte. Ni samo tehnično izjemno podkovan, ampak vodi z zgledom. Ne govori, kako bi se stvari morale delati – pokaže. Njegovo kritično razmišljanje pomeni, da odločitev nikoli ne sprejema površinsko, ampak vedno premisli širšo sliko in posledice. Prepričan sem, da Luka s svojo kombinacijo tehničnega znanja, vizije, karakterja in odnosa do ljudi predstavlja točno to, kar naj bi pomenil Top Potencial.",
        },
        author: { en: "Uroš Lesjak, Colleague", sl: "Uroš Lesjak, sodelavec" },
      },
    ],
  },
  endorsements: {
    title: {
      en: "Leadership endorsements",
      sl: "Priporočila vodstva",
    },
    items: [
      {
        quote: {
          en: "Luka is one of the smartest people I know, and that's in an environment surrounded by highly educated professionals. When he encounters a problem, he doesn't look for a quick fix — he goes deep, understands the context, and builds a system that works. His work ethic is extraordinary: he can put in 16-hour days without sacrificing quality. His productivity exceeds all standard measures — where an average developer would spend days, Luka builds a solution in hours. His efficiency is comparable to the work of a small team. In the industry, they call this a '10x engineer.' With his combination of intelligence, technical knowledge, work ethic, and execution ability, Luka represents a profile that deserves the AmCham Top Potential 2026 recognition.",
          sl: "Luka je eden najpametnejših ljudi, ki jih poznam, in to v okolju, kjer sem obkrožen z visoko izobraženimi strokovnjaki. Ko naleti na problem, ne išče hitre rešitve. Raje gre v globino, razume kontekst in zgradi sistem, ki deluje. Lukajeva delovna etika je nekaj posebnega. Ko pride do dela, lahko vlaga 16 ur dnevno in to ne gre na račun kakovosti. Ostane osredotočen, natančen, produktiven. Njegova produktivnost presega vse običajne meritve. Tam, kjer bi povprečen razvijalec porabil več dni, Luka zgradi rešitev v nekaj urah. Njegova učinkovitost je primerljiva z delom manjše ekipe. V branži temu pravijo \"10x engineer\". Luka z vsemi temi lastnostmi predstavlja profil, ki si zasluži priznanje AmCham Top Potencial leta 2026.",
        },
        author: { en: "Jernej Jan Kočica", sl: "Jernej Jan Kočica" },
        role: { en: "CTO, SpaceGuardian", sl: "CTO, SpaceGuardian" },
      },
    ],
  },
  amcham: {
    title: { en: "Why AmCham", sl: "Zakaj AmCham" },
    bring: {
      title: { en: "What I bring", sl: "Kaj prinesem" },
      items: {
        en: [
          "A founder mindset with corporate execution capability",
          "A deep-tech perspective on future industries",
          "Experience in building high-performance teams",
        ],
        sl: [
          "Podjetniski nacin razmisljanja s sposobnostjo korporativne izvedbe",
          "Deep-tech perspektivo na prihodnje industrije",
          "Izkusnje pri gradnji visoko ucinkovitih ekip",
        ],
      },
    },
    seek: {
      title: { en: "What I seek", sl: "Kaj ischem" },
      items: {
        en: [
          "Stronger collaboration between startups and established companies",
          "A platform for global impact from Slovenia",
          "A network that turns ideas into action",
        ],
        sl: [
          "Mocnejse sodelovanje med startupi in uveljavljenimi podjetji",
          "Platformo za globalni vpliv iz Slovenije",
          "Mrezo, ki ideje spreminja v dejanja",
        ],
      },
    },
    build: {
      title: { en: "What I will build", sl: "Kaj bom zgradil" },
      items: {
        en: [
          "Initiatives connecting business with emerging technologies like AI and space",
          "A community focused on execution, not only discussion",
          "New opportunities for the next generation of leaders",
        ],
        sl: [
          "Iniciative, ki povezujejo poslovanje z nastajajocimi tehnologijami, kot sta AI in vesolje",
          "Skupnost, osredotoceno na izvedbo, ne le na razpravo",
          "Nove priložnosti za naslednjo generacijo voditeljev",
        ],
      },
    },
  },
  plan: {
    title: {
      en: "My first year as AmCham Top Potential",
      sl: "Moje prvo leto kot AmCham Top Potencial",
    },
    initiative: {
      label: { en: "Initiative", sl: "Iniciativa" },
      value: {
        en: "Bridging deep-tech startups and corporates",
        sl: "Povezovanje deep-tech startupov in korporacij",
      },
    },
    goal: {
      label: { en: "Goal", sl: "Cilj" },
      value: {
        en: "Create a repeatable collaboration model that enables faster innovation adoption.",
        sl: "Ustvariti ponovljiv model sodelovanja, ki omogoca hitrejse prevzemanje inovacij.",
      },
    },
    impact: {
      label: { en: "Impact", sl: "Vpliv" },
      items: {
        en: [
          "Stronger competitiveness of the Slovenian business environment",
          "More opportunities for young professionals",
          "Real business outcomes from the AmCham network",
        ],
        sl: [
          "Mocnejsa konkurencnost slovenskega poslovnega okolja",
          "Vec priložnosti za mlade strokovnjake",
          "Dejanski poslovni rezultati iz mreze AmCham",
        ],
      },
    },
  },
  video: {
    title: {
      en: "The problem I want to help solve",
      sl: "Problem, ki ga zelim pomagati resiti",
    },
    text: {
      en: "Slovenia has the knowledge and talent to build globally relevant companies. What we need is stronger alignment between technology, capital and leadership. This is where I see my role in the AmCham community.",
      sl: "Slovenija ima znanje in talent za gradnjo globalno relevantnih podjetij. Kar potrebujemo, je mocnejsa usklajenost med tehnologijo, kapitalom in vodenjem. Tu vidim svojo vlogo v skupnosti AmCham.",
    },
  },
  personal: {
    text: {
      en: "I believe leadership is not about position. It is about creating environments where great people can do their best work and where technology creates meaningful progress for society. This is the impact I want to scale through AmCham.",
      sl: "Verjamem, da vodenje ni vprasanje pozicije. Gre za ustvarjanje okolij, kjer lahko odlicni ljudje opravijo svoje najboljse delo in kjer tehnologija ustvarja smiseln napredek za druzbo. To je vpliv, ki ga zelim skalirati skozi AmCham.",
    },
  },
  beyondWork: {
    title: {
      en: "Beyond work",
      sl: "Onkraj dela",
    },
    intro: {
      en: "Above everything else, I am a father. That shapes how I think about the future — not in quarters, but in generations.",
      sl: "Nad vsem drugim sem oče. To oblikuje moj pogled na prihodnost — ne v četrtletjih, ampak v generacijah.",
    },
    hobbies: [
      {
        title: { en: "Badminton", sl: "Badminton" },
        desc: { en: "Competitive spirit, strategic thinking", sl: "Tekmovalni duh, strateško razmišljanje" },
        icon: "badminton",
      },
      {
        title: { en: "Rubik's cubes", sl: "Rubikove kocke" },
        desc: { en: "Pattern recognition, algorithmic problem solving", sl: "Prepoznavanje vzorcev, algoritmično reševanje" },
        icon: "cube",
      },
      {
        title: { en: "Math olympiads", sl: "Matematične olimpijade" },
        desc: { en: "Analytical depth, creative proofs", sl: "Analitična globina, kreativni dokazi" },
        icon: "math",
      },
      {
        title: { en: "Piano", sl: "Klavir" },
        desc: { en: "Discipline, expression, patience", sl: "Disciplina, izražanje, potrpežljivost" },
        icon: "piano",
      },
    ],
    slovenia3000: {
      title: { en: "Slovenia 3000", sl: "Slovenija 3000" },
      desc: {
        en: "Slovenia lacks a long-term national strategy. Every government erases what the previous one built, without systematic goals for the future. Slovenia 3000 is my side project to change that — a platform for thinking about where Slovenia should be in 50, 100, 1000 years.",
        sl: "Slovenija nima dolgoročne nacionalne strategije. Vsaka vlada izbriše, kar je prejšnja zgradila, brez sistematičnih ciljev za prihodnost. Slovenija 3000 je moj stranski projekt za spremembo tega — platforma za razmišljanje o tem, kje bi morala biti Slovenija čez 50, 100, 1000 let.",
      },
      url: "https://slovenia3000.si",
    },
  },
  cta: {
    title: {
      en: "Let's build what comes next.",
      sl: "Zgradimo, kar pride naslednje.",
    },
    cv: { en: "Download CV", sl: "Prenesi zivljenjepis" },
    linkedin: { en: "Connect on LinkedIn", sl: "Povezi se na LinkedIn" },
  },
  nav: {
    journey: { en: "Journey", sl: "Pot" },
    companies: { en: "Companies", sl: "Podjetja" },
    leadership: { en: "Leadership", sl: "Vodenje" },
    amcham: { en: "AmCham", sl: "AmCham" },
    contact: { en: "Contact", sl: "Kontakt" },
  },
} as const
