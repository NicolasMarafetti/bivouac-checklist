export type ChecklistCategory = {
  name: string
  subcategories?: {
    name: string
    items: string[]
  }[]
  items?: string[]
}

export const checklistData: ChecklistCategory[] = [
  {
    name: 'Bivouac',
    items: [
      'Tente',
      'Sac de couchage',
      'Matelas gonflable',
      'Oreiller'
    ]
  },
  {
    name: 'Cuisine/Vaisselle',
    items: [
      'Gourde',
      'Casserole',
      'Réchaud',
      'Gaz',
      'Kit couvert',
      'Opinel',
      'Assiette',
      'Tasse',
      'Éponge + savon'
    ]
  },
  {
    name: 'Vêtements',
    subcategories: [
      {
        name: 'Marche',
        items: [
          'Short',
          'Tee-shirt de marche/jour',
          'Caleçon/jour',
          'Chaussette/jour',
          'Chaussure de randonnée',
          'Casquette',
          'Lunette de soleil',
          'Polaire',
          'K-Way'
        ]
      },
      {
        name: 'Soir/Nuit',
        items: [
          'Sac de linge sale',
          'Chaussette longue',
          'Tee-shirt',
          'Jogging',
          'Pull'
        ]
      }
    ]
  },
  {
    name: 'Nourriture',
    items: [
      'Plat lyophilisé',
      'Conserve',
      'Soupe',
      'Sandwich',
      'Déjeuner',
      'Barre de céréales',
      'Gâteau',
      'Fruits secs',
      'Saucisson',
      'Tomate',
      'Bonbon'
    ]
  },
  {
    name: 'Soins/Survie',
    subcategories: [
      {
        name: 'Trousse',
        items: [
          'Désinfectant',
          'Compresses',
          'Pansement',
          'Bandage',
          'Sparadrap',
          'Crème anti-inflammatoire',
          'Patch anti-inflammatoire',
          'Aspi-Venin',
          'Doliprane',
          'Imodium chiasse',
          'Anti-démangeaisons après piqûre'
        ]
      },
      {
        name: 'Autres',
        items: [
          'Couverture de survie',
          'Micropur',
          'Pilule pour les Z\'HOMMES'
        ]
      }
    ]
  },
  {
    name: 'Toilette',
    items: [
      'Déodorant',
      'Lingettes',
      'PQ + Mouchoirs'
    ]
  },
  {
    name: 'Électronique/Loisir',
    items: [
      'Batterie',
      'Chargeurs',
      'Lampe',
      'Écouteurs',
      'Jeu de carte'
    ]
  },
  {
    name: 'Autres',
    items: [
      'Allume feu',
      'Corde',
      'Sac poubelle'
    ]
  }
]

export function getAllItems(): string[] {
  const items: string[] = []

  checklistData.forEach(category => {
    if (category.items) {
      items.push(...category.items)
    }
    if (category.subcategories) {
      category.subcategories.forEach(subcategory => {
        items.push(...subcategory.items)
      })
    }
  })

  return items
}
