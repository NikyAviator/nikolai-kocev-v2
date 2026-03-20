// frontend/src/Pages/Services/ItSupportServicePage.jsx
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/react';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';

const product = {
  name: 'IT Support & Computer Help',
  price: 'Contact for quote',

  images: [
    {
      id: 1,
      name: 'Linux support',
      src: '/images/arch-debian-ubuntu.png',
      alt: 'Linux, Arch, Debian, and Ubuntu support service',
    },
    {
      id: 2,
      name: 'Linux, Windows & macOS Support',
      src: '/images/linux-repair.png',
      alt: 'Linux, Windows, and macOS support service',
    },
    {
      id: 3,
      name: 'Backups & Data Protection',
      src: '/images/backup.png',
      alt: 'Backup and data protection service',
    },
  ],

  description: `
   <p>I help individuals and small businesses with practical IT support, including Linux, Windows, and macOS troubleshooting, system migrations, backups, and general technical help.</p>
<p>My focus is on clear communication, reliable solutions, and support that makes everyday technology easier to use, maintain, and rely on.</p>
  `,
  details: [
    {
      name: 'Windows to Linux Migration',
      items: [
        'Safe migration of important files from Windows to Linux',
        'Guidance on choosing the right Linux distribution',
        'Installation and first-time setup',
        'Help with drivers, printers, and everyday applications',
        'Post-installation support so the new system feels usable and stable',
        'Automatic updates and scripts to help keep the system secure and up to date',
        'Distributions I work with: Arch, Debian, Ubuntu, and Linux Mint',
      ],
    },
    {
      name: 'Linux, Windows & macOS Support',
      items: [
        'Troubleshooting slow or unstable computers',
        'Operating system installation and setup',
        'Software installation and update support',
        'Printer, Wi-Fi, and device troubleshooting',
        'Network hardening with firewalls and best practices',
        'General system cleanup and performance improvements',
      ],
    },
    {
      name: 'Backups & Recovery',
      items: [
        'Backup strategies for documents and photos',
        'External drive and local backup setup',
        'Help with restoring lost or deleted files',
        'Basic data protection and safety guidance',
        'Practical solutions for home users and freelancers',
      ],
    },
  ],
};

export default function ItSupportServicePage() {
  return (
    // Page background
    <div className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          {/* ── Image gallery ── */}
          <TabGroup className="flex flex-col-reverse">
            {/* Thumbnail selector */}
            <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
              <TabList className="grid grid-cols-4 gap-6">
                {product.images.map((image) => (
                  <Tab
                    key={image.id}
                    // bg-white → dark:bg-gray-800, text-gray-900 → dark:text-gray-100
                    className="group relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium text-gray-900 uppercase hover:bg-gray-50 focus:ring-3 focus:ring-indigo-500/50 focus:ring-offset-4 focus:outline-hidden dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
                  >
                    <span className="sr-only">{image.name}</span>
                    <span className="absolute inset-0 overflow-hidden rounded-md">
                      <img
                        alt=""
                        src={image.src}
                        className="size-full object-cover"
                      />
                    </span>
                    {/* Selected ring — same indigo in both modes */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-md ring-2 ring-transparent ring-offset-2 group-data-selected:ring-indigo-500 dark:ring-offset-gray-800"
                    />
                  </Tab>
                ))}
              </TabList>
            </div>

            {/* Main image panel */}
            <TabPanels>
              {product.images.map((image) => (
                <TabPanel key={image.id}>
                  <img
                    alt={image.alt}
                    src={image.src}
                    className="aspect-square w-full object-cover sm:rounded-lg"
                  />
                </TabPanel>
              ))}
            </TabPanels>
          </TabGroup>

          {/* ── Product info ── */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            {/* Title */}
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              {product.name}
            </h1>

            {/* Price / contact label */}
            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900 dark:text-gray-100">
                {product.price}
              </p>
            </div>

            {/* Description — rendered from HTML string */}
            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <div
                dangerouslySetInnerHTML={{ __html: product.description }}
                // text-gray-700 → dark:text-gray-300
                className="space-y-6 text-base text-gray-700 dark:text-gray-300"
              />
            </div>

            {/* CTA button */}
            {/* Using an <a> with mailto instead of a <form> — cleaner for a contact action */}
            <div className="mt-10">
              <a
                href="mailto:nikyaviator@gmail.com"
                className="flex w-full max-w-xs items-center justify-center rounded-md bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden dark:focus:ring-offset-gray-900"
              >
                Contact Me
              </a>
            </div>

            {/* ── Accordion details ── */}
            <section aria-labelledby="details-heading" className="mt-12">
              <h2 id="details-heading" className="sr-only">
                Additional details
              </h2>

              {/* divide-y and border-t: gray-200 light → gray-700 dark */}
              <div className="divide-y divide-gray-200 border-t border-gray-200 dark:divide-gray-700 dark:border-gray-700">
                {product.details.map((detail) => (
                  <Disclosure key={detail.name} as="div">
                    <h3>
                      <DisclosureButton className="group flex w-full items-center justify-between py-6 text-left">
                        {/* Label: gray-900 default, indigo-600 when open — dark equivalents */}
                        <span className="text font-medium text-gray-900 group-data-open:text-indigo-600 dark:text-gray-100 dark:group-data-open:text-indigo-400">
                          {detail.name}
                        </span>
                        <span className="ml-6 flex shrink-0 items-center self-center">
                          {/* Plus icon — shown when closed */}
                          <PlusIcon
                            aria-hidden="true"
                            className="block size-6 text-gray-400 group-hover:text-gray-500 group-data-open:hidden dark:text-gray-500 dark:group-hover:text-gray-400"
                          />
                          {/* Minus icon — shown when open */}
                          <MinusIcon
                            aria-hidden="true"
                            className="hidden size-6 text-indigo-400 group-hover:text-indigo-500 group-data-open:block dark:text-indigo-400 dark:group-hover:text-indigo-300"
                          />
                        </span>
                      </DisclosureButton>
                    </h3>

                    <DisclosurePanel className="pb-6">
                      <ul
                        role="list"
                        // text-gray-700 → dark:text-gray-300, marker gray-300 → dark:marker-gray-600
                        className="text-medium list-disc space-y-1 pl-5 text-gray-700 marker:text-gray-300 dark:text-gray-300 dark:marker:text-gray-600"
                      >
                        {detail.items.map((item) => (
                          <li key={item} className="pl-2">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
