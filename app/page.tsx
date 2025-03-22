"use client";

import VerticalCarousel from "@/components/verticalCarousel";
import "@/app/globals.css";
import Button from "@/components/Button";

export default function Home() {
  return (
      <section className="flex flex-col items-center justify-center text-center py-20 px-4 animate__animated animate__fadeIn animate__slow">
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
        <Button onClick={() => {window.location.href = "/sign-up"}}  bgColor="bg-gray-100" hoverFromColor="from-gray-100" hoverToColor="to-blue-300">
          Get Started
        </Button>
      </section>
  );
}