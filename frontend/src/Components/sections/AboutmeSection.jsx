export default function AboutmeSection() {
  return (
    <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
      <img
        alt="Twin engine jet airliner climbing away from the camera, with blue sky as background."
        src="/images/pic1.jpg"
        className="absolute inset-0 -z-10 w-full object-cover object-right md:object-center"
      />
      {/* …other decorative divs… */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-5xl font-semibold tracking-tight text-white sm:text-7xl">
            Nikolai Kocev
          </h2>
        </div>

        {/* wrap text+image in a flex container */}
        <div className="mt-8 lg:flex lg:items-start lg:gap-8">
          {/* left column: text */}
          <div className="space-y-6 lg:flex-1">
            <p className="rounded-xl bg-black/40 p-6 text-white backdrop-blur-md">
              Developer, pilot, and lifelong learner based in Lund, Sweden.
            </p>
            <p className="rounded-xl bg-black/40 p-6 text-white backdrop-blur-md">
              I first got hands-on experience with “the cloud” as a flight
              instructor, helping people take off — literally. But I wanted to
              explore a different kind of altitude, so I taught myself
              programming and dove into DevOps, cloud platforms, and automation.
              I’m passionate about Linux, open source, and making systems run
              smarter and safer. I love tinkering and building tools that make
              life a little easier.
            </p>
          </div>

          {/* right column: image, same flex-1 so it shares width */}
          <div className="mt-8 lg:mt-0 lg:flex-1">
            <img
              src="/images/pic4.jpg"
              alt="Portrait of Nikolai in front of a workstation"
              className="w-full rounded-xl border-1 border-black object-cover"
            />
          </div>
        </div>

        {/* 4. Buttons row */}
        <div className="mx-auto mt-12 grid grid-cols-1 gap-4 sm:grid-cols-4 lg:mx-0">
          <a
            href="/Nikolai-Kocev-CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-contact flex flex-row justify-center text-lg sm:text-xl"
          >
            <span className="mx-5">Download My CV</span>
            <img
              src="/svg/download.svg"
              alt="GitHub"
              className="h-6 w-6 flex-shrink-0"
            />
          </a>

          {/* → GitHub (opens in new tab) */}
          <a
            href="https://github.com/NikyAviator"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-contact flex flex-row justify-center text-lg sm:text-xl"
          >
            <span className="mx-5">GitHub</span>
            <img
              src="/svg/github.svg"
              alt="GitHub"
              className="h-6 w-6 flex-shrink-0"
            />
          </a>

          {/* → LinkedIn (opens in new tab) */}
          <a
            href="https://www.linkedin.com/in/nikolai-kocev-33799167/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-contact flex flex-row justify-center text-lg sm:text-xl"
          >
            <span className="mx-5">LinkedIn</span>
            <img
              src="/svg/linkedin.svg"
              alt="LinkedIn"
              className="h-6 w-6 flex-shrink-0"
            />
          </a>

          {/* → Contact (mailto link, with email.svg on the right) */}
          <a
            href="mailto:nikyaviator@gmail.com"
            className="btn-contact flex flex-row justify-center text-lg sm:text-xl"
          >
            <span className="mx-5">Email Me</span>
            <img
              src="/svg/email.svg"
              alt="Email"
              className="h-6 w-6 flex-shrink-0"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
