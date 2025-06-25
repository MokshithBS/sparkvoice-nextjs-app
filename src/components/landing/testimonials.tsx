import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
  {
    name: "Sarah L.",
    title: "Marketing Director",
    avatar: "SL",
    testimonial: "SparkVoice completely changed how I approach presentations. The AI feedback is like having a personal speech coach 24/7. My confidence has skyrocketed!"
  },
  {
    name: "Michael B.",
    title: "Sales Executive",
    avatar: "MB",
    testimonial: "I was skeptical at first, but the filler word reduction feature is a game-changer. I sound more professional and my sales calls are more effective."
  },
  {
    name: "David C.",
    title: "University Professor",
    avatar: "DC",
    testimonial: "I recommend SparkVoice to all my students. It's an incredible tool for honing public speaking skills and preparing for academic presentations."
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Trusted by Innovators</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Hear what our users have to say about their experience with SparkVoice.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 pt-12 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="flex flex-col justify-between p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-0">
                <blockquote className="text-lg font-semibold leading-snug">
                  “{testimonial.testimonial}”
                </blockquote>
              </CardContent>
              <div className="mt-6 flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={`https://placehold.co/40x40.png?text=${testimonial.avatar}`} />
                  <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
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
