/* eslint-disable @next/next/no-img-element */
const CardFeature = () => {
  return (
    <>
      <div 
      // className="hero min-h-screen no-caret bg-[url('/Image/heroBottom.jpg')] bg-cover bg-center font-[family-name:var(--font-el-messiri)]"
      // className="hero min-h-screen no-caret bg-[url(https://firebasestorage.googleapis.com/v0/b/website-soullinkai-563d7.firebasestorage.app/o/Image%2Fherobottom.jpg?alt=media&token=59afd621-7eab-46f7-8d0d-b0c4148bb6d5)] bg-cover bg-center font-[family-name:var(--font-el-messiri)]"
      className="hero min-h-screen no-caret bg-base-100 bg-cover bg-center font-[family-name:var(--font-el-messiri)] justify-center items-center"
      >
        <div className="hero-content text-center flex-col">
          <div className="card max-w-md space-y-4 border-2 border-blue-300 rounded-2xl p-8">
            <h2 className="text-4xl text-base-content">About Us</h2>
            <p className="text-base sm:text-xl md:text-2xl max-w-3xl mx-auto text-base-content">
              Ever Link is an online platform that makes it easy and secure to
              create, store, and manage character data. Simply paste your
              conversation text, and our AI Summarizer will process it into a
              clean, well-structured JSON file. With our Personality Extractor,
              you can capture character traits, preferences, and conversation
              history in detail.
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 w-full">
            <div className="w-full max-w-md mt-16 mx-auto md:mx-0 md:flex-1">
              <div className="card-body flex-col items-center rounded-2xl border-2 border-green-300">
                <div className="card card-body text-base sm:text-xl md:text-2xl items-center">
                  <div className="max-w-1/3 bg-amber-50 rounded-2xl flex items-center justify-center">
                    <figure>
                      <img 
                      // src="/Image/leaf.png" 
                      src="https://firebasestorage.googleapis.com/v0/b/website-soullinkai-563d7.firebasestorage.app/o/Image%2Fleaves.png?alt=media&token=8deb80d0-265f-48d6-b3fe-7c27aa4e36f4" 
                      alt="image leaf" />
                    </figure>
                  </div>
                  <p className="text-base sm:text-xl md:text-2xl max-w-3xl mx-auto text-base-content">
                    Ever Link is an online platform that makes it easy and
                    secure to create, store, and manage character data. You can
                    organize your conversations, transform them into structured
                    JSON files, and keep your projects consistent across
                    different stories or games.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full max-w-md mt-16 mx-auto md:mx-0 md:flex-1">
              <div className="card-body flex-col items-center rounded-2xl border-2 border-green-300">
                <div className="card card-body text-base sm:text-xl md:text-2xl items-center">
                  <div className="max-w-1/3 bg-amber-50 rounded-2xl flex items-center justify-center">
                    <figure>
                      <img 
                      // src="/Image/security.png" 
                      src="https://firebasestorage.googleapis.com/v0/b/website-soullinkai-563d7.firebasestorage.app/o/Image%2Fsecurity.png?alt=media&token=0349788b-5166-4df8-b884-edb6a9e1bfff" 
                      alt="image security" />
                    </figure>
                  </div>
                  <p className="text-base sm:text-xl md:text-2xl max-w-3xl mx-auto text-base-content">
                    With our Personality Extractor, you can capture unique
                    character traits, preferences, and conversation history in
                    detail. This helps you build consistent personalities,
                    deepen interactions, and enhance storytelling experiences.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full max-w-md mt-16 mx-auto md:mx-0 md:flex-1">
              <div className="card-body flex-col items-center rounded-2xl border-2 border-green-300">
                <div className="card card-body text-base sm:text-xl md:text-2xl items-center">
                  <div className="max-w-1/3 bg-amber-50 rounded-2xl flex items-center justify-center">
                    <figure>
                      <img 
                      // src="/Image/target.png" 
                      src="https://firebasestorage.googleapis.com/v0/b/website-soullinkai-563d7.firebasestorage.app/o/Image%2Ftarget.png?alt=media&token=25dffc14-7588-4619-8138-436776e546f2" 
                      alt="image target"  />
                    </figure>
                  </div>
                  <p className="text-base sm:text-xl md:text-2xl max-w-3xl mx-auto text-base-content">
                    Ever Link is designed to be intuitive and secure, ensuring
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
