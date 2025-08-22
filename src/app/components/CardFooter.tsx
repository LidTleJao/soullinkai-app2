const CardFooter = () => {
  return (
    <>
      <div className="hero min-h-screen no-caret bg-[url('/Image/footer.jpg')] bg-cover bg-center ">
        <div className="hero-content text-center flex-col font-[family-name:var(--font-el-messiri)]">
          <div className="max-w-max space-y-8 mt-16">
            <h4 className="text-4xl sm:text-6xl lg:text-8xl font-bold">
              Everything You Need
            </h4>
            <div className="divider divider-white"></div>
          </div>
          <p className="text-base sm:text-xl md:text-2xl max-w-3xl mx-auto mt-8">
            Soul Link is an online platform that makes it easy and secure to
            create, store, and manage character data. Simply paste your
            conversation text, and our AI Summarizer will process it into a
            clean, well-structured JSON file. With our Personality Extractor,
            you can capture character traits, preferences, and conversation
            history in detail.
          </p>
          <a
            href="/Login"
            aria-label="link booking page"
            className="btn w-52 text-xl mx-auto mt-8 bg-inherit font-bold text-white rounded-3xl border-2 border-white"
          >
            Get Started
          </a>
        </div>
      </div>
    </>
  );
};

export default CardFooter;
