export default function AboutmeSection() {
  return (
    <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
      <img
        alt=""
        src="/images/pic1.jpg"
        className="absolute inset-0 -z-10 size-full object-cover object-right md:object-center"
      />
      <div className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl">
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="aspect-1097/845 w-274.25 bg-linear-to-tr from-[#ff4694] to-[#776fff] opacity-20"
        />
      </div>
      <div className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu">
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="aspect-1097/845 w-274.25 bg-linear-to-tr from-[#ff4694] to-[#776fff] opacity-20"
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-5xl font-semibold tracking-tight text-white sm:text-7xl">
            Nikolai Kocev
          </h2>
          <p className="mt-8 space-y-6 rounded-xl bg-black/40 p-6 text-white backdrop-blur-md">
            Developer, pilot, and lifelong learner based in Lund, Sweden.
          </p>
          <p className="mt-8 space-y-6 rounded-xl bg-black/40 p-6 text-white backdrop-blur-md">
            I first got hands-on experience with “the cloud” as a flight
            instructor, helping people take off — literally. But I wanted to
            explore a different kind of altitude, so I taught myself programming
            and dove into DevOps, cloud platforms, and automation. I’m
            passionate about Linux, open source, and making systems run smarter
            and safer. I love tinkering and building tools that make life a
            little easier.
          </p>
        </div>
        {/* 4. Buttons row */}
        <div className="mx-auto mt-12 flex flex-col gap-4 sm:flex-row lg:mx-0">
          {/* → Resume (Primary) */}
          <a href="/Nikolai-Kocev-CV.pdf" download className="btn-primary">
            {/* Icon from Heroicons or any “Download” icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 8l5-5m0 0l5 5m-5-5v12"
              />
            </svg>
            <span>Download CV</span>
          </a>

          {/* → GitHub (Outline) */}
          <a
            href="https://github.com/YourGitHubUsername"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            <img src="/svg/github.svg" alt="GitHub" className="h-5 w-5" />
            <span>GitHub</span>
          </a>

          {/* → Contact (Outline) */}
          <a href="mailto:nikyaviator@gmail.com" className="btn-outline">
            {/* Envelope icon from Heroicons */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 12l-4-4-4 4m8 4l-4-4-4 4"
              />
            </svg>
            <span>Contact Me</span>
          </a>
        </div>
      </div>
    </div>
  );
}
