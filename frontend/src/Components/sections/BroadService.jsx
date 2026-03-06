const features = [
  {
    name: 'Computer Setup & Repair',
    description: '...',
    imageSrc: '/images/repair.jpg',
  },
  {
    name: 'Linux Installation & Migration',
    description: '...',
    imageSrc: '/images/linux.jpg',
  },
  {
    name: 'Backup & Data Protection',
    description: '...',
    imageSrc: '/images/backup.jpg',
  },
  {
    name: 'Modern Websites',
    description: '...',
    imageSrc: '/images/web.jpg',
  },
  {
    name: 'Cloud & Automation',
    description: '...',
    imageSrc: '/images/cloud.jpg',
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Example() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            What do I offer?
          </h2>
          <p className="mt-4 text-gray-900 dark:text-white">
            I doven deep into the world of software development, exploring
            various technologies and programming languages. I have a foundation
            in web development, including front-end and back-end technologies. I
            am proficient in languages such as JavaScript and Golang and I have
            experience working with frameworks like React, Node.js & Gin. I am
            passionate about creating efficient and scalable applications that
            solve real-world problems.
          </p>

          <p className="mt-4 text-gray-900 dark:text-white">
            {' '}
            I help individuals and businesses with a wide range of IT services,
            including computer setup and repair, Linux installation and
            migration, backup and data protection, modern website development,
            and cloud automation. I am dedicated to providing high-quality
            solutions that meet the unique needs of each client.
          </p>
        </div>

        <div className="mt-16 space-y-16">
          {features.map((feature, featureIdx) => (
            <div
              key={feature.name}
              className="flex flex-col-reverse lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-8"
            >
              <div
                className={classNames(
                  featureIdx % 2 === 0
                    ? 'lg:col-start-1'
                    : 'lg:col-start-8 xl:col-start-9',
                  'mt-6 lg:col-span-5 lg:row-start-1 lg:mt-0 xl:col-span-4',
                )}
              >
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {feature.name}
                </h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-white">
                  {feature.description}
                </p>
              </div>
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
                  className="aspect-5/2 w-full rounded-lg bg-gray-100 object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
