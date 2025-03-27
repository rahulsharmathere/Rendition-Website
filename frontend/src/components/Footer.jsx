import React from 'react'
import Links from './Links'
import { HeartIcon, MailIcon, PhoneIcon } from 'lucide-react'
import { withLoadTracking } from './withLoadTracking'

const Footer = withLoadTracking(({onLoad}) => {
  return (
    <div className='relative w-full bg-gradient-to-br from-[#1a0010] via-[#3a0825] to-[#2a0536] overflow-hidden py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-12'>
      {/* Animated accent elements */}
      <div className='absolute top-0 right-0 w-40 sm:w-52 md:w-64 h-40 sm:h-52 md:h-64 bg-red-500/10 rounded-full blur-3xl'></div>
      <div className='absolute bottom-0 left-1/4 w-32 sm:w-44 md:w-56 h-32 sm:h-44 md:h-56 bg-purple-500/10 rounded-full blur-3xl'></div>
      
      <div className='relative max-w-7xl mx-auto'>
        {/* Main content wrapper */}
        <div className='flex flex-col sm:flex-row gap-8 md:gap-10'>
          {/* Left section */}
          <div className='w-full sm:w-1/2 flex flex-col justify-center'>
            <h3 className='text-2xl xs:text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4 sm:mb-6'>
              Where <span className='text-red-400'>Dreams</span> Meet <span className='text-purple-400'>Reality</span>
            </h3>
            
            <p className='text-white/80 text-base sm:text-lg mb-4 sm:mb-6 max-w-md'>
              Join us on a journey of creativity and innovation. We're passionate about turning your ideas into extraordinary experiences.
            </p>
          </div>
          
          {/* Right section */}
          <div className='w-full sm:w-1/2 flex flex-col mt-6 sm:mt-0'>
            <h2 className='text-2xl xs:text-2xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6 inline-flex items-center'>
              <span className='mr-2'>Contact Us</span>
              <span className='h-1 w-8 sm:w-12 bg-gradient-to-r from-red-400 to-purple-400 rounded-full'></span>
            </h2>
            
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8'>
              {/* Team contact info */}
              <div className='bg-white/5 backdrop-blur-sm rounded-lg p-4 sm:p-5 border border-white/10'>
                <h4 className='text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3'>Our Team</h4>
                
                <div className='space-y-2 sm:space-y-3'>
                  <div className='flex flex-col sm:flex-row md:flex-col items-start sm:items-center md:items-start'>
                    <div className='text-white/90 w-full sm:w-32 font-medium'>Harshita Devnani</div>
                    <div className='text-red-300 flex items-center mt-1 sm:mt-0'>
                      <PhoneIcon size={14} className='mr-1' />
                      <span>9351023881</span>
                    </div>
                  </div>
                  
                  <div className='flex flex-col sm:flex-row md:flex-col items-start sm:items-center md:items-start'>
                    <div className='text-white/90 w-full sm:w-32 font-medium'>Rahul Sharma</div>
                    <div className='text-red-300 flex items-center mt-1 sm:mt-0'>
                      <PhoneIcon size={14} className='mr-1' />
                      <span>9899007236</span>
                    </div>
                  </div>
                  
                  <div className='flex flex-col sm:flex-row md:flex-col items-start sm:items-center md:items-start'>
                    <div className='text-white/90 w-full sm:w-32 font-medium'>Devansh Pareek</div>
                    <div className='text-red-300 flex items-center mt-1 sm:mt-0'>
                      <PhoneIcon size={14} className='mr-1' />
                      <span>7677333444</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Connect section */}
              <div className='bg-white/5 backdrop-blur-sm rounded-lg p-4 md:p-2 lg:p-5 border border-white/10'>
                <h4 className='text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3'>Connect With Us</h4>
                
                <div className='mb-3 sm:mb-4'>
                  <div className='flex items-center text-purple-300 mb-2'>
                    <MailIcon size={14} className='mr-2' />
                    <span className='text-sm sm:text-base'>rendition@lnmiit.ac.in</span>
                  </div>
                  
                  <p className='text-white/70 text-xs sm:text-sm'>
                    We're always ready to help with your project needs
                  </p>
                </div>
                  <Links className='mt-2 sm:mt-3' />
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom copyright bar */}
        <div className='mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-white/60 text-xs sm:text-sm'>
          <p>© 2025 Dreams Reality. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
})

export default Footer