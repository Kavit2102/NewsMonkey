"use client";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useContext, useEffect, useState } from "react";
import "../css/scrollbar.css";
import { countriesData } from "../utils/countriesData";
import Image from "next/image";
import { CountriesContext } from "../context/countries_context";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Countries() {
  const [countries, setCountries] = useState(countriesData);
  const { country, setCountry } = useContext(CountriesContext);
  const [menuItem, setMenuItem] = useState(country);

  let textColor;
  const getCountry = async () => {
    try {
      setMenuItem(localStorage.getItem("country"));
    } catch (error) {
      console.log("Error accessing local storage:", error);
    } finally {
      textColor =
        (await localStorage.getItem("theme")) === "dark"
          ? "text-white"
          : "text-black";
    }
  };

  const handleMenuItemChange = async (selectedItem) => {
    try {
      setMenuItem(selectedItem.name);
      await localStorage.setItem("country", selectedItem.name);
      await localStorage.setItem("country-code", selectedItem.code);
      setCountry(selectedItem.code);
    } catch (error) {
      console.error("Error setting country code in local storage:", error);
    }
  };

  useEffect(() => {
    getCountry();
  }, [country]);

  return (
    <Menu
      as="div"
      className="relative w-auto inline-block text-center text-sm custom-scrollbar"
    >
      <div>
        <MenuButton
          className={`inline-flex items-center w-full justify-center rounded-md px-3 py-2 text-xs font-semibold shadow-sm ring-1 ring-inset ring-gray-300 ${textColor} custom-scrollbar`}
        >
          {menuItem}
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </MenuButton>
      </div>

      <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none overflow-y-auto overscroll-auto max-h-60 custom-scrollbar">
        <div className="flex flex-col gap-y-3 text-sm custom-scrollbar">
          {countries.map((country) => (
            <MenuItem key={country.code}>
              {({ active }) => (
                <div
                  onClick={() => handleMenuItemChange(country)}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "flex gap-2 justify-start items-center px-4 text-sm cursor-pointer"
                  )}
                >
                  <Image
                    src={country.flagUrl}
                    unoptimized
                    height={20}
                    width={20}
                    alt={`${country.name} flag`}
                    loading="lazy"
                  />
                  <span>{country.name}</span>
                </div>
              )}
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
}
