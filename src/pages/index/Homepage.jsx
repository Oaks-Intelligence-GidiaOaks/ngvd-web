import { Link, Navigate } from "react-router-dom";
import logo from "../../assets/images/oaks-logo.png";
import bg from "../../assets/images/gb-vendor.jpg";
import freelancer from "../../assets/images/african-freelancer.jpeg";
import friends from "../../assets/images/happy-friends.jpeg";
import market from "../../assets/images/market-women.jpeg";
// import Layout from "../../components/Layout";
import { countries } from "./../../countries";
import { useState } from "react";
import loading from "../../assets/images/spinner.gif";
import axios from "axios";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Homepage() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [user_type, setUser_type] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const [subscribe, setSubscribe] = useState(false);
  const [referalCode, setReferalCode] = useState("");

  const slideImages = [
    {
      url: market,
      info: "Sell Naija made products and services to fellow Nigerians abroad without stress",
    },
    {
      url: freelancer,
      info: "Buy Naija made food, products and service from Nigerians abroad with just a click",
    },
    {
      url: friends,
      info: "Nigerian Global Vendor Directory just made it easy for Nigerians abroad to buy and sell within their community in the Diaspora",
    },
  ];

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 7000,
    // autoplaySpeed: 5000,
    cssEase: "linear",
  };

  async function handleFormSubmit(e) {
    setShowLoading(true);
    // console.log(firstname, lastname, email, country);
    e.preventDefault();
    if (!firstname || !lastname || !email || !country) {
      setShowLoading(false);
      alert("All fields are required");
    }
    const dt = await axios.post(
      "https://survey-dca570786965.herokuapp.com/api/v1/survey/create",
      {
        first_name: firstname,
        last_name: lastname,
        email,
        country,
        user_type,
        referred_by: referalCode,
      }
    );
    const ss = await dt;
    // console.log(ss.data);
    if (!ss.data.success) {
      alert("Kindly try again");
    }

    setShowLoading(false);
    setEmail("");
    setFirstname("");
    setCountry("");
    setLastname("");
    setReferalCode("");
    setSubscribe(true);
    // console.log("completed");
    // window.location.href = "/success";
  }
  return (
    <div>
      <div className="flex w-full lg:flex-row flex-col justify-between items-center gap-10 p-10">
        <div className="">
          <div className="mb-8">
            <img src={logo} alt="" width={130} />
          </div>

          <div className="max-w-[600px]">
            <h2 className="md:text-4xl font-semibold mb-3 text-[#117700]">
              Welcome to the
            </h2>
            <h2 className="md:text-4xl font-semibold mb-10">
              Nigerian Global Vendor Directory <br />
            </h2>

            <div className="lg:hidden">
              <Slider {...settings}>
                {slideImages.map((ads, id) => (
                  <div key={id} className="">
                    <div className="w-11/12 mb-5">
                      <p className="text-sm">{ads.info}</p>
                    </div>

                    <img
                      src={ads.url}
                      alt=""
                      className="object-cover rounded-xl"
                    />
                  </div>
                ))}
              </Slider>
            </div>
            <div className="flex items-center justify-center">
              {subscribe ? (
                <div>
                  <h2 className="md:text-3xl text-2xl font-semibold mb-10 text-[#F9B806]">
                    Thank you for signing up we will get back to you shortly
                  </h2>
                  <Link
                    to="/"
                    className="w-full bg-gray-400 rounded-lg p-2 text-white"
                    onClick={<Navigate to={"/"} />}
                  >
                    Return
                  </Link>{" "}
                </div>
              ) : (
                <div className="">
                  {showLoading && (
                    <div className="absolute bg-slate-200 bg-opacity-50 w-screen h-screen z-50 top-0 left-0">
                      <div className="w-full h-full flex items-center justify-center">
                        <img src={loading} alt="" width={200} />
                      </div>
                    </div>
                  )}
                  <form onSubmit={handleFormSubmit}>
                    <p className="mt-5 rounded-lg p-1 mb-2">
                      ỌjáKasuwaAhịa is here for the Nigerian Diaspora.
                    </p>
                    <p className="mb-10">
                      Satisfy your Nigerian craving and Satisfy the cravings of
                      Nigerians abroad by signing up below for FREE:
                    </p>
                    <span className="rounded-lg border-2 w-auto p-1 mb-5 border-[#117700]">
                      Early Bird registration is free
                    </span>
                    <div className="w-full my-5">
                      <input
                        className="w-full rounded-lg bg-gray-100 border-none p-2 "
                        type="text"
                        placeholder="First name"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                      />
                    </div>
                    <div className="w-full mb-5">
                      <input
                        className="w-full rounded-lg bg-gray-100 border-none p-2 "
                        type="text"
                        placeholder="Last name"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                      />
                    </div>
                    <div className="w-full mb-5">
                      <input
                        className="w-full rounded-lg bg-gray-100 border-none p-2 "
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="w-full mb-5">
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full rounded-lg bg-gray-100 border-none p-2 "
                      >
                        <option
                          className="w-full rounded-lg bg-gray-100 border-none "
                          defaultValue=""
                          disabled=""
                        >
                          Select Country
                        </option>
                        {countries.map((cn, id) => (
                          <option
                            key={id}
                            className="w-full rounded-lg bg-gray-100 border-none "
                            value={cn}
                          >
                            {cn}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="w-full mb-5">
                      <select
                        value={user_type}
                        onChange={(e) => setUser_type(e.target.value)}
                        className="w-full rounded-lg bg-gray-100 border-none p-2 "
                      >
                        <option
                          className="w-full rounded-lg bg-gray-100 border-none "
                          defaultValue="User Type"
                          disabled={""}
                        >
                          Would you like to buy or sell
                        </option>

                        <option
                          className="w-full rounded-lg bg-gray-100 border-none "
                          value={"Customer"}
                        >
                          I want to buy
                        </option>
                        <option
                          className="w-full rounded-lg bg-gray-100 border-none "
                          value={"Vendor"}
                        >
                          I want to sell
                        </option>
                      </select>
                    </div>
                    <div className="w-full mb-5">
                      <input
                        className="w-full rounded-lg bg-gray-100 border-none p-2 "
                        type="text"
                        placeholder="Referral Code: (letters only)"
                        value={referalCode}
                        onChange={(e) => setReferalCode(e.target.value)}
                      />
                    </div>
                    <button
                      className={
                        email && country
                          ? "w-full bg-[#117700] rounded-lg p-2 text-white"
                          : "w-full bg-[#117700] bg-opacity-70 rounded-lg p-2 text-white"
                      }
                    >
                      Create an Account
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="hidden lg:block w-1/2">
          <Slider {...settings}>
            {slideImages.map((ads, id) => (
              <div key={id} className="">
                <div className="bg-white w-11/12 mb-5">
                  <p className="text-sm">{ads.info}</p>
                </div>

                <img src={ads.url} alt="" className="object-cover rounded-xl" />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
