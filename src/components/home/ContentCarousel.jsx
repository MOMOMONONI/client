import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Autoplay, Navigation } from "swiper/modules";

const ContentCarousel = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const curtainImages = [
      "/o1.png",
      "/o2.png",
      "/o3.png",
      "/o3.png",
      "/o3.png",
    ];
    setData(curtainImages.map((url, index) => ({ id: index, download_url: url })));
  }, []);

  return (
    <div>
      <Swiper
        pagination={true}
        modules={[Pagination, Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        className="mySwiper h-80 object-cover rounded-md mb-4"
      >
        {data.map((item, i) => (
          <SwiperSlide key={i}>
            <img
              src={item.download_url}
              alt={`Curtain ${i}`}
              className="w-full h-full object-cover rounded-md"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        slidesPerView={3}
        spaceBetween={10}
        pagination={true}
        navigation={true}
        modules={[Pagination, Autoplay, Navigation]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        className="mySwiper object-cover rounded-md"
      >
        {data.map((item, i) => (
          <SwiperSlide key={i}>
            <img
              className="rounded-md w-full h-40 object-cover"
              src={item.download_url}
              alt={`Curtain ${i}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ContentCarousel;
