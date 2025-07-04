export interface Product {
    id: number;
    name: string;
    price: number;
    quantity: string;
    image: string;
    category: string;
    hint: string;
  }
  
  export const products: Product[] = [
    { id: 1, name: 'Aashirvaad Atta', price: 250, quantity: '5 kg', image: 'https://storage.googleapis.com/aip-dev-images-public/product-atta.png', category: 'Atta, Rice & Dals', hint: 'flour bag' },
    { id: 2, name: 'Tata Salt', price: 25, quantity: '1 kg', image: 'https://storage.googleapis.com/aip-dev-images-public/product-salt.png', category: 'Masala & Oils', hint: 'salt package' },
    { id: 3, name: 'Amul Milk', price: 28, quantity: '500 ml', image: 'https://storage.googleapis.com/aip-dev-images-public/product-milk.png', category: 'Dairy, Bread & Eggs', hint: 'milk carton' },
    { id: 4, name: 'Parle-G Biscuits', price: 10, quantity: '1 pack', image: 'https://storage.googleapis.com/aip-dev-images-public/product-biscuit.png', category: 'Snacks & Beverages', hint: 'biscuit packet' },
    { id: 5, name: 'Saffola Gold Oil', price: 180, quantity: '1 L', image: 'https://storage.googleapis.com/aip-dev-images-public/product-oil.png', category: 'Masala & Oils', hint: 'oil bottle' },
    { id: 6, name: 'Farm Fresh Eggs', price: 72, quantity: '1 dozen', image: 'https://storage.googleapis.com/aip-dev-images-public/product-eggs.png', category: 'Dairy, Bread & Eggs', hint: 'egg carton' },
    { id: 7, name: 'Fresh Onions', price: 40, quantity: '1 kg', image: 'https://storage.googleapis.com/aip-dev-images-public/product-onions.png', category: 'Vegetables & Fruits', hint: 'onions' },
    { id: 8, name: 'Fresh Tomatoes', price: 30, quantity: '1 kg', image: 'https://storage.googleapis.com/aip-dev-images-public/product-tomatoes.png', category: 'Vegetables & Fruits', hint: 'tomatoes' },
    { id: 9, name: 'Maggi Noodles', price: 14, quantity: '1 pack', image: 'https://storage.googleapis.com/aip-dev-images-public/product-maggi.png', category: 'Instant & Frozen Food', hint: 'instant noodles' },
    { id: 10, name: 'Surf Excel Detergent', price: 120, quantity: '1 kg', image: 'https://storage.googleapis.com/aip-dev-images-public/product-detergent.png', category: 'Cleaning Essentials', hint: 'detergent box' },
    { id: 11, name: 'Dove Shampoo', price: 250, quantity: '340 ml', image: 'https://storage.googleapis.com/aip-dev-images-public/product-shampoo.png', category: 'Personal Care', hint: 'shampoo bottle' },
    { id: 12, name: 'Lays Potato Chips', price: 20, quantity: '1 pack', image: 'https://storage.googleapis.com/aip-dev-images-public/snacks.png', category: 'Snacks & Beverages', hint: 'potato chips' },
  ];
  