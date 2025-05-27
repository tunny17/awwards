import { useEffect, useRef, useState } from 'react';
import { TiLocationArrow } from 'react-icons/ti';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';

import Button from './Button';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(1);
  const [hasClicked, setHasClicked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadedVideos, setLoadedVideos] = useState<number>(0);

  const totalVideos = 2;
  const skills = [
    'Reactjs',
    'React Native',
    'Nextjs',
    'Sveltekit',
    'TypeScript',
    'NodeJs',
    'Express',
    'Deno',
    'MongoDB',
    'PostgreSQL',
    'MySQL',
    'Tailwind CSS',
    'Chakra UI',
    'Material UI'
  ];

  const nextVideoRef = useRef<HTMLVideoElement>(null);
  const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

  useEffect(() => {
    if (loadedVideos === totalVideos - 1) {
      setIsLoading(false);
    }
  }, [loadedVideos]);

  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set('#next-video', { visibility: 'visible' });

        gsap.to('#next-video', {
          transformOrigin: 'center center',
          scale: 1,
          width: '100%',
          height: '100%',
          duration: 1,
          ease: 'Power1.inOut',
          onStart: () => {
            if (nextVideoRef.current) {
              nextVideoRef.current.play();
            }
          }
        });

        gsap.from('#current-video', {
          transformOrigin: 'center center',
          scale: 0,
          duration: 1.5,
          ease: 'power1.inOut'
        });
      }
    },
    { dependencies: [currentIndex], revertOnUpdate: true }
  );

  useGSAP(() => {
    gsap.set('#video-frame', {
      clipPath: 'polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)',
      borderRadius: '0 0 40% 10%'
    });

    gsap.from('#video-frame', {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      borderRadius: '0 0 0 0',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: '#video-frame',
        start: 'center center',
        end: 'bottom center',
        scrub: true
      }
    });
  });

  const handleMiniVdClick = () => {
    setHasClicked(true);
    setCurrentIndex(upcomingVideoIndex);
  };

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  const getVideoSrc = (index: number) => `videos/hero-bg-${index}.mp4`;

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {isLoading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
          {/* https://uiverse.io/G4b413l/tidy-walrus-92 */}
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}

      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <div>
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <div
              onClick={handleMiniVdClick}
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
            >
              <video
                ref={nextVideoRef}
                src={getVideoSrc(upcomingVideoIndex)}
                loop
                muted
                id="current-video"
                className="size-64 origin-center scale-150 object-cover object-center"
                onLoadedData={handleVideoLoad}
              />
            </div>
          </div>

          <video
            ref={nextVideoRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
          <video
            src={getVideoSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex)}
            autoPlay
            loop
            muted
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
        </div>

        <h1 className="special-font hero-heading tracking-wider absolute bottom-5 right-5 z-40 text-blue-75">
          <b>E</b>NGIN<b>EE</b>R
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading tracking-wider text-blue-100">
              FRONT<b>E</b>N<b>D</b>
            </h1>

            <p className="mb-5 mt-10 text-blue-100 leading-8 lg:max-w-[70%] mx-auto text-center lg:text-lg sm:text-sm">
              I'm an experienced and results-driven Frontend Developer with over 4 years of
              experience building responsive, scalable, and high-performance web applications using
              modern frontend technologies such as React.js, Next.js, TypeScript, Tailwind CSS, and
              SvelteKit. Adept at translating UI/UX designs into clean, efficient code, optimizing
              performance, and delivering cross-browser, mobile-first experiences. Strong background
              in RESTful APIs, state management (Redux, Context API), and integrating AI and Web3
              features. Proven success working in Agile/Scrum teams and contributing to open-source
              and startup environments..
            </p>

            <Button
              id="watch-trailer"
              title="Contact Me"
              leftIcon={<TiLocationArrow />}
              handleClick={() => {
                window.location.href = 'mailto:tvnji01@gmail.com';
              }}
              containerClass="bg-yellow-300 flex-center gap-1 mx-auto"
            />
          </div>
        </div>
      </div>

      <h1 className="special-font hero-heading tracking-wider absolute bottom-5 right-5 text-black">
        <b>E</b>NGIN<b>EE</b>R
      </h1>
    </div>
  );
};

export default Hero;
