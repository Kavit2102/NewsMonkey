"use client";

import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../context/search_context";
import { ThemeContext } from "../context/theme_context";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  MoonIcon,
  SunIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { navigation } from "../utils/navigation";
import Countries from "./countries";
import { BlogForm } from "./blogform";
import { Profile } from "./profile";
import { useUser } from "@clerk/nextjs";

export default function Navbar() {
  const { Theme, setTheme } = useContext(ThemeContext);
  const { setSearchQuery } = useContext(SearchContext);
  const [searchInput, setSearchInput] = useState("");
  // const search = useSearchParams();

  const getTheme = async () => {
    const currentTheme = await localStorage.getItem("theme");
    setTheme(currentTheme);
    await document
      .querySelector("html")
      .setAttribute(
        "data-theme",
        localStorage.getItem("theme") || currentTheme
      );
  };

  const handleToggle = async () => {
    Theme === "light" ? setTheme("dark") : setTheme("light");
    await localStorage.setItem("theme", Theme);
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim() !== "") {
      setSearchQuery(searchInput.trim());
    }
  };

  const themeClass = Theme === "dark" ? "bg-gray-900" : "bg-white";
  const textColor = Theme === "dark" ? "text-white" : "text-black";
  const borderColor = Theme === "dark" ? "border-white" : "border-black";

  useEffect(() => {
    getTheme();
  }, []);

  let renderSearch = (
    <form
      onSubmit={handleSearchSubmit}
      className={`input flex items-center gap-2 ${borderColor} border-2`}
    >
      <input
        type="text"
        className="w-20 lg:w-auto"
        placeholder="Search"
        value={searchInput}
        onChange={handleSearchChange}
      />
      <button type="submit" className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-5 md:size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </button>
    </form>
  );

  return (
    <Disclosure
      as="nav"
      className={`fixed w-full z-10 shadow-md ${themeClass}`}
    >
      {({ open }) => (
        <>
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <DisclosureButton
                  className={`relative inline-flex items-center justify-center rounded-md p-2 ${textColor} hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white`}
                >
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>

              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex items-center">
                  {/* <Image
                      className="hidden md:block h-8 w-fit"
                      unoptimized
                      src="/Artboard_2.png"
                      alt="NewsChannel"
                      width={32}
                      height={32}
                      loading="lazy"
                    /> */}
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className={`flex gap-2 ${textColor}`}>
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="rounded-md px-2 py-2 text-sm font-medium"
                      >
                        {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center gap-5 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {renderSearch}

                <button
                  type="button"
                  className="relative rounded-full p-1 focus:outline-none"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Countries Dropdown */}
                <Countries />

                {/* Theme Button */}
                <label className="swap swap-rotate">
                  <input
                    type="checkbox"
                    className="theme-controller"
                    onClick={handleToggle}
                    value={Theme}
                  />
                  {Theme === "dark" ? (
                    <SunIcon className="h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MoonIcon className="h-6 w-6" aria-hidden="true" />
                  )}
                </label>

                <div className="article-btn">
                  {/* Open the modal using document.getElementById('ID').showModal() method */}
                  <button
                    className={`btn btn-success ${textColor}`}
                    onClick={() =>
                      document.getElementById("my_modal_1").showModal()
                    }
                  >
                    Create New Blog
                  </button>
                  <dialog id="my_modal_1" className="modal">
                    <div className="modal-box max-w-none max-h-none h-[90vh] w-[95vw]">
                      <div className="flex items-center justify-center">
                        <BlogForm />
                      </div>
                      <div className="modal-action">
                        <form method="dialog">
                          {/* if there is a button in form, it will close the modal */}
                          <button className="btn">Close</button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                </div>
                <Profile textColor={textColor} />
              </div>
            </div>
          </div>

          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  as="a"
                  href={item.href}
                  className="block rounded-md px-3 py-2 text-base font-medium"
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                </Link>
              ))}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
