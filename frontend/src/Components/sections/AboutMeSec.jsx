// src/Components/sections/AboutMeSec.jsx
import { useState } from 'react';
import Modal from '../ui/Modal';

export default function AboutMeSec() {
  // 1. Track which image (if any) is open in the modal
  const [selectedImage, setSelectedImage] = useState(null);

  // 2. A helper to close the modal
  const closeModal = () => setSelectedImage(null);

  return (
    <div className="overflow-hidden bg-white py-10 sm:py-10">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        {/* Header */}
        <div className="max-w-4xl">
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
            About me
          </h1>
          <p className="mt-6 text-xl/8 text-balance text-gray-700">
            Hello fellow traveler, I am Nikolai Kocev, born and raised in Sweden
            with roots from Bulgaria.
          </p>
        </div>

        {/* Grid: two columns on lg, one column on smaller */}
        <section className="mt-15 grid grid-cols-1 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-16">
          {/* Left column: text */}
          <div className="lg:pr-8">
            <h2 className="text-2xl font-semibold tracking-tight text-pretty text-gray-900">
              My background
            </h2>
            <p className="mt-6 text-base/7 text-gray-600">
              Hi, I’m Nikolai – a fullstack developer and DevOps enthusiast with
              a deep love for Linux, cloud infrastructure, and smart automation.
              My journey started in aviation, teaching others how to fly and
              handling high-pressure situations with precision and calm. That
              same mindset now fuels my work in tech. After pivoting from
              aviation during the pandemic, I dove headfirst into the world of
              open-source, backend systems, and containerized infrastructure.
              I’ve since built and deployed fullstack apps using Node.js, React,
              Docker, Kubernetes, and GCP. From writing clean APIs to optimizing
              CI/CD pipelines and managing infrastructure, I enjoy solving tough
              technical challenges that have real impact. Whether I’m developing
              a quiz platform for pilots or helping artists launch websites, I
              love bridging tech with creativity and structure.
            </p>
            <p className="mt-8 text-base/7 text-gray-600">
              Outside of coding, I’m usually playing bass guitar, tweaking my
              Linux setup, or exploring the skies from the ground through flight
              simulators. I believe in lifelong learning, sharing knowledge, and
              doing meaningful work that helps others grow.
            </p>
          </div>

          {/* Right column: 2×2 grid of clickable images */}
          <div className="pt-16 lg:row-span-2 lg:-mr-16 xl:mr-auto">
            <div className="-mx-8 grid grid-cols-2 gap-4 sm:-mx-16 sm:grid-cols-4 lg:mx-0 lg:grid-cols-2 lg:gap-4 xl:gap-8">
              {/* Image 1 */}
              <div
                className="aspect-square cursor-pointer overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10"
                onClick={() => setSelectedImage('/images/pic7.jpg')}
              >
                <img
                  alt="Snapshot 1"
                  src="/images/pic7.jpg"
                  className="block h-full w-full object-cover"
                />
              </div>

              {/* Image 2 */}
              <div
                className="-mt-8 aspect-square cursor-pointer overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10 lg:-mt-40"
                onClick={() => setSelectedImage('/images/pic2.jpg')}
              >
                <img
                  alt="Snapshot 2"
                  src="/images/pic2.jpg"
                  className="block h-full w-full object-cover"
                />
              </div>

              {/* Image 3 */}
              <div
                className="aspect-square cursor-pointer overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10"
                onClick={() => setSelectedImage('/images/pic8.jpg')}
              >
                <img
                  alt="Snapshot 3"
                  src="/images/pic8.jpg"
                  className="block h-full w-full object-cover"
                />
              </div>

              {/* Image 4 */}
              <div
                className="-mt-8 aspect-square cursor-pointer overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10 lg:-mt-40"
                onClick={() => setSelectedImage('/images/pic3.jpg')}
              >
                <img
                  alt="Snapshot 4"
                  src="/images/pic3.jpg"
                  className="block h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* “Things I Like” stats (beneath images on large, underneath text on small) */}
          <div className="max-lg:mt-16 lg:col-span-1">
            <p className="text-base/7 font-semibold text-gray-500">
              Things I Like
            </p>
            <hr className="mt-6 border-t border-gray-200" />
            <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
              <div className="flex flex-col gap-y-2 border-b border-dotted border-gray-200 pb-4">
                <dt className="text-sm/6 text-gray-600">
                  Favorite Linux Distribution?
                </dt>
                <dd className="order-first text-6xl font-semibold tracking-tight">
                  <span>Arch Linux</span>
                </dd>
              </div>
              <div className="flex flex-col gap-y-2 border-b border-dotted border-gray-200 pb-4">
                <dt className="text-sm/6 text-gray-600">
                  Current book I am reading?
                </dt>
                <dd className="order-first text-6xl font-semibold tracking-tight">
                  <span>Dune - Chapterhouse</span>
                </dd>
              </div>
              <div className="flex flex-col gap-y-2 max-sm:border-b max-sm:border-dotted max-sm:border-gray-200 max-sm:pb-4">
                <dt className="text-sm/6 text-gray-600">
                  Favorite way of exercise?{' '}
                </dt>
                <dd className="order-first text-6xl font-semibold tracking-tight">
                  <span>Yoga, outdoor gym & tennis.</span>
                </dd>
              </div>
              <div className="flex flex-col gap-y-2">
                <dt className="text-sm/6 text-gray-600">Favorite Tea?</dt>
                <dd className="order-first text-6xl font-semibold tracking-tight">
                  <span>Magnolia Oolong</span>
                </dd>
              </div>
            </dl>
          </div>
        </section>
      </div>

      {/* 3. Only render Modal if selectedImage is non-null */}
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
