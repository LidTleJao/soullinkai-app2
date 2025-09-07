import Image from "next/image";

const CardHero = () => {
  return (
    <>
      <div className="hero relative min-h-screen no-caret bg-base-100 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <figure>
            <Image
              // src="/Image/bg_hero.png"
              src="https://firebasestorage.googleapis.com/v0/b/website-soullinkai-563d7.firebasestorage.app/o/Image%2Fbg_hero.png?alt=media&token=9d470809-2f74-4886-9acd-dc4bc8bc6af7"
              width={512}
              height={512}
              alt="background circle"
              className="w-64 sm:w-80 lg:w-[32rem] opacity-80 pointer-events-none select-none"
            />
          </figure>
        </div>
        <div className="hero-content text-center flex-col relative z-10">
          <div className="max-w-max space-y-4 mt-16">
            <h1 className="text-4xl sm:text-6xl lg:text-9xl font-bold font-[family-name:var(--font-el-messiri)] text-base-content">
              E V E R L I N K
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardHero;
