const CardOur = () => {
  return (
    <>
      <div className="flex flex-row">
        <div className="hero min-h-screen no-caret bg-[url('/Image/our.jpg')] bg-cover bg-center"></div>
        <div className="hero min-h-screen no-caret bg-[url('/Image/heroBottom.jpg')] bg-cover bg-center">
          <div className="hero-content flex-col">
            <div className="max-w-4xl space-y-4">
              <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
                Our Story
              </h3>
              <p className="text-base sm:text-xl md:text-2xl">
                Soul Link was born out of a passion for storytelling and
                character creation. Our team of writers, developers, and AI
                enthusiasts wanted to create a platform that would empower
                creators to bring their characters to life in a more structured
                and meaningful way.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardOur;
