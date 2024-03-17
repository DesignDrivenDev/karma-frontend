import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

const Pie = ({ totalprice, hoefee }: any) => {
  const [downpayment, setdownpayment] = useState<any>(totalprice / 10);
  const [price, setprice] = useState(totalprice);
  const [rate, setrate] = useState<any>("6.33");
  const [duration, setduration] = useState<any>("360");
  const [per, setper] = useState<any>("10");

  useEffect(() => {
    setdownpayment(totalprice / 10);
    setprice(totalprice);
  }, [totalprice]);

  useEffect(() => {
    if (isNaN(downpayment)) {
      setdownpayment(totalprice / 10);
    }

    if (isNaN(price)) {
      setprice(totalprice);

      setdownpayment((per / 100) * price);
    }
    if (rate > 100) {
      setrate("");
      // toast.error("Interest should not be greater than 100");
    } else if (rate < 0) {
      setrate("");
      // toast.error("Interest should not be lower than 1");
    } else if (rate.length == 6) {
      setrate("");
    } else if (rate == 100) {
      setrate("100");
    }
    if (per > 100) {
      setper("");
      // toast.error("Percentage should not be greater than 100");
    } else if (per < 0) {
      setper("");
      // toast.error("Percentage should not be lower than 1");
    } else if (per.length == 6) {
      setper("");
    } else if (per == 100) {
      setrate("100");
    }
  }, [downpayment, price, rate, per]);

  const handleChange = (e: any) => {
    if (e.target.name == "price") {
      const result = e.target.value.replace(/\D/g, "");
      setprice(parseFloat(result));
      let val = result / per;
      setdownpayment(val);
    } else if (e.target.name == "downpayment") {
      const result = e.target.value.replace(/\D/g, "");
      setdownpayment(parseFloat(result));
      let val2 = (parseFloat(result) / price) * 100;
      setper(val2);
    } else if (e.target.name == "per") {
      const result = e.target.value.replace(/[^0-9\.]/g, "") + "";
      setper(result);
      let val = parseFloat(result) / 100;
      setdownpayment(Math.ceil(val * totalprice));
    } else if (e.target.name == "interest") {
      const value =
        e.target.value === ""
          ? ""
          : e.target.value.replace(/[^0-9\.]/g, "") + "";
      setrate(`${value}`);
    }
  };

  let P = price - downpayment;
  const intr = rate ? rate / 1200 : 6 / 1200;
  const emi = duration
    ? Math.round((P * intr) / (1 - Math.pow(1 / (1 + intr), duration)))
    : 0;

  let totalamount = emi + hoefee;

  const data = {
    backgroundColor: ["rgb(226, 30, 40)", "rgb(24, 143, 167)"],
    labels: [],
    datasets: [
      {
        label: "price",
        data: [emi, hoefee],
        backgroundColor: ["rgb(226, 30, 40)", "rgb(24, 143, 167)"],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="md:p-10  conatiner max-w-7xl mx-auto">
      <div className="section1 grid md:grid-cols-2 md:p-10">
        <div className="relative">
          <Doughnut data={data} width={100} height={70}></Doughnut>
          {hoefee > 0 ? (
            <p className="absolute md:top-36 md:right-28 text-2xl top-36 right-28">
              ${totalamount.toLocaleString()}*
              <span className="block">/month</span>
            </p>
          ) : (
            <p className="absolute md:top-36 md:right-28 text-2xl top-36 right-28">
              ${isNaN(emi) ? "0" : emi.toLocaleString()}
              <span className="block">/month</span>
            </p>
          )}
        </div>
        <div className=" m-10">
          <div className="flex items-center gap-2">
            <div className="w-10 h-4 bg-primary inline-block"></div>{" "}
            <div>
              Principal & Interest ${isNaN(emi) ? "0" : emi.toLocaleString()}
            </div>
          </div>
          {hoefee && (
            <div className="flex items-center gap-2">
              <div className="w-10 h-4 bg-[#188fa7] inline-block"></div>{" "}
              {hoefee && <div>HOA Dues ${hoefee.toLocaleString()}</div>}
            </div>
          )}

          <p className="block pt-4">*Does not include property taxes.</p>

          {hoefee ? (
            <div className="flex items-center gap-2">
              <div className="font-bold">
                Total Estimate $
                {`${
                  isNaN(totalamount) ? 0 : totalamount.toLocaleString()
                }/mo.* `}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="font-bold">
                Total Estimate ${`${price.toLocaleString()}/mo.* `}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="section2  md:grid-cols-2  grid gap-3 ">
        <div>
          <label className="relative">
            <span className="px-3 pl-3 pr-9 md:px-2 font-bold ">
              Home Price
            </span>
            <input
              className=" w-32 py-1 px-2 rounded-lg border-2 border-black"
              name="price"
              placeholder=""
              value={"$ " + price.toLocaleString()}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label className="relative">
            <span className="pl-3 pr-2 md:px-2 font-bold">Down Payment</span>
            <div className=" inline ">
              <input
                className="w-20 md:w-28 py-1 rounded-lg px-2 mx-1 border-2 border-black"
                type="downpayment"
                name="downpayment"
                value={"$ " + downpayment.toLocaleString()}
                placeholder={""}
                onChange={(e) => {
                  isNaN(downpayment) ? setdownpayment(1) : handleChange(e);
                }}
              />
              <input
                className="w-12 md:w-12 py-1  border-t-2 border-b-2 border-l-2 rounded-tl-md rounded-bl-md border-black focus:!outline-none focus:!border-black focus:!shadow-none focus:ring-transparent"
                type="text"
                name="per"
                value={per}
                placeholder={""}
                onChange={handleChange}
              />
              <span className=" p-[0.4rem] border-t-2 border-b-2 border-r-2 border-black rounded-tr-md rounded-br-md">
                %
              </span>
            </div>
          </label>
        </div>
        <div>
          <label>
            <span className=" pl-3 pr-10 md:px-[10px] font-bold  ">
              {" "}
              Long Term{" "}
            </span>
            <select
              className="py-1 rounded-lg border-2 border-black"
              onChange={(e) => {
                setduration(e.target.value);
              }}
            >
              <option value={360}>30 Years</option>
              <option value={180}>15 Years</option>
            </select>
          </label>
        </div>
        <div className="flex">
          <label className="relative">
            <span className="pl-2 pr-8 md:pl-1 md:pr-7  md:px-2 font-bold ">
              Interest Rate
            </span>
            <input
              className="w-16 py-1 mt-1 border-t-2 border-b-2 border-l-2 rounded-tl-md rounded-bl-md border-black focus:!outline-none focus:!border-black focus:!shadow-none focus:ring-transparent"
              type="text"
              name="interest"
              value={rate}
              placeholder={""}
              onChange={handleChange}
            />
          </label>
          <div className="mt-1 border-t-2 py-1 px-1 border-b-2 border-r-2 rounded-tr-md rounded-br-md border-black">
            <span className="">%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pie;
