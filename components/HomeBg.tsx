import { ReactNode } from "react";

interface HomeBgProps {
  children: ReactNode;
}

export default function HomeBg({ children }: HomeBgProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-400 text-white">
      {children}
    </div>
  );
}