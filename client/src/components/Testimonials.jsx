// import all files in the faces folder
import face1 from "../assets/faces/face1.jpeg";
import face2 from "../assets/faces/face2.jpeg";
import face3 from "../assets/faces/face3.jpeg";
import face4 from "../assets/faces/face4.jpeg";
import face5 from "../assets/faces/face5.jpeg";
import face6 from "../assets/faces/face6.jpeg";

const testimonials = [
  {
    body: "Great service! The equipment was well-maintained and delivered on time. It made our harvest season much smoother.",
    author: {
      name: "Amardeep Singh",
      location: "Amritsar, Punjab",
      imageUrl: face4,
    },
  },
  {
    body: "We rented a tractor for plowing and it worked perfectly. The support team was also very responsive to our needs.",
    author: {
      name: "Baljit Singh",
      location: "Ludhiana, Punjab",
      imageUrl: face2,
    },
  },
  {
    body: "I was able to get a combine harvester at a reasonable rate during peak season. It was a lifesaver for our farm.",
    author: {
      name: "Ravi Sharma",
      location: "Una, Himachal Pradesh",
      imageUrl: face3,
    },
  },
  {
    body: "Renting the equipment instead of buying helped us manage our budget effectively while still getting the job done.",
    author: {
      name: "Gurmeet Singh",
      location: "Patiala, Punjab",
      imageUrl: face5,
    },
  },
  {
    body: "The flexibility of renting instead of buying heavy machinery has saved us a lot of money. Highly recommend this service!",
    author: {
      name: "Rajinder Kumar",
      location: "Panipat, Haryana",
      imageUrl: face6,
    },
  },
  {
    body: "The entire rental process was smooth and hassle-free. The quality of equipment was top-notch.",
    author: {
      name: "Anil Kapoor",
      location: "Shimla, Himachal Pradesh",
      imageUrl: face1,
    },
  },
];

export default function Testimonials() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-lg font-semibold leading-8 tracking-tight text-green-600">
            Testimonials
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Trusted by Farmers Across the Nation – Hear from Those Who’ve
            Benefited from Our Reliable Equipment Rental Service{" "}
          </p>
        </div>
        <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
          <div className="-mt-8 sm:-mx-4 sm:columns-2 sm:text-[0] lg:columns-3">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.author.name}
                className="pt-8 sm:inline-block sm:w-full sm:px-4"
              >
                <figure className="rounded-2xl bg-gray-50 p-8 text-sm leading-6">
                  <blockquote className="text-gray-900">
                    <p>{`“${testimonial.body}”`}</p>
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-x-4">
                    <img
                      alt=""
                      src={testimonial.author.imageUrl}
                      className="h-10 w-10 rounded-full bg-gray-50"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">
                        {testimonial.author.name}
                      </div>
                      <div className="text-gray-600">{`${testimonial.author.location}`}</div>
                    </div>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
