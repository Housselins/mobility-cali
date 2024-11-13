import React, { useState, useEffect } from "react";

function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { img: "https://mdbcdn.b-cdn.net/img/new/slides/042.webp", alt: "Slide 1" },
    { img: "https://mdbcdn.b-cdn.net/img/new/slides/043.webp", alt: "Slide 2" },
    { img: "https://mdbcdn.b-cdn.net/img/new/slides/041.webp", alt: "Slide 3" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000); // Cambia el tiempo de transición en milisegundos

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    if (index < 0) {
      setCurrentSlide(slides.length - 1); // Si está en la primera, ir a la última
    } else if (index >= slides.length) {
      setCurrentSlide(0); // Si está en la última, ir a la primera
    } else {
      setCurrentSlide(index); // De lo contrario, ir al índice seleccionado
    }
  };

  const carouselStyles = `
    .carousel {
      position: relative;
      overflow: hidden;
      width: 100%;
    }

    .carousel-inner {
      display: flex;
      transition: transform 0.5s ease-in-out;
    }

    .carousel-item {
      min-width: 100%;
      transition: opacity 0.5s ease;
    }

    img {
      width: 100%;
    }

    .carousel-indicators {
      position: absolute;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      justify-content: center;
    }

    button {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background-color: transparent;
      border: none;
      font-size: 20px;
      cursor: pointer;
    }
    
    button:nth-child(1) {
      left: 10px;
    }
    
    button:nth-child(2) {
      right: 10px;
    }
  `;

  return (
    <div className="flex justify-center">
      <style>{carouselStyles}</style>
      <div className="carousel">
        <div
          className="carousel-inner"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="carousel-item">
              <img src={slide.img} alt={slide.alt} />
            </div>
          ))}
        </div>
        <div className="carousel-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              style={{
                backgroundColor:
                  index - 1 === currentSlide ? "#3366CC" : "gray",
                borderRadius: "50%",
                width: "10px",
                height: "10px",
                margin: "0 5px",
              }}
            />
          ))}
        </div>
        {/*
          <button onClick={() => goToSlide(currentSlide - 1)}>◀</button>
          <button className='' onClick={() => goToSlide(currentSlide + 1)}>▶</button>
        */}
      </div>
    </div>
  );
}

export default Carousel;
