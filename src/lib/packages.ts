export type PackageOption = {
  id: string;
  name: string;
  description: string;
  pricePerPerson: number; // in INR (tax extra unless stated)
  includes?: string[];
  note?: string;
};

export const PACKAGE_OPTIONS: PackageOption[] = [
  {
    id: "opt1",
    name: "Non-Alcohol — ₹1599 + tax (Unlimited)",
    description: "Unlimited mocktails & soft drinks with a hearty food spread.",
    pricePerPerson: 50,
    includes: [
      "Unlimited Mocktails & Soft Drinks",
      "3 Veg Snacks & 3 Non-Veg Snacks",
      "2 Veg Main Course & 2 Non-Veg Main Course",
      "2 Flavoured Rice & Assorted Indian Breads",
      "Salads & 2 Desserts (1 hot + 1 cold) with 1 flavoured ice cream",
    ],
    note: "No prawns and mutton",
  },
  {
    id: "opt3",
    name: "Alcohol — ₹2399 + tax (Unlimited)",
    description:
      "Unlimited select premium spirits, cocktails, mocktails, and soft drinks with a premium food spread.",
    pricePerPerson: 100,
    includes: [
      "Unlimited 100 Pipers, Teacher’s Highland, Black & White, Absolut",
      "Bacardi Rum, Dark Rum, Brandy, KF Draught, KF Ultra",
      "Cocktails, Mocktails, Soft Drinks",
      "3 Veg Snacks & 3 Non-Veg Snacks",
      "1 Veg Main Course & 1 Non-Veg Main Course",
      "Rice, Breads, Salads & 2 Desserts (1 hot + ice cream)",
    ],
    note: "No prawns and mutton",
  },
];
