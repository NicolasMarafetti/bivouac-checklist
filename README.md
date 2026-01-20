# Bivouac Checklist

Une Progressive Web App (PWA) pour gérer votre checklist de bivouac. Accessible sur mobile et installable sur votre écran d'accueil iPhone.

## Technologies

- **Next.js 16** avec React 19
- **Prisma 6.19** avec MongoDB Atlas
- **Tailwind CSS 4**
- **PWA** avec next-pwa

## Développement local

1. Installer les dépendances:
```bash
npm install
```

2. Générer le client Prisma:
```bash
npx prisma generate
```

3. Configurer les variables d'environnement:
Créer un fichier `.env` avec:
```
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/database-name"
```

4. Lancer le serveur de développement:
```bash
npm run dev
```

5. Ouvrir [http://localhost:3000](http://localhost:3000)

## Déploiement sur Vercel

### 1. Créer un repo GitHub

```bash
# Le repo Git est déjà initialisé
# Créer un nouveau repo sur GitHub et l'ajouter comme remote:
git remote add origin https://github.com/votre-username/bivouac-checklist.git
git branch -M main
git push -u origin main
```

### 2. Importer sur Vercel

1. Aller sur [vercel.com](https://vercel.com)
2. Cliquer sur "Add New Project"
3. Importer votre repo GitHub
4. Configurer les variables d'environnement:
   - `DATABASE_URL`: Votre URL de connexion MongoDB Atlas

### 3. Variables d'environnement requises

Dans les paramètres Vercel, ajouter:

```
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/bivouac-checklist
```

### 4. Déployer

Vercel déploiera automatiquement à chaque push sur la branche `main`.

## Installation comme PWA sur iPhone

1. Ouvrir le site sur Safari
2. Cliquer sur le bouton "Partager" (icône de partage)
3. Sélectionner "Sur l'écran d'accueil"
4. Nommer l'app "Bivouac" et ajouter
5. L'icône apparaîtra sur votre écran d'accueil

## Personnalisation des icônes

Pour changer les icônes PWA, remplacer les fichiers dans `public/icons/` avec vos propres images, ou modifier le script `scripts/generate-icons.js` et relancer:

```bash
npm run generate-icons
```

## Structure du projet

```
app/
├── api/checklist/[user]/  # API routes
├── checklist/[user]/      # Page de checklist
├── layout.tsx             # Layout avec métadonnées PWA
└── page.tsx               # Page d'accueil

lib/
├── prisma.ts              # Client Prisma
└── checklist-data.ts      # Données de checklist

prisma/
└── schema.prisma          # Schéma de base de données

public/
├── icons/                 # Icônes PWA
└── manifest.json          # Manifest PWA
```
