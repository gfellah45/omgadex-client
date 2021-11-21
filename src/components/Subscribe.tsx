import React from "react";

interface Props {}

const Subscribe = (props: Props) => {
  return (
    <div className="flex flex-col items-center justify-center mt-10 text-center py-14 md:py-36 bg-gray2">
      <div className="text-2xl font-bold md:text-4xl">
        Subsribe to Our News Letter
      </div>
      <p className="w-10/12 mt-10 lg:w-5/12 text-links md:w-8/12">
        Dont miss out on the latest happenings in the crypto space, stay up to
        date on the relevant trends and happenings in 
      </p>

      <div className="flex items-center justify-center w-10/12 mt-12 shadow-2xl md:w-7/12">
        <input
          type="text"
          className="w-7/12 px-4 py-4 md:py-6 rounded-tl-2xl rounded-bl-2xl focus:outline-none"
          placeholder="Enter your email"
        />
        <button className="w-5/12 px-8 py-4 text-white md:py-6 rounded-tr-2xl rounded-br-2xl bg-primary">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default Subscribe;
