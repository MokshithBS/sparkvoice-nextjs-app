export interface Product {
    id: number;
    name: string;
    price: number;
    salePrice?: number;
    quantity: string;
    image: string;
    category: string;
    hint: string;
  }
  
  export const products: Product[] = [
    // Atta, Rice & Dals
    { id: 1, name: 'Aashirvaad Atta', price: 250, salePrice: 225, quantity: '5 kg', image: 'https://storage.googleapis.com/aip-dev-images-public/product-atta.png', category: 'Atta, Rice & Dals', hint: 'flour bag' },
    { id: 13, name: 'India Gate Basmati Rice', price: 650, quantity: '5 kg', image: 'https://storage.googleapis.com/aip-dev-images-public/product-basmati-rice.png', category: 'Atta, Rice & Dals', hint: 'rice bag' },
    { id: 14, name: 'Tata Sampann Toor Dal', price: 150, quantity: '1 kg', image: 'https://storage.googleapis.com/aip-dev-images-public/product-toor-dal.png', category: 'Atta, Rice & Dals', hint: 'lentils package' },
    { id: 15, name: 'Organic Moong Dal', price: 165, quantity: '1 kg', image: 'https://storage.googleapis.com/aip-dev-images-public/product-moong-dal.png', category: 'Atta, Rice & Dals', hint: 'lentils package' },
    { id: 52, name: 'Fortune Besan', price: 80, quantity: '1 kg', image: 'https://storage.googleapis.com/aip-dev-images-public/product-besan.png', category: 'Atta, Rice & Dals', hint: 'flour pack' },


    // Masala & Oils
    { id: 2, name: 'Tata Salt', price: 25, quantity: '1 kg', image: 'https://storage.googleapis.com/aip-dev-images-public/product-salt.png', category: 'Masala & Oils', hint: 'salt package' },
    { id: 5, name: 'Saffola Gold Oil', price: 180, salePrice: 159, quantity: '1 L', image: 'https://storage.googleapis.com/aip-dev-images-public/product-oil.png', category: 'Masala & Oils', hint: 'oil bottle' },
    { id: 16, name: 'Fortune Sun Lite Oil', price: 160, quantity: '1 L', image: 'https://storage.googleapis.com/aip-dev-images-public/product-sunflower-oil.png', category: 'Masala & Oils', hint: 'oil bottle' },
    { id: 17, name: 'Everest Turmeric Powder', price: 55, quantity: '200 g', image: 'https://storage.googleapis.com/aip-dev-images-public/product-turmeric.png', category: 'Masala & Oils', hint: 'spice powder' },
    { id: 18, name: 'MDH Deggi Mirch', price: 70, quantity: '100 g', image: 'https://storage.googleapis.com/aip-dev-images-public/product-chilli-powder.png', category: 'Masala & Oils', hint: 'spice powder' },
    { id: 42, name: 'Fortune Mustard Oil', price: 175, quantity: '1 L', image: 'https://storage.googleapis.com/aip-dev-images-public/product-mustard-oil.png', category: 'Masala & Oils', hint: 'oil bottle' },
    { id: 43, name: 'Catch Garam Masala', price: 80, quantity: '100 g', image: 'https://storage.googleapis.com/aip-dev-images-public/product-garam-masala.png', category: 'Masala & Oils', hint: 'spice box' },

    // Dairy, Bread & Eggs
    { id: 3, name: 'Amul Milk Taaza', price: 28, quantity: '500 ml', image: 'https://storage.googleapis.com/aip-dev-images-public/product-milk.png', category: 'Dairy, Bread & Eggs', hint: 'milk carton' },
    { id: 6, name: 'Farm Fresh Eggs', price: 72, salePrice: 60, quantity: '1 dozen', image: 'https://storage.googleapis.com/aip-dev-images-public/product-eggs.png', category: 'Dairy, Bread & Eggs', hint: 'egg carton' },
    { id: 19, name: 'Britannia Brown Bread', price: 45, quantity: '400 g', image: 'https://storage.googleapis.com/aip-dev-images-public/product-brown-bread.png', category: 'Dairy, Bread & Eggs', hint: 'bread loaf' },
    { id: 20, name: 'Amul Butter', price: 52, quantity: '100 g', image: 'https://storage.googleapis.com/aip-dev-images-public/product-butter.png', category: 'Dairy, Bread & Eggs', hint: 'butter stick' },
    { id: 21, name: 'Nestle a+ Dahi', price: 40, quantity: '400 g', image: 'https://storage.googleapis.com/aip-dev-images-public/product-yogurt.png', category: 'Dairy, Bread & Eggs', hint: 'yogurt cup' },
    { id: 40, name: 'Amul Cheese Slices', price: 120, salePrice: 105, quantity: '200 g', image: 'https://storage.googleapis.com/aip-dev-images-public/product-cheese.png', category: 'Dairy, Bread & Eggs', hint: 'cheese slices' },
    { id: 41, name: 'Fresh Paneer', price: 90, quantity: '200 g', image: 'https://storage.googleapis.com/aip-dev-images-public/product-paneer.png', category: 'Dairy, Bread & Eggs', hint: 'paneer block' },

    // Vegetables & Fruits
    { id: 7, name: 'Fresh Onions', price: 40, quantity: '1 kg', image: 'https://storage.googleapis.com/aip-dev-images-public/product-onions.png', category: 'Vegetables & Fruits', hint: 'onions' },
    { id: 8, name: 'Fresh Tomatoes', price: 30, quantity: '1 kg', image: 'https://storage.googleapis.com/aip-dev-images-public/product-tomatoes.png', category: 'Vegetables & Fruits', hint: 'tomatoes' },
    { id: 22, name: 'Fresh Potatoes', price: 35, quantity: '1 kg', image: 'https://storage.googleapis.com/aip-dev-images-public/product-potatoes.png', category: 'Vegetables & Fruits', hint: 'potatoes' },
    { id: 23, name: 'Royal Gala Apples', price: 180, salePrice: 149, quantity: '1 kg', image: 'https://storage.googleapis.com/aip-dev-images-public/product-apples.png', category: 'Vegetables & Fruits', hint: 'apples' },
    { id: 24, name: 'Robusta Bananas', price: 50, quantity: '1 dozen', image: 'https://storage.googleapis.com/aip-dev-images-public/product-bananas.png', category: 'Vegetables & Fruits', hint: 'bananas bunch' },
    { id: 44, name: 'Fresh Coriander', price: 10, quantity: '1 bunch', image: 'https://storage.googleapis.com/aip-dev-images-public/product-coriander.png', category: 'Vegetables & Fruits', hint: 'coriander leaves' },
    { id: 45, name: 'Fresh Ginger', price: 20, quantity: '100 g', image: 'https://storage.googleapis.com/aip-dev-images-public/product-ginger.png', category: 'Vegetables & Fruits', hint: 'ginger root' },
    { id: 46, name: 'Fresh Garlic', price: 25, quantity: '100 g', image: 'https://storage.googleapis.com/aip-dev-images-public/product-garlic.png', category: 'Vegetables & Fruits', hint: 'garlic bulb' },

    // Snacks & Beverages
    { id: 4, name: 'Parle-G Biscuits', price: 10, quantity: '1 pack', image: 'https://storage.googleapis.com/aip-dev-images-public/product-biscuit.png', category: 'Snacks & Beverages', hint: 'biscuit packet' },
    { id: 12, name: 'Lays Potato Chips', price: 20, salePrice: 18, quantity: 'Classic Salted', image: 'https://storage.googleapis.com/aip-dev-images-public/snacks.png', category: 'Snacks & Beverages', hint: 'potato chips' },
    { id: 25, name: 'Coca-Cola', price: 40, quantity: '750 ml', image: 'https://storage.googleapis.com/aip-dev-images-public/product-coke.png', category: 'Snacks & Beverages', hint: 'soda bottle' },
    { id: 26, name: 'Tata Tea Gold', price: 500, quantity: '1 kg', image: 'https://storage.googleapis.com/aip-dev-images-public/product-tea.png', category: 'Snacks & Beverages', hint: 'tea box' },
    { id: 27, name: 'Nescafe Classic Coffee', price: 300, quantity: '100 g', image: 'https://storage.googleapis.com/aip-dev-images-public/product-coffee.png', category: 'Snacks & Beverages', hint: 'coffee jar' },
    { id: 36, name: 'Cadbury Dairy Milk', price: 45, quantity: '1 bar', image: 'https://storage.googleapis.com/aip-dev-images-public/product-chocolate.png', category: 'Snacks & Beverages', hint: 'chocolate bar' },
    { id: 37, name: 'Haldiram\'s Aloo Bhujia', price: 50, quantity: '200 g', image: 'https://storage.googleapis.com/aip-dev-images-public/product-bhujia.png', category: 'Snacks & Beverages', hint: 'indian snacks' },
    { id: 38, name: 'Tropicana Orange Juice', price: 120, quantity: '1 L', image: 'https://storage.googleapis.com/aip-dev-images-public/product-juice.png', category: 'Snacks & Beverages', hint: 'juice carton' },
    { id: 39, name: 'Bru Instant Coffee', price: 250, salePrice: 220, quantity: '100 g', image: 'https://storage.googleapis.com/aip-dev-images-public/product-bru-coffee.png', category: 'Snacks & Beverages', hint: 'coffee jar' },

    // Instant & Frozen Food
    { id: 9, name: 'Maggi 2-Min Noodles', price: 14, salePrice: 12, quantity: '1 pack', image: 'https://storage.googleapis.com/aip-dev-images-public/product-maggi.png', category: 'Instant & Frozen Food', hint: 'instant noodles' },
    { id: 28, name: 'Knorr Classic Tomato Soup', price: 60, quantity: '1 pack', image: 'https://storage.googleapis.com/aip-dev-images-public/product-soup.png', category: 'Instant & Frozen Food', hint: 'soup packet' },
    { id: 29, name: 'McCain French Fries', price: 99, quantity: '420 g', image: 'https://storage.googleapis.com/aip-dev-images-public/frozen-food.png', category: 'Instant & Frozen Food', hint: 'frozen fries' },
    { id: 53, name: 'Quaker Oats', price: 190, quantity: '1 kg', image: 'https://storage.googleapis.com/aip-dev-images-public/product-oats.png', category: 'Instant & Frozen Food', hint: 'oats box' },
    { id: 54, name: 'Safal Frozen Peas', price: 55, quantity: '500 g', image: 'https://storage.googleapis.com/aip-dev-images-public/product-frozen-peas.png', category: 'Instant & Frozen Food', hint: 'frozen peas' },

    // Cleaning Essentials
    { id: 10, name: 'Surf Excel Detergent', price: 120, salePrice: 99, quantity: '1 kg', image: 'https://storage.googleapis.com/aip-dev-images-public/product-detergent.png', category: 'Cleaning Essentials', hint: 'detergent box' },
    { id: 30, name: 'Vim Dishwash Bar', price: 20, quantity: '1 pack', image: 'https://storage.googleapis.com/aip-dev-images-public/product-dishwash-bar.png', category: 'Cleaning Essentials', hint: 'dish soap' },
    { id: 31, name: 'Harpic Toilet Cleaner', price: 90, quantity: '500 ml', image: 'https://storage.googleapis.com/aip-dev-images-public/product-harpic.png', category: 'Cleaning Essentials', hint: 'cleaner bottle' },
    { id: 32, name: 'Lizol Floor Cleaner', price: 190, quantity: '975 ml', image: 'https://storage.googleapis.com/aip-dev-images-public/cleaning.png', category: 'Cleaning Essentials', hint: 'cleaning supplies' },
    { id: 50, name: 'Good Knight Refill', price: 85, quantity: '45 ml', image: 'https://storage.googleapis.com/aip-dev-images-public/product-good-knight.png', category: 'Cleaning Essentials', hint: 'mosquito repellent' },
    { id: 51, name: 'Colin Glass Cleaner', price: 90, salePrice: 75, quantity: '500 ml', image: 'https://storage.googleapis.com/aip-dev-images-public/product-colin.png', category: 'Cleaning Essentials', hint: 'spray bottle' },

    // Personal Care
    { id: 11, name: 'Dove Shampoo', price: 250, salePrice: 210, quantity: '340 ml', image: 'https://storage.googleapis.com/aip-dev-images-public/product-shampoo.png', category: 'Personal Care', hint: 'shampoo bottle' },
    { id: 33, name: 'Colgate MaxFresh Toothpaste', price: 95, quantity: '150 g', image: 'https://storage.googleapis.com/aip-dev-images-public/product-toothpaste.png', category: 'Personal Care', hint: 'toothpaste tube' },
    { id: 34, name: 'Lifebuoy Soap Bar', price: 30, quantity: '1 pack', image: 'https://storage.googleapis.com/aip-dev-images-public/personal-care.png', category: 'Personal Care', hint: 'soap bar' },
    { id: 35, name: 'Gillette Mach3 Razor', price: 150, quantity: '1 unit', image: 'https://storage.googleapis.com/aip-dev-images-public/product-razor.png', category: 'Personal Care', hint: 'razor' },
    { id: 47, name: 'Himalaya Face Wash', price: 150, quantity: '150 ml', image: 'https://storage.googleapis.com/aip-dev-images-public/product-face-wash.png', category: 'Personal Care', hint: 'face wash' },
    { id: 48, name: 'Nivea Body Lotion', price: 300, quantity: '400 ml', image: 'https://storage.googleapis.com/aip-dev-images-public/product-body-lotion.png', category: 'Personal Care', hint: 'lotion bottle' },
    { id: 49, name: 'Dettol Handwash', price: 99, salePrice: 85, quantity: '200 ml', image: 'https://storage.googleapis.com/aip-dev-images-public/product-handwash.png', category: 'Personal Care', hint: 'hand soap' },

    // Baby Care
    { id: 55, name: 'Pampers Diapers', price: 500, salePrice: 450, quantity: 'M size 50 pack', image: 'https://storage.googleapis.com/aip-dev-images-public/product-diapers.png', category: 'Baby Care', hint: 'diapers pack' },
    { id: 56, name: 'Cerelac Baby Food', price: 250, quantity: '300 g', image: 'https://storage.googleapis.com/aip-dev-images-public/product-baby-food.png', category: 'Baby Care', hint: 'baby food' },
    { id: 57, name: 'Johnson\'s Baby Powder', price: 150, quantity: '200 g', image: 'https://storage.googleapis.com/aip-dev-images-public/product-baby-powder.png', category: 'Baby Care', hint: 'baby powder' },
    { id: 58, name: 'Himalaya Baby Wipes', price: 180, quantity: '72 count', image: 'https://storage.googleapis.com/aip-dev-images-public/product-baby-wipes.png', category: 'Baby Care', hint: 'baby wipes' },
  ];
