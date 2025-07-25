
'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Users, Send, IndianRupee, Plus, Trash2, Mic, Bot, Sparkles, X, Search, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/context/language-context';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { products, type Product } from '@/lib/products';

// Mock Data
const hiveData = {
    id: '1',
    name: "Prestige Falcon City",
    members: [
        { id: 1, name: 'Anika S.', avatar: 'https://storage.googleapis.com/aip-dev-images-public/avatar-1.png', hint: 'woman face' },
        { id: 2, name: 'You', avatar: 'https://storage.googleapis.com/aip-dev-images-public/avatar-4.png', hint: 'person face' },
        { id: 3, name: 'Rohan V.', avatar: 'https://storage.googleapis.com/aip-dev-images-public/avatar-2.png', hint: 'man face' },
        { id: 4, name: 'Priya K.', avatar: 'https://storage.googleapis.com/aip-dev-images-public/avatar-3.png', hint: 'woman face' },
    ],
    sharedCart: [
        { id: 1, name: 'Aashirvaad Atta (5 kg)', price: 225, addedBy: 'Anika S.', image: 'https://storage.googleapis.com/aip-dev-images-public/AashirvaadAtta.png', hint: 'flour bag' },
        { id: 12, name: 'Lays Potato Chips (Classic Salted)', price: 18, addedBy: 'Anika S.', image: 'https://images.openfoodfacts.org/images/products/002/840/020/0592/front_en.28.200.jpg', hint: 'potato chips' },
        { id: 3, name: 'Amul Milk Taaza (500 ml)', price: 28, addedBy: 'You', image: 'https://storage.googleapis.com/aip-dev-images-public/33.%20Amul%20Gold%20Milk%20(500%20ml).jpeg', hint: 'milk carton' },
        { id: 18, name: 'MDH Deggi Mirch (100 g)', price: 70, addedBy: 'Rohan V.', image: 'https://images.openfoodfacts.org/images/products/890/216/700/0034/front_en.3.200.jpg', hint: 'spice powder' },
    ],
    chat: [
        { type: 'user', user: 'Anika S.', message: 'Okay team, I\'ve added atta and some chips for the weekend get-together.' },
        { type: 'user', user: 'You', message: 'I added milk for my morning coffee.' },
        { type: 'user', user: 'Priya K.', message: 'Great! Rohan, since you like spicy food, should I add some extra chilli powder for the biryani?' },
        { type: 'user', user: 'Rohan V.', message: 'Yes please, Priya! Good thinking. Just added it.' },
        { type: 'ai', message: "Since you're planning a get-together, don't forget essentials like disposable plates and cups. Based on your cart, you can also get a 10% discount by adding 2L of Coke. Shall I add these?" },
        { type: 'poll', question: 'Which rice brand to buy?', options: ['India Gate (₹650)', 'Sona Masoori (₹550)'], votes: { 'India Gate (₹650)': 2, 'Sona Masoori (₹550)': 1 } },
    ]
};

export default function HiveDetailPage({ params }: { params: { hiveId: string } }) {
    const [cart, setCart] = useState(hiveData.sharedCart);
    const [chat, setChat] = useState(hiveData.chat);
    const [newMessage, setNewMessage] = useState('');
    const [splitOption, setSplitOption] = useState('item');
    const { toast } = useToast();
    const { t } = useLanguage();

    // State for the "Add Item" dialog
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const totalCost = cart.reduce((acc, item) => acc + item.price, 0);
    const equalShare = totalCost > 0 ? totalCost / hiveData.members.length : 0;

    const availableProducts = useMemo(() => {
        if (!searchQuery) return [];
        return products.filter(p => 
            !cart.some(cartItem => cartItem.id === p.id) &&
            p.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [cart, searchQuery]);


    const calculateMemberCost = (memberName: string) => {
        return cart.reduce((total, item) => {
            if (item.addedBy === memberName) {
                return total + item.price;
            }
            return total;
        }, 0);
    };

    const handleAddItemToCart = (product: Product) => {
        const newItem = {
            id: product.id,
            name: product.name,
            price: product.salePrice || product.price,
            addedBy: 'You',
            image: product.image,
            hint: product.hint,
        };
        setCart(currentCart => [...currentCart, newItem]);
        setChat(currentChat => [...currentChat, { type: 'user', user: 'You', message: `I've added ${product.name} to the cart.` }]);
        toast({
            title: 'Item Added',
            description: `${product.name} has been added to the Hive's shared cart.`,
        });
        setIsAddDialogOpen(false); // Close dialog
        setSearchQuery(''); // Reset search
    };

    const handleRemoveItem = (itemId: number) => {
        const itemToRemove = cart.find(item => item.id === itemId);
        if (!itemToRemove) return;

        setCart(currentCart => currentCart.filter(item => item.id !== itemId));
        setChat(currentChat => [...currentChat, { type: 'user', user: 'You', message: `I've removed ${itemToRemove.name} from the cart.` }]);
        toast({
            title: 'Item Removed',
            description: `${itemToRemove.name} has been removed from the Hive's shared cart.`,
        });
    };

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            setChat(currentChat => [...currentChat, { type: 'user', user: 'You', message: newMessage }]);
            setNewMessage('');
        }
    };
    
    useEffect(() => {
        const chatContainer = document.getElementById('chat-container');
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }, [chat]);

    return (
        <div className="flex flex-col min-h-dvh bg-muted/40">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/community">
                        <ArrowLeft />
                        <span className="sr-only">{t('community.hive.backToHives')}</span>
                        </Link>
                    </Button>
                    <div className="text-center">
                        <h1 className="text-lg font-bold font-headline flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-primary" />
                            {hiveData.name}
                        </h1>
                        <p className="text-xs text-muted-foreground -mt-1">{t('community.hive.membersCount', { count: hiveData.members.length })}</p>
                    </div>
                    <div className="w-8">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src="https://storage.googleapis.com/aip-dev-images-public/community-1.png" alt={hiveData.name} />
                            <AvatarFallback>{hiveData.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
            </header>

            <main className="flex-1 py-4 md:py-8 px-4">
                <div className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>{t('community.hive.cart.title')}</CardTitle>
                                <CardDescription dangerouslySetInnerHTML={{ __html: t('community.hive.cart.description', { total: totalCost.toFixed(2) })}} />
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {cart.map(item => (
                                    <div key={item.id} className="flex items-center gap-4 p-2 rounded-lg bg-muted/50">
                                        <Image src={item.image} alt={item.name} width={48} height={48} className="rounded-md border bg-white" data-ai-hint={item.hint} />
                                        <div className="flex-grow">
                                            <p className="font-semibold">{item.name}</p>
                                            <p className="text-xs text-muted-foreground">{t('community.hive.cart.addedBy', { user: item.addedBy })}</p>
                                        </div>
                                        <p className="font-bold text-lg">₹{item.price.toFixed(2)}</p>
                                        {item.addedBy === 'You' && (
                                            <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(item.id)}>
                                                <Trash2 className="w-4 h-4 text-destructive" />
                                            </Button>
                                        )}
                                    </div>
                                ))}
                                <Dialog open={isAddDialogOpen} onOpenChange={(isOpen) => { setIsAddDialogOpen(isOpen); if (!isOpen) setSearchQuery(''); }}>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" className="w-full">
                                            <Plus className="mr-2 h-4 w-4" /> {t('community.hive.cart.addItemButton')}
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-md">
                                        <DialogHeader>
                                            <DialogTitle>Add Item to Hive Cart</DialogTitle>
                                            <DialogDescription>
                                                Search for a product to add to the shared cart.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="py-4">
                                            <div className="relative">
                                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                <Input 
                                                    placeholder="Search for atta, milk, etc..." 
                                                    value={searchQuery}
                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                    className="pl-10"
                                                />
                                            </div>
                                            <div className="mt-4 max-h-[50vh] min-h-[10rem] overflow-y-auto space-y-2 pr-2">
                                                {availableProducts.length > 0 ? availableProducts.map(product => (
                                                    <div key={product.id} className="flex items-center justify-between gap-2 p-2 rounded-lg hover:bg-muted">
                                                        <div className="flex items-center gap-3 overflow-hidden">
                                                            <Image src={product.image} alt={product.name} width={40} height={40} className="rounded-md border bg-white flex-shrink-0" data-ai-hint={product.hint} />
                                                            <div className="overflow-hidden">
                                                                <p className="text-sm font-medium truncate">{product.name}</p>
                                                                <p className="text-sm text-muted-foreground">₹{(product.salePrice || product.price).toFixed(2)}</p>
                                                            </div>
                                                        </div>
                                                        <Button size="sm" onClick={() => handleAddItemToCart(product)}>Add</Button>
                                                    </div>
                                                )) : (
                                                    <p className="text-sm text-muted-foreground text-center py-4">
                                                        {searchQuery ? "No products found for your search." : "Start typing to search for products."}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </CardContent>
                        </Card>
                         
                         <Card>
                            <CardHeader className="flex-row items-center gap-4 space-y-0">
                                <div className="p-3 bg-primary/10 rounded-lg">
                                    <Award className="w-6 h-6 text-primary"/>
                                </div>
                                <div>
                                    <CardTitle>{t('community.hive.rewards.title')}</CardTitle>
                                    <CardDescription>{t('community.hive.rewards.description')}</CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-center p-4 bg-muted rounded-lg">
                                    <p className="text-4xl font-bold text-primary">1,250</p>
                                    <p className="text-sm font-medium text-muted-foreground">{t('community.hive.rewards.points')}</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>{t('community.hive.payment.title')}</CardTitle>
                                <CardDescription>{t('community.hive.payment.description')}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <RadioGroup value={splitOption} onValueChange={setSplitOption}>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="item" id="item" />
                                        <Label htmlFor="item">{t('community.hive.payment.splitByItem')}</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="equal" id="equal" />
                                        <Label htmlFor="equal">{t('community.hive.payment.splitEqually', { amount: equalShare.toFixed(2) })}</Label>
                                    </div>
                                </RadioGroup>
                                <Separator />
                                <div className="space-y-2">
                                    {hiveData.members.map(member => (
                                        <div key={member.id} className="flex justify-between items-center text-sm">
                                            <div className="flex items-center gap-2">
                                                <Avatar className="h-6 w-6">
                                                    <AvatarImage src={member.avatar} alt={member.name} data-ai-hint={member.hint}/>
                                                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <span>{member.name}</span>
                                            </div>
                                            <span className="font-bold">
                                                {splitOption === 'equal' 
                                                    ? `₹${equalShare.toFixed(2)}` 
                                                    : `₹${calculateMemberCost(member.name).toFixed(2)}`}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <Button className="w-full">{t('community.hive.payment.settleButton')}</Button>
                            </CardContent>
                        </Card>

                    </div>

                    {/* Right Column - Chat */}
                    <div className="flex flex-col">
                       <Card className="flex-1 flex flex-col">
                            <CardHeader className="flex-row items-center justify-between">
                                <CardTitle>{t('community.hive.chat.title')}</CardTitle>
                                <div className="flex -space-x-2">
                                    {hiveData.members.map(m => (
                                        <Avatar key={m.id} className="h-6 w-6 border-2 border-background">
                                            <AvatarImage src={m.avatar} alt={m.name} data-ai-hint={m.hint} />
                                            <AvatarFallback>{m.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                    ))}
                                </div>
                            </CardHeader>
                            <CardContent id="chat-container" className="flex-1 overflow-y-auto space-y-4 pr-2">
                                {chat.map((item, index) => {
                                    if (item.type === 'user') {
                                        const isYou = item.user === 'You';
                                        return (
                                            <div key={index} className={`flex gap-2 ${isYou ? 'justify-end' : 'justify-start'}`}>
                                                {!isYou && <Avatar className="h-8 w-8"><AvatarImage src={hiveData.members.find(m=>m.name === item.user)?.avatar} /><AvatarFallback>{item.user.charAt(0)}</AvatarFallback></Avatar>}
                                                <div className={`max-w-xs rounded-lg px-3 py-2 ${isYou ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                                    {!isYou && <p className="text-xs font-bold mb-1">{item.user}</p>}
                                                    <p className="text-sm">{item.message}</p>
                                                </div>
                                            </div>
                                        )
                                    }
                                    if (item.type === 'ai') {
                                        return (
                                            <div key={index} className="flex gap-2 items-start">
                                                 <Avatar className="h-8 w-8 bg-accent/20"><Bot className="h-5 w-5 m-auto text-accent"/></Avatar>
                                                 <div className="flex-1 rounded-lg px-3 py-2 bg-accent/10 border border-accent/20 text-sm">
                                                    <p className="font-bold text-accent mb-1">{t('community.hive.chat.aiAssistant')}</p>
                                                    {item.message}
                                                 </div>
                                            </div>
                                        )
                                    }
                                     if (item.type === 'poll') {
                                        const totalVotes = Object.values(item.votes).reduce((a, b) => a + b, 0);
                                        return (
                                            <div key={index} className="rounded-lg p-3 bg-muted border">
                                                <p className="font-semibold text-sm mb-2">{item.question}</p>
                                                <div className="space-y-2">
                                                    {item.options.map(option => {
                                                        const voteCount = item.votes[option] || 0;
                                                        const percentage = totalVotes > 0 ? (voteCount / totalVotes) * 100 : 0;
                                                        return (
                                                            <div key={option}>
                                                                <div className="flex justify-between text-xs mb-1">
                                                                    <span>{option}</span>
                                                                    <span className="font-bold">{t('community.hive.chat.poll.votes', { count: voteCount })}</span>
                                                                </div>
                                                                <Progress value={percentage} />
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                                <Button variant="outline" size="sm" className="w-full mt-3">{t('community.hive.chat.poll.voteButton')}</Button>
                                            </div>
                                        )
                                    }
                                    return null;
                                })}
                            </CardContent>
                            <div className="p-4 border-t">
                                <div className="relative">
                                    <Input 
                                        placeholder={t('community.hive.chat.inputPlaceholder')}
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                        className="pr-20"
                                    />
                                    <div className="absolute top-1/2 right-2 -translate-y-1/2 flex items-center gap-1">
                                        <Button variant="ghost" size="icon" className="h-8 w-8"><Mic className="w-4 h-4" /></Button>
                                        <Button size="icon" className="h-8 w-8" onClick={handleSendMessage}><Send className="w-4 h-4" /></Button>
                                    </div>
                                </div>
                            </div>
                       </Card>
                    </div>
                </div>
            </main>
        </div>
    );

    