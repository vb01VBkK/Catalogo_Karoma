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
        image: "https://lh3.googleusercontent.com/d/1Mx8fxYdY56RIGaovsCEDmNAuXyRJRVdw=w1000"
      },
      {
        name: "BOX 100 ESE 44",
        variants: ["Intenso", "Classico", "Soave", "DEK"],
        specs: [{ label: "Box", value: "100 PZ" }, { label: "Pallet", value: "192 BOX" }],
        image: "https://lh3.googleusercontent.com/d/1Mx8fxYdY56RIGaovsCEDmNAuXyRJRVdw=w1000"
      },
      {
        name: "BOX 50 ESE 44",
        variants: ["Intenso", "Classico", "Soave", "DEK"],
        specs: [{ label: "Box", value: "50 PZ" }, { label: "Pallet", value: "364 BOX" }],
        image: "https://lh3.googleusercontent.com/d/1Mx8fxYdY56RIGaovsCEDmNAuXyRJRVdw=w1000"
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
        image: "https://lh3.googleusercontent.com/d/1Mx8fxYdY56RIGaovsCEDmNAuXyRJRVdw=w1000"
      },
      {
        name: "AROMATIZZATI (6 CUBI DA 10)",
        variants: ["Caffè alla nocciola", "Caffè al ginseng", "Caffè al cioccolato", "Caffè irish"],
        specs: [{ label: "Box", value: "60 PZ" }, { label: "Pallet", value: "144 BOX" }],
        image: "https://lh3.googleusercontent.com/d/1Mx8fxYdY56RIGaovsCEDmNAuXyRJRVdw=w1000"
      },
      {
        name: "TISANE & SOLUBILI (6 CUBI DA 10)",
        variants: ["Orzo", "Tè al limone", "Frutti rossi", "Ventre piatto"],
        specs: [{ label: "Box", value: "60 PZ" }, { label: "Pallet", value: "144 BOX" }],
        image: "https://lh3.googleusercontent.com/d/1Mx8fxYdY56RIGaovsCEDmNAuXyRJRVdw=w1000"
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
        image: "https://lh3.googleusercontent.com/d/1Mx8fxYdY56RIGaovsCEDmNAuXyRJRVdw=w1000"
      },
      {
        name: "BOX 50",
        variants: ["Intenso", "Classico", "Soave", "DEK"],
        specs: [{ label: "Box", value: "50 PZ" }, { label: "Pallet", value: "234 BOX" }],
        image: "https://lh3.googleusercontent.com/d/1Mx8fxYdY56RIGaovsCEDmNAuXyRJRVdw=w1000"
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
        image: "https://lh3.googleusercontent.com/d/1Mx8fxYdY56RIGaovsCEDmNAuXyRJRVdw=w1000"
      },
      {
        name: "ASTUCCIO 10",
        variants: ["Classico", "Soave", "DEK"],
        specs: [{ label: "Masterbox", value: "da 30 Astucci" }, { label: "Pallet", value: "128 Masterbox" }],
        image: "https://lh3.googleusercontent.com/d/1Mx8fxYdY56RIGaovsCEDmNAuXyRJRVdw=w1000"
      },
      {
        name: "SOLUBILI",
        variants: ["Ginseng", "Nocciolino"],
        specs: [{ label: "Masterbox", value: "10" }],
        image: "https://lh3.googleusercontent.com/d/1Mx8fxYdY56RIGaovsCEDmNAuXyRJRVdw=w1000"
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
        image: "https://lh3.googleusercontent.com/d/1Mx8fxYdY56RIGaovsCEDmNAuXyRJRVdw=w1000"
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
        image: "https://lh3.googleusercontent.com/d/1Mx8fxYdY56RIGaovsCEDmNAuXyRJRVdw=w1000"
      },
      {
        name: "PREMIUM SOLUBILI",
        variants: [
          "Chocowhite", "Macaron al pistacchio", "Ginseng amaro",
          "Cioccolato fondente", "Creme brulèe", "Ginseng rosso"
        ],
        image: "https://lh3.googleusercontent.com/d/1Mx8fxYdY56RIGaovsCEDmNAuXyRJRVdw=w1000"
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
        image: "https://lh3.googleusercontent.com/d/1Mx8fxYdY56RIGaovsCEDmNAuXyRJRVdw=w1000"
      },
      {
        name: "BIALETTI BOX 100",
        variants: ["Classico"],
        specs: [{ label: "Box", value: "100 PZ" }, { label: "Pallet", value: "128 BOX" }],
        image: "https://lh3.googleusercontent.com/d/1Mx8fxYdY56RIGaovsCEDmNAuXyRJRVdw=w1000"
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
        image: "https://lh3.googleusercontent.com/d/1Mx8fxYdY56RIGaovsCEDmNAuXyRJRVdw=w1000"
      },
      {
        name: "250g BUSTA",
        variants: ["Espresso Napoletano"],
        image: "https://lh3.googleusercontent.com/d/1Mx8fxYdY56RIGaovsCEDmNAuXyRJRVdw=w1000"
      },
      {
        name: "KIT ACCESSORI",
        variants: ["KIT ECO"],
        image: "https://lh3.googleusercontent.com/d/1Mx8fxYdY56RIGaovsCEDmNAuXyRJRVdw=w1000"
      }
    ]
  }
];
