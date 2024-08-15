import SimpleImageSlider from "react-simple-image-slider";
import img1 from "../assets/equip1.jpeg";
import img2 from "../assets/equip2.jpeg";
import img4 from "../assets/equip4.jpeg";
import img5 from "../assets/equip5.jpeg";
import img6 from "../assets/equip6.jpeg";

function Slider() {
  const images = [img5, img6, img1, img2, img4];
  return (
    <div className="">
      <SimpleImageSlider
        width="100%"
        height="100%"
        images={images}
        showBullets={false}
        showNavs={false}
        slideDuration={0.5}
        autoPlay={true}
        bgColor="#111111"
      />
    </div>
  );
}

export default Slider;
