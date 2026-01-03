import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="w-full">
      <div className="mx-auto max-w-6xl px-6 pt-28 pb-20 text-center relative">

        {/* Heading */}
        <h1 className="font-extrabold text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight">
          Tell me what you want,
          <span className="block">and I’ll handle the rest</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Flights, hotels, and complete trip planning — powered by AI,
          delivered in seconds.
        </p>

        {/* CTA Button */}
        <div className="mt-10 flex justify-center relative z-10">
          <Link to="/create-trip">
            <Button size="lg" className="px-8 py-6 text-lg">
              Plan My Trip
            </Button>
          </Link>
        </div>

        {/* Image */}
        <div className="mt-16 flex justify-center">
          <img
            src="/landing.png"
            alt="Trip planning preview"
            className="w-full max-w-4xl"
          />
        </div>

      </div>
    </section>
  );
}

export default Hero;
