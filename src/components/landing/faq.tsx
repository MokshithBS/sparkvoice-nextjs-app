"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "What is SparkVoice?",
    answer: "SparkVoice is an AI-powered platform that analyzes your speech patterns, provides real-time feedback, and helps you improve your vocal delivery for presentations, meetings, and public speaking."
  },
  {
    question: "How does the real-time feedback work?",
    answer: "Our advanced AI listens to your voice during live practice sessions or actual conversations. It provides on-the-spot suggestions about your pace, tone, filler words, and clarity, displayed discreetly on your screen."
  },
  {
    question: "Is my voice data secure?",
    answer: "Absolutely. We prioritize user privacy and data security. All voice data is encrypted and processed anonymously. You have full control over your data and can delete it at any time."
  },
  {
    question: "What integrations are available?",
    answer: "SparkVoice seamlessly integrates with popular video conferencing tools like Zoom, Google Meet, and Microsoft Teams, allowing you to get feedback during your actual meetings. We also offer API access for custom integrations."
  },
  {
    question: "Who can benefit from using SparkVoice?",
    answer: "SparkVoice is for professionals, students, public speakers, sales teams, and anyone looking to communicate more effectively and confidently. If you use your voice to persuade, inform, or lead, SparkVoice can help."
  },
  {
    question: "Is there a free trial available?",
    answer: "Yes! We offer a 14-day free trial with full access to all premium features. No credit card is required to get started. Just sign up and begin improving your voice today."
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
                <AccordionTrigger className="text-lg font-medium">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
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
