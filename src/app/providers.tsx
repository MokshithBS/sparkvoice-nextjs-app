'use client';
import { CartProvider } from "@/context/cart-context";
import { LanguageProvider } from "@/context/language-context";
import { ThemeProvider } from "@/context/theme-context";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            <LanguageProvider>
                <CartProvider>{children}</CartProvider>
            </LanguageProvider>
        </ThemeProvider>
    );
}
