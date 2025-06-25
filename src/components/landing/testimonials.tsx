import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
  {
    name: "Radha K.",
    title: "Homemaker, Pune",
    avatar: "RK",
    testimonial: "I used to write a list and wait for my son to order everything. Now I just take a photo of my list and SparkVoice does the rest. It's so simple!"
  },
  {
    name: "Suresh P.",
    title: "Kirana Store Owner, Bengaluru",
    avatar: "SP",
    testimonial: "Receiving orders on WhatsApp as a ready-made list saves me so much time. No more mistakes from reading bad handwriting. My customers are happier too."
  },
  {
    name: "Mr. Gupta",
    title: "Retired Teacher, Lucknow",
    avatar: "MG",
    testimonial: "I don't like typing on the small phone screen. With SparkVoice, I just tell it what I need in Hindi, and my groceries arrive. It feels like magic."
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Loved by Shoppers and Shopkeepers Alike</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Hear what our users have to say about their experience with SparkVoice.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 pt-12 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="flex flex-col justify-between p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card">
              <CardContent className="p-0">
                <blockquote className="text-lg font-semibold leading-snug text-card-foreground">
                  “{testimonial.testimonial}”
                </blockquote>
              </CardContent>
              <div className="mt-6 flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={`https://placehold.co/40x40.png?text=${testimonial.avatar}`} />
                  <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-card-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
