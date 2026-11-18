// Contenu du rapport : objectif, recherche, suivi, sources
export const GOAL_STEPS = [
  ['3 mois (fév. 2027)', '73–74 kg', 'Épaules et pectoraux plus pleins, dos plus large'],
  ['12 mois (nov. 2027)', '77–80 kg', 'Silhouette en V nette, bras et trapèzes marqués'],
  ['3–5 ans', '83–88 kg', 'Physique d\'athlète de combat, proche du modèle'],
];

export const RESEARCH = [
  { q: 'La course freine-t-elle la prise de muscle ?', f: 'Méta-analyse de 43 études : le cumul cardio + muscu ne freine ni la masse musculaire ni la force max. Seule la force explosive baisse, surtout si les deux sont dans la même séance.', a: 'Course et muscu séparées d\'au moins 3 h (course le matin, muscu le soir).', src: ['Schumann 2022', 'https://link.springer.com/article/10.1007/s40279-021-01587-7'] },
  { q: 'Course ou vélo ?', f: 'Au niveau des fibres, une petite interférence existe, plus marquée avec la course qu\'avec le vélo. Plus l\'endurance est fréquente et longue, plus elle pèse.', a: '3 sorties par semaine, volume modéré, une seule sortie longue.', src: ['Lundberg 2022', 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9474354'] },
  { q: 'Combien de séries ?', f: 'Plus de séries par semaine = plus de muscle, avec des rendements décroissants ; à volume égal, la fréquence change peu.', a: '12 à 16 séries par semaine pour les muscles prioritaires (épaules, dos, pectoraux).', src: ['Pelland 2024', 'https://sportrxiv.org/index.php/server/preprint/view/460/version/587'] },
  { q: 'Jusqu\'où pousser chaque série ?', f: 'Plus on s\'arrête près de l\'échec, plus le muscle grossit ; la force, elle, en dépend peu.', a: '0 à 2 reps en réserve (RIR) sur l\'isolation, 1 à 3 sur les gros exercices.', src: ['Robinson 2024', 'https://www.fau.edu/newsdesk/articles/muscle-growth-strength-study'] },
  { q: 'Combien de repos entre les séries ?', f: 'Léger avantage aux repos de plus de 60 s pour l\'hypertrophie.', a: '2–3 min sur les gros exercices, 1 min 30 sur l\'isolation.', src: ['Singer 2024', 'https://www.frontiersin.org/journals/sports-and-active-living/articles/10.3389/fspor.2024.1429789/pdf'] },
  { q: 'Combien de protéines ?', f: 'Au-delà d\'environ 1,6 g/kg/jour, le gain de masse maigre plafonne.', a: '1,8 à 2,2 g/kg avec de vrais aliments : marge de sécurité sans complément.', src: ['Morton 2018', 'https://pubmed.ncbi.nlm.nih.gov/28698222/'] },
  { q: 'La muscu aide-t-elle la course ?', f: 'Les charges lourdes et les méthodes combinées améliorent l\'économie de course.', a: 'La course ne régresse pas malgré moins de kilomètres.', src: ['Llanos-Lagos 2024', 'https://repository.essex.ac.uk/37272/'] },
];

export const TRACKING = [
  ['Poids', 'Chaque semaine, le matin à jeun', '+0,5 à 0,8 kg par mois', 'Stable 3 semaines : +150 kcal (40 g de riz sec ou 1 banane + 10 g d\'amandes)'],
  ['Tour de taille (au nombril)', 'Chaque mois', '+1 cm maximum par trimestre', 'Monte plus vite : −150 kcal, pain en premier'],
  ['Charges en muscu', 'À chaque séance', 'Progression chaque semaine ou toutes les 2 semaines', 'Stagnation 3 semaines : vérifie sommeil et calories avant de changer le programme'],
  ['Photos (face, dos, profil)', 'Toutes les 4 semaines, même lumière', 'Épaules et dos qui s\'élargissent', '—'],
];

export const TIPS = [
  ['😴 Sommeil', ['7 à 8 h par nuit. Avec la course après Al Fajr, vise le coucher vers 22 h.', 'C\'est la condition n°1 pour progresser : sans sommeil, ni le muscle ni le cardio ne suivent.']],
  ['🚨 Signaux d\'alerte', ['Douleur localisée (genou, tendon d\'Achille, épaule) plus de 3 jours : stop, semaine allégée, et consulte si elle persiste.', 'Fatigue qui s\'installe ou sommeil dégradé : transforme la semaine en semaine allégée.']],
  ['🌙 Ramadan (février–mars 2027)', ['3 séances de muscu après le ftour en volume réduit (−1 série par exercice).', '2 footings faciles par semaine.', 'Protéines au ftour et au shour.']],
  ['📅 Après 12 mois', ['Si tu es à 78–80 kg avec un tour de taille stable, une sèche de 8 à 10 semaines fera ressortir les abdos et la définition.', 'Ensuite, nouveau cycle de prise de muscle.']],
  ['🥊 Le modèle Anthony Joshua', ['Sa préparation mêle course le matin, force et conditionnement l\'après-midi, puis boxe.', 'Il insiste sur les jambes, les fessiers, la sangle abdominale et les mouvements explosifs : c\'est un athlète hybride, pas un culturiste.']],
];

export const SOURCES = [
  ['Schumann et al. (2022), compatibilité cardio + muscu, Sports Medicine', 'https://link.springer.com/article/10.1007/s40279-021-01587-7'],
  ['Lundberg et al. (2022), cardio + muscu et hypertrophie des fibres', 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9474354'],
  ['Wilson et al. (2012), interférence course vs vélo', 'https://pesquisa.bvsalud.org/sms/resource/pt/mdl-22002517'],
  ['Pelland et al. (2024), volume et fréquence d\'entraînement', 'https://sportrxiv.org/index.php/server/preprint/view/460/version/587'],
  ['Robinson et al. (2024), proximité de l\'échec', 'https://www.fau.edu/newsdesk/articles/muscle-growth-strength-study'],
  ['Singer et al. (2024), temps de repos et hypertrophie', 'https://www.frontiersin.org/journals/sports-and-active-living/articles/10.3389/fspor.2024.1429789/pdf'],
  ['Morton et al. (2018), protéines et masse maigre', 'https://pubmed.ncbi.nlm.nih.gov/28698222/'],
  ['Llanos-Lagos et al. (2024), muscu et économie de course', 'https://repository.essex.ac.uk/37272/'],
  ['Rythmes de prise de muscle naturelle (Muscle & Strength)', 'https://www.muscleandstrength.com/articles/how-much-muscle-can-you-gain'],
  ['Anthony Joshua, gabarit (Men\'s Health)', 'https://menshealth.com.au/build-body-of-champion-anthony-joshua/'],
  ['Anthony Joshua, entraînement (JOE)', 'https://www.joe.co.uk/fitness-health/this-is-how-anthony-joshuas-training-turned-him-into-a-beast/'],
];
