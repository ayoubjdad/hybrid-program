// Plan de course 12 semaines. {E},{T},{I},{M},{O10},{SEMI},{R200} = allures calculées
export const PH={Base:'Construire le moteur aérobie et habituer les tendons. Tout le monde veut aller vite : ici on court surtout lentement.',
 'Développement':'Plus de volume, fractionné plus long. Muscu : charges plus lourdes, fourchettes basses.',
 'Spécifique':'Travail à l\'allure objectif 10 km et semi. Muscu en maintien pour garder de la fraîcheur.',
 'Affûtage':'Volume réduit, intensité conservée. Semaine du test chrono.'};

export const W=[
 {ph:'Base',e:35,lds:0,q:['Fartlek 8 × 1′/1′','Échauffement 15′ {E} · 8 × (1′ vite à {I} / 1′ trot) · retour au calme 10′'],sl:[60,'']},
 {ph:'Base',e:40,lds:4,q:['Seuil 3 × 8′','Échauffement 15′ · 3 × 8′ à {T} (récup 2′ trot) · retour au calme 10′'],sl:[65,'']},
 {ph:'Base',e:40,lds:4,q:['VMA 6 × 800 m','Échauffement 15′ + 3 lignes droites · 6 × 800 m à {I} (récup 2′ trot) · retour au calme 10′'],sl:[70,'']},
 {ph:'Base',dl:1,e:30,lds:0,q:['Seuil 2 × 10′','Échauffement 15′ · 2 × 10′ à {T} (récup 3′) · retour au calme 10′'],sl:[55,'']},
 {ph:'Développement',e:45,lds:4,q:['VMA 5 × 1000 m','Échauffement 15′ · 5 × 1000 m à {I} (récup 2′30 trot) · retour au calme 10′'],sl:[75,'']},
 {ph:'Développement',e:45,lds:6,q:['Seuil 3 × 12′','Échauffement 15′ · 3 × 12′ à {T} (récup 2′) · retour au calme 10′'],sl:[80,'']},
 {ph:'Développement',e:45,lds:4,q:['VMA 6 × 1000 m','Échauffement 15′ · 6 × 1000 m à {I} (récup 2′) · retour au calme 10′'],sl:[85,'dont les 20 dernières minutes à {M}']},
 {ph:'Développement',dl:1,e:35,lds:0,q:['Seuil continu 20′','Échauffement 15′ · 20′ continu à {T} · retour au calme 10′'],sl:[60,'']},
 {ph:'Spécifique',e:45,lds:4,q:['4 × 2 km allure 10 km','Échauffement 15′ · 4 × 2 km à {O10} (récup 2′) · retour au calme 10′'],sl:[90,'dont 2 × 15′ à {SEMI} (récup 3′ facile)']},
 {ph:'Spécifique',e:50,lds:6,q:['Seuil 25′ + 4 × 200 m','Échauffement 15′ · 25′ à {T} · 3′ trot · 4 × 200 m en {R200} (récup 200 m marche) · retour au calme 10′'],sl:[95,'dont 3 × 12′ à {SEMI} (récup 3′ facile)']},
 {ph:'Spécifique',e:45,lds:4,q:['5 × 1000 m allure 10 km','Échauffement 15′ · 5 × 1000 m à {O10} (récup 1′30) · retour au calme 10′'],sl:[75,'dont 20′ à {SEMI}']},
 {ph:'Affûtage',e:30,lds:4,q:['Rappel 3 × 1000 m','Échauffement 15′ · 3 × 1000 m à {O10} (récup 2′) · retour au calme 10′'],sl:[0,'TEST']},
];
