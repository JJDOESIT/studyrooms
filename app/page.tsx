"use client";

import VerticalCarousel from "@/components/verticalCarousel";
import "animate.css/animate.min.css";
import "@/app/globals.css";

export default function Home() {
  return (
      <section className="flex flex-col items-center justify-center text-center py-20 px-4">
        <h2 className="text-4xl font-bold mb-4">Welcome to Studyrooms</h2>
        <div className="text-lg mb-6 w-[310px] text-left">
          A collaborative space for{" "}
          <VerticalCarousel
            className="inline-block text-lg font-bold"
            labels={[
              "students",
              "educators",
              "learners",
              "teachers",
              "professors",
              "everyone.",
            ]}
            animations={["fadeInUp", "fadeOutUp"]}
            loop={false}
          />
        </div>
        <a
          href="#"
          className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold text-lg shadow-md hover:bg-blue-100"
        >
          Get Started
        </a>
      </section>
  );
}