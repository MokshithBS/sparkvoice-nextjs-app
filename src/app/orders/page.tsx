
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Package, CheckCircle, Clock, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useLanguage } from '@/context/language-context';
import { Badge } from '@/components/ui/badge';

type OrderStatus = 'Delivered' | 'Processing' | 'Cancelled';

interface OrderItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  hint: string;
}

interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
  total: number;
}

const mockOrders: Order[] = [
  {
    id: 'SPK-78901',
    date: 'October 25, 2023',
    status: 'Delivered',
    items: [
      { id: 1, name: 'Aashirvaad Atta (5 kg)', price: 225, quantity: 1, image: 'https://storage.googleapis.com/aip-dev-images-public/product-atta.png', hint: 'flour bag' },
      { id: 3, name: 'Amul Milk Taaza (500 ml)', price: 28, quantity: 2, image: 'https://storage.googleapis.com/aip-dev-images-public/product-milk.png', hint: 'milk carton' },
      { id: 7, name: 'Fresh Onions (1 kg)', price: 40, quantity: 1, image: 'https://storage.googleapis.com/aip-dev-images-public/product-onions.png', hint: 'onions' },
    ],
    total: 321,
  },
  {
    id: 'SPK-78902',
    date: 'November 5, 2023',
    status: 'Processing',
    items: [
      { id: 9, name: 'Maggi 2-Min Noodles (1 pack)', price: 12, quantity: 6, image: 'https://storage.googleapis.com/aip-dev-images-public/product-maggi.png', hint: 'instant noodles' },
      { id: 25, name: 'Coca-Cola (750 ml)', price: 40, quantity: 2, image: 'https://storage.googleapis.com/aip-dev-images-public/product-coke.png', hint: 'soda bottle' },
    ],
    total: 152,
  },
  {
    id: 'SPK-78903',
    date: 'September 12, 2023',
    status: 'Cancelled',
    items: [
      { id: 40, name: 'Amul Cheese Slices (200 g)', price: 105, quantity: 1, image: 'https://storage.googleapis.com/aip-dev-images-public/product-cheese.png', hint: 'cheese slices' },
    ],
    total: 105,
  },
   {
    id: 'SPK-78904',
    date: 'August 1, 2023',
    status: 'Delivered',
    items: [
      { id: 5, name: 'Saffola Gold Oil (1 L)', price: 159, quantity: 1, image: 'https://storage.googleapis.com/aip-dev-images-public/product-oil.png', hint: 'oil bottle' },
      { id: 10, name: 'Surf Excel Detergent (1 kg)', price: 99, quantity: 1, image: 'https://storage.googleapis.com/aip-dev-images-public/product-detergent.png', hint: 'detergent box' },
      { id: 33, name: 'Colgate MaxFresh Toothpaste (150 g)', price: 95, quantity: 1, image: 'https://storage.googleapis.com/aip-dev-images-public/product-toothpaste.png', hint: 'toothpaste tube' },
      { id: 37, name: "Haldiram's Aloo Bhujia (200 g)", price: 50, quantity: 2, image: 'https://storage.googleapis.com/aip-dev-images-public/product-bhujia.png', hint: 'indian snacks' },
    ],
    total: 453,
  },
];

const statusConfig: Record<OrderStatus, { icon: React.ReactNode; color: string; translatedKey: any }> = {
  Delivered: { icon: <CheckCircle className="h-4 w-4" />, color: 'text-green-600', translatedKey: 'orders.status.delivered' },
  Processing: { icon: <Clock className="h-4 w-4" />, color: 'text-blue-600', translatedKey: 'orders.status.processing' },
  Cancelled: { icon: <XCircle className="h-4 w-4" />, color: 'text-destructive', translatedKey: 'orders.status.cancelled' },
};


export default function OrdersPage() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-dvh bg-muted/40">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 max-w-4xl items-center justify-between px-4 md:px-6">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/store">
              <ArrowLeft />
              <span className="sr-only">{t('common.backToStore')}</span>
            </Link>
          </Button>
          <h1 className="text-xl font-bold font-headline flex items-center gap-2">
            <Package className="w-6 h-6 text-primary" />
            <span>{t('orders.title')}</span>
          </h1>
          <div className="w-8"></div>
        </div>
      </header>

      <main className="flex-1 py-8 px-4">
        <div className="container mx-auto max-w-2xl">
          {mockOrders.length === 0 ? (
            <div className="text-center space-y-4 py-16">
              <Package className="mx-auto h-16 w-16 text-muted-foreground" />
              <h2 className="text-2xl font-bold">{t('orders.empty.title')}</h2>
              <p className="text-muted-foreground">{t('orders.empty.description')}</p>
              <Button asChild>
                <Link href="/store">{t('cart.empty.button')}</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {mockOrders.map((order) => (
                <Card key={order.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle>{t('orders.orderId', { id: order.id })}</CardTitle>
                            <CardDescription>{t('orders.placedOn', { date: order.date })}</CardDescription>
                        </div>
                        <Badge variant="outline" className={`flex items-center gap-1.5 ${statusConfig[order.status].color} border-current/50`}>
                            {statusConfig[order.status].icon}
                            <span className="font-semibold">{t(statusConfig[order.status].translatedKey)}</span>
                        </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible>
                      <AccordionItem value="item-1">
                        <AccordionTrigger>{t('orders.viewDetails')} ({t('orders.itemCount', { count: order.items.length.toString() })})</AccordionTrigger>
                        <AccordionContent>
                           <div className="space-y-4 pt-2">
                            {order.items.map(item => (
                                <div key={item.id} className="flex items-center gap-4">
                                    <div className="relative h-16 w-16 rounded-md overflow-hidden border bg-white flex-shrink-0">
                                        <Image src={item.image} alt={item.name} fill className="object-cover" data-ai-hint={item.hint} />
                                    </div>
                                    <div className="flex-grow">
                                        <p className="font-medium">{item.name}</p>
                                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                    </div>
                                    <p className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            ))}
                           </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                    <Separator className="my-4" />
                    <div className="flex justify-between items-center">
                        <Button variant="outline">{t('orders.reorderButton')}</Button>
                        <div className="text-right">
                            <p className="text-sm text-muted-foreground">{t('orders.total')}</p>
                            <p className="font-bold text-lg">₹{order.total.toFixed(2)}</p>
                        </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
