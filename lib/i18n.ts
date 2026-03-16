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
    en: "Initializing AmCham Young profile...",
    sl: "Inicializacija profila AmCham Young...",
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
    title: { en: "In numbers", sl: "V številkah" },
    companies: { en: "Companies co-founded", sl: "Soustanovljena podjetja" },
    years: { en: "Years in software", sl: "Let izkušenj v razvoju" },
  },
  narrative: {
    title: {
      en: "I build systems that make complexity work.",
      sl: "Gradim sisteme, ki obvladujejo kompleksnost.",
    },
    p1: {
      en: "My career has been driven by one question: how do we turn advanced technology into real-world impact?",
      sl: "Mojo kariero poganja eno vprašanje: kako napredno tehnologijo pretvorimo v resničen vpliv?",
    },
    p2: {
      en: "From building high-performing product teams at Indigo Labs to developing autonomous collision-avoidance infrastructure at SpaceGuardian, my focus is always the same: align people, technology and vision into scalable systems.",
      sl: "Od gradnje visoko učinkovitih produktnih ekip v Indigo Labs do razvoja avtonomne infrastrukture za izogibanje trkom pri SpaceGuardian, moj fokus je vedno enak: uskladiti ljudi, tehnologijo in vizijo v skalabilne sisteme.",
    },
    p3: {
      en: "I am at my best where engineering, business and leadership meet.",
      sl: "Najboljši sem tam, kjer se srečajo inženirstvo, poslovanje in vodenje.",
    },
  },
  projects: {
    eyebrow: { en: "Projects I've built", sl: "Projekti, ki sem jih zgradil" },
    benson: {
      tag: { en: "AI · Investing", sl: "AI · Investiranje" },
      desc: {
        en: "AI-powered investing assistant that automatically identifies and invests in top-performing stocks, allowing users to build wealth without financial expertise.",
        sl: "AI asistent za investiranje, ki samodejno identificira in vlaga v najboljše delnice, tako da uporabniki gradijo premoženje brez finančnega znanja.",
      },
    },
    realroots: {
      tag: { en: "Social · Community", sl: "Socialno · Skupnost" },
      desc: {
        en: "Friend-matching service that connects women through guided, curated experiences and structured social activities designed to foster meaningful friendships.",
        sl: "Storitev za iskanje prijateljev, ki povezuje ženske prek vodenih, prilagojenih izkušenj in strukturiranih socialnih aktivnosti.",
      },
    },
    irriot: {
      tag: { en: "IoT · AgriTech", sl: "IoT · AgriTech" },
      desc: {
        en: "Wireless precision irrigation automation platform that optimizes water usage and crop yields through sensor-based control powered by solar energy.",
        sl: "Brezžična platforma za natančno avtomatizacijo namakanja, ki optimizira porabo vode in pridelek s pomočjo senzorjev.",
      },
    },
  },
  build: {
    indigo: {
      tag: { en: "CTO", sl: "CTO" },
      title: {
        en: "Building teams that build great products.",
        sl: "Gradim ekipe, ki gradijo odlične produkte.",
      },
      p1: {
        en: "At Indigo Labs we partner with companies that need more than external vendors. We embed into their environment, take ownership and help them deliver complex digital products faster and better.",
        sl: "Pri Indigo Labs sodelujemo s podjetji, ki potrebujejo več kot le zunanje izvajalce. Vključimo se v njihovo okolje, prevzamemo odgovornost in jim pomagamo hitreje in bolje dostaviti kompleksne digitalne produkte.",
      },
      p2: {
        en: "Our strength is not only in technology. It is in creating aligned, autonomous and high-performing teams.",
        sl: "Naša moč ni le v tehnologiji. Je v ustvarjanju usklajenih, avtonomnih in visoko učinkovitih ekip.",
      },
    },
    space: {
      tag: { en: "CEO", sl: "CEO" },
      title: {
        en: "Making space sustainable through autonomous decision systems.",
        sl: "Vesolje naredimo trajnostno skozi avtonomne odločitvene sisteme.",
      },
      p1: {
        en: "Space is becoming the next critical infrastructure layer for our society. At SpaceGuardian we are developing AI-driven coordination that enables satellites to avoid collisions automatically and fairly, using a bidding system where operators negotiate right-of-way in real time.",
        sl: "Vesolje postaja naslednja kritična infrastrukturna plast naše družbe. Pri SpaceGuardian razvijamo AI-vodeno koordinacijo, ki satelitom omogoča avtomatsko in pošteno izogibanje trkom, s sistemom licitiranja, kjer operaterji v realnem času pogajajo prioriteto.",
      },
      p2: {
        en: "Our vision is clear: a safe, scalable and economically sustainable orbit.",
        sl: "Naša vizija je jasna: varna, skalabilna in ekonomsko trajnostna orbita.",
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
          sl: "Začel v programskem inženirstvu",
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
          sl: "Gradnja organizacij, ki gradijo odlične produkte",
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
          en: "Joining AmCham with Indigo Labs",
          sl: "Vstop v AmCham z Indigo Labs",
        },
        desc: {
          en: "Becoming part of the AmCham Slovenia community",
          sl: "Pridružitev skupnosti AmCham Slovenija",
        },
      },
      {
        year: { en: "2025", sl: "2025" },
        title: {
          en: "CASSINI Challenge 1st place & SpaceGuardian",
          sl: "CASSINI Challenge 1. mesto & SpaceGuardian",
        },
        desc: {
          en: "Winning the EU space challenge and co-founding SpaceGuardian",
          sl: "Zmaga na EU vesoljskem izzivu in soustanovitev SpaceGuardian",
        },
      },
    ],
  },
  testimonials: {
    title: {
      en: "What colleagues say about working with me",
      sl: "Kako sodelavci doživljajo delo z mano",
    },
    items: [
      {
        quote: {
          en: "Luka is an excellent leader whom both colleagues and clients can trust. He transforms complex challenges into concrete, actionable steps. He stays calm and focused even under tight deadlines. His ability to recognize potential in people and entrust them with responsibility builds team confidence and fosters a culture of collaboration and mutual respect.",
          sl: "Luka predstavlja odličnega vodjo, ki mu lahko zaupamo tako sodelavci kot naročniki projekta. Kot vodja zna pretvoriti kompleksne izzive v konkretne, izvedljive korake. Pri tem ohranja mirnost in jasno usmeritev tudi takrat, ko so roki kratki ali okoliščine zahtevne. Posebej izstopa njegova sposobnost, da v ljudeh prepozna potencial in jim zaupa odgovornost. S tem gradi samozavest ekipe ter spodbuja kulturo sodelovanja in medsebojnega spoštovanja.",
        },
        author: {
          en: "Jan Krivec, Indigo Labs",
          sl: "Jan Krivec, Indigo Labs",
        },
        photo: "/jankrivec.jpeg",
      },
      {
        quote: {
          en: "What stands out most about Luka is his ability to rapidly adopt new technologies. While others are still wondering if something is mature enough, he's already testing it and thinking about how to meaningfully integrate it. He leads by example. He doesn't talk about how things should be done, he shows it. His critical thinking means decisions are never made superficially. I'm convinced that Luka, with his combination of technical knowledge, vision, character, and attitude toward people, represents exactly what Top Potential should mean.",
          sl: "Pri Luki najbolj izstopa njegova sposobnost hitrega osvajanja novih tehnologij. Medtem ko se drugi še sprašujemo, ali je nekaj že dovolj zrelo za uporabo, on to že testira, razume in razmišlja, kako lahko to smiselno vključimo v naše projekte. Ni samo tehnično izjemno podkovan, ampak vodi z zgledom. Ne govori, kako bi se stvari morale delati, pokaže. Njegovo kritično razmišljanje pomeni, da odločitev nikoli ne sprejema površinsko, ampak vedno premisli širšo sliko in posledice. Prepričan sem, da Luka s svojo kombinacijo tehničnega znanja, vizije, karakterja in odnosa do ljudi predstavlja točno to, kar naj bi pomenil Top Potencial.",
        },
        author: {
          en: "Uroš Lesjak, Indigo Labs",
          sl: "Uroš Lesjak, Indigo Labs",
        },
        photo: "/uroslesjak.jpeg",
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
          en: "Luka is one of the smartest people I know, and that's in an environment surrounded by highly educated professionals. When he encounters a problem, he doesn't look for a quick fix. He goes deep, understands the context, and builds a system that works. His work ethic is extraordinary: he can put in 16-hour days without sacrificing quality. His productivity exceeds all standard measures. Where an average developer would spend days, Luka builds a solution in hours. His efficiency is comparable to the work of a small team. In the industry, they call this a '10x engineer.' With his combination of intelligence, technical knowledge, work ethic, and execution ability, Luka represents a profile that deserves the AmCham Top Potential 2026 recognition.",
          sl: 'Luka je eden najpametnejših ljudi, ki jih poznam, in to v okolju, kjer sem obkrožen z visoko izobraženimi strokovnjaki. Ko naleti na problem, ne išče hitre rešitve. Raje gre v globino, razume kontekst in zgradi sistem, ki deluje. Lukajeva delovna etika je nekaj posebnega. Ko pride do dela, lahko vlaga 16 ur dnevno in to ne gre na račun kakovosti. Ostane osredotočen, natančen, produktiven. Njegova produktivnost presega vse običajne meritve. Tam, kjer bi povprečen razvijalec porabil več dni, Luka zgradi rešitev v nekaj urah. Njegova učinkovitost je primerljiva z delom manjše ekipe. V branži temu pravijo "10x engineer". Luka z vsemi temi lastnostmi predstavlja profil, ki si zasluži priznanje AmCham Top Potencial leta 2026.',
        },
        author: { en: "dr. Jernej Jan Kočica", sl: "dr. Jernej Jan Kočica" },
        role: { en: "CTO, SpaceGuardian", sl: "CTO, SpaceGuardian" },
        pdfUrl: "/izjava-podpore-jernej.pdf",
        photo: "/jernejjankocica.jpeg",
      },
      {
        quote: {
          en: "I have worked with Luka for over 5 years and he consistently surprises me with the ambition and effort he puts into achieving results. As a true entrepreneur, he takes on many roles, from sales and entrepreneurial thinking, to coaching colleagues, to deep-tech development, which is not only his profession but also his great passion. I can hardly imagine a better candidate for the title of AmCham Top Potential 2026.",
          sl: "Z Luko delam že preko 5 let in vsakič me preseneti z ambicioznostjo in trudom, ki ga vlaga v doseganje rezultatov. Kot pravi podjetnik se preizkuša v mnogo vlogah, od same prodaje in podjetnega razmišljanja, coachinga sodelavcev do deep-tech razvoja, ki je ne samo njegov poklic ampak tudi velika strast. Težko si predstavljam boljšega kandidata za naziv AmCham Top Potencial leta 2026.",
        },
        author: { en: "Rok Lenardič", sl: "Rok Lenardič" },
        role: { en: "CEO, Indigo Labs", sl: "CEO, Indigo Labs" },
        pdfUrl: "/izjava-podpore-rok.pdf",
        photo: "/roklenardic.jpeg",
      },
      {
        quote: {
          en: "What impresses me most about Luka is the combination of curiosity and responsibility. He thinks carefully and structurally, even in demanding situations, which means his solutions are not only effective but also lasting. This builds trust with the people he works with. Beyond his expertise, Luka is distinguished by his willingness to share knowledge and help others, opening new perspectives and encouraging higher-level thinking. I am convinced that Luka, with his knowledge, integrity and way of thinking, represents a profile of an individual who can make a significant contribution to the development of the environment in which he operates.",
          sl: "Pri Luki me vedno znova navdušuje kombinacija radovednosti in odgovornosti. Pri sodelovanju z njim hitro opaziš, da razmišlja premišljeno in strukturirano, tudi v zahtevnih situacijah. Prav zato njegove rešitve niso le učinkovite, ampak tudi trajne. Tak pristop ustvarja zaupanje pri ljudeh, s katerimi sodeluje. Poleg strokovnosti Luko odlikuje tudi pripravljenost deliti znanje in pomagati drugim. Prepričan sem, da Luka s svojim znanjem, integriteto in načinom razmišljanja predstavlja profil posameznika, ki lahko pomembno prispeva k razvoju okolja, v katerem deluje.",
        },
        author: { en: "dr. Janez Lapajne", sl: "dr. Janez Lapajne" },
        role: {
          en: "Head of AI, SpaceGuardian",
          sl: "Head of AI, SpaceGuardian",
        },
        pdfUrl: "/izjava-podpore-janez.pdf",
        photo: "/janezlapajne.jpeg",
      },
    ],
  },
  amchamSection: {
    title: { en: "My AmCham journey", sl: "Moja pot z AmCham" },
    introLabel: { en: "How it started", sl: "Kako se je začelo" },
    intro: {
      en: "I joined AmCham with Indigo Labs in 2025 and quickly found my way into AmCham Young. The community, the conversations, and the energy of people who are genuinely trying to move things forward. It has been one of the most valuable environments I have been part of. I've included a video from when it all started.",
      sl: "Z Indigo Labs sem se pridružil AmCham leta 2025 in se kmalu vključil v AmCham Young. Skupnost, pogovori in energija ljudi, ki resnično želijo premikati stvari naprej. To je eno najbolj dragocenih okolij, katerih del sem bil. Prilagam video iz teh začetkov.",
    },
    contributionsLabel: {
      en: "Where I see my role",
      sl: "Kje vidim svojo vlogo",
    },
    snowballBadge: {
      en: "AmCham YOUng · Snowball",
      sl: "AmCham YOUng · Snowball",
    },
    snowballDesc: {
      en: "Slovenia3000 is something I started with a few friends, a small platform for long-term national thinking beyond political cycles. It is early and still finding its shape, but I would love to bring it into Snowball's conversations as one possible step toward giving this kind of thinking a more structured digital home.",
      sl: "Slovenija 3000 sem začel z nekaj prijatelji, majhna platforma za dolgoročno nacionalno razmišljanje onkraj političnih ciklov. Je zgodnja in še išče svojo obliko, in jo bi rad vnesel v pogovore Snowball kot en možen korak k temu, da bi tovrstno razmišljanje dobilo bolj strukturirano digitalno prisotnost.",
    },
    ready4dBadge: { en: "Advocacy", sl: "Zagovorništvo" },
    ready4dDesc: {
      en: "As co-founder of SpaceGuardian and a builder of AI systems, I bring a practitioner's perspective to policy and strategy conversations about the technologies defining Slovenia's next decade. I want to help the Ready 4D Future committee move from observation to action: how do we attract AI talent, shape regulation that enables rather than blocks innovation, and position Slovenian deep-tech as a contributor rather than a follower in European tech policy.",
      sl: "Kot soustanovitelj SpaceGuardian in graditelj AI sistemov prinašam perspektivo praktika v razprave o politiki in strategiji za tehnologije, ki bodo določale naslednje desetletje v Sloveniji. Komisiji Ready 4D Future želim pomagati preiti od opazovanja k ukrepanju: kako privabiti AI talent, oblikovati regulacijo, ki inovacije omogoča namesto zavira, in postaviti slovenski deep-tech kot sooblikovalca, ne sledilca evropske tehnološke politike.",
    },
    delegationBadge: {
      en: "International Collaboration",
      sl: "Mednarodno sodelovanje",
    },
    delegationDesc: {
      en: "I was part of Startup Overseas 2025: Colorado, USA. Seeing how much preparation determines the outcome, I want to help early-stage startups make the most of these delegations: know their story before they land, understand the market context, be ready to pitch to a local audience, and leave with a follow-up plan that has real outcomes attached.",
      sl: "Bil sem del Startup Overseas 2025: Kolorado, ZDA. Ker sem videl, kako odločilna je priprava, želim startupom pomagati izkoristiti delegacije: poznati svojo zgodbo pred pristakom, razumeti tržni kontekst, biti pripravljeni za predstavitev pred lokalnim trgom in imeti načrt nadaljnjih korakov z jasnimi rezultati.",
    },
    mentorBadge: { en: "AmCham YOUng", sl: "AmCham YOUng" },
    mentorDesc: {
      en: "I would love to become a mentor to a young startup entrepreneur through AmCham's Mentor Program. Sharing what I've learned building Indigo Labs and SpaceGuardian: from team dynamics and product development to navigating uncertainty and finding the right investors.",
      sl: "Rad bi postal mentor mlademu startup podjetniku v okviru programa AmCham Mentor. Delil bi, kar sem se naučil pri gradnji Indigo Labs in SpaceGuardian: od dinamike ekip in razvoja produktov do navigacije negotovosti in iskanja pravih investitorjev.",
    },
    statementLabel: {
      en: "Read my written statement",
      sl: "Preberi mojo pisno izjavo",
    },
    statementTitle: {
      en: "My role and contribution",
      sl: "Moja vloga in prispevek",
    },
    statement: {
      en: "I will contribute across four AmCham areas. Through Snowball, I want to bring Slovenia3000 into the conversation as a small platform for long-term national thinking beyond political cycles. In Ready 4D Future, as co-founder of SpaceGuardian and a builder of AI systems, I will bring a practitioner's perspective to AI governance and deep-tech policy, helping the committee move from observation to concrete action. Having been part of Startup Overseas 2025 in Colorado, I saw first-hand how much preparation shapes outcomes. I want to help early-stage startups know their story before they land, read the market, and leave with a follow-up plan that actually converts. Through the AmCham Mentor program, I would love to share what I have learned building two companies with a young startup entrepreneur, from team dynamics and early product decisions to navigating uncertainty. I also plan to join the Young Leaders Club as the longer-term part of my AmCham journey.",
      sl: "Prispeval bom na štirih področjih AmCham. Prek Snowball želim vpeljati Slovenija 3000 v pogovor kot majhno platformo za dolgoročno nacionalno razmišljanje onkraj političnih ciklov. V Ready 4D Future bom prispeval perspektivo praktika k urejanju AI in deep-tech politike ter komisiji pomagal preiti od opazovanja k dejanskim ukrepom. Ker sem bil del Startup Overseas 2025 v Koloradu, sem iz prve roke videl, kako odločilna je priprava. Startupom želim pomagati, da poznajo svojo zgodbo pred pristakom, razumejo trg in odidejo z načrtom, ki dejansko vodi do rezultatov. Prek programa AmCham Mentor bi rad delil izkušnje gradnje dveh podjetij z mladim startup podjetnikom, od dinamike ekipe in prvih produktnih odločitev do navigacije negotovosti. Načrtujem tudi pridružitev Young Leaders Club kot dolgoročni del moje poti z AmCham.",
    },
  },
  cta: {
    title: {
      en: "Let's build what comes next.",
      sl: "Zgradimo, kar pride naslednje.",
    },
    cv: { en: "Download CV", sl: "Prenesi življenjepis" },
    linkedin: { en: "Connect on LinkedIn", sl: "Povezi se na LinkedIn" },
  },
  personal: {
    text: {
      en: "I believe leadership is not about position. It is about creating environments where great people can do their best work and where technology creates meaningful progress for society. This is the impact I want to scale through AmCham.",
      sl: "Verjamem, da vodenje ni vprašanje pozicije. Gre za ustvarjanje okolij, kjer lahko odlični ljudje opravijo svoje najboljše delo in kjer tehnologija ustvarja smiseln napredek za družbo. To je vpliv, ki ga želim skalirati skozi AmCham.",
    },
  },
  beyondWork: {
    title: {
      en: "Beyond work",
      sl: "Onkraj dela",
    },
    intro: {
      en: "Above everything else, I am a father. That shapes how I think about the future: not in quarters, but in generations.",
      sl: "Nad vsem drugim sem oče. To oblikuje moj pogled na prihodnost: ne v četrtletjih, ampak v generacijah.",
    },
    hobbies: [
      {
        title: { en: "Badminton", sl: "Badminton" },
        desc: {
          en: "Competitive spirit, strategic thinking",
          sl: "Tekmovalni duh, strateško razmišljanje",
        },
        icon: "badminton",
      },
      {
        title: { en: "Rubik's cubes", sl: "Rubikove kocke" },
        desc: {
          en: "Pattern recognition, algorithmic problem solving",
          sl: "Prepoznavanje vzorcev, algoritmično reševanje",
        },
        icon: "cube",
      },
      {
        title: { en: "Math olympiads", sl: "Matematične olimpijade" },
        desc: {
          en: "Analytical depth, creative proofs",
          sl: "Analitična globina, kreativni dokazi",
        },
        icon: "math",
      },
      {
        title: { en: "Piano", sl: "Klavir" },
        desc: {
          en: "Discipline, expression, patience",
          sl: "Disciplina, izražanje, potrpežljivost",
        },
        icon: "piano",
      },
    ],
    slovenia3000: {
      title: { en: "Slovenia 3000", sl: "Slovenija 3000" },
      desc: {
        en: "Long-term national thinking rarely finds a home outside of political cycles. Slovenia 3000 is a side project I started with friends, a simple online space for exploring the question: where could Slovenia be in 50, 100, or 1000 years? Nothing more ambitious than starting a conversation worth having.",
        sl: "Dolgoročno razmišljanje o prihodnosti redko najde dom izven političnih ciklov. Slovenija 3000 je stranski projekt, ki sem ga začel s prijatelji, preprost spletni prostor za raziskovanje vprašanja: kje bi lahko bila Slovenija čez 50, 100 ali 1000 let? Nič bolj ambicioznega kot začeti pogovor, ki se ga splača imeti.",
      },
      url: "https://slovenia3000.si",
    },
  },
  nav: {
    journey: { en: "The Story", sl: "Zgodba" },
    companies: { en: "What I Build", sl: "Kaj gradim" },
    leadership: { en: "On Stage", sl: "Na odru" },
    testimonials: { en: "Testimonials", sl: "Mnenja" },
    beyond: { en: "Personal", sl: "Osebno" },
    amcham: { en: "AmCham", sl: "AmCham" },
    contact: { en: "Contact", sl: "Kontakt" },
  },
} as const
