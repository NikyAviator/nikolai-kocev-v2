import { useState } from 'react';
import Modal from '../ui/Modal';

export default function AboutmeSection() {
  const [selectedImage, setSelectedImage] = useState(null);
  const closeModal = () => setSelectedImage(null);

  return (
    <div className="relative isolate overflow-hidden bg-white py-24 sm:py-32 dark:bg-gray-900">
      <img
        alt="Twin engine jet airliner climbing away from the camera, with blue sky as background."
        src="/images/pic1.jpg"
        className="absolute inset-0 -z-10 size-full object-cover object-right md:object-center"
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-5xl font-semibold tracking-tight text-white sm:text-7xl">
            Nikolai Kocev
          </h2>
        </div>

        {/* Text + image */}
        <div className="mt-8 lg:flex lg:items-start lg:gap-8">
          {/* left column: text */}
          <div className="space-y-6 lg:flex-1">
            <p className="rounded-xl bg-black/50 p-6 text-white backdrop-blur-md">
              Developer, pilot, and lifelong learner. I am based in Lund,
              Sweden.
            </p>
            <p className="rounded-xl bg-black/50 p-6 text-white backdrop-blur-md">
              My first hands-on experience with &quot;the cloud&quot; came as a
              flight instructor, helping people take off — quite literally. Over
              time, my curiosity led me to explore a different kind of altitude
              through programming, DevOps, and cloud infrastructure. Today, I
              enjoy working with Linux, open source technologies, and building
              systems that are reliable, secure, and thoughtfully designed.
            </p>
          </div>

          {/* right column: image */}
          <div
            onClick={() => setSelectedImage('/images/pic4.jpg')}
            className="mt-8 cursor-pointer lg:mt-0 lg:flex-1"
          >
            <img
              src="/images/pic4.jpg"
              alt="Portrait of Nikolai in front of a workstation"
              className="w-full rounded-xl border border-white/20 object-cover"
            />
          </div>
        </div>

        {/* Buttons row */}
        <div className="mx-auto mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mx-0 lg:grid-cols-5">
          <a
            href="/NK-CV-IT-ENG.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-contact flex flex-row items-center justify-center gap-2 text-base"
          >
            <span>CV (English)</span>
            <img
              src="/svg/download.svg"
              alt="Download"
              className="h-5 w-5 shrink-0"
            />
          </a>

          <a
            href="/NK-CV-IT-SWE.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-contact flex flex-row items-center justify-center gap-2 text-base"
          >
            <span>CV (Svenska)</span>
            <img
              src="/svg/download.svg"
              alt="Download"
              className="h-5 w-5 shrink-0"
            />
          </a>

          <a
            href="https://github.com/NikyAviator"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-contact flex flex-row items-center justify-center gap-2 text-base"
          >
            <span>GitHub</span>
            <img
              src="/svg/github.svg"
              alt="GitHub"
              className="h-5 w-5 shrink-0"
            />
          </a>

          <a
            href="https://www.linkedin.com/in/nikolai-kocev-33799167/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-contact flex flex-row items-center justify-center gap-2 text-base"
          >
            <span>LinkedIn</span>
            <img
              src="/svg/linkedin.svg"
              alt="LinkedIn"
              className="h-5 w-5 shrink-0"
            />
          </a>

          <a
            href="mailto:nikyaviator@gmail.com"
            className="btn-contact flex flex-row items-center justify-center gap-2 text-base"
          >
            <span>Email Me</span>
            <img
              src="/svg/email.svg"
              alt="Email"
              className="h-5 w-5 shrink-0"
            />
          </a>
        </div>
      </div>

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
