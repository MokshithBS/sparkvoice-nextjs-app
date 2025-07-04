'use client';
import { CartProvider } from "@/context/cart-context";
import { LanguageProvider } from "@/context/language-context";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <LanguageProvider>
            <CartProvider>{children}</CartProvider>
        </LanguageProvider>
    );
}
