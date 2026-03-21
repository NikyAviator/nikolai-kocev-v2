// src/Components/sections/BroadService.jsx
import { Link } from 'react-router-dom';

// ─── Service data ────────────────────────────────────────────
// Add learnMoreLink when a detail page exists for that service.

const features = [
  {
    name: 'IT Support & Migration',
    description: `Your computer should work for you, not against you. I help individuals and small businesses install, configure, and troubleshoot Linux, Windows, and macOS — and when you're ready to leave Windows behind, I'll make sure the transition is smooth and that nothing important gets left behind. I'm comfortable working with Debian, Ubuntu, Mint, Arch, and more, and I can recommend the right distribution for your needs.`,
    imageSrc: '/images/linux-pic.jpg',
    imageAlt: 'A Linux terminal open on a desktop workstation.',
    learnMoreLink: '/services/it-support',
  },
  {
    name: 'Modern Websites & Web Applications',
    description: `A website should load quickly, look sharp on any screen, and accurately represent your business. I build custom single-page applications in React — no bloated templates, no page builders. Just clean, modern code that you own. Whether you need a simple landing page or a full web application with a backend, I'll scope it honestly and build it properly.`,
    imageSrc: '/images/gcp-go-k8s-docker.png',
    imageAlt: 'A modern web application displayed on a laptop screen.',
    learnMoreLink: '/services/web-development',
  },
  {
    name: 'Backup & Data Protection',
    description: `Most people only think about backups after something goes wrong. I help you set up automatic, reliable backup routines before that happens — using tools like rsync and Syncthing to keep your files safe. I'll also help you get started with a password manager if you're not using one yet. Small steps that make a real difference.`,
    imageSrc: '/images/harddrive.jpg',
    imageAlt: 'An external hard drive and USB cable on a desk.',
    // learnMoreLink intentionally omitted
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function BroadService() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-400">
            My IT Services
          </h2>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
            I provide practical IT solutions for individuals and small
            businesses. My work focuses on three areas: reliable computer
            systems, modern websites, and secure data protection.
          </p>
        </div>

        {/* Service rows */}
        <div className="mt-16 space-y-16">
          {features.map((feature, featureIdx) => (
            <div
              key={feature.name}
              className="flex flex-col-reverse lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-8"
            >
              {/* Text block */}
              <div
                className={classNames(
                  featureIdx % 2 === 0
                    ? 'lg:col-start-1'
                    : 'lg:col-start-8 xl:col-start-9',
                  'mt-6 lg:col-span-5 lg:row-start-1 lg:mt-0 xl:col-span-4',
                )}
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {feature.name}
                </h3>

                <p className="mt-3 text-base/7 text-gray-500 dark:text-gray-400">
                  {feature.description}
                </p>

                {/* ── Conditional "Product overview" link ── */}
                {/* Only renders when learnMoreLink is defined in the data above */}
                {feature.learnMoreLink && (
                  <Link
                    to={feature.learnMoreLink}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 transition-colors duration-150 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                  >
                    Product overview
                    <span aria-hidden="true">→</span>
                  </Link>
                )}
              </div>

              {/* Image block */}
              <div
                className={classNames(
                  featureIdx % 2 === 0
                    ? 'lg:col-start-6 xl:col-start-5'
                    : 'lg:col-start-1',
                  'flex-auto lg:col-span-7 lg:row-start-1 xl:col-span-8',
                )}
              >
                <img
                  alt={feature.imageAlt}
                  src={feature.imageSrc}
                  className="aspect-5/2 w-full rounded-lg bg-gray-100 object-cover dark:bg-gray-800"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
