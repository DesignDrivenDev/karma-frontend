import bedIcon from "../public/icons/Bed.png";
import bathIcon from "../public/icons/Bath.png";
import areaIcon from "../public/icons/Area.png";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { HeartIcon } from "@heroicons/react/24/solid";
import toast, { Toaster } from "react-hot-toast";
import nodata from "../public/about.jpg";
// @ts-ignore
import { CldImage } from "next-cloudinary";

function HouseCard({ home, housesliked }: any) {
  const { addHouse, removeHouse, token, likedHouses } = useAuth();

  useEffect(() => {
    let arr = housesliked.map((value: any) => value._id);
    let Is_true = arr.includes(home._id);

    if (Is_true) {
      setliked(true);
    }
  }, [home, housesliked, likedHouses]);

  const [liked, setliked] = useState(false);

  return (
    <>
      <div data-aos="zoom-in" data-aos-offset="0">
        <div className="max-w-4xl w-full  overflow-hidden shadow-lg flex flex-col bg-white cursor-pointer min-h-[20rem] duration-300 transition-transform hover:scale-105">
          <div className="w-full flex flex-col relative  ">
            {token ? (
              <button
                onClick={() => {
                  setliked((prev) => {
                    if (prev) {
                      removeHouse(home._id);
                    } else {
                      addHouse(home._id);
                    }
                    return !prev;
                  });
                }}
                className="absolute mt-1 ml-2 z-10 px-0.5 py-0.5 text-black bg-transparent  font-bold right-1"
              >
                {home.standardStatus != "Closed" ? (
                  <HeartIcon
                    className={` fill-transparent  h-6 w-6 z-12 absolute right-1 ${
                      liked === true
                        ? "!fill-primary"
                        : "stroke-primary stroke-2"
                    }  `}
                  />
                ) : (
                  <></>
                )}
              </button>
            ) : (
              <button
                onClick={() =>
                  toast.error("Please login/register to shortlist houses")
                }
                className="absolute mt-1 ml-2 z-10 px-0.5 py-0.5 text-black bg-transparent  font-bold right-1"
              >
                {home.standardStatus != "Closed" ? (
                  <HeartIcon
                    className={` fill-transparent  h-6 w-6 z-12 absolute right-1 ${
                      liked === true
                        ? "!fill-primary"
                        : " stroke-primary stroke-2 "
                    }  `}
                  />
                ) : (
                  <></>
                )}
              </button>
            )}

            {home.standardStatus != "Active" && (
              <p className="absolute mt-1 ml-2 z-10 px-2 text-primary bg-slate-100 border-2 rounded-md text-sm font-bold">
                {" "}
                {home.standardStatus}
              </p>
            )}
            {home.standardStatus != "Closed" ? <>
            <Link href={`/property/${home._id}`}>
              {
                <CldImage
                  deliveryType="fetch"
                  crop="thumb"
                  gravity="auto"
                  className="w-full" 
                  height={230}
                  width={300}
                  src={home.media.length > 0 ? home.media[0].mediaURL : "https://res.cloudinary.com/dho3yhdml/image/fetch/c_thumb,w_300,h_230,g_auto/f_auto/q_auto/https://www.linkpicture.com/q/nodata_1.png"}
                  alt="images was not uploaded by mls"
                />
              }
            </Link>
            </> : <>
            <Link href={`/soldproperty/${home._id}`}>
              {
                <CldImage
                  deliveryType="fetch"
                  crop="thumb"
                  gravity="auto"
                  className="w-full" 
                  height={230}
                  width={300}
                  src={home.media.length > 0 ? home.media[0].mediaURL : "https://res.cloudinary.com/dho3yhdml/image/fetch/c_thumb,w_300,h_230,g_auto/f_auto/q_auto/https://www.linkpicture.com/q/nodata_1.png"}
                  alt="images was not uploaded by mls"
                />
              }
            </Link>
            </>}
            {home.masterBedroomLevel && (
              <p className=" absolute bottom-2 right-2 z-3 px-2 text-primary bg-slate-100 border-2 rounded-md text-sm font-bold">
                Master on {home.masterBedroomLevel}
              </p>
            )}
          </div>
          {home.standardStatus != "Closed" ? <>
          <Link href={`/property/${home._id}`}>
            <div className="px-4 py-3 min-h-[7rem]">
              <div className="flex gap-4 bg-white justify-around">
                <div className="flex-1 w-full">
                  <p className="text-xs">{home.propertySubType} </p>

                  <div className="flex flex-row bg-white ">
                    <div className="flex items-center justify-center gap-2 text-sm ">
                      {home.bedroomsTotal && (
                        <Image height={10} width={10} src={bedIcon} />
                      )}
                      {home.bedroomsTotal && (
                        <span>{home.bedroomsTotal} bed </span>
                      )}
                    </div>

                    <div className="flex items-center justify-center gap-2 ml-2 text-sm">
                      {home.bathroomsTotalInteger && (
                        <Image height={10} width={10} src={bathIcon} />
                      )}
                      {home.bathroomsTotalInteger && (
                        <span>{home.bathroomsTotalInteger} bath</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-right font-black text-xl">
                  <span>
                    {home.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 0,
                    })}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-sm ">
                {home.sqFtTotal > 0 && (
                  <Image height={10} width={10} src={areaIcon} />
                )}
                {home.sqFtTotal > 0 && <span>{home.sqFtTotal} sqft</span>}
              </div>

              <p className="text-sm truncate">{home.address}</p>
            </div>
          </Link>
          </> : <>
          <Link href={`/soldproperty/${home._id}`}>
            <div className="px-4 py-3 min-h-[7rem]">
              <div className="flex gap-4 bg-white justify-around">
                <div className="flex-1 w-full">
                  <p className="text-xs">{home.propertySubType} </p>

                  <div className="flex flex-row bg-white ">
                    <div className="flex items-center justify-center gap-2 text-sm ">
                      {home.bedroomsTotal && (
                        <Image height={10} width={10} src={bedIcon} />
                      )}
                      {home.bedroomsTotal && (
                        <span>{home.bedroomsTotal} bed </span>
                      )}
                    </div>

                    <div className="flex items-center justify-center gap-2 ml-2 text-sm">
                      {home.bathroomsTotalInteger && (
                        <Image height={10} width={10} src={bathIcon} />
                      )}
                      {home.bathroomsTotalInteger && (
                        <span>{home.bathroomsTotalInteger} bath</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-right font-black text-xl">
                  <span>
                    {home.closePrice.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 0,
                    })}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-sm ">
                {home.sqFtTotal > 0 && (
                  <Image height={10} width={10} src={areaIcon} />
                )}
                {home.sqFtTotal > 0 && <span>{home.sqFtTotal} sqft</span>}
              </div>

              <p className="text-sm truncate">{home.address}</p>
            </div>
          </Link>
          </>}
        </div>
      </div>
    </>
  );
}

export default HouseCard;
