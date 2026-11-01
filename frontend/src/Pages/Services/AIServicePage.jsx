// frontend/src/Pages/Services/AIServicePage.jsx
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
  name: 'AI Agents & Workflow Automation',
  price: 'Contact for quote',

  images: [
    {
      id: 1,
      name: 'Agent orchestration',
      src: '/images/ais-1.png',
      alt: 'Cloud and automation tooling used to orchestrate AI agents.',
    },
    {
      id: 2,
      name: 'Terminal & scripting',
      src: '/images/ais-2.png',
      alt: 'A Linux terminal, where agents read files and run scripts.',
    },
    {
      id: 3,
      name: 'Local & self-hosted setup',
      src: '/images/ais-3.png',
      alt: 'A self-hosted Linux environment running local AI tooling.',
    },
  ],

  description: [
    'I install and configure autonomous AI agents for businesses. Not a chatbot on your website, but a system that does the work: reading files, running scripts, calling your APIs and combining tools to finish a task from start to end. I use Hermes Agent, an open-source framework from Nous Research that runs on your own machine or server, works with any major AI model or a fully local one, and learns your recurring tasks so it gets better over time. I tailor each setup to your workflow instead of selling a one-size-fits-all bot.',
    "Every agent includes a human review step for anything sensitive, so nothing important happens without your approval. If a repetitive, rules-based task is taking up your team's time, I'll assess whether an agent can handle it safely, and set it up for you.",
  ],

  details: [
    {
      name: 'What an Agent Can Actually Do',
      items: [
        'Read, write, and organise files across your systems',
        'Run scripts and command-line tools on your behalf',
        'Call your internal and external APIs',
        'Search the web and pull in live information',
        'Chain multiple steps together to finish a task end-to-end',
        'Work with local, private LLMs or cloud models — your choice',
      ],
    },
    {
      name: 'Installed & Tailored to Your Workflow',
      items: [
        'Set up on your own infrastructure or a dedicated machine',
        'Configured around your actual tools, files, and data — not a generic template',
        'A human-review gate before anything sensitive happens (sending emails, pushing data, spending money)',
        'Ongoing tuning as your workflow changes',
        'A handover session so your team understands what it does and how to adjust it',
      ],
    },
    {
      name: 'Good Fits & Honest Limits',
      items: [
        'Best for repetitive, rules-based tasks: data extraction, report generation, inbox triage, monitoring',
        "I'll tell you upfront if a task isn't a good fit for automation",
        'Built to support your team and save time — not to replace judgment-heavy decisions',
        'Free initial scoping call to see if it makes sense before you commit to anything',
      ],
    },
  ],
};

export default function AIServicePage() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          {/* ── Image gallery ── */}
          <TabGroup className="flex flex-col-reverse">
            {/* Thumbnail selector */}
            <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
              <TabList className="grid grid-cols-3 gap-6">
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
                'Hermes',
                'Claude',
                'Local LLMs',
                'Python',
                'Bash',
                'Docker',
                'APIs',
              ].map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Description paragraphs */}
            <div className="mt-6 space-y-4 text-base text-gray-700 dark:text-gray-300">
              {product.description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            {/* CTA button */}
            <div className="mt-10">
              <a
                href="mailto:nikolai_kocev@hotmail.com"
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
                      <DisclosureButton className="group flex w-full items-center justify-between py-6 text-left">
                        <span className="text-sm font-medium text-gray-900 group-data-open:text-indigo-600 dark:text-gray-100 dark:group-data-open:text-indigo-400">
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
                        className="list-disc space-y-1 pl-5 text-gray-700 marker:text-gray-300 dark:text-gray-300 dark:marker:text-gray-600"
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
