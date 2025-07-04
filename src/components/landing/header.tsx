"use client"

import Link from "next/link"
import { ShoppingCart, Menu, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"
import { WhatsAppIcon } from "../icons/whatsapp-icon"

export function Header() {
  const [isSheetOpen, setSheetOpen] = useState(false)

  const closeSheet = () => setSheetOpen(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <ShoppingCart className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold font-headline">SparkVoice</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link href="#problem" className="text-sm font-medium hover:text-primary transition-colors" prefetch={false}>The Problem</Link>
          <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors" prefetch={false}>Features</Link>
          <Link href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors" prefetch={false}>How It Works</Link>
          <Link href="#faq" className="text-sm font-medium hover:text-primary transition-colors" prefetch={false}>FAQ</Link>
          <Link href="/store" className="text-sm font-medium hover:text-primary transition-colors" prefetch={false}>Store</Link>
        </nav>
        <div className="hidden md:flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="tel:+910000000000">
              <Phone className="w-4 h-4" />
              Order by Call
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="https://wa.me/910000000000?text=Hi%2C%20I'd%20like%20to%20place%20an%20order%20with%20SparkVoice" target="_blank">
              <WhatsAppIcon className="w-4 h-4" />
              Order on WhatsApp
            </Link>
          </Button>
          <Button asChild size="sm" style={{ backgroundColor: "hsl(var(--accent))", color: "hsl(var(--accent-foreground))" }}>
            <Link href="/store">Get Started</Link>
          </Button>
        </div>
        <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="grid gap-4 p-4">
              <Link href="#" className="flex items-center gap-2" prefetch={false} onClick={closeSheet}>
                <ShoppingCart className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold font-headline">SparkVoice</span>
              </Link>
              <nav className="grid gap-2">
                <Link href="#problem" className="text-sm font-medium hover:text-primary transition-colors" prefetch={false} onClick={closeSheet}>The Problem</Link>
                <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors" prefetch={false} onClick={closeSheet}>Features</Link>
                <Link href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors" prefetch={false} onClick={closeSheet}>How It Works</Link>
                <Link href="#faq" className="text-sm font-medium hover:text-primary transition-colors" prefetch={false} onClick={closeSheet}>FAQ</Link>
                <Link href="/store" className="text-sm font-medium hover:text-primary transition-colors" prefetch={false} onClick={closeSheet}>Store</Link>
              </nav>
              <div className="flex flex-col gap-4 mt-4">
                 <Button variant="outline" asChild onClick={closeSheet}>
                   <Link href="tel:+910000000000">
                    <Phone className="w-5 h-5" />
                    Order by Call
                   </Link>
                </Button>
                <Button variant="outline" asChild onClick={closeSheet}>
                   <Link href="https://wa.me/910000000000?text=Hi%2C%20I'd%20like%20to%20place%20an%20order%20with%20SparkVoice" target="_blank">
                    <WhatsAppIcon className="w-5 h-5" />
                    Order on WhatsApp
                   </Link>
                </Button>
                <Button asChild style={{ backgroundColor: "hsl(var(--accent))", color: "hsl(var(--accent-foreground))" }} onClick={closeSheet}>
                  <Link href="/store">Get Started</Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
