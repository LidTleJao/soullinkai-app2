import Image from "next/image";

const CardFooter = () => {
  return (
    <>
      <div
        // className="hero min-h-screen no-caret bg-[url('/Image/footer.jpg')] bg-cover bg-center "
        // className="hero min-h-screen no-caret bg-[url(https://firebasestorage.googleapis.com/v0/b/website-soullinkai-563d7.firebasestorage.app/o/Image%2Ffooter.jpg?alt=media&token=f6f6f512-5e9f-4aa2-b68c-a2ac579916a2)] bg-cover bg-center "
        // className="hero min-h-screen no-caret bg-base-100 bg-cover bg-center "
        className="hero relative min-h-screen no-caret bg-base-100 overflow-hidden"
      >
        <figure>
          <Image
            // src="/Image/bg_hero3.png"
            src={`https://firebasestorage.googleapis.com/v0/b/website-soullinkai-563d7.firebasestorage.app/o/Image%2Fbg_hero3.png?alt=media&token=d03c3400-cbae-44db-9a4b-7ea1c2faf864`}
            alt="decor top right"
            width={288}
            height={288}
            className="absolute top-0 right-0 w-56 sm:w-64 lg:w-96 opacity-80 pointer-events-none select-none"
            priority
            unoptimized={false}
          />
        </figure>
        <figure>
          <Image
            // src="/Image/bg_hero3.png"
            src={`https://firebasestorage.googleapis.com/v0/b/website-soullinkai-563d7.firebasestorage.app/o/Image%2Fbg_hero3.png?alt=media&token=d03c3400-cbae-44db-9a4b-7ea1c2faf864`}
            alt="decor bottom left"
            width={288}
            height={288}
            className="absolute bottom-0 left-0 w-56 sm:w-64 lg:w-96 opacity-80 pointer-events-none select-none transform scale-x-[-1]"
            priority
            unoptimized={false}
          />
        </figure>
        <div className="hero-content text-center flex-col font-[family-name:var(--font-el-messiri)]">
          <div className="max-w-max space-y-8 mt-16">
            <h4 className="text-4xl sm:text-6xl lg:text-8xl font-bold text-base-content">
              Everything You Need
            </h4>
          </div>
          <p className="text-base sm:text-xl md:text-2xl max-w-3xl mx-auto mt-8 text-base-content">
            Ever Link is an online platform that makes it easy and secure to
            create, store, and manage character data. Simply paste your
            conversation text, and our AI Summarizer will process it into a
            clean, well-structured JSON file. With our Personality Extractor,
            you can capture character traits, preferences, and conversation
            history in detail.
          </p>
          <a
            href="/Login"
            aria-label="link booking page"
            className="btn btn-neutral w-52 text-xl mx-auto mt-8 bg-green-300 hover:bg-green-500 font-bold text-white rounded-3xl border-0"
          >
            Get Started
          </a>
        </div>
      </div>
    </>
  );
};

export default CardFooter;
