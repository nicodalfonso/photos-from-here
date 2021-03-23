import React from "react";

export const Header = (): JSX.Element => {
  return (
    <header className="text-center border-b-2 pt-6 pb-3 z-10 absolute top-0 left-0 w-screen">
      <h1 className="text-5xl font-bold mb-4">Photos From Here</h1>
      <p className="text-center text-xl italic">See photos that were taken near you!</p>
    </header>
  );
};
