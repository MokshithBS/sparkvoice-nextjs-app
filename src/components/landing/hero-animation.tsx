
'use client';

import { Camera, FileText, Mic, ShoppingCart, Sparkles } from 'lucide-react';

export function HeroAnimation() {
  return (
    <div className="relative w-full max-w-md mx-auto lg:max-w-lg aspect-square flex items-center justify-center">
      {/* Background Gradient Blobs */}
      <div className="absolute top-0 -left-4 w-60 h-60 bg-primary/10 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-60 h-60 bg-accent/10 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-60 h-60 bg-secondary/10 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-4000"></div>

      {/* Central Element */}
      <div className="relative z-10 flex flex-col items-center justify-center w-52 h-52 bg-card/80 backdrop-blur-lg rounded-full border shadow-2xl">
        <Sparkles className="w-8 h-8 text-primary mb-2" />
        <p className="font-bold text-xl text-foreground">SparkVoice AI</p>
      </div>
      
      {/* Orbiting Icons */}
      <div className="absolute inset-0 w-full h-full animate-spin-slow">
        <div className="absolute top-4 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 bg-card/80 backdrop-blur-md rounded-full border shadow-lg">
            <FileText className="w-7 h-7 text-foreground" />
        </div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-1/2 p-3 bg-card/80 backdrop-blur-md rounded-full border shadow-lg">
            <ShoppingCart className="w-7 h-7 text-foreground" />
        </div>
        <div className="absolute left-4 top-1/2 -translate-y-1/2 -translate-x-1/2 p-3 bg-card/80 backdrop-blur-md rounded-full border shadow-lg">
            <Mic className="w-7 h-7 text-foreground" />
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 translate-x-1/2 p-3 bg-card/80 backdrop-blur-md rounded-full border shadow-lg">
            <Camera className="w-7 h-7 text-foreground" />
        </div>
      </div>
    </div>
  );
}
