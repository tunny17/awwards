import { useRef, useState } from 'react';
import { TiLocationArrow } from 'react-icons/ti';

const BentoTilt = ({
  children,
  className = ''
}: {
  children: React.ReactNode;
  className: string;
}) => {
  const [transformStyle, setTransformStyle] = useState('');

  const itemRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!itemRef.current) return;

    const { left, top, width, height } = itemRef.current.getBoundingClientRect();

    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5; // adjust the multiplier for tilt strength
    const tiltY = (relativeX - 0.5) * -5; // adjust the multiplier for tilt strength

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.98, 0.98, 0.98)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle('');
  };

  return (
    <div
      className={className}
      ref={itemRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  title,
  description,
  src
}: {
  title: React.ReactNode;
  description?: string;
  src: string;
}) => {
  return (
    <div className="relative size-full">
      <video
        src={src}
        loop
        muted
        autoPlay
        className="absolute left-0 top-0 size-full object-cover object-center"
      />
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>}
        </div>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <section className="bg-black pb-52">
      <div className="container mx-auto px-3 md:px-10 ">
        <div className="px-5 py-32">
          <p className="font-circular-web text-lg text-blue-50">Into the metagame layer</p>
          <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex aliquid ut voluptate,
            reprehenderit quos eaque soluta, aperiam nobis quae totam voluptatem. Ea et ipsa, optio
            dicta fugit soluta dolorem, enim corrupti praesentium animi deserunt possimus ex,
            expedita labore dolores repellendus?
          </p>
        </div>

        <BentoTilt className="border border-white/20 relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
          <BentoCard
            src="videos/feature-1.mp4"
            title={
              <>
                radie<b>n</b>t
              </>
            }
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, cumque."
          />
        </BentoTilt>

        <div className="grid h-[135vh] grid-cols-2 grid-rows-3 gap-7">
          <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
            <BentoCard
              src="videos/feature-2.mp4"
              title={
                <>
                  radie<b>n</b>t
                </>
              }
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, cumque."
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_1 row-span-1 ms-14 md:col-span-1 md:ms-0">
            <BentoCard
              src="videos/feature-3.mp4"
              title={
                <>
                  radie<b>n</b>t
                </>
              }
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, cumque."
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
            <BentoCard
              src="videos/feature-4.mp4"
              title={
                <>
                  radie<b>n</b>t
                </>
              }
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, cumque."
            />
          </BentoTilt>

          <div className="bento-tilt_2">
            <div className="flex size-full flex-col justify-between bg-violet-300 p-5">
              <h1 className="bento-title special-font text-black max-w-64">
                More <b>c</b>oming soon
              </h1>
              <TiLocationArrow className="scale-[5] m-5 self-end" />
            </div>
          </div>

          <div className="bento-tilt_2">
            <video
              src="videos/feature-5.mp4"
              loop
              autoPlay
              muted
              className="size-full object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
