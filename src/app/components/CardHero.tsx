const CardHero = () => {
  return (
    <>
      <div
        // className="hero min-h-screen no-caret bg-[url('/Image/hero.jpg')] bg-cover bg-center"
        className="hero min-h-screen no-caret bg-[url(https://firebasestorage.googleapis.com/v0/b/website-soullinkai-563d7.firebasestorage.app/o/Image%2Fhero.jpg?alt=media&token=eeeea1f8-c77e-404e-93ab-bc364010e0b7)] bg-cover bg-center"
      >
        <div className="hero-content text-center flex-col">
          <div className="max-w-max space-y-4 mt-16">
            <h1 className="text-4xl sm:text-6xl lg:text-9xl font-bold font-[family-name:var(--font-el-messiri)]">
              E V E R L I N K
            </h1>
            <div className="divider divider-white"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardHero;
