import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import url from "../utils/constants";

const Forgot: NextPage = () => {
  const router = useRouter();

  const [credentials, setCredentials] = useState({
    password: "",
  });

  let token = router.query.t;

  // TO BE CHANGED -> calling api
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (credentials.password.length < 8) {
      toast.error("Password should be at least 8 characters");
      return;
    }

    if (!token) {
      toast.error(
        "Something went wrong please reenter your email to reset password"
      );
      router.push("/forgot-password");
      return;
    }

    const response = await fetch(`${url}/api/v1/properties/resetpassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        resetLink: token,
        newPass: credentials.password,
      }),
    });
    const json = await response.json();

    if (json) {
      // Save the auth token and redirect
      toast.success("Password Reset Successfully. You may login now.");
      router.push("/login");
    } else {
      toast.error("Something went wrong");
    }
  };

  //using onchange
  const onChange = (e: any) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Reset Password
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600.">
          Please enter the password you would like to reset.
        </p>
      </div>

      <div className="mt-0 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-5 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  required
                  value={credentials.password}
                  onChange={onChange}
                  id="password"
                  name="password"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                />
              </div>
            </div>
            <div>
              <button
                onClick={handleSubmit}
                // type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-red-500 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Forgot;
