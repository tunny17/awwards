import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useWindowScroll } from 'react-use';
import { TiLocationArrow } from 'react-icons/ti';

import Button from './Button';

const Navbar = () => {
  const navContainerRef = useRef<HTMLElement | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const { y: currentScrollY } = useWindowScroll();

  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  const navItems = ['Nexus', 'Vault', 'Prologue', 'About', 'Contact'];

  const toggleAudio = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavbarVisible(true);
      navContainerRef.current?.classList.remove('floating-nav');
    } else if (currentScrollY > lastScrollY) {
      setIsNavbarVisible(false);
      navContainerRef.current?.classList.add('floating-nav');
    } else if (currentScrollY < lastScrollY) {
      setIsNavbarVisible(true);
      navContainerRef.current?.classList.add('floating-nav');
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavbarVisible ? 0 : -100,
      opacity: isNavbarVisible ? 1 : 0,
      duration: 0.2
    });
  }, [isNavbarVisible]);

  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current?.play();
    } else {
      audioElementRef.current?.pause();
    }
  }, [isAudioPlaying]);

  return (
    <section
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2 ">
        <nav className="flex size-full items-center justify-between p-4">
          <div className="flex items-center gap-7">
            <img src="/img/logo.png" alt="logo" className="w-10" />

            <Button
              id="product-button"
              title="Products"
              rightIcon={<TiLocationArrow />}
              containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
            />
          </div>

          <div className="flex h-full items-center">
            <div className="hidden md:block">
              {navItems.map((item) => (
                <a href={`#${item.toLocaleLowerCase()}`} key={item} className="nav-hover-btn">
                  {item}
                </a>
              ))}
            </div>

            <button
              type="button"
              className="ml-10 flex items-center space-x-0.5"
              onClick={toggleAudio}
            >
              <audio src="/audio/loop.mp3" ref={audioElementRef} className="hidden" loop />
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={`${isIndicatorActive ? 'active' : ''} indicator-line`}
                  style={{ animationDelay: `${bar * 0.1}` }}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>
    </section>
  );
};

export default Navbar;
