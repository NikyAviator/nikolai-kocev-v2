'use client';

import { useCallback, useState } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import {
  Bars3Icon,
  XMarkIcon,
  SunIcon,
  MoonIcon,
} from '@heroicons/react/24/outline';
import useDarkMode from './hooks/useDarkMode';
import { Link } from 'react-router-dom';

export default function Header() {
  const [dark, setDark] = useDarkMode();
  const [mobileOpen, setMobileOpen] = useState(false);

  // memoised handlers
  const toggleTheme = useCallback(() => setDark(!dark), [dark, setDark]);
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <header>
      <nav
        aria-label="Global"
        className="flex items-end-safe justify-between p-6 lg:px-8"
      >
        {/* brand */}
        <Link to="/" className="-m-1.5 p-1.5 text-xl font-bold text-indigo-600">
          NikyAviator
        </Link>
        {/* desktop auth links */}

        {/* mobile hamburger */}
        <button
          onClick={() => setMobileOpen(true)}
          className="-m-2.5 rounded-md p-2.5 text-indigo-600 lg:hidden"
        >
          <span className="sr-only">Open menu</span>
          <Bars3Icon className="size-6" />
        </button>

        {/* desktop theme toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="hidden rounded-md p-2 text-indigo-600 ring-1 ring-indigo-600/30 hover:bg-indigo-600/10 lg:inline-flex dark:text-indigo-400"
        >
          {dark ? (
            <SunIcon className="size-5" />
          ) : (
            <MoonIcon className="size-5" />
          )}
        </button>
        <div className="hidden lg:flex lg:items-end lg:gap-4">
          <Link
            to="/blogs"
            className="ml-4 inline-block rounded-md bg-indigo-600 px-3 py-1 text-white hover:bg-indigo-500"
          >
            Blogs
          </Link>
        </div>
      </nav>

      {/* mobile dialog */}
      <Dialog open={mobileOpen} onClose={closeMobile} className="lg:hidden">
        <div className="fixed inset-0 bg-black/40" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full max-w-sm overflow-y-auto bg-white px-6 py-6 sm:ring-1 sm:ring-gray-900/10 dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="-m-1.5 p-1.5 text-xl font-bold text-indigo-600"
            >
              NikyAviator
            </Link>
            <button
              onClick={closeMobile}
              className="-m-2.5 rounded-md p-2.5 text-indigo-600"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="size-6" />
            </button>
          </div>

          {/* theme toggle inside drawer */}
          <div className="mt-6">
            <button
              onClick={() => {
                toggleTheme();
                closeMobile();
              }}
              className="flex items-center gap-2 rounded-md px-3 py-2 text-base font-semibold text-indigo-600 hover:bg-gray-100 dark:text-indigo-300 dark:hover:bg-gray-800/40"
            >
              {dark ? (
                <SunIcon className="size-5" />
              ) : (
                <MoonIcon className="size-5" />
              )}
              {dark ? 'Light mode' : 'Dark mode'}
            </button>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
