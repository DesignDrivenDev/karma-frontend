import React from "react";
import Button from "./reusable/Button";
import Image from "next/image";
import form from "../public/form.webp";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import url from "../utils/constants";

function ContactForm() {
  const [credentials, setCredentials] = useState({
    name: "",
    inquiryType: "buy",
    phoneNo: "",
    email: "",
    inquiryDetails: "Single family home",
    value: 0,
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (credentials.phoneNo == "") {
      toast.error("Please enter your phone number");
      return;
    }
    if (credentials.value <= 0) {
      toast.error("Please enter valid price");
      return;
    }
    if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        credentials.email.toString()
      )
    ) {
      toast.error("Please provide a valid email id.");
      return;
    }
    if (credentials.phoneNo.length < 11) {
      toast.error("Please provide a valid phone number.");
      return;
    } else {
      const response = await fetch(`${url}/api/v1/properties/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.name,
          inquiryType: credentials.inquiryType,
          phoneNo: credentials.phoneNo,
          email: credentials.email,
          inquiryDetails: credentials.inquiryDetails,
          value: credentials.value,
        }),
      });

      const json = await response.json();

      if (json.success) {
        toast.success(
          "Thank you for your reaching us. An agent will be touch with you at the earliest."
        );
        setCredentials({
          name: "",
          inquiryType: "buy",
          phoneNo: "",
          email: "",
          inquiryDetails: "Single family home",
          value: 0,
        });
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  const onChange = (e: any) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    //contact form start here
    <div className="relative bg-white">
      <div className="relative max-w-7xl mx-auto lg:flex">
        <div className="lg:w-11/12 py-3 md:py-16 px-4 sm:px-4 lg:col-span-2 lg:px-6">
          <div className="">
            <Image
              className="rounded-md"
              // height={1000}
              objectFit="contain"
              src={form}
            />
          </div>
        </div>
        <div className="bg-white py-3 md:py-16 px-4 sm:px-6 lg:col-span-3 lg:px-6">
          <div className="">
            <h4 className="text-3xl font-bold py-3">Get in touch with us</h4>
            <h5 className="text-lg text-gray-600 py-3 ">
              This form takes about 2 minutes to fill out and saves us about 10
              minutes on the phone. So we are saving you 8 minutes to dream
              about your next big move!
            </h5>
          </div>
          <div className="max-w-lg mx-auto lg:max-w-none">
            {/* form start here */}
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-5">
              {/* Name */}
              <div className="flex flex-col md:flex-row gap-1.5 items-start md:items-center mt-5 lg:mt-auto">
                <div>
                  <p className="pr-2">My name is</p>
                </div>
                <div className="w-full md:w-auto">
                  <label htmlFor="name" className="sr-only">
                    Full name
                  </label>

                  <input
                    value={credentials.name}
                    onChange={onChange}
                    required
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="name"
                    className=" shadow-sm pl-1.5 placeholder-gray-500  border-primary w-full  hover:rounded-md focus:outline-none focus:ring focus:ring-white p-1 rounded-md"
                    placeholder="Full name"
                  />
                </div>
              </div>

              {/* email  */}
              <div className="flex flex-col md:flex-row gap-1.5 items-start md:items-center">
                <div>
                  <p className="pr-2">My email address is</p>
                </div>
                <div className="w-full md:w-auto">
                  <label htmlFor="email" className="sr-only">
                    email
                  </label>

                  <input
                    value={credentials.email}
                    onChange={onChange}
                    required
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    className="w-full  shadow-sm pl-1.5 placeholder-gray-500  border-primary  hover: rounded-md focus:outline-none focus:ring focus:ring-white p-1"
                    placeholder="Email"
                  />
                </div>
              </div>

              {/* phone no  */}
              <div className="flex flex-col md:flex-row gap-1.5 items-start md:items-center">
                <div>
                  <p className="pr-2">You can get in touch with me on</p>
                </div>
                <div className="w-full md:w-auto !md:max-w-[2rem]">
                  <label htmlFor="phoneNo" className="sr-only">
                    phoneNo
                  </label>

                  <PhoneInput
                    onChange={(phone) => {
                      setCredentials({ ...credentials, phoneNo: phone });
                    }}
                    value={credentials.phoneNo}
                    country={"us"}
                    inputClass="!w-full !md:w-auto"
                    containerClass="!w-full !md:w-auto  !shadow-sm  !placeholder-gray-500 !border-primary !rounded-md !focus:outline-none !focus:ring !focus:ring-white !border-[1px]"
                    placeholder="phoneno"
                  />
                </div>
              </div>

              {/* buy sell */}
              <div className="flex flex-col md:flex-row gap-1.5 items-start md:items-center">
                <div>
                  <p className="pr-2">I would like to</p>
                </div>

                <div className="w-full md:w-16 ">
                  <label className="block" htmlFor="inquiryType">
                    <select
                      className="pl-1.5 shadow-sm  placeholder-gray-500  border-primary !w-full  hover: rounded-md focus:outline-none focus:ring focus:ring-white p-1"
                      id="inquiryType"
                      name="inquiryType"
                      onChange={onChange}
                    >
                      <option value="buy">buy</option>
                      <option value="sell">sell</option>
                    </select>
                  </label>
                </div>

                <div>
                  <p className="pl-1.5 hidden md:block"> with Karma Realty.</p>
                </div>
              </div>

              {/* Price */}
              <div className="flex flex-col md:flex-row gap-1.5 items-start md:items-center">
                <div className="min-w-[20px]">
                  <p className="pr-2">
                    I want to {credentials.inquiryType} for $
                  </p>
                </div>
                <div className="w-full md:w-auto">
                  <label htmlFor="value" className="sr-only">
                    value
                  </label>

                  <input
                    value={credentials.value}
                    onChange={onChange}
                    type="number"
                    name="value"
                    id="value"
                    required
                    className="shadow-sm pl-1.5 placeholder-gray-500  border-primary w-full lg:w-52  hover: rounded-md focus:outline-none focus:ring focus:ring-white p-1"
                    placeholder="Price"
                  />
                </div>
              </div>

              {/* houses data */}
              <div className="flex flex-col md:flex-row gap-1.5 items-start md:items-center">
                <div>
                  <p className="pr-2">
                    I am looking to {credentials.inquiryType + " a"}{" "}
                  </p>
                </div>

                <div className="w-full md:w-auto">
                  <label className="block" htmlFor="inquiryDetails">
                    <select
                      className="shadow-sm  pl-1.5 placeholder-gray-500  border-primary w-full lg:w-52 rounded-md focus:outline-none focus:ring focus:ring-white p-1"
                      id="inquiryDetails"
                      name="inquiryDetails"
                      onChange={onChange}
                    >
                      <option value="Single family home">
                        Single family home
                      </option>
                      <option value="Multi family home">
                        Multi family home
                      </option>
                      <option value="Townhouse">Townhouse</option>
                      <option value="Condo">Condo</option>
                    </select>
                  </label>
                </div>
              </div>

              <div>
                <Button>
                  <>Connect Now</>
                </Button>
              </div>
            </form>
            {/* form ends here */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
