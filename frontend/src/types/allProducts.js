const products = [
  // Laptops
  {
    id: 1,
    category: "laptop",
    imageUrl: "/images/lenovo-loq-15arp9.jpg",
    title: "Laptop gaming Lenovo LOQ 15ARP9 83JC003VVN",
    rating: 0.0,
    originalPrice: 27490000,
    discountedPrice: 24490000,
    discountPercentage: 11,
    specifications: {
      cpu: "i7-7435HS",
      gpu: "RTX 4050",
      ram: "12 GB",
      storage: "512 GB",
      screen: "15.6 inch FHD",
      refreshRate: "144 Hz"
    }
  },
  {
    id: 2,
    category: "laptop",
    imageUrl: "/images/hp-victus.jpg",
    title: "Laptop gaming HP VICTUS 16-r0376TX AY8Z2PA",
    rating: 0.0,
    originalPrice: 32690000,
    discountedPrice: 26290000,
    discountPercentage: 20,
    specifications: {
      cpu: "i7-13700HX",
      gpu: "RTX 3050",
      ram: "16 GB",
      storage: "512 GB",
      screen: "16.1 inch FHD",
      refreshRate: "165 Hz"
    }
  },
  {
    id: 3,
    category: "laptop",
    imageUrl: "/images/msi-katana.jpg",
    title: "Laptop gaming MSI Katana 15 B13VFK 676VN",
    rating: 5.0,
    originalPrice: 37990000,
    discountedPrice: 25990000,
    discountPercentage: 32,
    specifications: {
      cpu: "i7-13620H",
      gpu: "RTX 4060",
      ram: "16 GB",
      storage: "1 TB",
      screen: "15.6 inch FHD",
      refreshRate: "144 Hz"
    }
  },
  {
    id: 4,
    category: "laptop",
    imageUrl: "/images/acer-nitro.jpg",
    title: "Laptop gaming Acer Nitro V ANV15 51 91T5",
    rating: 0.0,
    originalPrice: 32990000,
    discountedPrice: 31490000,
    discountPercentage: 5,
    specifications: {
      cpu: "i9-13900H",
      gpu: "RTX 4060",
      ram: "16 GB",
      storage: "512 GB",
      screen: "15.6 inch FHD",
      refreshRate: "144 Hz"
    }
  },
  {
    id: 5,
    category: "laptop",
    imageUrl: "/images/acer-predator.jpg",
    title: "Laptop gaming Acer Predator Helios Neo 16 PHN16 71 779X",
    rating: 4.7,
    originalPrice: 39990000,
    discountedPrice: 34990000,
    discountPercentage: 13,
    specifications: {
      cpu: "i7-13700HX",
      gpu: "RTX 4060",
      ram: "16 GB",
      storage: "1 TB",
      screen: "16 inch WQXGA",
      refreshRate: "165 Hz"
    }
  },

  // Keyboards
  {
    id: 6,
    category: "keyboard",
    imageUrl: "/images/keyboards/aula-f75-white.jpg",
    title: "Bàn phím AULA F75 có dây (Trắng Red switch)",
    rating: 0.0,
    originalPrice: 785000,
    discountedPrice: 650000,
    discountPercentage: 17,
    specifications: {
      connection: "wired",
      size: "75%",
      switch: "Red",
      led: "RGB"
    }
  },
  {
    id: 7,
    category: "keyboard",
    imageUrl: "/images/keyboards/aula-f2058.jpg",
    title: "Bàn phím AULA F2058 có dây (Đen Red switch)",
    rating: 0.0,
    originalPrice: 860000,
    discountedPrice: 690000,
    discountPercentage: 20,
    specifications: {
      connection: "wired",
      size: "full-size",
      switch: "Red",
      led: "RGB"
    }
  },
  {
    id: 8,
    category: "keyboard",
    imageUrl: "/images/keyboards/razer-huntsman.jpg",
    title: "Bàn phím Razer Huntsman V2 TKL",
    rating: 0.0,
    originalPrice: 4290000,
    discountedPrice: 3790000,
    discountPercentage: 12,
    specifications: {
      connection: "wired",
      size: "TKL",
      switch: "Optical",
      led: "RGB"
    }
  },
  {
    id: 9,
    category: "keyboard",
    imageUrl: "/images/keyboards/steelseries-apex-pro.jpg",
    title: "Bàn phím SteelSeries Apex Pro TKL Wireless",
    rating: 0.0,
    originalPrice: 6990000,
    discountedPrice: 6490000,
    discountPercentage: 7,
    specifications: {
      connection: "wireless",
      size: "TKL",
      switch: "OmniPoint Adjustable",
      led: "RGB"
    }
  },

  // Mice
  // Mice
  {
    id: 10,
    category: "mouse",
    imageUrl: "/images/mice/logitech-g502.jpg",
    title: "Logitech G502 HERO Gaming Mouse",
    rating: 4.8,
    originalPrice: 1290000,
    discountedPrice: 1090000,
    discountPercentage: 15,
    specifications: {
      battery: "Không pin (dây)",
      connection: "Có dây",
      led: "RGB"
    }
  },
  {
    id: 11,
    category: "mouse",
    imageUrl: "/images/mice/razer-deathadder.jpg",
    title: "Razer DeathAdder V2 Pro Wireless Gaming Mouse",
    rating: 4.9,
    originalPrice: 2590000,
    discountedPrice: 2290000,
    discountPercentage: 12,
    specifications: {
      battery: "Tới 70h",
      connection: "Không dây",
      led: "RGB"
    }
  },
  {
    id: 12,
    category: "mouse",
    imageUrl: "/images/mice/logitech-g903.jpg",
    title: "Logitech G903 LIGHTSPEED Wireless Gaming Mouse",
    rating: 4.7,
    originalPrice: 2590000,
    discountedPrice: 2390000,
    discountPercentage: 8,
    specifications: {
      battery: "Tới 140h",
      connection: "Không dây",
      led: "RGB"
    }
  },
  
  // Earphones
  {
    id: 13,
    category: "earphone",
    imageUrl: "/images/earphones/apple-airpods.jpg",
    title: "Apple AirPods Pro 2nd Generation",
    rating: 4.9,
    originalPrice: 4990000,
    discountedPrice: 4590000,
    discountPercentage: 8
  },
  {
    id: 14,
    category: "earphone",
    imageUrl: "/images/earphones/sennheiser-momentum.jpg",
    title: "Sennheiser Momentum True Wireless 3",
    rating: 4.7,
    originalPrice: 5990000,
    discountedPrice: 5390000,
    discountPercentage: 10
  },
  {
    id: 15,
    category: "earphone",
    imageUrl: "/images/earphones/sony-wf-1000xm4.jpg",
    title: "Sony WF-1000XM4 Noise Cancelling Earbuds",
    rating: 4.8,
    originalPrice: 5490000,
    discountedPrice: 4890000,
    discountPercentage: 11
  },

  // Headphones
  {
    id: 16,
    category: "headphone",
    imageUrl: "/images/headphones/steelseries-arctis.jpg",
    title: "SteelSeries Arctis 7 Wireless Gaming Headset",
    rating: 4.8,
    originalPrice: 3290000,
    discountedPrice: 2990000,
    discountPercentage: 9
  },
  {
    id: 17,
    category: "headphone",
    imageUrl: "/images/headphones/logitech-g-pro-x.jpg",
    title: "Logitech G Pro X Gaming Headset",
    rating: 4.7,
    originalPrice: 2790000,
    discountedPrice: 2490000,
    discountPercentage: 11
  },
  {
    id: 18,
    category: "headphone",
    imageUrl: "/images/headphones/sony-1000xm5.jpg",
    title: "Sony WH-1000XM5 Noise Cancelling Headphones",
    rating: 5.0,
    originalPrice: 5990000,
    discountedPrice: 5290000,
    discountPercentage: 12
  }

  // Add more items to reach 50 if needed
];

export { products };
