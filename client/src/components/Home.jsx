import { Link, useNavigate } from "react-router-dom";

import Incentives from "./Incentives";
import Categories from "./Categories";
import Slider from "./Slider";
import Testimonials from "./Testimonials";
export default function Home() {
  return (
    <div className="bg-white">
      <section className="py-24 mt-12">
        <div className="mx-auto lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5 flex flex-col lg:flex-row lg:items-stretch gap-10">
          <div className="lg:w-1/2 lg:py-10 xl:py-12 text-center lg:text-left max-w-2xl md:max-w-3xl mx-auto ">
            <h1 className="font-semibold leading-tight text-green-950  text-4xl md:text-5xl lg:text-6xl">
              <div className="relative after:absolute after:inset-x-0 after:h-3 after:bg-green-100after:bottom-2 inline-block px-2">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-tr from-green-400 to-green-800">
                  Boost
                </span>
              </div>{" "}
              Farm Yields Without Costly Machinery! 🌾
            </h1>
            <p className="mt-8 text-gray-700">
              HarvestHire provides top-quality farm equipment on rent, whenever
              you need it. Boost efficiency and productivity, all while saving
              on hefty machinery costs.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Link
                to="/login"
                className="flex items-center justify-center gap-x-2 px-5 py-2.5 border border-transparent bg-green-700 text-white z-20 hover:bg-green-900"
              >
                Sign Up
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  width={16}
                  height={16}
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
              <Link
                to="/equipments"
                className="flex items-center justify-center gap-x-2 px-5 py-2.5 border border-gray-200 text-green-900  z-20 hover:bg-yellow-400"
              >
                Browse Equipments
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 relative lg:h-auto max-w-2xl md:max-w-3xl mx-auto rounded-3xl overflow-hidden ">
            <Slider />
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <div className="bg-yellow-300 mt-10">
        <div className="sm:flex sm:items-center sm:justify-between max-auto py-16">
          <h2 className="font-semibold leading-tight text-black  dark:text-white text-3xl mx-auto">
            🚜 Browse Popular Categories
          </h2>
        </div>
        <Categories isHome={true} />
      </div>

      {/* Incentives */}
      <div className=" bg-gray-100">
        <Incentives />
      </div>

      {/* Testimonials */}
      <div className=" bg-gray-100">
        <Testimonials />
      </div>
    </div>
  );
}
