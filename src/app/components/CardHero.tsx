const CardHero = () => {
  return (
    <>
      <div
        className="hero min-h-screen no-caret bg-[url('/Image/hero.jpg')] bg-cover bg-center"
      >
        <div className="hero-content text-center flex-col">
          <div className="max-w-max space-y-4 mt-16">
            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold">
              S O U L L I N K
            </h1>
            <div className="divider divider-white"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardHero;
