/* eslint-disable @next/next/no-img-element */
const CardFeature = () => {
  return (
    <>
      <div className="hero min-h-screen no-caret bg-[url('/Image/heroBottom.jpg')] bg-cover bg-center font-[family-name:var(--font-el-messiri)]">
        <div className="hero-content text-center flex-col">
          <div className="max-w-md space-y-4">
            <h2 className="text-4xl ">About Us</h2>
            <p className="text-base sm:text-xl md:text-2xl max-w-3xl mx-auto">
              Soul Link is an online platform that makes it easy and secure to
              create, store, and manage character data. Simply paste your
              conversation text, and our AI Summarizer will process it into a
              clean, well-structured JSON file. With our Personality Extractor,
              you can capture character traits, preferences, and conversation
              history in detail.
            </p>
          </div>
          <div className="flex flex-col md:flex-row space-x-12">
            <div className="max-w-md mt-16">
              <div className="card-body flex-col items-center rounded-2xl border-2">
                <div className="card card-body text-base sm:text-xl md:text-2xl items-center">
                  <div className="max-w-1/3 bg-white rounded-2xl flex items-center justify-center">
                    <figure>
                      <img src="/Image/leaf.png" alt="image leaf" />
                    </figure>
                  </div>
                  <p className="text-base sm:text-xl md:text-2xl max-w-3xl mx-auto">
                    Soul Link is an online platform that makes it easy and
                    secure to create, store, and manage character data. You can
                    organize your conversations, transform them into structured
                    JSON files, and keep your projects consistent across
                    different stories or games.
                  </p>
                </div>
              </div>
            </div>
            <div className="max-w-md mt-16">
              <div className="card-body flex-col items-center rounded-2xl border-2">
                <div className="card card-body text-base sm:text-xl md:text-2xl items-center">
                  <div className="max-w-1/3 bg-white rounded-2xl flex items-center justify-center">
                    <figure>
                      <img src="/Image/security.png" alt="image security" />
                    </figure>
                  </div>
                  <p className="text-base sm:text-xl md:text-2xl max-w-3xl mx-auto ">
                    With our Personality Extractor, you can capture unique
                    character traits, preferences, and conversation history in
                    detail. This helps you build consistent personalities,
                    deepen interactions, and enhance storytelling experiences.
                  </p>
                </div>
              </div>
            </div>
            <div className="max-w-md mt-16">
              <div className="card-body flex-col items-center rounded-2xl border-2">
                <div className="card card-body text-base sm:text-xl md:text-2xl items-center">
                  <div className="max-w-1/3 bg-white rounded-2xl flex items-center justify-center">
                    <figure>
                      <img src="/Image/target.png" alt="image target"  />
                    </figure>
                  </div>
                  <p className="text-base sm:text-xl md:text-2xl max-w-3xl mx-auto">
                    Soul Link is designed to be intuitive and secure, ensuring
                    your character data is always safe and accessible. Whether
                    you`re a writer, game developer, or worldbuilder, our
                    platform gives you reliable tools to create and manage your
                    characters effortlessly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardFeature;
