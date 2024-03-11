import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  // const [isMenuOpen, setIsMenuOpen] = useState();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const loginPage = () => {
    console.log("hi");
    navigate("/user/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };
  return (
    <div>
      <header class="bg-white">
        <nav
          class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div class="flex lg:flex-1">
            <a href="/" class="-m-1.5 p-1.5">
              <span class="sr-only">Your Company</span>
              <img
                class="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
          </div>
          <div class="flex lg:hidden">
            <button
              type="button"
              class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={toggleMenu}
            >
              <span class="sr-only">Open main menu</span>
              <svg
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
          <div class="hidden lg:flex lg:gap-x-12">
            <div class="relative"></div>
            <a href="#" class="text-sm font-semibold leading-6 text-gray-900">
              Product
            </a>
            <a href="#" class="text-sm font-semibold leading-6 text-gray-900">
              About
            </a>
            <a href="#" class="text-sm font-semibold leading-6 text-gray-900">
              Contact
            </a>
            <a href="#" class="text-sm font-semibold leading-6 text-gray-900">
              Team
            </a>
          </div>
          <div class="hidden lg:flex lg:flex-1 lg:justify-end">
            <button
              className="mr-8 bg-red-500 text-white px-1 py-1 rounded-[5px]"
              onClick={handleRegister}
            >
              Register
            </button>
            <button
              href="#"
              class="text-sm font-semibold leading-6 text-white px-2 py-1 bg-indigo-600 rounded-[5px]"
              onClick={loginPage}
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        </nav>
        {isMenuOpen && (
          <div class="lg:hidden" role="dialog" aria-modal="true">
            <div class="fixed inset-0 z-10"></div>
            <div class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div class="flex items-center justify-between">
                <a href="#" class="-m-1.5 p-1.5">
                  <span class="sr-only">Your Company</span>
                  <img
                    class="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt=""
                  />
                </a>
                <button
                  type="button"
                  class="-m-2.5 rounded-md p-2.5 text-gray-700"
                  onClick={toggleMenu}
                >
                  <span class="sr-only">Close menu</span>
                  <svg
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div class="mt-6 flow-root">
                <div class="-my-6 divide-y divide-gray-500/10">
                  <div class="space-y-2 py-6">
                    <div class="-mx-3">
                      <div class="mt-2 space-y-2" id="disclosure-1">
                        <a
                          href="#"
                          class="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        >
                          Product
                        </a>
                        <a
                          href="#"
                          class="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        >
                          About
                        </a>
                        <a
                          href="#"
                          class="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        >
                          Contact
                        </a>
                        <a
                          href="#"
                          class="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        >
                          Team
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="py-6">
                    <a
                      href="#"
                      class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-red-500 hover:bg-gray-50 "
                      onClick={handleRegister}
                    >
                      Register
                    </a>
                    <a
                      href="#"
                      class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-blue-900 hover:bg-gray-50"
                      onClick={loginPage}
                    >
                      Log in
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;
