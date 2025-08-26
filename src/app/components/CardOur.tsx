const CardOur = () => {
  return (
    <>
      <div 
      // className="hero min-h-screen no-caret bg-[url('/Image/our.jpg')] bg-cover bg-center font-[family-name:var(--font-el-messiri)] p-0 lg:p-20"
      className="hero min-h-screen no-caret bg-[url(https://firebasestorage.googleapis.com/v0/b/website-soullinkai-563d7.firebasestorage.app/o/Image%2Four.jpg?alt=media&token=1d2c33b9-d75f-4c2c-8e66-187f4eb8ac51)] bg-cover bg-center font-[family-name:var(--font-el-messiri)] p-0 lg:p-20"
      >
        <div className="flex items-center justify-end w-full h-full">
          <div className="max-w-2xl space-y-4">
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
