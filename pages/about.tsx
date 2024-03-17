import { Testimonials } from "../components/Testimonials";
import Image from "next/image";
import aboutimg from "../public/about.jpg";
import Navbar from "../components/Navbar";
export default function about() {
  return (
    <>
      <Navbar></Navbar>
      <div className="bg-white overflow-hidden">
        <div className="relative max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
          <div className="hidden lg:block bg-gray-50 absolute top-0 bottom-0 left-3/4 w-screen" />
          <div className="mx-auto text-base max-w-prose lg:grid lg:grid-cols-2 lg:gap-8 lg:max-w-none"></div>
          <div className="mt-8 lg:grid lg:grid-cols-2 lg:gap-8">
            <div className="relative lg:row-start-1 lg:col-start-2">
              <svg
                className="hidden lg:block absolute top-0 right-0 -mt-20 -mr-20"
                width={404}
                height={384}
                fill="none"
                viewBox="0 0 404 384"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="de316486-4a29-4312-bdfc-fbce2132a2c1"
                    x={0}
                    y={0}
                    width={20}
                    height={20}
                    patternUnits="userSpaceOnUse"
                  >
                    <rect
                      x={0}
                      y={0}
                      width={4}
                      height={4}
                      className="text-gray-200"
                      fill="currentColor"
                    />
                  </pattern>
                </defs>
                <rect
                  width={404}
                  height={384}
                  fill="url(#de316486-4a29-4312-bdfc-fbce2132a2c1)"
                />
              </svg>
              <div className="relative text-base mx-auto max-w-prose lg:max-w-none">
                <figure>
                  <div className="aspect-w-12 aspect-h-7 lg:aspect-none">
                    <Image
                      className="rounded-lg shadow-lg object-cover object-center"
                      src={aboutimg}
                      alt="Whitney leaning against a railing on a downtown street"
                      width={1184}
                      height={1200}
                    />
                  </div>
                </figure>
              </div>
            </div>
            <div className="mt-8 lg:mt-0">
              <div className="text-base max-w-prose mx-auto lg:max-w-none">
                <h2 className="text-xl text-primary tracking-wide uppercase mt-10 font-bold ">
                  About Us
                </h2>
                <p className="text-lg text-gray-500">
                  Manjesh brings more than 5 years of experience to Charlotte’s
                  booming real estate industry.
                </p>
              </div>
              <div className="mt-5 prose prose-indigo text-gray-500 mx-auto lg:max-w-none lg:row-start-1 lg:col-start-1">
                <p>
                  He leverages his extensive market knowledge, excellent
                  negotiation skills, positive energy, and enthusiasm to deliver
                  the best real estate experience to all his valued clients.
                </p>
                <br />
                <p>
                  While providing seasoned knowledge and an insight into
                  Charlotte’s real estate market, Manjesh’s unwavering
                  philosophy encompasses responsiveness, integrity, and
                  commitment to give his absolute best and to go above and
                  beyond for each of his clients
                </p>
                <br />
                <p>
                  Contact him today to experience the ease and fulfillment of
                  turning your dreams into reality.
                </p>
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div data-aos="zoom-in-down">
        <div className=" max-w-7xl w-11/12 mx-auto">
          <Testimonials></Testimonials>
        </div>
      </div>
    </>
  );
}
