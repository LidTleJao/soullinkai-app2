const CardOur = () => {
  return (
    <>
      <div className=" grid grid-cols-1 lg:grid-cols-2 bg-base-100 items-center gap-8 no-caret px-4 sm:px-8 lg:px-16 py-16">
        <div className="order-1 lg:order-1 flex justify-center lg:justify-start">
          <div
            // className="hidden lg:flex w-56 h-56 sm:w-7/12 sm:h-72 lg:w-[40rem] lg:h-[28rem] bg-[url('/Image/flower.png')] bg-contain bg-no-repeat bg-center transform scale-x-[-1] "
            className="hidden lg:flex w-56 h-56 sm:w-7/12 sm:h-72 lg:w-[40rem] lg:h-[28rem] bg-[url('https://firebasestorage.googleapis.com/v0/b/website-soullinkai-563d7.firebasestorage.app/o/Image%2Fflower.png?alt=media&token=4a65cf40-b5c9-4d74-8ddb-19fc2d98196a')] bg-contain bg-no-repeat bg-center transform scale-x-[-1] "
            aria-hidden
          />
        </div>
        <div className="order-2 lg:order-2 flex items-center justify-center lg:justify-end">
          <div className="card max-w-2xl space-y-4 border-2 border-blue-300 rounded-2xl p-8 bg-base-100 text-base-content">
            <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
              Our Story
            </h3>
            <p className="text-base sm:text-xl md:text-2xl">
              Ever Link was born out of a passion for storytelling and character
              creation. Our team of writers, developers, and AI enthusiasts
              wanted to create a platform that would empower creators to bring
              their characters to life in a more structured and meaningful way.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardOur;
