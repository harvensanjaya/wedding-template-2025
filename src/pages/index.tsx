import { useState } from "react";
import BlessingModal from "../components/Fragments/BlessingModal";
import MusicPlayer from "../components/Fragments/MusicPlayer";
import PhotoModal from "../components/Fragments/PhotoModal";
import CoverScreen from "../components/Layouts/CoverScreen";
import FilterSection from "../components/Layouts/FilterSection";
import Footer from "../components/Layouts/Footer";
import GallerySection from "../components/Layouts/GallerySection";
import GroomBrideSection from "../components/Layouts/GroomBrideSection";
import HeroSection from "../components/Layouts/HeroSection";
import Navbar from "../components/Layouts/Navbar";
import RsvpSection from "../components/Layouts/RsvpSection";
import SendGiftSection from "../components/Layouts/SendGiftSection";
import WeddingSection from "../components/Layouts/WeddingSection";
import WishesSection from "../components/Layouts/WishesSection";

export default function Home() {
  const [isActive, setIsActive] = useState<boolean>(true);
  const [showPhoto, setShowPhoto] = useState<boolean>(false);
  const [showBless, setShowBless] = useState<boolean>(false);

  const toggleView = () => {
    setIsActive(!isActive);
  };

  // useEffect(() => {
  // //   document.body.style.overflow = showPhoto ? "hidden" : "auto";
  // // }, [showPhoto]);

  return (
    <div className="w-full">
      {isActive ? (
        <div className="w-full h-screen overflow-hidden">
          <CoverScreen onClick={toggleView} />
        </div>
      ) : (
        <div className="w-full relative">
          <Navbar />
          <MusicPlayer className="md:bottom-10 md:right-10 bottom-6 right-6" />
          <HeroSection id="hero" />
          <GroomBrideSection />
          <FilterSection className="lg:my-40 md:my-30 sm:my-20 my-15 transition-all duration-300" />
          <WeddingSection
            className="lg:my-40 md:my-30 sm:my-20 my-15 transition-all duration-300"
            id="wedding"
          />
          <GallerySection onOpen={() => setShowPhoto(true)} id="gallery" />
          <PhotoModal
            onConfirm={() => setShowPhoto(false)}
            isShow={showPhoto}
          />
          <RsvpSection id="rsvp" />
          <SendGiftSection onOpen={() => setShowBless(true)} />
          <BlessingModal
            onConfirm={() => setShowBless(false)}
            isOpen={showBless}
          />
          <WishesSection id="wishes" />
          <Footer id="footer" />
        </div>
      )}
    </div>
  );
}
