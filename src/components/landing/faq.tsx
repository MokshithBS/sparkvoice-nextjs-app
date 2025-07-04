"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "What is SparkVoice?",
    answer: "SparkVoice is an AI-powered shopping platform that lets you create a grocery cart by either speaking or scanning a handwritten list. It's designed to make e-commerce accessible to everyone in India, especially those who find typical shopping apps difficult to use."
  },
  {
    question: "Do I need to install an app?",
    answer: "Not at all! You can use SparkVoice directly through WhatsApp, by making a simple phone call (IVR), or through our lightweight app. The choice is yours."
  },
  {
    question: "Can it understand my handwriting and language?",
    answer: "Yes. Our AI is trained to read various styles of handwriting, including messy and curved text. It also understands multiple Indian languages, so you can speak or write your list naturally."
  },
  {
    question: "How does it know which brand of an item I want?",
    answer: "SparkVoice gets smarter with each order. It learns your preferences and will automatically suggest your favorite brands. For new items, it picks the most popular option, which you can easily change."
  },
  {
    question: "Is this only for customers?",
    answer: "No, SparkVoice is built for local kirana stores too. It provides them with a simple way to receive digital orders via a dashboard, WhatsApp, IVR call, or even a dedicated PhonePe Soundbox that announces new orders in real-time."
  },
  {
    question: "How do I pay for my order?",
    answer: "You can pay through all major UPI apps, just like you normally would. The order is fulfilled by your trusted local store."
  },
]

export function Faq() {
  return (
    <section id="faq" className="w-full py-12 md:py-24 lg:py-32 bg-card">
      <div className="container mx-auto max-w-4xl px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Frequently Asked Questions</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Find answers to common questions about SparkVoice.
            </p>
          </div>
        </div>
        <div className="mt-8">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-medium text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground text-left">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
