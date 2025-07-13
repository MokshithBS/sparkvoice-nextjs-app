
export interface Product {
    id: number;
    name: string;
    price: number;
    salePrice?: number;
    quantity: string;
    image: string;
    category: string;
    hint: string;
    isVeg: boolean;
    packaging: string;
  }
  
  export const products: Product[] = [
    // Atta, Rice & Dals
    { id: 1, name: 'Aashirvaad Atta (5 kg)', price: 250, salePrice: 225, quantity: '5 kg', image: 'https://storage.googleapis.com/aip-dev-images-public/AashirvaadAtta.png', category: 'Atta, Rice & Dals', hint: 'flour bag', isVeg: true, packaging: 'Plastic Bag' },
    { id: 13, name: 'India Gate Basmati Rice (5 kg)', price: 650, quantity: '5 kg', image: 'https://storage.googleapis.com/aip-dev-images-public/Indiagatebasmati5kg.png', category: 'Atta, Rice & Dals', hint: 'rice bag', isVeg: true, packaging: 'Plastic Bag' },
    { id: 106, name: 'India Gate Basmati Rice (1 kg)', price: 140, quantity: '1 kg', image: 'https://storage.googleapis.com/aip-dev-images-public/indiagatebasmatirice.png', category: 'Atta, Rice & Dals', hint: 'rice bag', isVeg: true, packaging: 'Plastic Pouch' },
    { id: 14, name: 'Tata Sampann Toor Dal (1 kg)', price: 150, quantity: '1 kg', image: 'https://storage.googleapis.com/aip-dev-images-public/Tata%20Sampan%20Toor%20Daal.webp', category: 'Atta, Rice & Dals', hint: 'lentils package', isVeg: true, packaging: 'Plastic Pouch' },
    { id: 15, name: 'Organic Moong Dal (1 kg)', price: 165, quantity: '1 kg', image: 'https://storage.googleapis.com/aip-dev-images-public/Tata%20Sampan%20Organic%20Masoor%20daal.webp', category: 'Atta, Rice & Dals', hint: 'lentils package', isVeg: true, packaging: 'Plastic Pouch' },
    { id: 52, name: 'Fortune Besan (1 kg)', price: 80, quantity: '1 kg', image: 'https://storage.googleapis.com/aip-dev-images-public/Fortune%20Besan%201kg.webp', category: 'Atta, Rice & Dals', hint: 'flour pack', isVeg: true, packaging: 'Plastic Pouch' },
    { id: 59, name: 'Sona Masoori Rice (5 kg)', price: 550, quantity: '5 kg', image: 'https://storage.googleapis.com/aip-dev-images-public/Sona%20Masoori.webp', category: 'Atta, Rice & Dals', hint: 'rice bag', isVeg: true, packaging: 'Plastic Bag' },
    { id: 60, name: 'Tata Sampann Chana Dal (1 kg)', price: 140, quantity: '1 kg', image: 'https://storage.googleapis.com/aip-dev-images-public/Tata%20Sampan%20Chana%20Daal.webp', category: 'Atta, Rice & Dals', hint: 'lentils package', isVeg: true, packaging: 'Plastic Pouch' },
    { id: 61, name: 'MTR Rava/Sooji (500 g)', price: 45, quantity: '500 g', image: 'https://storage.googleapis.com/aip-dev-images-public/Mtr%20rava%20sooji%20500gram.webp', category: 'Atta, Rice & Dals', hint: 'semolina pack', isVeg: true, packaging: 'Plastic Pouch' },
    { id: 96, name: 'Tata Sampann Thick Poha (500g)', price: 40, quantity: '500 g', image: 'https://storage.googleapis.com/aip-dev-images-public/tatapoha.png', category: 'Atta, Rice & Dals', hint: 'flattened rice', isVeg: true, packaging: 'Plastic Pouch' },

    // Masala & Oils
    { id: 2, name: 'Tata Salt (1 kg)', price: 25, quantity: '1 kg', image: 'https://storage.googleapis.com/aip-dev-images-public/Table%20salt.webp', category: 'Masala & Oils', hint: 'salt package', isVeg: true, packaging: 'Plastic Pouch' },
    { id: 5, name: 'Saffola Gold Oil (1 L)', price: 180, salePrice: 159, quantity: '1 L', image: 'https://storage.googleapis.com/aip-dev-images-public/Saffola%20gold%20oil1l.webp', category: 'Masala & Oils', hint: 'oil bottle', isVeg: true, packaging: 'Plastic Bottle' },
    { id: 16, name: 'Fortune Sun Lite Oil (1 L)', price: 160, salePrice: 145, quantity: '1 L', image: 'https://storage.googleapis.com/aip-dev-images-public/Fortune%20Sun%20lite%20oil(1l).webp', category: 'Masala & Oils', hint: 'oil bottle', isVeg: true, packaging: 'Plastic Pouch' },
    { id: 17, name: 'Everest Turmeric Powder (200 g)', price: 55, quantity: '200 g', image: 'https://storage.googleapis.com/aip-dev-images-public/everest.png', category: 'Masala & Oils', hint: 'spice powder', isVeg: true, packaging: 'Cardboard Box' },
    { id: 18, name: 'MDH Deggi Mirch (100 g)', price: 70, quantity: '100 g', image: 'https://storage.googleapis.com/aip-dev-images-public/product-chilli-powder.png', category: 'Masala & Oils', hint: 'spice powder', isVeg: true, packaging: 'Cardboard Box' },
    { id: 42, name: 'Fortune Mustard Oil (1 L)', price: 175, quantity: '1 L', image: 'https://storage.googleapis.com/aip-dev-images-public/Fortune%20Sun%20lite%20oil(1l).webp', category: 'Masala & Oils', hint: 'oil bottle', isVeg: true, packaging: 'Plastic Bottle' },
    { id: 43, name: 'Catch Garam Masala (100 g)', price: 80, quantity: '100 g', image: 'https://storage.googleapis.com/aip-dev-images-public/product-garam-masala.png', category: 'Masala & Oils', hint: 'spice box', isVeg: true, packaging: 'Cardboard Box' },
    { id: 62, name: 'Parachute Coconut Oil (500 ml)', price: 150, quantity: '500 ml', image: 'https://storage.googleapis.com/aip-dev-images-public/87.%20Parachute%20Advansed%20Hair%20Oil%20(300%20ml).jpeg', category: 'Masala & Oils', hint: 'oil bottle', isVeg: true, packaging: 'Plastic Bottle' },
    { id: 63, name: 'Figaro Olive Oil (500 ml)', price: 450, quantity: '500 ml', image: 'https://storage.googleapis.com/aip-dev-images-public/Figaro%20olive%20oil.webp', category: 'Masala & Oils', hint: 'oil bottle', isVeg: true, packaging: 'Glass Bottle / Tin' },
    { id: 64, name: 'Tata Sampann Cumin Seeds (100 g)', price: 60, quantity: '100 g', image: 'https://storage.googleapis.com/aip-dev-images-public/Tata%20Sampan%20Cumin%20seeds.webp', category: 'Masala & Oils', hint: 'spices bowl', isVeg: true, packaging: 'Plastic Pouch' },
    { id: 93, name: 'Madhur Sugar (1 kg)', price: 55, quantity: '1 kg', image: 'https://storage.googleapis.com/aip-dev-images-public/product-sugar.png', category: 'Masala & Oils', hint: 'sugar pack', isVeg: true, packaging: 'Plastic Pouch' },
    { id: 94, name: 'Patanjali Jaggery Powder (500g)', price: 70, quantity: '500 g', image: 'https://storage.googleapis.com/aip-dev-images-public/Patanjali%20Jaggery%20Powder.jpeg', category: 'Masala & Oils', hint: 'jaggery powder', isVeg: true, packaging: 'Plastic Pouch' },
    { id: 97, name: 'Tata Salt Lite (1 kg)', price: 40, quantity: '1 kg', image: 'https://storage.googleapis.com/aip-dev-images-public/Tata%20Salt%20Lite.webp', category: 'Masala & Oils', hint: 'salt package', isVeg: true, packaging: 'Plastic Pouch' },

    // Dairy, Bread & Eggs
    { id: 3, name: 'Amul Milk Taaza (500 ml)', price: 28, quantity: '500 ml', image: 'https://storage.googleapis.com/aip-dev-images-public/33.%20Amul%20Gold%20Milk%20(500%20ml).jpeg', category: 'Dairy, Bread & Eggs', hint: 'milk carton', isVeg: true, packaging: 'Plastic Pouch' },
    { id: 107, name: 'Nandini Goodlife UHT Milk (500 ml)', price: 30, quantity: '500 ml', image: 'https://storage.googleapis.com/aip-dev-images-public/goodlife.png', category: 'Dairy, Bread & Eggs', hint: 'milk packet', isVeg: true, packaging: 'Tetra Pak Carton' },
    { id: 91, name: 'Amul Milk Taaza (1 L)', price: 55, quantity: '1 L', image: 'https://storage.googleapis.com/aip-dev-images-public/Amul%20milk%20taaza.webp', category: 'Dairy, Bread & Eggs', hint: 'milk carton', isVeg: true, packaging: 'Plastic Pouch' },
    { id: 6, name: 'Farm Fresh Eggs (1 dozen)', price: 72, salePrice: 60, quantity: '1 dozen', image: 'https://storage.googleapis.com/aip-dev-images-public/dozeneggs.png', category: 'Dairy, Bread & Eggs', hint: 'egg carton', isVeg: false, packaging: 'Cardboard Carton' },
    { id: 19, name: 'Britannia Brown Bread (400 g)', price: 45, quantity: '400 g', image: 'https://storage.googleapis.com/aip-dev-images-public/Britania%20Brown%20bread.jpeg', category: 'Dairy, Bread & Eggs', hint: 'bread loaf', isVeg: true, packaging: 'Plastic Bag' },
    { id: 20, name: 'Amul Butter (100 g)', price: 52, quantity: '100 g', image: 'https://storage.googleapis.com/aip-dev-images-public/amul%20butter%20100gms.webp', category: 'Dairy, Bread & Eggs', hint: 'butter stick', isVeg: true, packaging: 'Paper/Foil Wrap' },
    { id: 21, name: 'Nestle a+ Dahi (400 g)', price: 40, quantity: '400 g', image: 'https://storage.googleapis.com/aip-dev-images-public/Nestle%20a%2B%20Dahi%20(400%20g).jpeg', category: 'Dairy, Bread & Eggs', hint: 'yogurt cup', isVeg: true, packaging: 'Plastic Cup' },
    { id: 40, name: 'Amul Cheese Slices (200 g)', price: 120, salePrice: 105, quantity: '200 g', image: 'https://storage.googleapis.com/aip-dev-images-public/amul%20cheese%20slice.jpeg', category: 'Dairy, Bread & Eggs', hint: 'cheese slices', isVeg: true, packaging: 'Plastic Wrap' },
    { id: 41, name: 'Fresh Paneer (200 g)', price: 90, quantity: '200 g', image: 'https://storage.googleapis.com/aip-dev-images-public/FreshPaneer.png', category: 'Dairy, Bread & Eggs', hint: 'paneer block', isVeg: true, packaging: 'Plastic Pouch' },
    { id: 65, name: 'Amul Gold Milk (500 ml)', price: 33, quantity: '500 ml', image: 'https://storage.googleapis.com/aip-dev-images-public/33.%20Amul%20Gold%20Milk%20(500%20ml).jpeg', category: 'Dairy, Bread & Eggs', hint: 'milk packet', isVeg: true, packaging: 'Plastic Pouch' },
    { id: 66, name: 'Mother Dairy Ghee (1 L)', price: 550, quantity: '1 L', image: 'https://storage.googleapis.com/aip-dev-images-public/34.%20Mother%20Dairy%20Ghee%20(1%20L).jpeg', category: 'Dairy, Bread & Eggs', hint: 'ghee jar', isVeg: true, packaging: 'Tetra Pak Carton' },
    { id: 92, name: 'Amul Masti Dahi (400g)', price: 35, quantity: '400 g', image: 'https://storage.googleapis.com/aip-dev-images-public/35.%20Amul%20Masti%20Dahi%20(400g).jpeg', category: 'Dairy, Bread & Eggs', hint: 'yogurt cup', isVeg: true, packaging: 'Plastic Cup' },
    { id: 95, name: 'ID Fresh Idly & Dosa Batter (1 kg)', price: 85, quantity: '1 kg', image: 'https://storage.googleapis.com/aip-dev-images-public/36.%20ID%20Fresh%20Idly%20%26%20Dosa%20Batter%20(1%20kg).jpeg', category: 'Dairy, Bread & Eggs', hint: 'batter packet', isVeg: true, packaging: 'Plastic Pouch' },
    
    // Meat & Fish
    { id: 100, name: 'Fresh Chicken Breast (500 g)', price: 250, quantity: '500 g', image: 'https://storage.googleapis.com/aip-dev-images-public/37.%20Fresh%20Chicken%20Breast%20(500%20g).jpeg', category: 'Meat & Fish', hint: 'chicken breast', isVeg: false, packaging: 'Plastic Tray' },
    { id: 101, name: 'Mutton Curry Cut (500 g)', price: 400, salePrice: 380, quantity: '500 g', image: 'https://storage.googleapis.com/aip-dev-images-public/38.%20Mutton%20Curry%20Cut%20(500%20g).jpeg', category: 'Meat & Fish', hint: 'raw meat', isVeg: false, packaging: 'Plastic Tray' },
    { id: 102, name: 'Fresh Rohu Fish (1 kg)', price: 300, quantity: '1 kg', image: 'https://storage.googleapis.com/aip-dev-images-public/39.%20Fresh%20Rohu%20Fish%20(1%20kg).jpeg', category: 'Meat & Fish', hint: 'fresh fish', isVeg: false, packaging: 'Plastic Bag' },
    { id: 103, name: 'Fresh Chicken Curry Cut (1 kg)', price: 450, quantity: '1 kg', image: 'https://storage.googleapis.com/aip-dev-images-public/40.%20Fresh%20Chicken%20Curry%20Cut%20(1%20kg).jpeg', category: 'Meat & Fish', hint: 'chicken pieces', isVeg: false, packaging: 'Plastic Tray' },
    { id: 104, name: 'Fresh Chicken Boneless (500 g)', price: 280, salePrice: 260, quantity: '500 g', image: 'https://storage.googleapis.com/aip-dev-images-public/40.%20Fresh%20Chicken%20Curry%20Cut%20(1%20kg).jpeg', category: 'Meat & Fish', hint: 'boneless chicken', isVeg: false, packaging: 'Plastic Tray' },
    { id: 105, name: 'Mutton Biryani Cut (500 g)', price: 420, quantity: '500 g', image: 'https://storage.googleapis.com/aip-dev-images-public/42.%20Mutton%20Biryani%20Cut%20(500%20g).jpeg', category: 'Meat & Fish', hint: 'mutton pieces', isVeg: false, packaging: 'Plastic Tray' },

    // Vegetables & Fruits
    { id: 7, name: 'Fresh Onions (1 kg)', price: 40, quantity: '1 kg', image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=300&fit=crop', category: 'Vegetables & Fruits', hint: 'onions', isVeg: true, packaging: 'Net Bag' },
    { id: 8, name: 'Fresh Tomatoes (1 kg)', price: 30, quantity: '1 kg', image: 'https://images.unsplash.com/photo-1546470427-e5e4b92fbb5f?w=400&h=300&fit=crop', category: 'Vegetables & Fruits', hint: 'tomatoes', isVeg: true, packaging: 'Loose' },
    { id: 22, name: 'Fresh Potatoes (1 kg)', price: 35, quantity: '1 kg', image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=300&fit=crop', category: 'Vegetables & Fruits', hint: 'potatoes', isVeg: true, packaging: 'Net Bag' },
    { id: 23, name: 'Royal Gala Apples (1 kg)', price: 180, salePrice: 149, quantity: '1 kg', image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=300&fit=crop', category: 'Vegetables & Fruits', hint: 'apples', isVeg: true, packaging: 'Loose' },
    { id: 24, name: 'Robusta Bananas (1 dozen)', price: 50, quantity: '1 dozen', image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=300&fit=crop', category: 'Vegetables & Fruits', hint: 'bananas bunch', isVeg: true, packaging: 'Loose' },
    { id: 44, name: 'Fresh Coriander (1 bunch)', price: 10, quantity: '1 bunch', image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop', category: 'Vegetables & Fruits', hint: 'coriander leaves', isVeg: true, packaging: 'Loose' },
    { id: 45, name: 'Fresh Ginger (100 g)', price: 20, quantity: '100 g', image: 'https://images.unsplash.com/photo-1565282752661-89135e72d3db?w=400&h=300&fit=crop', category: 'Vegetables & Fruits', hint: 'ginger root', isVeg: true, packaging: 'Loose' },
    { id: 46, name: 'Fresh Garlic (100 g)', price: 25, quantity: '100 g', image: 'https://images.unsplash.com/photo-1553694632-65d3657eb5e5?w=400&h=300&fit=crop', category: 'Vegetables & Fruits', hint: 'garlic bulb', isVeg: true, packaging: 'Loose' },
    { id: 67, name: 'Fresh Cabbage (1 pc)', price: 30, quantity: '1 pc', image: 'https://images.unsplash.com/photo-1594282062491-d8cc4c36de8c?w=400&h=300&fit=crop', category: 'Vegetables & Fruits', hint: 'cabbage head', isVeg: true, packaging: 'Loose' },
    { id: 68, name: 'Fresh Cauliflower (1 pc)', price: 40, quantity: '1 pc', image: 'https://images.unsplash.com/photo-1568584711271-8a8b7e9b2d8e?w=400&h=300&fit=crop', category: 'Vegetables & Fruits', hint: 'cauliflower head', isVeg: true, packaging: 'Loose' },

    // Snacks & Beverages
    { id: 4, name: 'Parle-G Biscuits (1 pack)', price: 10, quantity: '1 pack', image: 'https://images.unsplash.com/photo-1549007197-62ac719ea2b1?w=400&h=300&fit=crop', category: 'Snacks & Beverages', hint: 'biscuit packet', isVeg: true, packaging: 'Plastic Wrap' },
    { id: 12, name: 'Lays Potato Chips (Classic Salted)', price: 20, salePrice: 18, quantity: 'Classic Salted', image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&h=300&fit=crop', category: 'Snacks & Beverages', hint: 'potato chips', isVeg: true, packaging: 'Plastic Bag' },
    { id: 25, name: 'Coca-Cola (1 L)', price: 55, quantity: '1 L', image: 'https://images.unsplash.com/photo-1561758033-48d52648ae8b?w=400&h=300&fit=crop', category: 'Snacks & Beverages', hint: 'soda bottle', isVeg: true, packaging: 'Plastic Bottle' },
    { id: 108, name: 'Paper Boat Aamras (200 ml)', price: 30, quantity: '200 ml', image: 'https://images.unsplash.com/photo-1571334893639-7e7e5d8b2e00?w=400&h=300&fit=crop', category: 'Snacks & Beverages', hint: 'juice pack', isVeg: true, packaging: 'Tetra Pak Carton' },
    { id: 26, name: 'Tata Tea Gold (1 kg)', price: 500, quantity: '1 kg', image: 'https://images.unsplash.com/photo-1563822249548-41c0df0e5e9c?w=400&h=300&fit=crop', category: 'Snacks & Beverages', hint: 'tea box', isVeg: true, packaging: 'Cardboard Box' },
    { id: 27, name: 'Nescafe Classic Coffee (100 g)', price: 300, quantity: '100 g', image: 'https://images.unsplash.com/photo-1559511260-66a654ae982a?w=400&h=300&fit=crop', category: 'Snacks & Beverages', hint: 'coffee jar', isVeg: true, packaging: 'Glass Jar' },
    { id: 36, name: 'Cadbury Dairy Milk (1 bar)', price: 45, quantity: '1 bar', image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=400&h=300&fit=crop', category: 'Snacks & Beverages', hint: 'chocolate bar', isVeg: true, packaging: 'Plastic Wrap' },
    { id: 37, name: "Haldiram's Aloo Bhujia (200 g)", price: 50, salePrice: 40, quantity: '200 g', image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=400&h=300&fit=crop', category: 'Snacks & Beverages', hint: 'indian snacks', isVeg: true, packaging: 'Plastic Bag' },
    { id: 38, name: 'Tropicana Orange Juice (1 L)', price: 120, quantity: '1 L', image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400&h=300&fit=crop', category: 'Snacks & Beverages', hint: 'juice carton', isVeg: true, packaging: 'Tetra Pak Carton' },
    { id: 39, name: 'Bru Instant Coffee (100 g)', price: 250, salePrice: 220, quantity: '100 g', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=300&fit=crop', category: 'Snacks & Beverages', hint: 'coffee jar', isVeg: true, packaging: 'Glass Jar' },
    { id: 69, name: 'Britannia Good Day (1 pack)', price: 35, quantity: '1 pack', image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&h=300&fit=crop', category: 'Snacks & Beverages', hint: 'biscuit packet', isVeg: true, packaging: 'Plastic Wrap' },
    { id: 70, name: 'Kissan Mixed Fruit Jam (500 g)', price: 150, quantity: '500 g', image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=400&h=300&fit=crop', category: 'Snacks & Beverages', hint: 'jam jar', isVeg: true, packaging: 'Glass Jar' },

    // Instant & Frozen Food
    { id: 9, name: 'Maggi 2-Min Noodles (1 pack)', price: 14, salePrice: 12, quantity: '1 pack', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop', category: 'Instant & Frozen Food', hint: 'instant noodles', isVeg: true, packaging: 'Plastic Wrap' },
    { id: 28, name: 'Knorr Classic Tomato Soup (1 pack)', price: 60, quantity: '1 pack', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop', category: 'Instant & Frozen Food', hint: 'soup packet', isVeg: true, packaging: 'Plastic Pouch' },
    { id: 29, name: 'McCain French Fries (420 g)', price: 99, quantity: '420 g', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop', category: 'Instant & Frozen Food', hint: 'frozen fries', isVeg: true, packaging: 'Plastic Bag' },
    { id: 53, name: 'Quaker Oats (1 kg)', price: 190, quantity: '1 kg', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop', category: 'Instant & Frozen Food', hint: 'oats box', isVeg: true, packaging: 'Cardboard Box' },
    { id: 54, name: 'Safal Frozen Peas (500 g)', price: 55, quantity: '500 g', image: 'https://images.unsplash.com/photo-1587735243615-c03f25aaff15?w=400&h=300&fit=crop', category: 'Instant & Frozen Food', hint: 'frozen peas', isVeg: true, packaging: 'Plastic Pouch' },
    { id: 71, name: 'MTR Ready to Eat Poha (160 g)', price: 75, quantity: '160 g', image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=300&fit=crop', category: 'Instant & Frozen Food', hint: 'ready meal', isVeg: true, packaging: 'Cardboard Box' },
    { id: 72, name: 'Gits Gulab Jamun Mix (200 g)', price: 120, quantity: '200 g', image: 'https://images.unsplash.com/photo-1571167530149-c9c4cba8b0e4?w=400&h=300&fit=crop', category: 'Instant & Frozen Food', hint: 'dessert mix', isVeg: true, packaging: 'Cardboard Box' },

    // Cleaning Essentials
    { id: 10, name: 'Surf Excel Detergent (1 kg)', price: 120, salePrice: 99, quantity: '1 kg', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop', category: 'Cleaning Essentials', hint: 'detergent box', isVeg: true, packaging: 'Cardboard Box' },
    { id: 30, name: 'Vim Dishwash Bar (1 pack)', price: 20, quantity: '1 pack', image: 'https://images.unsplash.com/photo-1563453392212-326d32d2d48f?w=400&h=300&fit=crop', category: 'Cleaning Essentials', hint: 'dish soap', isVeg: true, packaging: 'Paper Wrap' },
    { id: 31, name: 'Harpic Toilet Cleaner (500 ml)', price: 90, quantity: '500 ml', image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=300&fit=crop', category: 'Cleaning Essentials', hint: 'cleaner bottle', isVeg: true, packaging: 'Plastic Bottle' },
    { id: 32, name: 'Lizol Floor Cleaner (975 ml)', price: 190, quantity: '975 ml', image: 'https://images.unsplash.com/photo-1563453392212-326d32d2d48f?w=400&h=300&fit=crop', category: 'Cleaning Essentials', hint: 'cleaning supplies', isVeg: true, packaging: 'Plastic Bottle' },
    { id: 50, name: 'Good Knight Refill (45 ml)', price: 85, quantity: '45 ml', image: 'https://images.unsplash.com/photo-1597149752695-4d2f1d4b08e5?w=400&h=300&fit=crop', category: 'Cleaning Essentials', hint: 'mosquito repellent', isVeg: true, packaging: 'Plastic Refill' },
    { id: 51, name: 'Colin Glass Cleaner (500 ml)', price: 90, salePrice: 75, quantity: '500 ml', image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=300&fit=crop', category: 'Cleaning Essentials', hint: 'spray bottle', isVeg: true, packaging: 'Plastic Bottle' },
    { id: 73, name: 'Scotch-Brite Scrub Pad (1 pc)', price: 25, quantity: '1 pc', image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=300&fit=crop', category: 'Cleaning Essentials', hint: 'scouring pad', isVeg: true, packaging: 'Plastic Wrap' },
    { id: 74, name: 'All Out Refill (45 ml)', price: 80, quantity: '45 ml', image: 'https://images.unsplash.com/photo-1597149752695-4d2f1d4b08e5?w=400&h=300&fit=crop', category: 'Cleaning Essentials', hint: 'mosquito repellent', isVeg: true, packaging: 'Plastic Refill' },

    // Personal Care
    { id: 11, name: 'Dove Shampoo (340 ml)', price: 250, salePrice: 210, quantity: '340 ml', image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=300&fit=crop', category: 'Personal Care', hint: 'shampoo bottle', isVeg: true, packaging: 'Plastic Bottle' },
    { id: 33, name: 'Colgate MaxFresh Toothpaste (150 g)', price: 95, quantity: '150 g', image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400&h=300&fit=crop', category: 'Personal Care', hint: 'toothpaste tube', isVeg: true, packaging: 'Plastic Tube' },
    { id: 34, name: 'Lifebuoy Soap Bar (1 pack)', price: 30, quantity: '1 pack', image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=300&fit=crop', category: 'Personal Care', hint: 'soap bar', isVeg: true, packaging: 'Paper Wrap' },
    { id: 35, name: 'Gillette Mach3 Razor (1 unit)', price: 150, quantity: '1 unit', image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=400&h=300&fit=crop', category: 'Personal Care', hint: 'razor', isVeg: true, packaging: 'Plastic Blister Pack' },
    { id: 47, name: 'Himalaya Face Wash (150 ml)', price: 150, quantity: '150 ml', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=300&fit=crop', category: 'Personal Care', hint: 'face wash', isVeg: true, packaging: 'Plastic Tube' },
    { id: 48, name: 'Nivea Body Lotion (400 ml)', price: 300, quantity: '400 ml', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=300&fit=crop', category: 'Personal Care', hint: 'lotion bottle', isVeg: true, packaging: 'Plastic Bottle' },
    { id: 49, name: 'Dettol Handwash (200 ml)', price: 99, salePrice: 85, quantity: '200 ml', image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=300&fit=crop', category: 'Personal Care', hint: 'hand soap', isVeg: true, packaging: 'Plastic Bottle' },
    { id: 75, name: 'Medimix Ayurvedic Soap (125 g)', price: 40, quantity: '125 g', image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=300&fit=crop', category: 'Personal Care', hint: 'soap bar', isVeg: true, packaging: 'Paper Wrap' },
    { id: 76, name: 'Parachute Advansed Hair Oil (300 ml)', price: 180, quantity: '300 ml', image: 'https://images.unsplash.com/photo-1581618047331-b7e5f4f4a7a8?w=400&h=300&fit=crop', category: 'Personal Care', hint: 'oil bottle', isVeg: true, packaging: 'Plastic Bottle' },

    // Baby Care
    { id: 55, name: 'Pampers Diapers (M size 50 pack)', price: 500, salePrice: 450, quantity: 'M size 50 pack', image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400&h=300&fit=crop', category: 'Baby Care', hint: 'diapers pack', isVeg: true, packaging: 'Plastic Bag' },
    { id: 56, name: 'Cerelac Baby Food (300 g)', price: 250, quantity: '300 g', image: 'https://images.unsplash.com/photo-1518987439653-3265cc80e22e?w=400&h=300&fit=crop', category: 'Baby Care', hint: 'baby food', isVeg: true, packaging: 'Cardboard Box' },
    { id: 57, name: "Johnson's Baby Powder (200 g)", price: 150, quantity: '200 g', image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400&h=300&fit=crop', category: 'Baby Care', hint: 'baby powder', isVeg: true, packaging: 'Plastic Bottle' },
    { id: 58, name: 'Himalaya Baby Wipes (72 count)', price: 180, quantity: '72 count', image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400&h=300&fit=crop', category: 'Baby Care', hint: 'baby wipes', isVeg: true, packaging: 'Plastic Pouch' },
    { id: 77, name: "Johnson's Baby Soap (100 g)", price: 80, quantity: '100 g', image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400&h=300&fit=crop', category: 'Baby Care', hint: 'baby soap', isVeg: true, packaging: 'Paper Wrap' },
    { id: 78, name: 'Himalaya Baby Oil (200 ml)', price: 220, quantity: '200 ml', image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400&h=300&fit=crop', category: 'Baby Care', hint: 'baby oil', isVeg: true, packaging: 'Plastic Bottle' },

    // Home & Kitchen
    { id: 79, name: 'Prestige Pressure Cooker (3 L)', price: 1500, quantity: '3 L', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop', category: 'Home & Kitchen', hint: 'pressure cooker', isVeg: true, packaging: 'Cardboard Box' },
    { id: 80, name: 'Milton Water Bottle (1 L)', price: 350, salePrice: 300, quantity: '1 L', image: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400&h=300&fit=crop', category: 'Home & Kitchen', hint: 'water bottle', isVeg: true, packaging: 'Plastic Bottle' },
    { id: 81, name: 'Cello Storage Containers (Set of 3)', price: 500, quantity: 'Set of 3', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop', category: 'Home & Kitchen', hint: 'storage containers', isVeg: true, packaging: 'Cardboard Box' },
    { id: 82, name: 'Steel Tiffin Box (3-tier)', price: 450, quantity: '3-tier', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop', category: 'Home & Kitchen', hint: 'tiffin box', isVeg: true, packaging: 'None' },

    // Pooja Needs
    { id: 83, name: 'Cycle Agarbatti (100 sticks)', price: 70, quantity: '100 sticks', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop', category: 'Pooja Needs', hint: 'incense sticks', isVeg: true, packaging: 'Cardboard Box' },
    { id: 84, name: 'Mangaldeep Camphor (50 g)', price: 50, quantity: '50 g', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop', category: 'Pooja Needs', hint: 'camphor tablets', isVeg: true, packaging: 'Plastic Box' },
    { id: 85, name: 'Diya Pooja Oil (500 ml)', price: 120, quantity: '500 ml', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop', category: 'Pooja Needs', hint: 'oil lamp', isVeg: true, packaging: 'Plastic Bottle' },
    { id: 86, name: 'Cotton Wicks (Batti) (100 pcs)', price: 30, quantity: '100 pcs', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop', category: 'Pooja Needs', hint: 'cotton wicks', isVeg: true, packaging: 'Plastic Pouch' },
    
    // Party Supplies
    { id: 87, name: 'Birthday Candles (Pack of 12)', price: 40, quantity: 'Pack of 12', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop', category: 'Party Supplies', hint: 'birthday candles', isVeg: true, packaging: 'Cardboard Box' },
    { id: 88, name: 'Paper Plates (Pack of 50)', price: 100, quantity: 'Pack of 50', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop', category: 'Party Supplies', hint: 'paper plates', isVeg: true, packaging: 'Plastic Wrap' },
    { id: 89, name: 'Party Balloons (Pack of 50)', price: 150, salePrice: 120, quantity: 'Pack of 50', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop', category: 'Party Supplies', hint: 'balloons', isVeg: true, packaging: 'Plastic Bag' },
    { id: 90, name: 'Disposable Cups (Pack of 100)', price: 80, quantity: 'Pack of 100', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop', category: 'Party Supplies', hint: 'paper cups', isVeg: true, packaging: 'Plastic Wrap' }
];