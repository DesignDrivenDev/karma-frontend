import Image from 'next/image'



const testimonials = [
  [
    {
      content:
        'It was a pleasure working with Manjesh on my new home purchase , he provides great insight about housing related questions and he has a good knowledge about existing housing market. He is really helpful during my house closing as I was out for my wedding.',
      author: {
        name: 'Vinod Soma',
        role: 'Bought a single family home in 2022 in Charlotte, NC',
       
      },
    },
    {
      content:
        'Manjesh was a great person to work with. When looking for a home, it can be stressful and quite difficult, however, he will ensure that you are getting a fair deal and see you through the end-to-end process.',
      author: {
        name: 'Edward Ruiz',
        role: 'Bought a single family home in 2018 in Charlotte, NC',
       
      },
    },
  ],
  [
    {
      content:
        'We love the service he gave us during our house hunt and very happy with the results we have got. He is a very patient man with all the requirements we had. We found a perfect home thru him and would highly recommend him to anyone who are looking to buy or sell.',
      author: {
        name: 'Nick',
        role: 'Bought a Townhome in 2018 in Charlotte, NC',
        
      },
    },
    {
      content:
        'Manjesh is the go to guy for buying a home, he was very helpful and took care of all the back ground work while I was busy at work. Make sure you answer his phone and send him the details he requests you and he will take care of the rest.',
      author: {
        name: 'Anonymous',
        role: 'Bought a single family home in 2018 in Charlotte, NC',
       
      },
    },
  ],
  [
    {
      content:
        'He is very knowledgeable. His recommendation are to our needs. We closed on our home on the right time because of him. He is flexible and convenient to work with. I would highly recommend him.',
      author: {
        name: 'Silpa Surapaneni',
        role: 'Bought a single family home in 2018 in Charlotte, NC',
       
      },
    },
    {
      content:
        'Manjesh has wonderful real estate knowledge. Very friendly and helpful. He helped from beginning to end. Even helped to choose right Mortgages. He talks openly and available all the time to help as needed.',
      author: {
        name: 'Venkidh',
        role: 'Bought a single family home in 2017 in Charlotte, NC',
        
      },
    },
  ],
]

export function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-title"
      className="bg-white py-10 sm:py-32"
      
    >
      <div>
        <div className="mx-auto max-w-2xl md:text-center !bg-white">
          <h2
            id="testimonials-title"
            className="font-display text-3xl tracking-tight  sm:text-4xl font-bold text-primary "
          >
            Client Testimonials
          </h2>
          {/* <p className="mt-4 text-lg tracking-tight">
            Our software is so simple that people can’t help but fall in love
            with it. Simplicity is easy when you just skip tons of
            mission-critical features.
          </p> */}
        </div>
        <ul className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mt-20 lg:max-w-none lg:grid-cols-3">
          {testimonials.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul className="space-y-6 sm:space-y-8">
                {column.map((testimonial, testimonialIndex) => (
                  <li key={testimonialIndex}>
                    <figure className="relative rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10">
                      <svg
                        aria-hidden="true"
                        width={105}
                        height={78}
                        className="absolute top-6 left-6 fill-slate-100"
                      >
                        <path d="M25.086 77.292c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622C1.054 58.534 0 53.411 0 47.686c0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C28.325 3.917 33.599 1.507 39.324 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Zm54.24 0c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622-2.11-4.52-3.164-9.643-3.164-15.368 0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C82.565 3.917 87.839 1.507 93.564 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Z" />
                      </svg>
                      <blockquote className="relative">
                        <p className="text-lg tracking-tight text-slate-900">
                          {testimonial.content}
                        </p>
                      </blockquote>
                      <figcaption className="relative mt-6 flex items-center justify-between border-t border-slate-100 pt-6">
                        <div>
                          <div className="font-display text-base text-slate-900">
                            {testimonial.author.name}
                          </div>
                          <div className="mt-1 text-sm text-slate-500">
                            {testimonial.author.role}
                          </div>
                        </div>
                      </figcaption>
                    </figure>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        </div>
    </section>
  )
}
