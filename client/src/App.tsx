import React, { useEffect, useState, ChangeEvent } from 'react';
import { Navbar } from './components/Navbar/Navbar';
import { Searchbar } from './components/Searchbar/Searchbar';
import { MovieCarousel } from './components/MovieCarousel/MovieCarousel';
import { Signin } from './components/Signin/Signin';
import { Signup } from './components/Signup/Signup';
import { Footer } from './components/Footer/Footer';
import axios from 'axios';
import './App.css';
interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
}

const newReleases = [
  {
    adult: false,
    backdrop_path: '/oqP1qEZccq5AD9TVTIaO6IGUj7o.jpg',
    genre_ids: [14, 28, 12],
    id: 455476,
    original_language: 'en',
    original_title: 'Knights of the Zodiac',
    overview:
      'When a headstrong street orphan, Seiya, in search of his abducted sister unwittingly taps into hidden powers, he discovers he might be the only person alive who can protect a reincarnated goddess, sent to watch over humanity. Can he let his past go and embrace his destiny to become a Knight of the Zodiac?',
    popularity: 3355.755,
    poster_path: '/qW4crfED8mpNDadSmMdi7ZDzhXF.jpg',
    release_date: '2023-04-27',
    title: 'Knights of the Zodiac',
    video: false,
    vote_average: 6.5,
    vote_count: 301,
  },
  {
    adult: false,
    backdrop_path: '/wRxLAw4l17LqiFcPLkobriPTZAw.jpg',
    genre_ids: [28, 53],
    id: 697843,
    original_language: 'en',
    original_title: 'Extraction 2',
    overview:
      "Tasked with extracting a family who is at the mercy of a Georgian gangster, Tyler Rake infiltrates one of the world's deadliest prisons in order to save them. But when the extraction gets hot, and the gangster dies in the heat of battle, his equally ruthless brother tracks down Rake and his team to Vienna, in order to get revenge.",
    popularity: 1422.453,
    poster_path: '/7gKI9hpEMcZUQpNgKrkDzJpbnNS.jpg',
    release_date: '2023-06-09',
    title: 'Extraction 2',
    video: false,
    vote_average: 7.6,
    vote_count: 1168,
  },
  {
    adult: false,
    backdrop_path: '/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg',
    genre_ids: [28, 12, 16, 878],
    id: 569094,
    original_language: 'en',
    original_title: 'Spider-Man: Across the Spider-Verse',
    overview:
      'After reuniting with Gwen Stacy, Brooklyn’s full-time, friendly neighborhood Spider-Man is catapulted across the Multiverse, where he encounters the Spider Society, a team of Spider-People charged with protecting the Multiverse’s very existence. But when the heroes clash on how to handle a new threat, Miles finds himself pitted against the other Spiders and must set out on his own to save those he loves most.',
    popularity: 1542.139,
    poster_path: '/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg',
    release_date: '2023-05-31',
    title: 'Spider-Man: Across the Spider-Verse',
    video: false,
    vote_average: 8.5,
    vote_count: 2026,
  },
  {
    adult: false,
    backdrop_path: '/woJbg7ZqidhpvqFGGMRhWQNoxwa.jpg',
    genre_ids: [28, 12, 878],
    id: 667538,
    original_language: 'en',
    original_title: 'Transformers: Rise of the Beasts',
    overview:
      'When a new threat capable of destroying the entire planet emerges, Optimus Prime and the Autobots must team up with a powerful faction known as the Maximals. With the fate of humanity hanging in the balance, humans Noah and Elena will do whatever it takes to help the Transformers as they engage in the ultimate battle to save Earth.',
    popularity: 1301.343,
    poster_path: '/gPbM0MK8CP8A174rmUwGsADNYKD.jpg',
    release_date: '2023-06-06',
    title: 'Transformers: Rise of the Beasts',
    video: false,
    vote_average: 7.3,
    vote_count: 564,
  },
  {
    adult: false,
    backdrop_path: '/9n2tJBplPbgR2ca05hS5CKXwP2c.jpg',
    genre_ids: [16, 10751, 12, 14, 35],
    id: 502356,
    original_language: 'en',
    original_title: 'The Super Mario Bros. Movie',
    overview:
      'While working underground to fix a water main, Brooklyn plumbers—and brothers—Mario and Luigi are transported down a mysterious pipe and wander into a magical new world. But when the brothers are separated, Mario embarks on an epic quest to find Luigi.',
    popularity: 1256.912,
    poster_path: '/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg',
    release_date: '2023-04-05',
    title: 'The Super Mario Bros. Movie',
    video: false,
    vote_average: 7.8,
    vote_count: 5398,
  },
  {
    adult: false,
    backdrop_path: '/cSYLX73WskxCgvpN3MtRkYUSj1T.jpg',
    genre_ids: [16, 35, 10751, 14, 10749, 18],
    id: 976573,
    original_language: 'en',
    original_title: 'Elemental',
    overview:
      'In a city where fire, water, land and air residents live together, a fiery young woman and a go-with-the-flow guy will discover something elemental: how much they have in common.',
    popularity: 1072.694,
    poster_path: '/8riWcADI1ekEiBguVB9vkilhiQm.jpg',
    release_date: '2023-06-14',
    title: 'Elemental',
    video: false,
    vote_average: 7.5,
    vote_count: 333,
  },
  {
    adult: false,
    backdrop_path: '/osnvZffaZymubHiBkOsIFd8Y3Re.jpg',
    genre_ids: [28, 27, 53],
    id: 986070,
    original_language: 'en',
    original_title: 'The Wrath of Becky',
    overview:
      'Two years after she escaped a violent attack on her family, 16-year-old Becky attempts to rebuild her life in the care of an older woman -- a kindred spirit named Elena. However, when a violent group known as the Noble Men break into their home, attack them and take their beloved dog, Becky must return to her old ways to protect herself and her loved ones.',
    popularity: 759.396,
    poster_path: '/3LShl6EwqptKIVq6NWOZ0FbZHEe.jpg',
    release_date: '2023-05-26',
    title: 'The Wrath of Becky',
    video: false,
    vote_average: 6.8,
    vote_count: 65,
  },
  {
    adult: false,
    backdrop_path: '/yF1eOkaYvwiORauRCPWznV9xVvi.jpg',
    genre_ids: [878, 28, 12],
    id: 298618,
    original_language: 'en',
    original_title: 'The Flash',
    overview:
      "When his attempt to save his family inadvertently alters the future, Barry Allen becomes trapped in a reality in which General Zod has returned and there are no Super Heroes to turn to. In order to save the world that he is in and return to the future that he knows, Barry's only hope is to race for his life. But will making the ultimate sacrifice be enough to reset the universe?",
    popularity: 786.283,
    poster_path: '/rktDFPbfHfUbArZ6OOOKsXcv0Bm.jpg',
    release_date: '2023-06-13',
    title: 'The Flash',
    video: false,
    vote_average: 6.7,
    vote_count: 733,
  },
  {
    adult: false,
    backdrop_path: '/8FhKnPpql374qyyHAkZDld93IUw.jpg',
    genre_ids: [9648, 53, 878],
    id: 536437,
    original_language: 'en',
    original_title: 'Hypnotic',
    overview:
      'A detective becomes entangled in a mystery involving his missing daughter and a secret government program while investigating a string of reality-bending crimes.',
    popularity: 760.613,
    poster_path: '/3IhGkkalwXguTlceGSl8XUJZOVI.jpg',
    release_date: '2023-05-11',
    title: 'Hypnotic',
    video: false,
    vote_average: 6.3,
    vote_count: 281,
  },
  {
    adult: false,
    backdrop_path: '/lQzSMhkAl90iXPirjnLbRHkxApC.jpg',
    genre_ids: [27],
    id: 917007,
    original_language: 'en',
    original_title: 'Bed Rest',
    overview:
      "A pregnant woman on bed rest begins to wonder if her house is haunted or if it's all in her head.",
    popularity: 732.221,
    poster_path: '/tiZF8b9T9fMcwvsEEkJ5ik1wCnV.jpg',
    release_date: '2022-12-08',
    title: 'Bed Rest',
    video: false,
    vote_average: 6.7,
    vote_count: 71,
  },
  {
    adult: false,
    backdrop_path: '/35z8hWuzfFUZQaYog8E9LsXW3iI.jpg',
    genre_ids: [12, 28, 14],
    id: 335977,
    original_language: 'en',
    original_title: 'Indiana Jones and the Dial of Destiny',
    overview:
      "Finding himself in a new era, approaching retirement, Indy wrestles with fitting into a world that seems to have outgrown him. But as the tentacles of an all-too-familiar evil return in the form of an old rival, Indy must don his hat and pick up his whip once more to make sure an ancient and powerful artifact doesn't fall into the wrong hands.",
    popularity: 740.388,
    poster_path: '/Af4bXE63pVsb2FtbW8uYIyPBadD.jpg',
    release_date: '2023-06-28',
    title: 'Indiana Jones and the Dial of Destiny',
    video: false,
    vote_average: 6.5,
    vote_count: 422,
  },
  {
    adult: false,
    backdrop_path: '/fCw8CVgII6W7ALbIh0SgXax3Hsj.jpg',
    genre_ids: [12, 10751, 14, 10749],
    id: 447277,
    original_language: 'en',
    original_title: 'The Little Mermaid',
    overview:
      'The youngest of King Triton’s daughters, and the most defiant, Ariel longs to find out more about the world beyond the sea, and while visiting the surface, falls for the dashing Prince Eric. With mermaids forbidden to interact with humans, Ariel makes a deal with the evil sea witch, Ursula, which gives her a chance to experience life on land, but ultimately places her life – and her father’s crown – in jeopardy.',
    popularity: 675.554,
    poster_path: '/ym1dxyOk4jFcSl4Q2zmRrA5BEEN.jpg',
    release_date: '2023-05-18',
    title: 'The Little Mermaid',
    video: false,
    vote_average: 6.3,
    vote_count: 832,
  },
  {
    adult: false,
    backdrop_path: '/eTvN54pd83TrSEOz6wbsXEJktCV.jpg',
    genre_ids: [10752, 28, 53],
    id: 882569,
    original_language: 'en',
    original_title: "Guy Ritchie's The Covenant",
    overview:
      'During the war in Afghanistan, a local interpreter risks his own life to carry an injured sergeant across miles of grueling terrain.',
    popularity: 544.105,
    poster_path: '/kVG8zFFYrpyYLoHChuEeOGAd6Ru.jpg',
    release_date: '2023-04-19',
    title: "Guy Ritchie's The Covenant",
    video: false,
    vote_average: 7.8,
    vote_count: 934,
  },
  {
    adult: false,
    backdrop_path: '/9t0tJXcOdWwwxmGTk112HGDaT0Q.jpg',
    genre_ids: [27, 53],
    id: 890771,
    original_language: 'en',
    original_title: 'The Black Demon',
    overview:
      "Oilman Paul Sturges' idyllic family vacation turns into a nightmare when they encounter a ferocious megalodon shark that will stop at nothing to protect its territory. Stranded and under constant attack, Paul and his family must somehow find a way to get his family back to shore alive before it strikes again in this epic battle between humans and nature.",
    popularity: 545.26,
    poster_path: '/uiFcFIjig0YwyNmhoxkxtAAVIL2.jpg',
    release_date: '2023-04-26',
    title: 'The Black Demon',
    video: false,
    vote_average: 6.2,
    vote_count: 263,
  },
  {
    adult: false,
    backdrop_path: '/o9bbojtrrpl0yriiTmzC3Lp3OhA.jpg',
    genre_ids: [28, 10752],
    id: 840326,
    original_language: 'fi',
    original_title: 'Sisu',
    overview:
      'Deep in the wilderness of Lapland, Aatami Korpi is searching for gold but after he stumbles upon Nazi patrol, a breathtaking and gold-hungry chase through the destroyed and mined Lapland wilderness begins.',
    popularity: 520.792,
    poster_path: '/ygO9lowFMXWymATCrhoQXd6gCEh.jpg',
    release_date: '2023-01-27',
    title: 'Sisu',
    video: false,
    vote_average: 7.5,
    vote_count: 889,
  },
  {
    adult: false,
    backdrop_path: '/jOkXeuLo4MBMpeoMa1ClAfTkxuI.jpg',
    genre_ids: [27, 9648, 53],
    id: 614479,
    original_language: 'en',
    original_title: 'Insidious: The Red Door',
    overview:
      "To put their demons to rest once and for all, Josh Lambert and a college-aged Dalton Lambert must go deeper into The Further than ever before, facing their family's dark past and a host of new and more horrifying terrors that lurk behind the red door.",
    popularity: 488.646,
    poster_path: '/azTC5osYiqei1ofw6Z3GmUrxQbi.jpg',
    release_date: '2023-07-05',
    title: 'Insidious: The Red Door',
    video: false,
    vote_average: 6.5,
    vote_count: 14,
  },
  {
    adult: false,
    backdrop_path: '/cKE9qZqYtF4jimf0GFOqKfy7NEU.jpg',
    genre_ids: [35, 10749],
    id: 884605,
    original_language: 'en',
    original_title: 'No Hard Feelings',
    overview:
      'On the brink of losing her childhood home, Maddie discovers an intriguing job listing: wealthy helicopter parents looking for someone to “date” their introverted 19-year-old son, Percy, before he leaves for college. To her surprise, Maddie soon discovers the awkward Percy is no sure thing.',
    popularity: 417.982,
    poster_path: '/5xeNPGbM8ImVdJACUoGpXT8Pxx3.jpg',
    release_date: '2023-06-15',
    title: 'No Hard Feelings',
    video: false,
    vote_average: 6.5,
    vote_count: 137,
  },
  {
    adult: false,
    backdrop_path: '/euO884625eFLfKLoc0MtFs5QiOS.jpg',
    genre_ids: [9648, 53, 28],
    id: 1070802,
    original_language: 'en',
    original_title: 'Confidential Informant',
    overview:
      'During a crack epidemic two narcotics agents hunting for a cop killer. Hoping for leads, Moran and Thorton pay off a junkie informant. To provide for his wife and son, Moran involves the stool pigeon in a deadly scheme. This causes the partners to come under the scrutiny of a suspicious internal affairs agent.',
    popularity: 408.062,
    poster_path: '/kCyAyqF6TKylJFuddaHtqq20b62.jpg',
    release_date: '2023-06-27',
    title: 'Confidential Informant',
    video: false,
    vote_average: 6.4,
    vote_count: 16,
  },
  {
    adult: false,
    backdrop_path: '/ajIgkZtZ2mme1vYbrfKSV2ddOuq.jpg',
    genre_ids: [27],
    id: 1083858,
    original_language: 'en',
    original_title: 'The Angry Black Girl and Her Monster',
    overview:
      'Vicaria is a brilliant teenager who believes death is a disease that can be cured. After the brutal and sudden murder of her brother, she embarks on a dangerous journey to bring him back to life.',
    popularity: 377.425,
    poster_path: '/4c3rU9R5oYexKFWaAHAc195B0RN.jpg',
    release_date: '2023-06-09',
    title: 'The Angry Black Girl and Her Monster',
    video: false,
    vote_average: 6.7,
    vote_count: 9,
  },
  {
    adult: false,
    backdrop_path: '/rogeBJK44LtWynOqzMFmEF30T80.jpg',
    genre_ids: [16, 14, 28, 12],
    id: 812225,
    original_language: 'ja',
    original_title: '映画 ブラッククローバー 魔法帝の剣',
    overview:
      'As a lionhearted boy who can’t wield magic strives for the title of Wizard King, four banished Wizard Kings of yore return to crush the Clover Kingdom.',
    popularity: 336.12,
    poster_path: '/9YEGawvjaRgnyW6QVcUhFJPFDco.jpg',
    release_date: '2023-06-16',
    title: 'Black Clover: Sword of the Wizard King',
    video: false,
    vote_average: 8.4,
    vote_count: 148,
  },
];

const topRated = [
  {
    adult: false,
    backdrop_path: '/tmU7GeKVybMWFButWEGl2M4GeiP.jpg',
    genre_ids: [18, 80],
    id: 238,
    original_language: 'en',
    original_title: 'The Godfather',
    overview:
      'Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers, launching a campaign of bloody revenge.',
    popularity: 110.136,
    poster_path: '/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
    release_date: '1972-03-14',
    title: 'The Godfather',
    video: false,
    vote_average: 8.7,
    vote_count: 18170,
  },
  {
    adult: false,
    backdrop_path: '/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg',
    genre_ids: [18, 80],
    id: 278,
    original_language: 'en',
    original_title: 'The Shawshank Redemption',
    overview:
      'Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates -- including an older prisoner named Red -- for his integrity and unquenchable sense of hope.',
    popularity: 85.15,
    poster_path: '/lyQBXzOQSuE59IsHyhrp0qIiPAz.jpg',
    release_date: '1994-09-23',
    title: 'The Shawshank Redemption',
    video: false,
    vote_average: 8.7,
    vote_count: 24057,
  },
  {
    adult: false,
    backdrop_path: '/kGzFbGhp99zva6oZODW5atUtnqi.jpg',
    genre_ids: [18, 80],
    id: 240,
    original_language: 'en',
    original_title: 'The Godfather Part II',
    overview:
      'In the continuing saga of the Corleone crime family, a young Vito Corleone grows up in Sicily and in 1910s New York. In the 1950s, Michael Corleone attempts to expand the family business into Las Vegas, Hollywood and Cuba.',
    popularity: 61.324,
    poster_path: '/bMadFzhjy9T7R8J48QGq1ngWNAK.jpg',
    release_date: '1974-12-20',
    title: 'The Godfather Part II',
    video: false,
    vote_average: 8.6,
    vote_count: 10966,
  },
  {
    adult: false,
    backdrop_path: '/vI3aUGTuRRdM7J78KIdW98LdxE5.jpg',
    genre_ids: [35, 18, 10749],
    id: 19404,
    original_language: 'hi',
    original_title: 'दिलवाले दुल्हनिया ले जायेंगे',
    overview:
      'Raj is a rich, carefree, happy-go-lucky second generation NRI. Simran is the daughter of Chaudhary Baldev Singh, who in spite of being an NRI is very strict about adherence to Indian values. Simran has left for India to be married to her childhood fiancé. Raj leaves for India with a mission at his hands, to claim his lady love under the noses of her whole family. Thus begins a saga.',
    popularity: 28.548,
    poster_path: '/ktejodbcdCPXbMMdnpI9BUxW6O8.jpg',
    release_date: '1995-10-20',
    title: 'Dilwale Dulhania Le Jayenge',
    video: false,
    vote_average: 8.6,
    vote_count: 4160,
  },
  {
    adult: false,
    backdrop_path: '/zb6fM1CX41D9rF9hdgclu0peUmy.jpg',
    genre_ids: [18, 36, 10752],
    id: 424,
    original_language: 'en',
    original_title: "Schindler's List",
    overview:
      'The true story of how businessman Oskar Schindler saved over a thousand Jewish lives from the Nazis while they worked as slaves in his factory during World War II.',
    popularity: 47.065,
    poster_path: '/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg',
    release_date: '1993-12-15',
    title: "Schindler's List",
    video: false,
    vote_average: 8.6,
    vote_count: 14220,
  },
  {
    adult: false,
    backdrop_path: '/qqHQsStV6exghCM7zbObuYBiYxw.jpg',
    genre_ids: [18],
    id: 389,
    original_language: 'en',
    original_title: '12 Angry Men',
    overview:
      "The defense and the prosecution have rested and the jury is filing into the jury room to decide if a young Spanish-American is guilty or innocent of murdering his father. What begins as an open and shut case soon becomes a mini-drama of each of the jurors' prejudices and preconceptions about the trial, the accused, and each other.",
    popularity: 37.372,
    poster_path: '/ow3wq89wM8qd5X7hWKxiRfsFf9C.jpg',
    release_date: '1957-04-10',
    title: '12 Angry Men',
    video: false,
    vote_average: 8.5,
    vote_count: 7375,
  },
  {
    adult: false,
    backdrop_path: '/Ab8mkHmkYADjU7wQiOkia9BzGvS.jpg',
    genre_ids: [16, 10751, 14],
    id: 129,
    original_language: 'ja',
    original_title: '千と千尋の神隠し',
    overview:
      'A young girl, Chihiro, becomes trapped in a strange new world of spirits. When her parents undergo a mysterious transformation, she must call upon the courage she never knew she had to free her family.',
    popularity: 70.133,
    poster_path: '/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg',
    release_date: '2001-07-20',
    title: 'Spirited Away',
    video: false,
    vote_average: 8.5,
    vote_count: 14499,
  },
  {
    adult: false,
    backdrop_path: '/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg',
    genre_ids: [28, 12, 16, 878],
    id: 569094,
    original_language: 'en',
    original_title: 'Spider-Man: Across the Spider-Verse',
    overview:
      'After reuniting with Gwen Stacy, Brooklyn’s full-time, friendly neighborhood Spider-Man is catapulted across the Multiverse, where he encounters the Spider Society, a team of Spider-People charged with protecting the Multiverse’s very existence. But when the heroes clash on how to handle a new threat, Miles finds himself pitted against the other Spiders and must set out on his own to save those he loves most.',
    popularity: 1542.139,
    poster_path: '/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg',
    release_date: '2023-05-31',
    title: 'Spider-Man: Across the Spider-Verse',
    video: false,
    vote_average: 8.5,
    vote_count: 2026,
  },
  {
    adult: false,
    backdrop_path: '/dIWwZW7dJJtqC6CgWzYkNVKIUm8.jpg',
    genre_ids: [10749, 16, 18],
    id: 372058,
    original_language: 'ja',
    original_title: '君の名は。',
    overview:
      'High schoolers Mitsuha and Taki are complete strangers living separate lives. But one night, they suddenly switch places. Mitsuha wakes up in Taki’s body, and he in hers. This bizarre occurrence continues to happen randomly, and the two must adjust their lives around each other.',
    popularity: 84.999,
    poster_path: '/q719jXXEzOoYaps6babgKnONONX.jpg',
    release_date: '2016-08-26',
    title: 'Your Name.',
    video: false,
    vote_average: 8.5,
    vote_count: 9985,
  },
  {
    adult: false,
    backdrop_path: '/hiKmpZMGZsrkA3cdce8a7Dpos1j.jpg',
    genre_ids: [35, 53, 18],
    id: 496243,
    original_language: 'ko',
    original_title: '기생충',
    overview:
      "All unemployed, Ki-taek's family takes peculiar interest in the wealthy and glamorous Parks for their livelihood until they get entangled in an unexpected incident.",
    popularity: 61.56,
    poster_path: '/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',
    release_date: '2019-05-30',
    title: 'Parasite',
    video: false,
    vote_average: 8.5,
    vote_count: 15943,
  },
  {
    adult: false,
    backdrop_path: '/l6hQWH9eDksNJNiXWYRkWqikOdu.jpg',
    genre_ids: [14, 18, 80],
    id: 497,
    original_language: 'en',
    original_title: 'The Green Mile',
    overview:
      "A supernatural tale set on death row in a Southern prison, where gentle giant John Coffey possesses the mysterious power to heal people's ailments. When the cell block's head guard, Paul Edgecomb, recognizes Coffey's miraculous gift, he tries desperately to help stave off the condemned man's execution.",
    popularity: 63.846,
    poster_path: '/o0lO84GI7qrG6XFvtsPOSV7CTNa.jpg',
    release_date: '1999-12-10',
    title: 'The Green Mile',
    video: false,
    vote_average: 8.5,
    vote_count: 15561,
  },
  {
    adult: false,
    backdrop_path: '/dqK9Hag1054tghRQSqLSfrkvQnA.jpg',
    genre_ids: [18, 28, 80, 53],
    id: 155,
    original_language: 'en',
    original_title: 'The Dark Knight',
    overview:
      'Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as the Joker.',
    popularity: 77.748,
    poster_path: '/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    release_date: '2008-07-14',
    title: 'The Dark Knight',
    video: false,
    vote_average: 8.5,
    vote_count: 29986,
  },
  {
    adult: false,
    backdrop_path: '/ejnlCzBd5pOGAYCpxC93NXSrdrz.jpg',
    genre_ids: [35, 14],
    id: 772071,
    original_language: 'es',
    original_title: 'Cuando Sea Joven',
    overview:
      '70-year-old Malena gets a second chance at life when she magically turns into her 22-year-old self. Now, posing as "Maria" to hide her true identity, she becomes the lead singer of her grandson\'s band and tries to recover her dream of singing, which she had to give up at some point.',
    popularity: 18.123,
    poster_path: '/6gIJuFHh5Lj4dNaPG3TzIMl7L68.jpg',
    release_date: '2022-09-14',
    title: 'Cuando Sea Joven',
    video: false,
    vote_average: 8.5,
    vote_count: 243,
  },
  {
    adult: false,
    backdrop_path: '/suaEOtk1N1sgg2MTM7oZd2cfVp3.jpg',
    genre_ids: [53, 80],
    id: 680,
    original_language: 'en',
    original_title: 'Pulp Fiction',
    overview:
      "A burger-loving hit man, his philosophical partner, a drug-addled gangster's moll and a washed-up boxer converge in this sprawling, comedic crime caper. Their adventures unfurl in three stories that ingeniously trip back and forth in time.",
    popularity: 70.294,
    poster_path: '/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg',
    release_date: '1994-09-10',
    title: 'Pulp Fiction',
    video: false,
    vote_average: 8.5,
    vote_count: 25380,
  },
  {
    adult: false,
    backdrop_path: '/qdIMHd4sEfJSckfVJfKQvisL02a.jpg',
    genre_ids: [35, 18, 10749],
    id: 13,
    original_language: 'en',
    original_title: 'Forrest Gump',
    overview:
      'A man with a low IQ has accomplished great things in his life and been present during significant historic events—in each case, far exceeding what anyone imagined he could do. But despite all he has achieved, his one true love eludes him.',
    popularity: 63.406,
    poster_path: '/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg',
    release_date: '1994-06-23',
    title: 'Forrest Gump',
    video: false,
    vote_average: 8.5,
    vote_count: 24897,
  },
  {
    adult: false,
    backdrop_path: '/eoCSp75lxatmIa6aGqfnzwtbttd.jpg',
    genre_ids: [37],
    id: 429,
    original_language: 'it',
    original_title: 'Il buono, il brutto, il cattivo',
    overview:
      'While the Civil War rages on between the Union and the Confederacy, three men – a quiet loner, a ruthless hitman, and a Mexican bandit – comb the American Southwest in search of a strongbox containing $200,000 in stolen gold.',
    popularity: 52.886,
    poster_path: '/bX2xnavhMYjWDoZp1VM6VnU1xwe.jpg',
    release_date: '1966-12-23',
    title: 'The Good, the Bad and the Ugly',
    video: false,
    vote_average: 8.5,
    vote_count: 7493,
  },
  {
    adult: false,
    backdrop_path: '/2u7zbn8EudG6kLlBzUYqP8RyFU4.jpg',
    genre_ids: [12, 14, 28],
    id: 122,
    original_language: 'en',
    original_title: 'The Lord of the Rings: The Return of the King',
    overview:
      "Aragorn is revealed as the heir to the ancient kings as he, Gandalf and the other members of the broken fellowship struggle to save Gondor from Sauron's forces. Meanwhile, Frodo and Sam take the ring closer to the heart of Mordor, the dark lord's realm.",
    popularity: 62.226,
    poster_path: '/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg',
    release_date: '2003-12-01',
    title: 'The Lord of the Rings: The Return of the King',
    video: false,
    vote_average: 8.5,
    vote_count: 21793,
  },
  {
    adult: false,
    backdrop_path: '/uBZQOYZLIU9dBmd62fdzBAoropu.jpg',
    genre_ids: [28, 12, 16, 18],
    id: 704264,
    original_language: 'en',
    original_title: 'Primal: Tales of Savagery',
    overview:
      "Genndy Tartakovsky's Primal: Tales of Savagery features a caveman and a dinosaur on the brink of extinction. Bonded by tragedy, this unlikely friendship becomes the only hope of survival.",
    popularity: 13.179,
    poster_path: '/9NBBkdxH0TjQEBSN2AzeE1sgsF9.jpg',
    release_date: '2019-11-21',
    title: 'Primal: Tales of Savagery',
    video: false,
    vote_average: 8.5,
    vote_count: 268,
  },
  {
    adult: false,
    backdrop_path: '/sw7mordbZxgITU877yTpZCud90M.jpg',
    genre_ids: [18, 80],
    id: 769,
    original_language: 'en',
    original_title: 'GoodFellas',
    overview:
      'The true story of Henry Hill, a half-Irish, half-Sicilian Brooklyn kid who is adopted by neighbourhood gangsters at an early age and climbs the ranks of a Mafia family under the guidance of Jimmy Conway.',
    popularity: 43.936,
    poster_path: '/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg',
    release_date: '1990-09-12',
    title: 'GoodFellas',
    video: false,
    vote_average: 8.5,
    vote_count: 11387,
  },
  {
    adult: false,
    backdrop_path: '/zoVeIgKzGJzpdG6Gwnr7iOYfIMU.jpg',
    genre_ids: [18, 10749],
    id: 11216,
    original_language: 'it',
    original_title: 'Nuovo Cinema Paradiso',
    overview:
      "A filmmaker recalls his childhood, when he fell in love with the movies at his village's theater and formed a deep friendship with the theater's projectionist.",
    popularity: 29.42,
    poster_path: '/8SRUfRUi6x4O68n0VCbDNRa6iGL.jpg',
    release_date: '1988-11-17',
    title: 'Cinema Paradiso',
    video: false,
    vote_average: 8.5,
    vote_count: 3800,
  },
];

const upcoming = [
  {
    adult: false,
    backdrop_path: '/oqP1qEZccq5AD9TVTIaO6IGUj7o.jpg',
    genre_ids: [14, 28, 12],
    id: 455476,
    original_language: 'en',
    original_title: 'Knights of the Zodiac',
    overview:
      'When a headstrong street orphan, Seiya, in search of his abducted sister unwittingly taps into hidden powers, he discovers he might be the only person alive who can protect a reincarnated goddess, sent to watch over humanity. Can he let his past go and embrace his destiny to become a Knight of the Zodiac?',
    popularity: 3355.755,
    poster_path: '/qW4crfED8mpNDadSmMdi7ZDzhXF.jpg',
    release_date: '2023-04-27',
    title: 'Knights of the Zodiac',
    video: false,
    vote_average: 6.5,
    vote_count: 301,
  },
  {
    adult: false,
    backdrop_path: '/cSYLX73WskxCgvpN3MtRkYUSj1T.jpg',
    genre_ids: [16, 35, 10751, 14, 10749, 18],
    id: 976573,
    original_language: 'en',
    original_title: 'Elemental',
    overview:
      'In a city where fire, water, land and air residents live together, a fiery young woman and a go-with-the-flow guy will discover something elemental: how much they have in common.',
    popularity: 1072.694,
    poster_path: '/8riWcADI1ekEiBguVB9vkilhiQm.jpg',
    release_date: '2023-06-14',
    title: 'Elemental',
    video: false,
    vote_average: 7.5,
    vote_count: 333,
  },
  {
    adult: false,
    backdrop_path: '/osnvZffaZymubHiBkOsIFd8Y3Re.jpg',
    genre_ids: [28, 27, 53],
    id: 986070,
    original_language: 'en',
    original_title: 'The Wrath of Becky',
    overview:
      'Two years after she escaped a violent attack on her family, 16-year-old Becky attempts to rebuild her life in the care of an older woman -- a kindred spirit named Elena. However, when a violent group known as the Noble Men break into their home, attack them and take their beloved dog, Becky must return to her old ways to protect herself and her loved ones.',
    popularity: 759.396,
    poster_path: '/3LShl6EwqptKIVq6NWOZ0FbZHEe.jpg',
    release_date: '2023-05-26',
    title: 'The Wrath of Becky',
    video: false,
    vote_average: 6.8,
    vote_count: 65,
  },
  {
    adult: false,
    backdrop_path: '/yF1eOkaYvwiORauRCPWznV9xVvi.jpg',
    genre_ids: [878, 28, 12],
    id: 298618,
    original_language: 'en',
    original_title: 'The Flash',
    overview:
      "When his attempt to save his family inadvertently alters the future, Barry Allen becomes trapped in a reality in which General Zod has returned and there are no Super Heroes to turn to. In order to save the world that he is in and return to the future that he knows, Barry's only hope is to race for his life. But will making the ultimate sacrifice be enough to reset the universe?",
    popularity: 786.283,
    poster_path: '/rktDFPbfHfUbArZ6OOOKsXcv0Bm.jpg',
    release_date: '2023-06-13',
    title: 'The Flash',
    video: false,
    vote_average: 6.7,
    vote_count: 733,
  },
  {
    adult: false,
    backdrop_path: '/lQzSMhkAl90iXPirjnLbRHkxApC.jpg',
    genre_ids: [27],
    id: 917007,
    original_language: 'en',
    original_title: 'Bed Rest',
    overview:
      "A pregnant woman on bed rest begins to wonder if her house is haunted or if it's all in her head.",
    popularity: 732.221,
    poster_path: '/tiZF8b9T9fMcwvsEEkJ5ik1wCnV.jpg',
    release_date: '2022-12-08',
    title: 'Bed Rest',
    video: false,
    vote_average: 6.7,
    vote_count: 71,
  },
  {
    adult: false,
    backdrop_path: '/o9bbojtrrpl0yriiTmzC3Lp3OhA.jpg',
    genre_ids: [28, 10752],
    id: 840326,
    original_language: 'fi',
    original_title: 'Sisu',
    overview:
      'Deep in the wilderness of Lapland, Aatami Korpi is searching for gold but after he stumbles upon Nazi patrol, a breathtaking and gold-hungry chase through the destroyed and mined Lapland wilderness begins.',
    popularity: 520.792,
    poster_path: '/ygO9lowFMXWymATCrhoQXd6gCEh.jpg',
    release_date: '2023-01-27',
    title: 'Sisu',
    video: false,
    vote_average: 7.5,
    vote_count: 889,
  },
  {
    adult: false,
    backdrop_path: '/jOkXeuLo4MBMpeoMa1ClAfTkxuI.jpg',
    genre_ids: [27, 9648, 53],
    id: 614479,
    original_language: 'en',
    original_title: 'Insidious: The Red Door',
    overview:
      "To put their demons to rest once and for all, Josh Lambert and a college-aged Dalton Lambert must go deeper into The Further than ever before, facing their family's dark past and a host of new and more horrifying terrors that lurk behind the red door.",
    popularity: 488.646,
    poster_path: '/azTC5osYiqei1ofw6Z3GmUrxQbi.jpg',
    release_date: '2023-07-05',
    title: 'Insidious: The Red Door',
    video: false,
    vote_average: 6.5,
    vote_count: 14,
  },
  {
    adult: false,
    backdrop_path: '/jQbnhNvFQXO7jwLzdrceCTspEeI.jpg',
    genre_ids: [35],
    id: 346698,
    original_language: 'en',
    original_title: 'Barbie',
    overview:
      'Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land. However, when they get a chance to go to the real world, they soon discover the joys and perils of living among humans.',
    popularity: 463.245,
    poster_path: '/cgYg04miVQUAG2FKk3amSnnHzOp.jpg',
    release_date: '2023-07-19',
    title: 'Barbie',
    video: false,
    vote_average: 0,
    vote_count: 0,
  },
  {
    adult: false,
    backdrop_path: '/4tdV5AeojEdbvn6VpeQrbuDlmzs.jpg',
    genre_ids: [16, 18, 12, 14],
    id: 916224,
    original_language: 'ja',
    original_title: 'すずめの戸締まり',
    overview:
      'Suzume, 17, lost her mother as a little girl. On her way to school, she meets a mysterious young man. But her curiosity unleashes a calamity that endangers the entire population of Japan, and so Suzume embarks on a journey to set things right.',
    popularity: 439.907,
    poster_path: '/vIeu8WysZrTSFb2uhPViKjX9EcC.jpg',
    release_date: '2022-11-11',
    title: 'Suzume',
    video: false,
    vote_average: 7.9,
    vote_count: 473,
  },
  {
    adult: false,
    backdrop_path: '/hiHGRbyTcbZoLsYYkO4QiCLYe34.jpg',
    genre_ids: [27, 53],
    id: 758323,
    original_language: 'en',
    original_title: "The Pope's Exorcist",
    overview:
      "Father Gabriele Amorth, Chief Exorcist of the Vatican, investigates a young boy's terrifying possession and ends up uncovering a centuries-old conspiracy the Vatican has desperately tried to keep hidden.",
    popularity: 453.83,
    poster_path: '/gNPqcv1tAifbN7PRNgqpzY8sEJZ.jpg',
    release_date: '2023-04-05',
    title: "The Pope's Exorcist",
    video: false,
    vote_average: 7.2,
    vote_count: 1533,
  },
  {
    adult: false,
    backdrop_path: '/cKE9qZqYtF4jimf0GFOqKfy7NEU.jpg',
    genre_ids: [35, 10749],
    id: 884605,
    original_language: 'en',
    original_title: 'No Hard Feelings',
    overview:
      'On the brink of losing her childhood home, Maddie discovers an intriguing job listing: wealthy helicopter parents looking for someone to “date” their introverted 19-year-old son, Percy, before he leaves for college. To her surprise, Maddie soon discovers the awkward Percy is no sure thing.',
    popularity: 417.982,
    poster_path: '/5xeNPGbM8ImVdJACUoGpXT8Pxx3.jpg',
    release_date: '2023-06-15',
    title: 'No Hard Feelings',
    video: false,
    vote_average: 6.5,
    vote_count: 137,
  },
  {
    adult: false,
    backdrop_path: '/7fN5rEBcRoylG3oZPZl1Qe6y7UV.jpg',
    genre_ids: [28, 12, 53],
    id: 575264,
    original_language: 'en',
    original_title: 'Mission: Impossible - Dead Reckoning Part One',
    overview:
      "Ethan Hunt and his IMF team embark on their most dangerous mission yet: To track down a terrifying new weapon that threatens all of humanity before it falls into the wrong hands. With control of the future and the fate of the world at stake, and dark forces from Ethan's past closing in, a deadly race around the globe begins. Confronted by a mysterious, all-powerful enemy, Ethan is forced to consider that nothing can matter more than his mission – not even the lives of those he cares about most.",
    popularity: 278.244,
    poster_path: '/NNxYkU70HPurnNCSiCjYAmacwm.jpg',
    release_date: '2023-07-08',
    title: 'Mission: Impossible - Dead Reckoning Part One',
    video: false,
    vote_average: 8.7,
    vote_count: 3,
  },
  {
    adult: false,
    backdrop_path: '/jAmmb9RApuRckDJtYWeOgBUgQyG.jpg',
    genre_ids: [16, 28, 14, 878],
    id: 893712,
    original_language: 'ja',
    original_title:
      '劇場版 ソードアート・オンライン -プログレッシブ- 冥き夕闇のスケルツォ',
    overview:
      'Over a month has passed since 10,000 users were trapped inside the "Sword Art Online" world. Asuna, who cleared the first floor of the floating iron castle of Aincrad, joined up with Kirito and continued her journey to reach the top floor. With the support of female Information Broker Argo, clearing the floors seemed to be progressing smoothly, but conflict erupts between two major guilds who should be working together – the top player groups ALS (the Aincrad Liberation Squad) and DKB (the Dragon Knights Brigade). And meanwhile, behind the scenes exists a mysterious figure pulling the strings…',
    popularity: 247.353,
    poster_path: '/2lEyzOq6ILNgBpLLpTRckQhbNNt.jpg',
    release_date: '2022-10-22',
    title: 'Sword Art Online the Movie -Progressive- Scherzo of Deep Night',
    video: false,
    vote_average: 7.6,
    vote_count: 93,
  },
  {
    adult: false,
    backdrop_path: '/ioCuhiUs0SW5UgembG0UiQZWPLY.jpg',
    genre_ids: [16, 10751, 14, 35],
    id: 1040148,
    original_language: 'en',
    original_title: 'Ruby Gillman, Teenage Kraken',
    overview:
      "A shy teenager discovers that she's part of a legendary royal lineage of mythical sea krakens and that her destiny, in the depths of the oceans, is bigger than she ever dreamed.",
    popularity: 240.166,
    poster_path: '/lotWiuWuTGlQ94rzBdy6ZmKZnTA.jpg',
    release_date: '2023-06-28',
    title: 'Ruby Gillman, Teenage Kraken',
    video: false,
    vote_average: 6.6,
    vote_count: 20,
  },
  {
    adult: false,
    backdrop_path: '/2iNUodSKykQ4VtvtG280ntNy7hB.jpg',
    genre_ids: [28, 878, 27],
    id: 615656,
    original_language: 'en',
    original_title: 'Meg 2: The Trench',
    overview:
      'An exploratory dive into the deepest depths of the ocean of a daring research team spirals into chaos when a malevolent mining operation threatens their mission and forces them into a high-stakes battle for survival.',
    popularity: 166.482,
    poster_path: '/uvYbo4eF3q6W06kpx5iDwC4jt6N.jpg',
    release_date: '2023-08-02',
    title: 'Meg 2: The Trench',
    video: false,
    vote_average: 0,
    vote_count: 0,
  },
  {
    adult: false,
    backdrop_path: '/c6Splshb8lb2Q9OvUfhpqXl7uP0.jpg',
    genre_ids: [28, 53],
    id: 717930,
    original_language: 'en',
    original_title: 'Kandahar',
    overview:
      'After his mission is exposed, an undercover CIA operative stuck deep in hostile territory in Afghanistan must fight his way out, alongside his Afghan translator, to an extraction point in Kandahar, all whilst avoiding elite enemy forces and foreign spies tasked with hunting them down.',
    popularity: 151.815,
    poster_path: '/lCanGgsqF4xD2WA5NF8PWeT3IXd.jpg',
    release_date: '2023-05-25',
    title: 'Kandahar',
    video: false,
    vote_average: 6.3,
    vote_count: 192,
  },
  {
    adult: false,
    backdrop_path: '/14GEZCzCGhV7FMFaWi4Ec22Kcai.jpg',
    genre_ids: [16, 12, 10751, 14],
    id: 459003,
    original_language: 'uk',
    original_title: 'Мавка: Лісова пісня',
    overview:
      'Mavka — a Soul of the Forest and its Warden — faces an impossible choice between love and her duty as guardian to the Heart of the Forest, when she falls in love with a human — the talented young musician Lukas.',
    popularity: 170.77,
    poster_path: '/eeJjd9JU2Mdj9d7nWRFLWlrcExi.jpg',
    release_date: '2023-03-02',
    title: 'Mavka: The Forest Song',
    video: false,
    vote_average: 7.1,
    vote_count: 46,
  },
  {
    adult: false,
    backdrop_path: '/baLw3zvl9R31Ocxh7uIpkk5cLVx.jpg',
    genre_ids: [10751, 14, 12],
    id: 893345,
    original_language: 'en',
    original_title: 'The Secret Kingdom',
    overview:
      "Verity and Peter’s trip to the old family mansion takes a turn when the floor of their room suddenly gives way and they fall into an underground chamber where they are met by a civilization of creatures. The leader tells them that Peter's arrival was foretold as he’s the one who can use Great Clock of the Citadel to restart time and destroy the Shroud, a malevolent creature who feeds on fear itself...",
    popularity: 121.762,
    poster_path: '/dteXMzVY53GBHUgrR7vigAartsP.jpg',
    release_date: '2023-04-27',
    title: 'The Secret Kingdom',
    video: false,
    vote_average: 6.7,
    vote_count: 28,
  },
  {
    adult: false,
    backdrop_path: '/3Rfvhy1Nl6sSGJwyjb0QiZzZYlB.jpg',
    genre_ids: [16, 12, 10751, 35],
    id: 862,
    original_language: 'en',
    original_title: 'Toy Story',
    overview:
      "Led by Woody, Andy's toys live happily in his room until Andy's birthday brings Buzz Lightyear onto the scene. Afraid of losing his place in Andy's heart, Woody plots against Buzz. But when circumstances separate Buzz and Woody from their owner, the duo eventually learns to put aside their differences.",
    popularity: 105.969,
    poster_path: '/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg',
    release_date: '1995-10-30',
    title: 'Toy Story',
    video: false,
    vote_average: 8,
    vote_count: 16846,
  },
  {
    adult: false,
    backdrop_path: '/9dZ52zOs91RMgjjORoMIi6VGNLr.jpg',
    genre_ids: [18, 36],
    id: 872585,
    original_language: 'en',
    original_title: 'Oppenheimer',
    overview:
      'The story of J. Robert Oppenheimer’s role in the development of the atomic bomb during World War II.',
    popularity: 108.422,
    poster_path: '/aqZ75oN6yd7UTShYIMNlpSdDbbH.jpg',
    release_date: '2023-07-19',
    title: 'Oppenheimer',
    video: false,
    vote_average: 0,
    vote_count: 0,
  },
];

const App: React.FC = () => {
  const [newReleasedMovies, setNewReleasedMovies] =
    useState<Movie[]>(newReleases);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>(topRated);
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>(upcoming);
  const [signInPage, setSignInPage] = useState(false);
  const [signUpPage, setSignUpPage] = useState(false);
  const [username, setUsername] = useState('');
  const [queryResult, setQueryResult] = useState<Movie[]>([]);
  const [queryString, setQueryString] = useState('');
  const [watchlistPage, setWatchlistPage] = useState(false);
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const [error, setError] = useState('');

  const handleWatchlist = async () => {
    setWatchlistPage(true);
    try {
      const response = await axios.get('http://localhost:8000/api/watchlist', {
        params: {
          username: username,
        },
      });
      setWatchlist(response.data.rows);
    } catch (error) {
      console.log(error);
      setError(error.response.data.error);
    }
  };

  const handleSignUpPage = () => {
    setSignUpPage(true);
    setSignInPage(false);
  };

  const handleSignInPage = async () => {
    setSignInPage(true);
    setSignUpPage(false);
  };

  const handleSignOut = () => {
    setUsername('');
    setWatchlistPage(false);
    setQueryResult([]);
    setQueryString('');
    localStorage.removeItem('username');
  };

  const handleGoToHomePage = () => {
    setSignInPage(false);
    setSignUpPage(false);
    setWatchlistPage(false);
  };

  const handleSetUsername = (username: string) => {
    setUsername(username);
    localStorage.setItem('username', username);
  };

  const handleSetQuery = (query: Movie[], queryString: string) => {
    setQueryResult(query);
    setQueryString(queryString);
    console.log(query);
  };

  const handleSetWatchlist = async (movie: Movie) => {
    if (watchlist.some(item => item.id === movie.id)) {
      try {
        await axios.delete('http://localhost:8000/api/watchlist', {
          params: {
            movieId: movie.id,
          },
        });
        setWatchlist(prev => prev.filter(item => item.id !== movie.id));
      } catch (error) {
        console.log(error);
        setError(error.response.data.error);
      }
    } else {
      try {
        await axios.post('http://localhost:8000/api/watchlist', {
          movie,
          username,
        });
        setWatchlist(prev => [...prev, movie]);
      } catch (error) {
        console.log(error);
        setError(error.response.data.error);
      }
    }
  };

  const getUsersWatchlist = async () => {};

  useEffect(() => {
    console.log(watchlist);
  }, [watchlist]);

  useEffect(() => {
    const user = localStorage.getItem('username');
    if (user) {
      setUsername(user);
    }
  }, []);

  // useEffect(() => {
  //   const fetchMovies = async () => {
  //     try {
  //       const newReleasesResponse = await axios.get<Movie[]>(
  //         'http://localhost:8000/api/new-releases',
  //       );
  //       const topRatedResponse = await axios.get<Movie[]>(
  //         'http://localhost:8000/api/top-rated',
  //       );
  //       const upcomingResponse = await axios.get<Movie[]>(
  //         'http://localhost:8000/api/upcoming',
  //       );
  //       setNewReleasedMovies(newReleasesResponse.data);
  //       setTopRatedMovies(topRatedResponse.data);
  //       setUpcomingMovies(upcomingResponse.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchMovies();
  // }, []);

  // console.log(newReleasedMovies);
  // console.log(topRatedMovies);
  // console.log(upcomingMovies);

  return (
    <>
      <Navbar
        handleSignInPage={handleSignInPage}
        handleSignUpPage={handleSignUpPage}
        handleGoToHomePage={handleGoToHomePage}
        handleSignOut={handleSignOut}
        username={username}
        handleWatchlist={handleWatchlist}
        getUsersWatchlist={getUsersWatchlist}
      />
      {!signInPage && !signUpPage && !watchlistPage && (
        <Searchbar handleSetQuery={handleSetQuery} username={username} />
      )}
      {!signInPage && !signUpPage && (
        <MovieCarousel
          topRatedMovies={topRatedMovies}
          newReleasedMovies={newReleasedMovies}
          upcomingMovies={upcomingMovies}
          username={username}
          queryResult={queryResult}
          queryString={queryString}
          handleSetWatchlist={handleSetWatchlist}
          watchlistPage={watchlistPage}
          watchlist={watchlist}
        />
      )}
      {signInPage && (
        <Signin
          handleSetUsername={handleSetUsername}
          handleGoToHomePage={handleGoToHomePage}
        />
      )}
      {signUpPage && (
        <Signup
          handleSetUsername={handleSetUsername}
          handleGoToHomePage={handleGoToHomePage}
        />
      )}

      <Footer />
    </>
  );
};

export default App;
