'use client';

import { products, type Product } from '@/lib/products';
import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';
import type { ListParserOutputItem } from '@/ai/schemas/list-parser-schemas';

export interface CartItem extends Product {
  cartQuantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  addToCartBatch: (items: ListParserOutputItem[]) => void;
  itemCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  const addToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, cartQuantity: item.cartQuantity + 1 } : item
        );
      }
      // When adding a new item, use the sale price if it exists.
      const cartPrice = product.salePrice ?? product.price;
      return [...prevItems, { ...product, price: cartPrice, cartQuantity: 1 }];
    });
    toast({
      title: 'Added to Cart',
      description: `${product.name} has been added to your cart.`,
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === productId ? { ...item, cartQuantity: quantity } : item
        )
      );
    }
  };
  
  const removeFromCart = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const addToCartBatch = (items: ListParserOutputItem[]) => {
    const productsToAdd: CartItem[] = [];
    const notFoundItems: string[] = [];

    items.forEach(parsedItem => {
        const searchName = (parsedItem.englishProduct || parsedItem.product).toLowerCase();
        // Normalize by removing spaces and making it lowercase.
        const searchQuantity = parsedItem.quantity.toLowerCase().replace(/\s/g, '');

        // Attempt to find the best matching product from the available list by matching name and quantity/size.
        let foundProduct = products.find(p => 
            p.name.toLowerCase().includes(searchName) && 
            p.quantity.toLowerCase().replace(/\s/g, '') === searchQuantity
        );

        // If no exact match, try a more fuzzy match on the name that might include the quantity.
        if (!foundProduct) {
            foundProduct = products.find(p => 
                p.name.toLowerCase().includes(searchName) && 
                p.name.toLowerCase().replace(/\s/g, '').includes(searchQuantity)
            );
        }

        // If still not found, fall back to matching just the name. This is less accurate but better than nothing.
        if (!foundProduct) {
            foundProduct = products.find(p => p.name.toLowerCase().includes(searchName));
        }
        
        if (foundProduct) {
            // Each line item from the AI corresponds to ONE unit of that product.
            const quantityToAdd = 1;

            const existingProductInBatch = productsToAdd.find(p => p.id === foundProduct!.id);
            if (existingProductInBatch) {
                existingProductInBatch.cartQuantity += quantityToAdd;
            } else {
                // When adding a new item, use the sale price if it exists.
                const cartPrice = foundProduct.salePrice ?? foundProduct.price;
                productsToAdd.push({ ...foundProduct, price: cartPrice, cartQuantity: quantityToAdd });
            }
        } else {
            notFoundItems.push(`${parsedItem.product} ${parsedItem.quantity}`);
        }
    });

    setCartItems(prevItems => {
        const updatedItems = [...prevItems];

        productsToAdd.forEach(newItem => {
            const existingItemIndex = updatedItems.findIndex(item => item.id === newItem.id);
            if (existingItemIndex > -1) {
                updatedItems[existingItemIndex].cartQuantity += newItem.cartQuantity;
            } else {
                updatedItems.push(newItem);
            }
        });
        
        return updatedItems;
    });

    toast({
        title: "Items Added to Cart",
        description: `${productsToAdd.length} item types added from your list. ${notFoundItems.length > 0 ? `Could not find: ${notFoundItems.join(', ')}` : ''}`.trim(),
    });
  };

  const itemCount = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.cartQuantity, 0);
  }, [cartItems]);

  const cartTotal = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.price * item.cartQuantity, 0);
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        addToCartBatch,
        itemCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
