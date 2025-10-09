// eslint-disable-next-line react/prop-types
export default function AuthPage({ mode = 'signin' }) {
  const isSignUp = mode === 'signup';

  return (
    <div className="h-full">
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        {/* Logo + heading */}
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            src="/svg/your-logo.svg"
            alt="Your Logo"
            className="mx-auto h-10 w-auto"
          />
          <h2
            className={
              `mt-10 text-center text-2xl/9 font-bold tracking-tight ` +
              `text-gray-900 dark:text-white`
            }
          >
            {isSignUp ? 'Create an account' : 'Sign in to your account'}
          </h2>
        </div>

        {/* Form */}
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className={
                    `block w-full rounded-md px-3 py-1.5 text-base ` +
                    `bg-white text-gray-900 dark:bg-white/5 dark:text-white` +
                    `outline-1 -outline-offset-1 outline-gray-300 dark:outline-white/10` +
                    `placeholder:text-gray-400 dark:placeholder:text-gray-500` +
                    `focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600`
                  }
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100"
                >
                  Password
                </label>
                {!isSignUp && (
                  <a
                    href="#"
                    className="text-sm font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                  >
                    Forgot password?
                  </a>
                )}
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete={isSignUp ? 'new-password' : 'current-password'}
                  className={
                    `block w-full rounded-md px-3 py-1.5 text-base ` +
                    `bg-white text-gray-900 dark:bg-white/5 dark:text-white` +
                    `outline-1 -outline-offset-1 outline-gray-300 dark:outline-white/10` +
                    `placeholder:text-gray-400 dark:placeholder:text-gray-500` +
                    `focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600`
                  }
                />
              </div>
            </div>

            {/* Submit button */}
            <div>
              <button
                type="submit"
                className={
                  `flex w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold ` +
                  `bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-2` +
                  `focus-visible:outline-offset-2 focus-visible:outline-indigo-600` +
                  `text-white`
                }
              >
                {isSignUp ? 'Create account' : 'Sign in'}
              </button>
            </div>
          </form>

          {/* Footer link */}
          <p
            className={
              `mt-10 text-center text-sm/6 ` +
              `text-gray-500 dark:text-gray-400`
            }
          >
            {isSignUp ? 'Already have an account? ' : 'Not a member? '}
            <a
              href={isSignUp ? '/login' : '/signup'}
              className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              {isSignUp ? 'Sign in' : 'Create one now'}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
