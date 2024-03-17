import React, { useEffect, useState } from "react";
import Button from "./reusable/Button";
import Image from "next/image";
import Link from "next/link";
import logo from "../public/logo.png";
import { useRouter } from "next/router";

const navigation = [
  { name: "Solutions", href: "#" },
  { name: "Pricing", href: "#" },
  { name: "Docs", href: "#" },
  { name: "Company", href: "#" },
];

function Navbar() {
  const router = useRouter();

  const [login, setlogin] = useState("");

  useEffect(() => {
    let token = localStorage.getItem("token");

    if (!token) {
      // console.log("loggin again");
    } else {
      setlogin(token);
    }
  }, []);

  return (
    <header className="bg-gray-100 drop-shadow-xl sticky top-0 right-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between border-b border-primary lg:border-none">
          <div className="flex items-center mx-auto lg:mx-0">
            <span className=" duration-300 transition-transform hover:scale-105">
              <span className="sr-only">Karma Realty Group</span>
              <Link href={"/"}>
                <Image
                  className="cursor-pointer"
                  src={logo}
                  height={58}
                  width={120}
                />
              </Link>
            </span>
          </div>
          <div className="ml-10 space-x-8 hidden lg:block">
            <Link href={"/buy"}>
              <span className="cursor-pointer text-black hover:text-primary duration-300 transition-colors">
                Buy
              </span>
            </Link>
            <Link href={"/sell"}>
              <span className="cursor-pointer text-black hover:text-primary duration-300 transition-colors">
                Sell
              </span>
            </Link>
            <Link href={"/about"}>
              <span className="cursor-pointer text-black hover:text-primary duration-300 transition-colors">
                About Us
              </span>
            </Link>
            {login ? (
              <Link href={"/shortlisted"}>
                <span className="cursor-pointer text-black hover:text-primary duration-300 transition-colors">
                  Saved
                </span>
              </Link>
            ) : (
              <></>
            )}

            {login ? (
              <Link href={"/"}>
                <span>
                  <Button
                    onClick={() => {
                      localStorage.clear();
                      router.reload();
                    }}
                  >
                    <>Log out</>
                  </Button>
                </span>
              </Link>
            ) : (
              <>
                <Link href={"/sign-up"}>
                  <span>
                    <Button>
                      <>Sign up</>
                    </Button>
                  </span>
                </Link>

                <Link href={"/login"}>
                  <span>
                    <Button>
                      <>Login</>
                    </Button>
                  </span>
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
          <Link href={"/buy"}>
            <span className="cursor-pointer text-black hover:text-primary duration-300 transition-colors">
              Buy
            </span>
          </Link>
          <Link href={"/sell"}>
            <span className="cursor-pointer text-black hover:text-primary duration-300 transition-colors">
              Sell
            </span>
          </Link>
          {login ? (
            <>
              <Link href={"/"}>
                <span
                  className="mb-3"
                  onClick={() => {
                    localStorage.clear();
                    router.reload();
                  }}
                >
                  <>Log out</>
                </span>
              </Link>
              <Link href={"/shortlisted"}>
                <span className="cursor-pointer text-black hover:text-primary duration-300 transition-colors">
                  Saved
                </span>
              </Link>
            </>
          ) : (
            <>
              <Link href={"/sign-up"}>
                  <span>
                    
                      <>Sign up</>
                   
                  </span>
                </Link>
              <Link href={"/login"}>
                <span className="cursor-pointer text-black hover:text-primary duration-300 transition-colors">
                  Login
                </span>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
