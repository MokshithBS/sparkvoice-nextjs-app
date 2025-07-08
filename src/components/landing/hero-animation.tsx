
'use client';

import { Camera, FileText, Mic, Sparkles, Bot, Users2, ScanSearch, Leaf, Receipt } from 'lucide-react';

const icons = [
  { icon: Camera, rotation: 0 },
  { icon: Mic, rotation: 45 },
  { icon: FileText, rotation: 90 },
  { icon: Bot, rotation: 135 },
  { icon: Users2, rotation: 180 },
  { icon: ScanSearch, rotation: 225 },
  { icon: Leaf, rotation: 270 },
  { icon: Receipt, rotation: 315 },
];

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
        <p className="font-bold text-2xl text-foreground">SparkVoice</p>
      </div>
      
      {/* Orbiting Icons */}
      <div className="absolute inset-0 w-full h-full animate-spin-slow">
        {icons.map(({ icon: Icon, rotation }, index) => (
            <div 
                key={index}
                className="absolute top-1/2 left-1/2 w-16 h-16 -m-8"
                style={{ transform: `rotate(${rotation}deg) translate(14rem) rotate(-${rotation}deg)` }}
            >
                <div className="w-full h-full flex items-center justify-center p-3 bg-card/80 backdrop-blur-md rounded-full border shadow-lg">
                    <Icon className="w-7 h-7 text-foreground" />
                </div>
            </div>
        ))}
      </div>
    </div>
  );
}
