const Footer = () => {
  return (
    <footer className='bg-gray-900 absolute w-full'>
      <div className='mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8'>
        <div className='flex items-center gap-x-4 md:order-2'>
          {/* Text to the left of icons */}
          <p className='text-sm text-gray-400'>
            Follow me on social media and github:
          </p>

          {/* Social Media Icons */}
          <a
            href='https://www.instagram.com/niky.socialmedia'
            target='_blank'
            rel='noopener noreferrer'
            className='text-gray-400 hover:text-gray-300'
          >
            <span className='sr-only'>Instagram</span>
            <img src='/svg/instagram.svg' alt='Instagram' className='w-6 h-6' />
          </a>
        </div>

        {/* Copyright Text */}
        <p className='mt-8 text-center text-sm text-gray-400 md:order-1 md:mt-0'>
          &copy; 2025 Made by: NikyAviator. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
