"use client"

import Link from "next/link"
import { ShoppingCart, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"

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
        <div className="hidden md:flex items-center gap-4">
          <Button variant="outline">Request a Demo</Button>
          <Button asChild style={{ backgroundColor: "hsl(var(--accent))", color: "hsl(var(--accent-foreground))" }}>
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
                <Button variant="outline" onClick={closeSheet}>Request a Demo</Button>
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
