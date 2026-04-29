export interface Product {
  name: string;
  description?: string;
  variants?: string[];
  specs?: { label: string; value: string }[];
  image: string;
}

export interface Category {
  id: string;
  title: string;
  subtitle?: string;
  products: Product[];
}

export const CATALOG: Category[] = [
  {
    id: "cialde",
    title: "Cialde ESE 44",
    subtitle: "Qualità e tradizione in cialda",
    products: [
      {
        name: "BOX 150 ESE 44",
        variants: ["Intenso", "Classico", "Soave"],
        specs: [{ label: "Box", value: "150 PZ" }, { label: "Pallet", value: "144 BOX" }],
        image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=600&auto=format&fit=crop"
      },
      {
        name: "BOX 100 ESE 44",
        variants: ["Intenso", "Classico", "Soave", "DEK"],
        specs: [{ label: "Box", value: "100 PZ" }, { label: "Pallet", value: "192 BOX" }],
        image: "https://images.unsplash.com/photo-1580915411954-282cb1b0d780?q=80&w=600&auto=format&fit=crop"
      },
      {
        name: "BOX 50 ESE 44",
        variants: ["Intenso", "Classico", "Soave", "DEK"],
        specs: [{ label: "Box", value: "50 PZ" }, { label: "Pallet", value: "364 BOX" }],
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop"
      }
    ]
  },
  {
    id: "monorigini",
    title: "Monorigini & Specialità",
    subtitle: "Viaggi sensoriali in ogni tazzina",
    products: [
      {
        name: "MONORIGINI (6 CUBI DA 10)",
        variants: ["Brasile", "Ethiopia", "Guatemala"],
        specs: [{ label: "Box", value: "60 PZ" }, { label: "Pallet", value: "144 BOX" }],
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=600&auto=format&fit=crop"
      },
      {
        name: "AROMATIZZATI (6 CUBI DA 10)",
        variants: ["Caffè alla nocciola", "Caffè al ginseng", "Caffè al cioccolato", "Caffè irish"],
        specs: [{ label: "Box", value: "60 PZ" }, { label: "Pallet", value: "144 BOX" }],
        image: "https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?q=80&w=600&auto=format&fit=crop"
      },
      {
        name: "TISANE & SOLUBILI (6 CUBI DA 10)",
        variants: ["Orzo", "Tè al limone", "Frutti rossi", "Ventre piatto"],
        specs: [{ label: "Box", value: "60 PZ" }, { label: "Pallet", value: "144 BOX" }],
        image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?q=80&w=600&auto=format&fit=crop"
      }
    ]
  },
  {
    id: "compatibili",
    title: "Capsule Compatibili",
    subtitle: "Nespresso, A Modo Mio, Point, Uno System",
    products: [
      {
        name: "BOX 100",
        variants: ["Intenso", "Classico", "Soave", "DEK"],
        specs: [{ label: "Box", value: "100 PZ" }, { label: "Pallet", value: "128 BOX" }],
        image: "https://images.unsplash.com/photo-1504630083234-14187a9df0f5?q=80&w=600&auto=format&fit=crop"
      },
      {
        name: "BOX 50",
        variants: ["Intenso", "Classico", "Soave", "DEK"],
        specs: [{ label: "Box", value: "50 PZ" }, { label: "Pallet", value: "234 BOX" }],
        image: "https://images.unsplash.com/photo-1544787210-2213d4bf2100?q=80&w=600&auto=format&fit=crop"
      }
    ]
  },
  {
    id: "retail",
    title: "Nespresso Retail",
    subtitle: "Design e aroma per la casa",
    products: [
      {
        name: "BOX 100 (10x10)",
        variants: ["Extra Strong", "Classico", "Soave", "DEK"],
        specs: [{ label: "Box", value: "100 PZ" }, { label: "Pallet", value: "128 BOX" }],
        image: "https://images.unsplash.com/photo-1610632380989-68d60c48ea92?q=80&w=600&auto=format&fit=crop"
      },
      {
        name: "ASTUCCIO 10",
        variants: ["Classico", "Soave", "DEK"],
        specs: [{ label: "Masterbox", value: "da 30 Astucci" }, { label: "Pallet", value: "128 Masterbox" }],
        image: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?q=80&w=600&auto=format&fit=crop"
      },
      {
        name: "SOLUBILI",
        variants: ["Ginseng", "Nocciolino"],
        specs: [{ label: "Masterbox", value: "10" }],
        image: "https://images.unsplash.com/photo-1579992357154-faf4bfe95b3d?q=80&w=600&auto=format&fit=crop"
      }
    ]
  },
  {
    id: "dolcegusto",
    title: "Dolce Gusto",
    subtitle: "Versatilità e gusto",
    products: [
      {
        name: "BOX 96 (6x16)",
        variants: ["Classico", "Soave", "DEK"],
        specs: [{ label: "Box", value: "96 PZ" }, { label: "Pallet", value: "128 BOX" }],
        image: "https://images.unsplash.com/photo-1620052581638-55e647a04099?q=80&w=600&auto=format&fit=crop"
      },
      {
        name: "SOLUBILI (6x16)",
        variants: [
          "Ginseng", "Cioccolato", "Cortado", "Nocciolino", "Tè alla pesca", "Tè e limone",
          "Nocciolato", "Tisana relax", "Tè verde", "Latte", "Camomilla", "Mokaccino",
          "Orzo", "Frutti rossi", "Cappuccino", "Fior di Fragola", "Cappuccino al biscotto",
          "Camomilla arancia e miele", "Tè zenzero e limone"
        ],
        specs: [{ label: "Box", value: "96 PZ" }, { label: "Pallet", value: "144 BOX" }],
        image: "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?q=80&w=600&auto=format&fit=crop"
      },
      {
        name: "PREMIUM SOLUBILI",
        variants: [
          "Chocowhite", "Macaron al pistacchio", "Ginseng amaro",
          "Cioccolato fondente", "Creme brulèe", "Ginseng rosso"
        ],
        image: "https://images.unsplash.com/photo-1594631252845-29fc4586c566?q=80&w=600&auto=format&fit=crop"
      }
    ]
  },
  {
    id: "altri-sistemi",
    title: "Caffitaly & Bialetti",
    subtitle: "Soluzioni per ogni macchina",
    products: [
      {
        name: "CAFFITALY BOX 150 (6x25)",
        variants: ["Classico", "Soave", "DEK"],
        specs: [{ label: "Box", value: "150 PZ" }, { label: "Pallet", value: "128 BOX" }],
        image: "https://images.unsplash.com/photo-1507133311040-53b2658496bc?q=80&w=600&auto=format&fit=crop"
      },
      {
        name: "BIALETTI BOX 100",
        variants: ["Classico"],
        specs: [{ label: "Box", value: "100 PZ" }, { label: "Pallet", value: "128 BOX" }],
        image: "https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=600&auto=format&fit=crop"
      }
    ]
  },
  {
    id: "macinato",
    title: "Macinato & Accessori",
    subtitle: "L'essenza del caffè napoletano",
    products: [
      {
        name: "250g BARATTOLO",
        variants: ["Espresso Napoletano"],
        image: "https://images.unsplash.com/photo-1541167760496-162955ed8a9f?q=80&w=600&auto=format&fit=crop"
      },
      {
        name: "250g BUSTA",
        variants: ["Espresso Napoletano"],
        image: "https://images.unsplash.com/photo-1580931304412-2e38fa9788be?q=80&w=600&auto=format&fit=crop"
      },
      {
        name: "KIT ACCESSORI",
        variants: ["KIT ECO"],
        image: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?q=80&w=600&auto=format&fit=crop"
      }
    ]
  }
];
