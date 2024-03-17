import React from "react";
import usp1 from "../public/buy.webp";
import usp2 from "../public/sell.webp";
import usp3 from "../public/csr.webp";
import Link from "next/link";
import Image from "next/image";


const uspList = [
  {
    img: usp1,
    title: "Buy with us.",
    desc: "Get rewarded with a rebate when you buy with us.",
    route: "/buy",
  },
  {
    img: usp2,
    title: "Find the right selling option.",
    desc: "Pay the lowest commission when you sell with us.",
    route: "/sell",
  },
  {
    img: usp3,
    title: "Community",
    desc: "Give back to the local schools & NGO's when we close together.",
    route: "/csr",
  },
];

function Usps() {
  return (
    <div data-aos="fade-up"
    data-aos-duration = "200">
    <section className="text-gray-600 text-center mb-10 md:mb-0 md:my-10">
      {/* Shapes to be in the above section div */}
      <div className="max-w-7xl rounded-2xl bg-gray-200 w-11/12 mx-auto py-4 relative">
        <div className="flex flex-wrap justify-center gap-10 opacity-1  divide-black">
          {uspList.map((usp, idx) => (
            <div
              key={usp.title}
              className="max-w-sm flex flex-col items-center justify-around  outline-8 outline-white "
            >
              <Link href={usp.route}>
                <div className="">
                  <Image className="cursor-pointer rounded-lg" src={usp.img} />
                </div>
              </Link>
              <div className="p-5 h-40">
                <Link href={usp.route}>
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-black">
                    {usp.title}
                  </h5>
                </Link>
                <p className="mb-4 font-normal opacity-80">{usp.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </div>
  );
}

export default Usps;
