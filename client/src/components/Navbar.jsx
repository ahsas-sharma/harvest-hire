import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Logo from "../assets/logo.png";

const navigation = [
  // { name: "Home", href: "/", private: false },
  { name: "Browse Equipments", href: "/equipments", private: false },
  // { name: "Dashboard", href: "/dashboard", private: true },
];

const Navbar = () => {
  const { isLoggedIn, logout, user } = useAuth();

  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div>
      <header className="sticky inset-x-0 top-0 z-50 bg-white shadow-sm">
        <nav
          aria-label="Global"
          className="flex items-center justify-between p-6 lg:px-8"
        >
          <div className="flex lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">HarvestHire</span>
              <img src={Logo} className="h-8 w-auto" />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-800"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-green-700 hover:text-green-900"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {isLoggedIn ? (
              <div className="flex items-center gap-x-4">
                <Link
                  to="/dashboard"
                  className="text-sm font-semibold leading-6 text-green-700 hover:text-green-900"
                >
                  Dashboard
                </Link>
                <Link
                  to="/wishlist"
                  className="text-sm font-semibold leading-6 text-green-700 hover:text-green-900"
                >
                  Wishlist
                </Link>
                <Link
                  to="/cart"
                  className="text-sm font-semibold leading-6 text-green-700 hover:text-green-900"
                >
                  Cart
                </Link>
                <a
                  href="#"
                  className="mx-3 block rounded-lg px-3 py-2.5 text-sm font-semibold leading-7 text-green-700 hover:text-gray-900"
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                >
                  Log out
                </a>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-sm font-semibold leading-6 text-green-700"
              >
                Log in <span aria-hidden="true">&rarr;</span>
              </Link>
            )}
          </div>
        </nav>
        {/* Mobile Menu */}
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">HarvestHire</span>
                <img src={Logo} className="h-8 w-auto" />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-800"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/25">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-green-700 hover:bg-gray-800"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  {isLoggedIn ? (
                    <div>
                      <Link
                        to="/dashboard"
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-green-400 hover:bg-gray-800"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/wishlist"
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-green-700 hover:bg-gray-800"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Wishlist
                      </Link>
                      <Link
                        to="/cart"
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-green-700 hover:bg-gray-800"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Cart
                      </Link>
                      <a
                        href="#"
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-yellow-600 hover:bg-gray-800"
                        onClick={() => {
                          logout();
                          navigate("/");
                          setMobileMenuOpen(false);
                        }}
                      >
                        Log out
                      </a>
                    </div>
                  ) : (
                    <Link
                      to="/login"
                      className="text-sm font-semibold leading-6 text-green-700"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Log in <span aria-hidden="true">&rarr;</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
    </div>
  );
};

export default Navbar;
