# 🏋️ × 🏃 Programme Hybride — 12 semaines

Programme hybride **musculation + course à pied** orienté prise de muscle (objectif physique type Anthony Joshua), avec nutrition 100 % aliments sans compléments, basé sur la recherche récente.
Application React (Vite), sans backend : tout est sauvegardé dans le navigateur (`localStorage`).

## Fonctionnalités

- **Semaine** : planning sur 12 semaines (Base → Développement → Spécifique → Affûtage), semaines allégées S4 et S8, séances à cocher.
- **Muscu** : illustration animée de chaque exercice, 3 séances (Poitrine/Triceps, Dos/Biceps, Épaules + jambes légères) adaptées à une machine multi-postes (tirage vertical, rowing bas, poulie réglable, poste à rouleaux), suivi des séries et des charges, minuteur de repos.
- **Course** : zones d'entraînement calculées par la méthode VDOT (Jack Daniels) à partir des records 10 km et semi. Tout le programme se recalcule quand on change les chronos.
- **Nutrition** : ≈ 2 950 kcal / 160 g de protéines sans compléments, quantités en grammes, repas marocains avec alternatives, suivi du poids et du tour de taille.
- **Objectif & science** : objectif réaliste, synthèse des méta-analyses récentes, suivi et sources.
- **Conseils** : course après Al Fajr, progression, signaux d'alerte, calendrier.

## Lancer en local

```bash
npm install
npm run dev
```

## Modifier le programme

| Fichier | Contenu |
|---|---|
| `src/data/running.js` | Plan de course semaine par semaine (`W`) et texte des phases (`PH`) |
| `src/data/muscu.js` | Exercices : `[nom, séries, reps, repos, alternative, conseil, jambes?, poste]` |
| `src/data/nutrition.js` | Repas (`MEALS`) et types de journée (`NT`) |
| `src/data/tips.js` | Onglet Conseils |
| `src/lib/vdot.js` | Calcul des allures |
| `src/lib/plan.js` | Construction des séances de la semaine, RIR, dates |

Dans les textes de course, `{E}`, `{T}`, `{I}`, `{M}`, `{O10}`, `{SEMI}`, `{R200}` sont remplacés par les allures calculées.

## Déploiement

Chaque push sur `main` déploie automatiquement sur **GitHub Pages** (workflow `.github/workflows/deploy.yml`).
À activer une fois : *Settings → Pages → Source : GitHub Actions*.
