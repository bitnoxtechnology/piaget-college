"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import "../styles/testimonial.css";
import { testimonialService } from "@/lib/services/testimonial-service";
import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import userPlaceholder from "../assets/user.png";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

function Testimonials() {
  const [testimonials, setTestimonials] = useState<ITestimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const autoplay = Autoplay({ delay: 4000, stopOnInteraction: true });

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
      breakpoints: {
        "(min-width: 1024px)": { slidesToScroll: 1 },
      },
    },
    [autoplay]
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const res = await testimonialService.getAllTestimonials({
        page: 1,
        limit: 10,
        isPublished: true,
      });
      if (res.success && res.data?.testimonials) {
        setTestimonials(res.data.testimonials);
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="testimonials-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <span className="subtitle">Alumni Stories</span>
          <h2 className="title">What Our Alumni Are Saying</h2>
        </motion.div>

        <motion.div
          className="embla"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container">
              {loading
                ? Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="embla__slide">
                      <div className="testimonial-skeleton" />
                    </div>
                  ))
                : testimonials.map((testimonial) => (
                    <div key={testimonial._id} className="embla__slide">
                      <div className="testimonial-card">
                        <div className="quote-icon">
                          <Quote size={24} strokeWidth={2.5} />
                        </div>

                        <div className="testimonial-content">
                          <p className="testimonial-text">
                            "{testimonial.content}"
                          </p>
                        </div>

                        <div className="testimonial-footer">
                          <div className="testimonial-avatar">
                            <img
                              src={testimonial.image || userPlaceholder}
                              alt={testimonial.name}
                            />
                          </div>
                          <div className="testimonial-info">
                            <h4 className="testimonial-name">
                              {testimonial.name}
                            </h4>
                            <p className="testimonial-role">
                              {testimonial.position}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </div>

          <div className="embla__controls">
            <div className="embla__dots">
              {scrollSnaps.map((_, index) => (
                <button
                  key={index}
                  className={`embla__dot${index === selectedIndex ? " embla__dot--selected" : ""}`}
                  onClick={() => scrollTo(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <div className="embla__buttons">
              <button
                className="embla__button embla__button--prev"
                onClick={scrollPrev}
                disabled={!prevBtnEnabled}
                aria-label="Previous slide"
              >
                <ChevronLeft size={20} strokeWidth={2.5} />
              </button>
              <button
                className="embla__button embla__button--next"
                onClick={scrollNext}
                disabled={!nextBtnEnabled}
                aria-label="Next slide"
              >
                <ChevronRight size={20} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </motion.div>

        {testimonials.length > 3 && (
          <motion.div
            className="mt-12! text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Link to={"/testimonials"}>
              <button className="inline-flex items-center gap-2 px-8! py-4! bg-primary-100 hover:bg-primary-200 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all cursor-pointer duration-300 group">
                <span>Read More</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default Testimonials;
