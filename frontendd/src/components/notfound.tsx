const NotFound = () => {
  return (
    <section className="w-full h-screen bg-white flex items-center justify-center">
      <img
        src="images/404.png"
        alt="Not found"
        className="md:w-[30%]"
      />
      <p className="">The page you are looking for does not exist</p>
    </section>
  );
};

export default NotFound;
