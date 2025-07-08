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
  }
  
  export const products: Product[] = [
    // Atta, Rice & Dals
    { id: 1, name: 'Aashirvaad Atta (5 kg)', price: 250, salePrice: 225, quantity: '5 kg', image: 'https://storage.googleapis.com/aip-dev-images-public/product-atta.png', category: 'Atta, Rice & Dals', hint: 'flour bag', isVeg: true },
    { id: 13, name: 'India Gate Basmati Rice (5 kg)', price: 650, quantity: '5 kg', image: 'https://storage.googleapis.com/aip-dev-images-public/product-basmati-rice.png', category: 'Atta, Rice & Dals', hint: 'rice bag', isVeg: true },
    { id: 106, name: 'India Gate Basmati Rice (1 kg)', price: 140, quantity: '1 kg', image: 'https://storage.googleapis.com/aip-dev-images-public/product-basmati-rice.png', category: 'Atta, Rice & Dals', hint: 'rice bag', isVeg: true },
    { id: 14, name: 'Tata Sampann Toor Dal (1 kg)', price: 150, quantity: '1 kg', image: 'https://storage.googleapis.com/aip-dev-images-public/product-toor-dal.png', category: 'Atta, Rice & Dals', hint: 'lentils package', isVeg: true },
    { id: 15, name: 'Organic Moong Dal (1 kg)', price: 165, quantity: '1 kg', image: 'https://storage.googleapis.com/aip-dev-images-public/product-moong-dal.png', category: 'Atta, Rice & Dals', hint: 'lentils package', isVeg: true },
    { id: 52, name: 'Fortune Besan (1 kg)', price: 80, quantity: '1 kg', image: 'https://storage.googleapis.com/aip-dev-images-public/product-besan.png', category: 'Atta, Rice & Dals', hint: 'flour pack', isVeg: true },
    { id: 59, name: 'Sona Masoori Rice (5 kg)', price: 550, quantity: '5 kg', image: 'https://storage.googleapis.com/aip-dev-images-public/product-sona-masoori.png', category: 'Atta, Rice & Dals', hint: 'rice bag', isVeg: true },
    { id: 60, name: 'Tata Sampann Chana Dal (1 kg)', price: 140, quantity: '1 kg', image: 'https://storage.googleapis.com/aip-dev-images-public/product-chana-dal.png', category: 'Atta, Rice & Dals', hint: 'lentils package', isVeg: true },
    { id: 61, name: 'MTR Rava/Sooji (500 g)', price: 45, quantity: '500 g', image: 'https://storage.googleapis.com/aip-dev-images-public/product-sooji.png', category: 'Atta, Rice & Dals', hint: 'semolina pack', isVeg: true },
    { id: 96, name: 'Tata Sampann Thick Poha (500g)', price: 40, quantity: '500 g', image: 'https://storage.googleapis.com/aip-dev-images-public/product-poha.png', category: 'Atta, Rice & Dals', hint: 'flattened rice', isVeg: true },

    // Masala & Oils
    { id: 2, name: 'Tata Salt (1 kg)', price: 25, quantity: '1 kg', image: 'https://storage.googleapis.com/aip-dev-images-public/product-salt.png', category: 'Masala & Oils', hint: 'salt package', isVeg: true },
    { id: 5, name: 'Saffola Gold Oil (1 L)', price: 180, salePrice: 159, quantity: '1 L', image: 'https://storage.googleapis.com/aip-dev-images-public/product-oil.png', category: 'Masala & Oils', hint: 'oil bottle', isVeg: true },
    { id: 16, name: 'Fortune Sun Lite Oil (1 L)', price: 160, quantity: '1 L', image: 'https://storage.googleapis.com/aip-dev-images-public/product-sunflower-oil.png', category: 'Masala & Oils', hint: 'oil bottle', isVeg: true },
    { id: 17, name: 'Everest Turmeric Powder (200 g)', price: 55, quantity: '200 g', image: 'https://storage.googleapis.com/aip-dev-images-public/product-turmeric.png', category: 'Masala & Oils', hint: 'spice powder', isVeg: true },
    { id: 18, name: 'MDH Deggi Mirch (100 g)', price: 70, quantity: '100 g', image: 'https://storage.googleapis.com/aip-dev-images-public/product-chilli-powder.png', category: 'Masala & Oils', hint: 'spice powder', isVeg: true },
    { id: 42, name: 'Fortune Mustard Oil (1 L)', price: 175, quantity: '1 L', image: 'https://storage.googleapis.com/aip-dev-images-public/product-mustard-oil.png', category: 'Masala & Oils', hint: 'oil bottle', isVeg: true },
    { id: 43, name: 'Catch Garam Masala (100 g)', price: 80, quantity: '100 g', image: 'https://storage.googleapis.com/aip-dev-images-public/product-garam-masala.png', category: 'Masala & Oils', hint: 'spice box', isVeg: true },
    { id: 62, name: 'Parachute Coconut Oil (500 ml)', price: 150, quantity: '500 ml', image: 'https://storage.googleapis.com/aip-dev-images-public/product-coconut-oil.png', category: 'Masala & Oils', hint: 'oil bottle', isVeg: true },
    { id: 63, name: 'Figaro Olive Oil (500 ml)', price: 450, quantity: '500 ml', image: 'https://storage.googleapis.com/aip-dev-images-public/product-olive-oil.png', category: 'Masala & Oils', hint: 'oil bottle', isVeg: true },
    { id: 64, name: 'Tata Sampann Cumin Seeds (100 g)', price: 60, quantity: '100 g', image: 'https://storage.googleapis.com/aip-dev-images-public/product-cumin.png', category: 'Masala & Oils', hint: 'spices bowl', isVeg: true },
    { id: 93, name: 'Madhur Sugar (1 kg)', price: 55, quantity: '1 kg', image: 'https://storage.googleapis.com/aip-dev-images-public/product-sugar.png', category: 'Masala & Oils', hint: 'sugar pack', isVeg: true },
    { id: 94, name: 'Patanjali Jaggery Powder (500g)', price: 70, quantity: '500 g', image: 'https://storage.googleapis.com/aip-dev-images-public/product-jaggery.png', category: 'Masala & Oils', hint: 'jaggery powder', isVeg: true },
    { id: 97, name: 'Tata Salt Lite (1 kg)', price: 40, quantity: '1 kg', image: 'https://storage.googleapis.com/aip-dev-images-public/product-salt-lite.png', category: 'Masala & Oils', hint: 'salt package', isVeg: true },

    // Dairy, Bread & Eggs
    { id: 3, name: 'Amul Milk Taaza (500 ml)', price: 28, quantity: '500 ml', image: 'https://storage.googleapis.com/aip-dev-images-public/product-milk.png', category: 'Dairy, Bread & Eggs', hint: 'milk carton', isVeg: true },
    { id: 107, name: 'Nandini Goodlife UHT Milk (500 ml)', price: 30, quantity: '500 ml', image: 'https://storage.googleapis.com/aip-dev-images-public/product-nandini-milk.png', category: 'Dairy, Bread & Eggs', hint: 'milk packet', isVeg: true },
    { id: 91, name: 'Amul Milk Taaza (1 L)', price: 55, quantity: '1 L', image: 'https://storage.googleapis.com/aip-dev-images-public/product-milk.png', category: 'Dairy, Bread & Eggs', hint: 'milk carton', isVeg: true },
    { id: 6, name: 'Farm Fresh Eggs (1 dozen)', price: 72, salePrice: 60, quantity: '1 dozen', image: 'https://storage.googleapis.com/aip-dev-images-public/product-eggs.png', category: 'Dairy, Bread & Eggs', hint: 'egg carton', isVeg: false },
    { id: 19, name: 'Britannia Brown Bread (400 g)', price: 45, quantity: '400 g', image: 'https://storage.googleapis.com/aip-dev-images-public/product-brown-bread.png', category: 'Dairy, Bread & Eggs', hint: 'bread loaf', isVeg: true },
    { id: 20, name: 'Amul Butter (100 g)', price: 52, quantity: '100 g', image: 'https://storage.googleapis.com/aip-dev-images-public/product-butter.png', category: 'Dairy, Bread & Eggs', hint: 'butter stick', isVeg: true },
    { id: 21, name: 'Nestle a+ Dahi (400 g)', price: 40, quantity: '400 g', image: 'https://storage.googleapis.com/aip-dev-images-public/product-yogurt.png', category: 'Dairy, Bread & Eggs', hint: 'yogurt cup', isVeg: true },
    { id: 40, name: 'Amul Cheese Slices (200 g)', price: 120, salePrice: 105, quantity: '200 g', image: 'https://storage.googleapis.com/aip-dev-images-public/product-cheese.png', category: 'Dairy, Bread & Eggs', hint: 'cheese slices', isVeg: true },
    { id: 41, name: 'Fresh Paneer (200 g)', price: 90, quantity: '200 g', image: 'https://storage.googleapis.com/aip-dev-images-public/product-paneer.png', category: 'Dairy, Bread & Eggs', hint: 'paneer block', isVeg: true },
    { id: 65, name: 'Amul Gold Milk (500 ml)', price: 33, quantity: '500 ml', image: 'https://storage.googleapis.com/aip-dev-images-public/product-amul-gold.png', category: 'Dairy, Bread & Eggs', hint: 'milk packet', isVeg: true },
    { id: 66, name: 'Mother Dairy Ghee (1 L)', price: 550, quantity: '1 L', image: 'https://storage.googleapis.com/aip-dev-images-public/product-ghee.png', category: 'Dairy, Bread & Eggs', hint: 'ghee jar', isVeg: true },
    { id: 92, name: 'Amul Masti Dahi (400g)', price: 35, quantity: '400 g', image: 'https://storage.googleapis.com/aip-dev-images-public/product-dahi.png', category: 'Dairy, Bread & Eggs', hint: 'yogurt cup', isVeg: true },
    { id: 95, name: 'ID Fresh Idly & Dosa Batter (1 kg)', price: 85, quantity: '1 kg', image: 'https://storage.googleapis.com/aip-dev-images-public/product-id-batter.png', category: 'Dairy, Bread & Eggs', hint: 'batter packet', isVeg: true },
    
    // Meat & Fish
    { id: 100, name: 'Fresh Chicken Breast (500 g)', price: 250, quantity: '500 g', image: 'https://storage.googleapis.com/aip-dev-images-public/product-chicken.png', category: 'Meat & Fish', hint: 'chicken breast', isVeg: false },
    { id: 101, name: 'Mutton Curry Cut (500 g)', price: 400, salePrice: 380, quantity: '500 g', image: 'https://storage.googleapis.com/aip-dev-images-public/product-mutton.png', category: 'Meat & Fish', hint: 'raw meat', isVeg: false },
    { id: 102, name: 'Fresh Rohu Fish (1 kg)', price: 300, quantity: '1 kg', image: 'https://storage.googleapis.com/aip-dev-images-public/product-fish.png', category: 'Meat & Fish', hint: 'fresh fish', isVeg: false },
    { id: 103, name: 'Fresh Chicken Curry Cut (1 kg)', price: 450, quantity: '1 kg', image: 'https://storage.googleapis.com/aip-dev-images-public/product-chicken-curry.png', category: 'Meat & Fish', hint: 'chicken pieces', isVeg: false },
    { id: 104, name: 'Fresh Chicken Boneless (500 g)', price: 280, salePrice: 260, quantity: '500 g', image: 'https://storage.googleapis.com/aip-dev-images-public/product-chicken-boneless.png', category: 'Meat & Fish', hint: 'boneless chicken', isVeg: false },
    { id: 105, name: 'Mutton Biryani Cut (500 g)', price: 420, quantity: '500 g', image: 'https://storage.googleapis.com/aip-dev-images-public/product-mutton-biryani.png', category: 'Meat & Fish', hint: 'mutton pieces', isVeg: false },

    // Vegetables & Fruits
    { id: 7, name: 'Fresh Onions (1 kg)', price: 40, quantity: '1 kg', image: 'https://storage.googleapis.com/aip-dev-images-public/product-onions.png', category: 'Vegetables & Fruits', hint: 'onions', isVeg: true },
    { id: 8, name: 'Fresh Tomatoes (1 kg)', price: 30, quantity: '1 kg', image: 'https://storage.googleapis.com/aip-dev-images-public/product-tomatoes.png', category: 'Vegetables & Fruits', hint: 'tomatoes', isVeg: true },
    { id: 22, name: 'Fresh Potatoes (1 kg)', price: 35, quantity: '1 kg', image: 'https://storage.googleapis.com/aip-dev-images-public/product-potatoes.png', category: 'Vegetables & Fruits', hint: 'potatoes', isVeg: true },
    { id: 23, name: 'Royal Gala Apples (1 kg)', price: 180, salePrice: 149, quantity: '1 kg', image: 'https://storage.googleapis.com/aip-dev-images-public/product-apples.png', category: 'Vegetables & Fruits', hint: 'apples', isVeg: true },
    { id: 24, name: 'Robusta Bananas (1 dozen)', price: 50, quantity: '1 dozen', image: 'https://storage.googleapis.com/aip-dev-images-public/product-bananas.png', category: 'Vegetables & Fruits', hint: 'bananas bunch', isVeg: true },
    { id: 44, name: 'Fresh Coriander (1 bunch)', price: 10, quantity: '1 bunch', image: 'https://storage.googleapis.com/aip-dev-images-public/product-coriander.png', category: 'Vegetables & Fruits', hint: 'coriander leaves', isVeg: true },
    { id: 45, name: 'Fresh Ginger (100 g)', price: 20, quantity: '100 g', image: 'https://storage.googleapis.com/aip-dev-images-public/product-ginger.png', category: 'Vegetables & Fruits', hint: 'ginger root', isVeg: true },
    { id: 46, name: 'Fresh Garlic (100 g)', price: 25, quantity: '100 g', image: 'https://storage.googleapis.com/aip-dev-images-public/product-garlic.png', category: 'Vegetables & Fruits', hint: 'garlic bulb', isVeg: true },
    { id: 67, name: 'Fresh Cabbage (1 pc)', price: 30, quantity: '1 pc', image: 'https://storage.googleapis.com/aip-dev-images-public/product-cabbage.png', category: 'Vegetables & Fruits', hint: 'cabbage head', isVeg: true },
    { id: 68, name: 'Fresh Cauliflower (1 pc)', price: 40, quantity: '1 pc', image: 'https://storage.googleapis.com/aip-dev-images-public/product-cauliflower.png', category: 'Vegetables & Fruits', hint: 'cauliflower head', isVeg: true },

    // Snacks & Beverages
    { id: 4, name: 'Parle-G Biscuits (1 pack)', price: 10, quantity: '1 pack', image: 'https://storage.googleapis.com/aip-dev-images-public/product-biscuit.png', category: 'Snacks & Beverages', hint: 'biscuit packet', isVeg: true },
    { id: 12, name: 'Lays Potato Chips (Classic Salted)', price: 20, salePrice: 18, quantity: 'Classic Salted', image: 'https://storage.googleapis.com/aip-dev-images-public/snacks.png', category: 'Snacks & Beverages', hint: 'potato chips', isVeg: true },
    { id: 25, name: 'Coca-Cola (750 ml)', price: 40, quantity: '750 ml', image: 'https://storage.googleapis.com/aip-dev-images-public/product-coke.png', category: 'Snacks & Beverages', hint: 'soda bottle', isVeg: true },
    { id: 26, name: 'Tata Tea Gold (1 kg)', price: 500, quantity: '1 kg', image: 'https://storage.googleapis.com/aip-dev-images-public/product-tea.png', category: 'Snacks & Beverages', hint: 'tea box', isVeg: true },
    { id: 27, name: 'Nescafe Classic Coffee (100 g)', price: 300, quantity: '100 g', image: 'https://storage.googleapis.com/aip-dev-images-public/product-coffee.png', category: 'Snacks & Beverages', hint: 'coffee jar', isVeg: true },
    { id: 36, name: 'Cadbury Dairy Milk (1 bar)', price: 45, quantity: '1 bar', image: 'https://storage.googleapis.com/aip-dev-images-public/product-chocolate.png', category: 'Snacks & Beverages', hint: 'chocolate bar', isVeg: true },
    { id: 37, name: "Haldiram's Aloo Bhujia (200 g)", price: 50, quantity: '200 g', image: 'https://storage.googleapis.com/aip-dev-images-public/product-bhujia.png', category: 'Snacks & Beverages', hint: 'indian snacks', isVeg: true },
    { id: 38, name: 'Tropicana Orange Juice (1 L)', price: 120, quantity: '1 L', image: 'https://storage.googleapis.com/aip-dev-images-public/product-juice.png', category: 'Snacks & Beverages', hint: 'juice carton', isVeg: true },
    { id: 39, name: 'Bru Instant Coffee (100 g)', price: 250, salePrice: 220, quantity: '100 g', image: 'https://storage.googleapis.com/aip-dev-images-public/product-bru-coffee.png', category: 'Snacks & Beverages', hint: 'coffee jar', isVeg: true },
    { id: 69, name: 'Britannia Good Day (1 pack)', price: 35, quantity: '1 pack', image: 'https://storage.googleapis.com/aip-dev-images-public/product-good-day.png', category: 'Snacks & Beverages', hint: 'biscuit packet', isVeg: true },
    { id: 70, name: 'Kissan Mixed Fruit Jam (500 g)', price: 150, quantity: '500 g', image: 'https://storage.googleapis.com/aip-dev-images-public/product-jam.png', category: 'Snacks & Beverages', hint: 'jam jar', isVeg: true },

    // Instant & Frozen Food
    { id: 9, name: 'Maggi 2-Min Noodles (1 pack)', price: 14, salePrice: 12, quantity: '1 pack', image: 'https://storage.googleapis.com/aip-dev-images-public/product-maggi.png', category: 'Instant & Frozen Food', hint: 'instant noodles', isVeg: true },
    { id: 28, name: 'Knorr Classic Tomato Soup (1 pack)', price: 60, quantity: '1 pack', image: 'https://storage.googleapis.com/aip-dev-images-public/product-soup.png', category: 'Instant & Frozen Food', hint: 'soup packet', isVeg: true },
    { id: 29, name: 'McCain French Fries (420 g)', price: 99, quantity: '420 g', image: 'https://storage.googleapis.com/aip-dev-images-public/frozen-food.png', category: 'Instant & Frozen Food', hint: 'frozen fries', isVeg: true },
    { id: 53, name: 'Quaker Oats (1 kg)', price: 190, quantity: '1 kg', image: 'https://storage.googleapis.com/aip-dev-images-public/product-oats.png', category: 'Instant & Frozen Food', hint: 'oats box', isVeg: true },
    { id: 54, name: 'Safal Frozen Peas (500 g)', price: 55, quantity: '500 g', image: 'https://storage.googleapis.com/aip-dev-images-public/product-frozen-peas.png', category: 'Instant & Frozen Food', hint: 'frozen peas', isVeg: true },
    { id: 71, name: 'MTR Ready to Eat Poha (160 g)', price: 75, quantity: '160 g', image: 'https://storage.googleapis.com/aip-dev-images-public/product-poha.png', category: 'Instant & Frozen Food', hint: 'ready meal', isVeg: true },
    { id: 72, name: 'Gits Gulab Jamun Mix (200 g)', price: 120, quantity: '200 g', image: 'https://storage.googleapis.com/aip-dev-images-public/product-gulab-jamun-mix.png', category: 'Instant & Frozen Food', hint: 'dessert mix', isVeg: true },

    // Cleaning Essentials
    { id: 10, name: 'Surf Excel Detergent (1 kg)', price: 120, salePrice: 99, quantity: '1 kg', image: 'https://storage.googleapis.com/aip-dev-images-public/product-detergent.png', category: 'Cleaning Essentials', hint: 'detergent box', isVeg: true },
    { id: 30, name: 'Vim Dishwash Bar (1 pack)', price: 20, quantity: '1 pack', image: 'https://storage.googleapis.com/aip-dev-images-public/product-dishwash-bar.png', category: 'Cleaning Essentials', hint: 'dish soap', isVeg: true },
    { id: 31, name: 'Harpic Toilet Cleaner (500 ml)', price: 90, quantity: '500 ml', image: 'https://storage.googleapis.com/aip-dev-images-public/product-harpic.png', category: 'Cleaning Essentials', hint: 'cleaner bottle', isVeg: true },
    { id: 32, name: 'Lizol Floor Cleaner (975 ml)', price: 190, quantity: '975 ml', image: 'https://storage.googleapis.com/aip-dev-images-public/cleaning.png', category: 'Cleaning Essentials', hint: 'cleaning supplies', isVeg: true },
    { id: 50, name: 'Good Knight Refill (45 ml)', price: 85, quantity: '45 ml', image: 'https://storage.googleapis.com/aip-dev-images-public/product-good-knight.png', category: 'Cleaning Essentials', hint: 'mosquito repellent', isVeg: true },
    { id: 51, name: 'Colin Glass Cleaner (500 ml)', price: 90, salePrice: 75, quantity: '500 ml', image: 'https://storage.googleapis.com/aip-dev-images-public/product-colin.png', category: 'Cleaning Essentials', hint: 'spray bottle', isVeg: true },
    { id: 73, name: 'Scotch-Brite Scrub Pad (1 pc)', price: 25, quantity: '1 pc', image: 'https://storage.googleapis.com/aip-dev-images-public/product-scrub-pad.png', category: 'Cleaning Essentials', hint: 'scouring pad', isVeg: true },
    { id: 74, name: 'All Out Refill (45 ml)', price: 80, quantity: '45 ml', image: 'https://storage.googleapis.com/aip-dev-images-public/product-all-out.png', category: 'Cleaning Essentials', hint: 'mosquito repellent', isVeg: true },

    // Personal Care
    { id: 11, name: 'Dove Shampoo (340 ml)', price: 250, salePrice: 210, quantity: '340 ml', image: 'https://storage.googleapis.com/aip-dev-images-public/product-shampoo.png', category: 'Personal Care', hint: 'shampoo bottle', isVeg: true },
    { id: 33, name: 'Colgate MaxFresh Toothpaste (150 g)', price: 95, quantity: '150 g', image: 'https://storage.googleapis.com/aip-dev-images-public/product-toothpaste.png', category: 'Personal Care', hint: 'toothpaste tube', isVeg: true },
    { id: 34, name: 'Lifebuoy Soap Bar (1 pack)', price: 30, quantity: '1 pack', image: 'https://storage.googleapis.com/aip-dev-images-public/personal-care.png', category: 'Personal Care', hint: 'soap bar', isVeg: true },
    { id: 35, name: 'Gillette Mach3 Razor (1 unit)', price: 150, quantity: '1 unit', image: 'https://storage.googleapis.com/aip-dev-images-public/product-razor.png', category: 'Personal Care', hint: 'razor', isVeg: true },
    { id: 47, name: 'Himalaya Face Wash (150 ml)', price: 150, quantity: '150 ml', image: 'https://storage.googleapis.com/aip-dev-images-public/product-face-wash.png', category: 'Personal Care', hint: 'face wash', isVeg: true },
    { id: 48, name: 'Nivea Body Lotion (400 ml)', price: 300, quantity: '400 ml', image: 'https://storage.googleapis.com/aip-dev-images-public/product-body-lotion.png', category: 'Personal Care', hint: 'lotion bottle', isVeg: true },
    { id: 49, name: 'Dettol Handwash (200 ml)', price: 99, salePrice: 85, quantity: '200 ml', image: 'https://storage.googleapis.com/aip-dev-images-public/product-handwash.png', category: 'Personal Care', hint: 'hand soap', isVeg: true },
    { id: 75, name: 'Medimix Ayurvedic Soap (125 g)', price: 40, quantity: '125 g', image: 'https://storage.googleapis.com/aip-dev-images-public/product-medimix.png', category: 'Personal Care', hint: 'soap bar', isVeg: true },
    { id: 76, name: 'Parachute Advansed Hair Oil (300 ml)', price: 180, quantity: '300 ml', image: 'https://storage.googleapis.com/aip-dev-images-public/product-hair-oil.png', category: 'Personal Care', hint: 'oil bottle', isVeg: true },

    // Baby Care
    { id: 55, name: 'Pampers Diapers (M size 50 pack)', price: 500, salePrice: 450, quantity: 'M size 50 pack', image: 'https://storage.googleapis.com/aip-dev-images-public/product-diapers.png', category: 'Baby Care', hint: 'diapers pack', isVeg: true },
    { id: 56, name: 'Cerelac Baby Food (300 g)', price: 250, quantity: '300 g', image: 'https://storage.googleapis.com/aip-dev-images-public/product-baby-food.png', category: 'Baby Care', hint: 'baby food', isVeg: true },
    { id: 57, name: "Johnson's Baby Powder (200 g)", price: 150, quantity: '200 g', image: 'https://storage.googleapis.com/aip-dev-images-public/product-baby-powder.png', category: 'Baby Care', hint: 'baby powder', isVeg: true },
    { id: 58, name: 'Himalaya Baby Wipes (72 count)', price: 180, quantity: '72 count', image: 'https://storage.googleapis.com/aip-dev-images-public/product-baby-wipes.png', category: 'Baby Care', hint: 'baby wipes', isVeg: true },
    { id: 77, name: "Johnson's Baby Soap (100 g)", price: 80, quantity: '100 g', image: 'https://storage.googleapis.com/aip-dev-images-public/product-baby-soap.png', category: 'Baby Care', hint: 'baby soap', isVeg: true },
    { id: 78, name: 'Himalaya Baby Oil (200 ml)', price: 220, quantity: '200 ml', image: 'https://storage.googleapis.com/aip-dev-images-public/product-baby-oil.png', category: 'Baby Care', hint: 'baby oil', isVeg: true },

    // Home & Kitchen
    { id: 79, name: 'Prestige Pressure Cooker (3 L)', price: 1500, quantity: '3 L', image: 'https://storage.googleapis.com/aip-dev-images-public/product-pressure-cooker.png', category: 'Home & Kitchen', hint: 'pressure cooker', isVeg: true },
    { id: 80, name: 'Milton Water Bottle (1 L)', price: 350, salePrice: 300, quantity: '1 L', image: 'https://storage.googleapis.com/aip-dev-images-public/product-water-bottle.png', category: 'Home & Kitchen', hint: 'water bottle', isVeg: true },
    { id: 81, name: 'Cello Storage Containers (Set of 3)', price: 500, quantity: 'Set of 3', image: 'https://storage.googleapis.com/aip-dev-images-public/product-containers.png', category: 'Home & Kitchen', hint: 'storage containers', isVeg: true },
    { id: 82, name: 'Steel Tiffin Box (3-tier)', price: 450, quantity: '3-tier', image: 'https://storage.googleapis.com/aip-dev-images-public/product-tiffin-box.png', category: 'Home & Kitchen', hint: 'tiffin box', isVeg: true },

    // Pooja Needs
    { id: 83, name: 'Cycle Agarbatti (100 sticks)', price: 70, quantity: '100 sticks', image: 'https://storage.googleapis.com/aip-dev-images-public/product-agarbatti.png', category: 'Pooja Needs', hint: 'incense sticks', isVeg: true },
    { id: 84, name: 'Mangaldeep Camphor (50 g)', price: 50, quantity: '50 g', image: 'https://storage.googleapis.com/aip-dev-images-public/product-camphor.png', category: 'Pooja Needs', hint: 'camphor tablets', isVeg: true },
    { id: 85, name: 'Diya Pooja Oil (500 ml)', price: 120, quantity: '500 ml', image: 'https://storage.googleapis.com/aip-dev-images-public/product-pooja-oil.png', category: 'Pooja Needs', hint: 'oil lamp', isVeg: true },
    { id: 86, name: 'Cotton Wicks (Batti) (100 pcs)', price: 30, quantity: '100 pcs', image: 'https://storage.googleapis.com/aip-dev-images-public/product-cotton-wicks.png', category: 'Pooja Needs', hint: 'cotton wicks', isVeg: true },
    
    // Party Supplies
    { id: 87, name: 'Birthday Candles (Pack of 12)', price: 40, quantity: 'Pack of 12', image: 'https://storage.googleapis.com/aip-dev-images-public/product-candles.png', category: 'Party Supplies', hint: 'birthday candles', isVeg: true },
    { id: 88, name: 'Paper Plates (Pack of 50)', price: 100, quantity: 'Pack of 50', image: 'https://storage.googleapis.com/aip-dev-images-public/product-paper-plates.png', category: 'Party Supplies', hint: 'paper plates', isVeg: true },
    { id: 89, name: 'Party Balloons (Pack of 50)', price: 150, salePrice: 120, quantity: 'Pack of 50', image: 'https://storage.googleapis.com/aip-dev-images-public/product-balloons.png', category: 'Party Supplies', hint: 'balloons', isVeg: true },
    { id: 90, name: 'Disposable Cups (Pack of 100)', price: 80, quantity: 'Pack of 100', image: 'https://storage.googleapis.com/aip-dev-images-public/product-disposable-cups.png', category: 'Party Supplies', hint: 'paper cups', isVeg: true },
  ];
