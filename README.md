# TIA AI Dashboard

## Projektin rakenne

```
tiaai/
├── index.html                  ← UUSI
├── package.json                ← UUSI
├── vite.config.js              ← UUSI
├── tailwind.config.js          ← UUSI
├── postcss.config.js           ← UUSI
│
└── src/
    ├── main.jsx                ← UUSI (React entry point)
    ├── index.css               ← UUSI (Tailwind base)
    ├── App.jsx                 ← UUSI (Frontpage / pääkomponentti)
    │
    ├── components/
    │   └── SharedComponents.jsx   ← SIIRRETTY reposta juuresta
    │
    ├── data/
    │   ├── constants.js           ← SIIRRETTY reposta juuresta
    │   └── mockData.js            ← SIIRRETTY reposta juuresta
    │
    └── sections/
        ├── OverviewSection.jsx        ← SIIRRETTY reposta juuresta
        ├── MonthlyTrendsSection.jsx   ← SIIRRETTY reposta juuresta
        ├── AIPerformanceSection.jsx   ← SIIRRETTY reposta juuresta
        └── CustomerBehaviorSection.jsx ← SIIRRETTY reposta juuresta
```

## Käynnistys

```bash
npm install
npm run dev
```

## Asennus GitHub-repoon

1. Poista vanhat tiedostot reposta juuresta:
   - `SharedComponents.jsx`
   - `constants.js`
   - `mockData.js`
   - `OverviewSection.jsx`
   - `MonthlyTrendsSection.jsx`
   - `AIPerformanceSection.jsx`
   - `CustomerBehaviorSection.jsx`

2. Lisää kaikki uudet tiedostot tästä paketista niiden oikeille poluille.

3. Tee commit & push.
