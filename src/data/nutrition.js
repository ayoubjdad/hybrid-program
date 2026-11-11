export const MEALS={
 fajr:{t:'Après Al Fajr',h:'6h15',n:'avant la course',pre:1,items:['2–3 dattes','1 grand verre d\'eau','Footing facile : possible à jeun · fractionné : 20–30′ avant'],k:70,p:1,c:18,f:0,alt:['Sortie longue > 75′ : emporte de l\'eau + 3–4 dattes à manger vers la 45ᵉ minute']},
 pdj:{t:'Petit-déjeuner',h:'7h30',items:['3 œufs (omelette ou bouillis)','80 g pain complet (≈ ⅓ khobz)','1 portion de fromage','1 banane','Thé : 1 sucre maximum'],k:600,p:29,c:70,f:22,alt:['1 msemen ou 2 baghrir + 2 œufs + 1 lben','70 g flocons d\'avoine + lait + banane + 1 c. à s. beurre de cacahuète','Bissara + pain complet + 2 œufs bouillis (parfait en hiver)']},
 col:{t:'Collation',h:'10h',items:['1 lben ou raïbi nature','30 g amandes ou noix'],k:280,p:14,c:15,f:17,alt:['150 g fromage blanc + 1 fruit','1 yaourt grec + 4 dattes','1 shaker whey + 1 banane']},
 dej:{t:'Déjeuner',h:'13h',items:['150–180 g poulet, kefta ou poisson','200 g riz cuit, ou ⅓ khobz avec un tajine','Légumes + salade marocaine','1 c. à s. huile d\'olive'],k:700,p:48,c:70,f:22,alt:['Tajine poulet-légumes + ⅓ khobz','Couscous du vendredi : 250 g semoule cuite + viande + légumes (évite le smen en excès)','Poisson au four (merlan, sardines) + riz + salade','150 g kefta + 200 g pâtes cuites + sauce tomate']},
 pre:{t:'Pré-séance',h:'16h30',n:'60–90′ avant la muscu',pre:1,items:['60 g flocons d\'avoine','250 ml lait','1 c. à s. miel ou 2 dattes','500 ml d\'eau'],k:450,p:16,c:70,f:10,alt:['Sandwich thon (pain complet) + 1 banane','2 tranches de pain + jben + miel + 1 verre de lait','Lben + 4 dattes + 1 poignée d\'amandes (version légère si tu as mangé tard)']},
 gout:{t:'Goûter',h:'16h30',n:'= pré-run si tu cours le soir',pre:1,items:['1 raïbi','1 fruit','3–4 dattes'],k:300,p:6,c:60,f:3,alt:['2 tranches de pain complet + jben + miel','1 banane + 1 poignée d\'amandes']},
 goutL:{t:'Goûter léger',h:'16h30',items:['1 fruit','1 lben'],k:180,p:6,c:30,f:3,alt:['1 yaourt + 2 dattes']},
 din:{t:'Dîner',h:'20h',n:'dans l\'heure après l\'effort',items:['1 bol de harira ou de 3des (lentilles)','150 g sardines, poulet ou 2–3 œufs','¼ khobz','1 fruit'],k:700,p:45,c:75,f:22,alt:['Loubia + 2 œufs + pain','Omelette 3 œufs + pommes de terre sautées + salade','Poulet + riz + légumes (restes du midi)']},
 dinL:{t:'Dîner',h:'20h',items:['1 bol de harira ou de 3des','150 g sardines, poulet ou 2–3 œufs','Un petit morceau de pain','Salade'],k:580,p:42,c:50,f:22,alt:['Soupe de légumes + 3 œufs + petit pain','Poisson + légumes + 1 pomme de terre']},
 nuit:{t:'Avant de dormir',h:'22h',items:['200 g fromage blanc ou 100 g jben frais'],k:150,p:16,c:8,f:5,alt:['1 verre de lben + quelques noix','1 shaker whey ou caséine']}
};

export const NT={
 muscu:{lbl:'Jour muscu',days:'Mar · Jeu · Sam',meals:['pdj','col','dej','pre','din','nuit']},
 course:{lbl:'Jour course',days:'Lun · Mer · Dim',meals:['fajr','pdj','col','dej','gout','din','nuit']},
 repos:{lbl:'Repos',days:'Vendredi',meals:['pdj','col','dej','goutL','dinL','nuit']}
};
