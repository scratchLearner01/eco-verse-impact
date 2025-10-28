import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import heroWaste from "@/assets/hero-waste.jpg";
import heroClimate from "@/assets/hero-climate.jpg";
import heroGamified from "@/assets/hero-gamified.jpg";

const slides = [
  {
    image: heroWaste,
    title: "India produces ~62M tonnes municipal waste/year",
    subtitle: "Source: TERI/CPCB",
    cta: [
      { label: "Join as Individual", path: "/auth?type=individual" },
      { label: "Join as Industry", path: "/auth?type=industry" },
    ],
  },
  {
    image: heroClimate,
    title: "Global context: fossil CO₂ ≈ 37.4 Gt (2024)",
    subtitle: "See India's climate targets and progress",
    cta: [{ label: "See Targets", path: "/targets" }],
  },
  {
    image: heroGamified,
    title: "Join the Clean City challenge — win badges & rewards",
    subtitle: "Make an impact while earning recognition",
    cta: [{ label: "Start Challenge", path: "/auth" }],
  },
];

export const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full h-[600px] overflow-hidden rounded-2xl shadow-2xl">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ${
            index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
          </div>
          
          <div className="relative h-full flex flex-col items-start justify-center px-12 md:px-24 animate-fade-in">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 max-w-3xl">
              {slide.title}
            </h2>
            <p className="text-xl text-white/90 mb-8">{slide.subtitle}</p>
            <div className="flex gap-4">
              {slide.cta.map((button, idx) => (
                <Button
                  key={idx}
                  size="lg"
                  className="bg-primary hover:bg-primary-light transition-all hover:scale-105 shadow-lg"
                  onClick={() => navigate(button.path)}
                >
                  {button.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white"
        onClick={prevSlide}
      >
        <ChevronLeft className="w-8 h-8" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white"
        onClick={nextSlide}
      >
        <ChevronRight className="w-8 h-8" />
      </Button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? "bg-white w-8" : "bg-white/50"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};
