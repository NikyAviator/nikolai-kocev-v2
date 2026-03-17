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
  name: 'Web Development',
  price: 'Contact for quote',

  images: [
    {
      id: 1,
      name: 'Modern website',
      src: '/images/creative-agency.png',
      alt: 'A modern website displayed on a laptop screen.',
    },
    {
      id: 2,
      name: 'Cloud deployment',
      src: '/images/build-your-website.jpg',
      alt: 'Cloud infrastructure and deployment.',
    },
    {
      id: 3,
      name: 'Malmoe from the Air',
      src: '/images/pic7.jpg',
      alt: 'Aerial view of Malmoe city.',
    },
  ],

  description: `
    <p>I build fast, modern websites and web applications using React and Tailwind CSS — handmade, mobile-first, and built to last. No bloated templates, no page builders. Just clean code that you own.</p>
    <p>Need more than a static site? I can add a backend in Go, connect a database, and deploy the whole thing to the cloud. Whether you need a simple landing page or a full web application, I will scope it honestly and build it properly.</p>
  `,

  details: [
    {
      name: 'React Single-Page Applications',
      items: [
        'Handmade SPA built with React and Tailwind CSS',
        'Mobile-first, responsive design on all screen sizes',
        'Fast load times — no bloated templates or page builders',
        'Clean, maintainable code that you fully own',
        'Component-based architecture that is easy to extend',
        'Dark mode support included as standard',
      ],
    },
    {
      name: 'Backend & APIs',
      items: [
        'REST API development in Go (Golang)',
        'JavaScript / Node.js backends where appropriate',
        'MongoDB and PostgreSQL database integration',
        'User authentication and session handling',
        'Secure API design with proper error handling',
      ],
    },
    {
      name: 'Cloud Hosting & Deployment',
      items: [
        'Deployment to Google Cloud Platform (GCP)',
        'Containerised with Docker for consistent environments',
        'Kubernetes orchestration for scalable applications',
        'Custom domain setup and HTTPS configuration',
        'CI/CD pipeline so updates deploy automatically',
        'You receive full access to everything — no lock-in',
      ],
    },
    {
      name: 'What You Get When the Project Is Done',
      items: [
        'Full ownership of all source code via GitHub',
        'Access to your own hosting account and domain',
        'A handover session to walk you through everything',
        'Documentation so you or anyone else can maintain it',
        'Optional ongoing maintenance and support agreement',
      ],
    },
  ],
};

export default function WebdevServicePage() {
  return (
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

            {/* Tech stack badges */}
            <div className="mt-6 flex flex-wrap gap-2">
              {[
                'React',
                'Tailwind CSS',
                'JavaScript',
                'Go',
                'Docker',
                'GCP',
                'Kubernetes',
              ].map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Description */}
            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <div
                dangerouslySetInnerHTML={{ __html: product.description }}
                className="space-y-4 text-base text-gray-700 dark:text-gray-300"
              />
            </div>

            {/* CTA */}
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

              <div className="divide-y divide-gray-200 border-t border-gray-200 dark:divide-gray-700 dark:border-gray-700">
                {product.details.map((detail) => (
                  <Disclosure key={detail.name} as="div">
                    <h3>
                      <DisclosureButton className="group relative flex w-full items-center justify-between py-6 text-left">
                        <span className="font-medium text-gray-900 group-data-open:text-indigo-600 dark:text-gray-100 dark:group-data-open:text-indigo-400">
                          {detail.name}
                        </span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon
                            aria-hidden="true"
                            className="block size-6 text-gray-400 group-hover:text-gray-500 group-data-open:hidden dark:text-gray-500 dark:group-hover:text-gray-400"
                          />
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
                        className="list-disc space-y-1 pl-5 text-gray-700 marker:text-gray-300 dark:text-gray-300 dark:marker:text-gray-600"
                      >
                        {detail.items.map((item) => (
                          <li key={item} className="pl-2 text-sm/6">
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
