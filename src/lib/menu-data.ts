export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
}

export interface MenuCategory {
  id: string;
  category: string;
  emoji: string;
  items: MenuItem[];
}

export const menuData: MenuCategory[] = [
  {
    id: "cocktails",
    category: "Cocktails",
    emoji: "🍸",
    items: [
      {
        id: "c1",
        name: "Ravora Martini",
        description: "Classic gin martini with a citrus twist and neon glow",
        price: "₹450",
        image: "cocktail-1",
      },
      {
        id: "c2",
        name: "Electric Blue",
        description: "Vodka-based blue curaçao cocktail with a spark",
        price: "₹420",
        image: "cocktail-1",
      },
      {
        id: "c3",
        name: "Pink Paradise",
        description: "Tropical rum mix with fresh passion fruit",
        price: "₹480",
        image: "cocktail-1",
      },
    ],
  },
  {
    id: "mocktails",
    category: "Mocktails",
    emoji: "🧃",
    items: [
      {
        id: "m1",
        name: "Sunset Cooler",
        description: "Non-alcoholic tropical refresher with gradient layers",
        price: "₹220",
        image: "mocktail-1",
      },
      {
        id: "m2",
        name: "Berry Blast",
        description: "Fresh mixed berries with sparkling soda",
        price: "₹200",
        image: "mocktail-1",
      },
      {
        id: "m3",
        name: "Citrus Fusion",
        description: "Zesty orange and lime mocktail with mint",
        price: "₹210",
        image: "mocktail-1",
      },
    ],
  },
  {
    id: "food",
    category: "Pub Grub",
    emoji: "🍟",
    items: [
      {
        id: "f1",
        name: "Loaded Fries Platter",
        description: "Crispy fries with cheese, bacon, and special sauce",
        price: "₹320",
        image: "food-1",
      },
      {
        id: "f2",
        name: "Spicy Wings",
        description: "12pc buffalo wings with ranch dip",
        price: "₹380",
        image: "food-1",
      },
      {
        id: "f3",
        name: "Party Platter",
        description: "Ultimate combo: wings, fries, nachos, and dips",
        price: "₹650",
        image: "food-1",
      },
    ],
  },
];
