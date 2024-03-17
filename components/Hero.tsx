import Button from "./reusable/Button";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import useMediaQuery from "../hooks/useMediaQuery";
import url from "../utils/constants";

function Hero() {
  const [searchvalue, setsearchvalue] = useState("");

  const [data, setdata] = useState([]);

  const router = useRouter();

  const isDesktop = useMediaQuery("(min-width: 768px)");

  function handleclick(e: any) {
    e.preventDefault();
    router.push(`/search/?value=${searchvalue}`);
  }

  useEffect(() => {
    const getData = setTimeout(async () => {
      if (searchvalue) {
        const response = await fetch(
          `${url}/api/v1/properties/fetchByAddress`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              address: searchvalue.trim(),
            }),
          }
        );
        const responsedata = await response.json();
        setdata(responsedata.data);
      }
    }, 500);

    return () => clearTimeout(getData);
  }, [searchvalue]);

  return (
    <main>
      <div className="relative">
        <div className="max-w-full mx-auto ">
          <div className="relative shadow-xl sm:overflow-hidden">
            <div className="absolute inset-0 bg-hero bg-no-repeat bg-cover bg-center">
              <div className="absolute inset-0 bg-black opacity-50 mix-blend-multiply" />
            </div>
            <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
              <h1 className="text-center text-4xl font-bold tracking-tight sm:text-5xl">
                <span className="text-lightGray outline-primary inline py-1  rounded-xl outline-8 ">
                  You are just a click away.
                </span>
              </h1>

              <h1 className="text-center text-md mt-3 tracking-tight ">
                <span className="text-lightGray outline-primary inline py-1 rounded-xl  outline-8 ">
                  Explore 1000+ properties in Charlotte region.
                </span>
              </h1>

              <form onSubmit={handleclick}>
                <div className="mt-5 max-w-lg mx-auto text-center text-xl text-black sm:max-w-3xl bg-white rounded-2xl py-2 md:py-3 px-3 md:px-6 flex items-center gap-2">
                  <input
                    name="search"
                    id="search"
                    type={"search"}
                    autoComplete="off"
                    value={searchvalue}
                    onChange={(e) => {
                      setsearchvalue(e.target.value);
                    }}
                    placeholder={
                      isDesktop
                        ? "Search by City, Zip-Code, Sub-Division or MLS ID"
                        : "Search"
                    }
                    className="w-full py-2 px-2 rounded-md border-none focus:!outline-none focus:!border-black focus:!shadow-none focus:ring-transparent"
                  />

                  <div className="inline group">
                    <span className="cursor-pointer flex gap-2 items-center md:mr-3 text-sm md:text-md">
                      <Link href="/search">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          className="fill-black duration-300 transition-all inline group-hover:fill-primary"
                          viewBox="0 0 16 16"
                        >
                          <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
                        </svg>
                      </Link>

                      <Link href="/search">
                        <span className="group-hover:text-primary duration-300 transition-all">
                          {" "}
                          Filter{" "}
                        </span>
                      </Link>
                    </span>
                  </div>
                  <input
                    className="text-sm md:text-md cursor-pointer text-white py-3 px-6 rounded-lg bg-primary hover:bg-red-700 transition-colors duration-300"
                    type="submit"
                    value="Search"
                  />
                </div>
                {data.length != 0 ?  <></> : <div className="text-white text-center pt-3 md:hidden">
                Search by City, Zip-Code, Sub-Division or MLS ID
              </div>}
               
                <div className="max-w-lg mx-auto  text-xl text-black sm:max-w-3xl  rounded-2xl  px-3 md:px-6 flex  ">
                  <div className="overflow-auto h-44 flex flex-col  ">
                    {data.map((value: any) => (
                      <div
                        className="overflow-hidden bg-white md:p-5  py-5 px-0 text-base text-left"
                        key={value.address}
                      >
                        <button
                          className="md:px-0  px-3 text-left"
                          onClick={() => setsearchvalue(value.address)}
                        >
                          {value.address}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </form>

              
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Hero;
