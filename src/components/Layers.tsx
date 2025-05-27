import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollToPlugin, ScrollTrigger } from 'gsap/all';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Layers = () => {
  const main = useRef(null);
  const scrollTween = useRef(null);
  const snapTriggers = useRef<ScrollTrigger[]>([]);
  const scrollStarts = useRef<number[]>([0]);
  const snapScroll = useRef<(value: number, direction: number) => number>((v) => v);

  const { contextSafe } = useGSAP(
    () => {
      let panels = gsap.utils.toArray('.panel');

      panels.forEach((panel, i) => {
        snapTriggers.current[i] = ScrollTrigger.create({
          trigger: panel as Element,
          start: 'top top'
        });
      });

      ScrollTrigger.addEventListener('refresh', () => {
        scrollStarts.current = snapTriggers.current.map((trigger) => trigger.start);
        snapScroll.current = ScrollTrigger.snapDirectional(scrollStarts.current);
      });

      ScrollTrigger.observe({
        type: 'wheel,touch',
        onChangeY(self) {
          if (!scrollTween.current) {
            let scroll = snapScroll.current(self.scrollY() + self.deltaY, self.deltaY > 0 ? 1 : -1);
            const idx = scrollStarts.current.indexOf(scroll);
            if (idx !== -1) {
              goToSection(idx);
            }
          }
        }
      });

      ScrollTrigger.refresh();
    },
    {
      scope: main,
      revertOnUpdate: true
    }
  );

  const goToSection = contextSafe((i) => {
    if (i < 0 || i >= snapTriggers.current.length) return;
    scrollTween.current = gsap.to(window, {
      scrollTo: { y: snapTriggers.current[i].start, autoKill: false },
      duration: 1,
      onComplete: () => (scrollTween.current = null),
      overwrite: true
    });
  });

  return (
    <main ref={main}>
      <section className="description panel light">
        <div>
          <h1>Layered pinning</h1>
          <p>Use pinning to layer panels on top of each other as you scroll.</p>
          <div className="scroll-down">
            Scroll down<div className="arrow"></div>
          </div>
        </div>
      </section>
      <section className="panel dark">ONE</section>
      <section className="panel purple">TWO</section>
      <section className="panel orange">THREE</section>
      <section className="panel red">FOUR</section>
    </main>
  );
};

export default Layers;
