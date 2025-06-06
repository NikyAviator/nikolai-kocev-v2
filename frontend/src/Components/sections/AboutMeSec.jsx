// src/Components/sections/AboutMeSec.jsx
import { useState } from 'react';
import Modal from '../ui/Modal';

export default function AboutMeSec() {
  const [selectedImage, setSelectedImage] = useState(null);
  const closeModal = () => setSelectedImage(null);

  return (
    <div className="overflow-hidden bg-white py-10 sm:py-10 dark:bg-gray-900">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        {/* Header */}
        <div className="max-w-4xl">
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white">
            About me
          </h1>
          <p className="mt-6 text-xl/8 text-balance text-gray-700 dark:text-gray-300">
            Hello fellow traveler, I am Nikolai Kocev, born and raised in Sweden
            with roots from Bulgaria.
          </p>
        </div>

        {/* Grid: two columns on lg, one column on smaller */}
        <section className="mt-15 grid grid-cols-1 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-16">
          {/* Left column: text */}
          <div className="lg:pr-8">
            <h2 className="text-2xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
              My background
            </h2>
            <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
              Hi, I’m Nikolai — a fullstack developer and DevOps enthusiast with
              a deep love for Linux, cloud infrastructure, and smart automation.
            </p>

            <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
              I’ve always been drawn to systems that connect people. That’s what
              led me to aviation. After years of training, I took to the skies
              as a flight instructor, teaching others to fly. From the cockpit,
              I learned to stay calm under pressure, to act with precision when
              every decision counts. That mindset never left me — it simply
              shifted into code.
            </p>

            <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-400">
              When the pandemic grounded aviation, a friend nudged me toward
              tech. The doorway was Linux. My first Arch install took eight
              hours — and sparked something permanent. I immersed myself in open
              source, cloud platforms, and backend systems. I studied fullstack
              development here in Lund, and I haven’t stopped learning since.
            </p>

            <p className="mt-8 text-base/7 text-gray-600 dark:text-gray-400">
              Today, I focus on building and deploying software with intention
              and care. My work is shaped by curiosity, consistency, and a deep
              interest in meaningful systems. If my background resonates with
              what you're looking for, I’d be happy to connect.
            </p>

            <p className="mt-8 text-base/7 text-gray-600 dark:text-gray-400">
              Outside of code, I play bass guitar, tweak my Linux and Windows
              setup, and explore the skies through flight simulators and real
              aircraft. I love to exercise and keep active, I daily do yoga and
              I am always up for a tennis game. I believe in lifelong learning,
              shared knowledge, and meaningful work that helps others grow.
            </p>
          </div>

          {/* Right column: 2×2 grid of clickable images */}
          <div className="pt-16 lg:row-span-2 lg:-mr-16 xl:mr-auto">
            <div className="-mx-8 grid grid-cols-2 gap-4 sm:-mx-16 sm:grid-cols-4 lg:mx-0 lg:grid-cols-2 lg:gap-4 xl:gap-8">
              {/* Image 1 */}
              <div
                className="aspect-square cursor-pointer overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10 dark:outline-gray-700"
                onClick={() => setSelectedImage('/images/pic7.jpg')}
              >
                <img
                  alt="A picture taken from a light aircraft, showing a clear day of Malmö and Turning Torso."
                  src="/images/pic7.jpg"
                  className="block h-full w-full object-cover"
                />
              </div>

              {/* Image 2 */}
              <div
                className="-mt-8 aspect-square cursor-pointer overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10 lg:-mt-40 dark:outline-gray-700"
                onClick={() => setSelectedImage('/images/pic2.jpg')}
              >
                <img
                  alt="Picture of my bass setup. A 4 string bass guitar, a Roland amplifier and a external sound card."
                  src="/images/pic2.jpg"
                  className="block h-full w-full object-cover"
                />
              </div>

              {/* Image 3 */}
              <div
                className="aspect-square cursor-pointer overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10 dark:outline-gray-700"
                onClick={() => setSelectedImage('/images/pic8.jpg')}
              >
                <img
                  alt="Picture of Malmö from above, showing the Turning Torso and the cityscape."
                  src="/images/pic8.jpg"
                  className="block h-full w-full object-cover"
                />
              </div>

              {/* Image 4 */}
              <div
                className="-mt-8 aspect-square cursor-pointer overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10 lg:-mt-40 dark:outline-gray-700"
                onClick={() => setSelectedImage('/images/pic3.jpg')}
              >
                <img
                  alt="A picture of my favorite outdoor gym at evening."
                  src="/images/pic3.jpg"
                  className="block h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* “Things I Like” stats (beneath images on large, underneath text on small) */}
          <div className="max-lg:mt-16 lg:col-span-1">
            <p className="text-base/7 font-semibold text-gray-500 dark:text-gray-400">
              Things I Like
            </p>
            <hr className="mt-6 border-t border-gray-200 dark:border-gray-700" />
            <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
              <div className="flex flex-col gap-y-2 border-b border-dotted border-gray-200 pb-4 dark:border-gray-700">
                <dt className="text-sm/6 text-gray-600 dark:text-gray-400">
                  Favorite Linux Distribution?
                </dt>
                <dd className="order-first text-6xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  <span>Arch Linux</span>
                </dd>
              </div>
              <div className="flex flex-col gap-y-2 border-b border-dotted border-gray-200 pb-4 dark:border-gray-700">
                <dt className="text-sm/6 text-gray-600 dark:text-gray-400">
                  Current book I am reading?
                </dt>
                <dd className="order-first text-6xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  <span>Dune - Chapterhouse</span>
                </dd>
              </div>
              <div className="flex flex-col gap-y-2 max-sm:border-b max-sm:border-dotted max-sm:border-gray-200 max-sm:pb-4 dark:max-sm:border-gray-700">
                <dt className="text-sm/6 text-gray-600 dark:text-gray-400">
                  Favorite way of exercise?
                </dt>
                <dd className="order-first text-6xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  <span>Yoga, outdoor gym & tennis.</span>
                </dd>
              </div>
              <div className="flex flex-col gap-y-2">
                <dt className="text-sm/6 text-gray-600 dark:text-gray-400">
                  Favorite Tea?
                </dt>
                <dd className="order-first text-6xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  <span>Magnolia Oolong</span>
                </dd>
              </div>
            </dl>
          </div>
        </section>
      </div>

      {/* Only render Modal if selectedImage is non-null */}
      {selectedImage && (
        <Modal
          imageSrc={selectedImage}
          altText="Enlarged artwork or photo"
          onClose={closeModal}
        />
      )}
    </div>
  );
}
