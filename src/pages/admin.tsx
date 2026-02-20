import { useState } from "react";

import GalleryAdminSection from "../components/Layouts/GallerySectionAdmin";
import GroomBrideSectionAdmin from "../components/Layouts/GroomBrideSectionAdmin";
import NavbarAdmin from "../components/Layouts/NavbarAdmin";
import RsvpSectionAdmin from "../components/Layouts/RsvpSectionAdmin";

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState("rsvp"); // default

  const renderSection = () => {
    switch (activeSection) {
      case "bride-groom":
        return <GroomBrideSectionAdmin />;
      case "gallery":
        return <GalleryAdminSection />;
      default:
        return <RsvpSectionAdmin />;
    }
  };
  return (
    <div className="h-screen flex justify-center w-full sm:w-125 mx-auto">
      <NavbarAdmin active={activeSection} onChange={setActiveSection} />
      <div className="relative w-full flex flex-col items-center">
        <div className="flex flex-col items-center justify-center bg-white shadow-[0px_4px_22px_3px_rgba(0,0,0,0.1)] rounded-lg sm:p-10 p-5 font-google-sans w-full">
          <div className="flex flex-col justify-center items-center p-5">
            <p className="font-italiana text-4xl">Nico & Devi</p>
            <p className="font-italiana text-4xl">Wedding</p>
          </div>
          {renderSection()}
        </div>
      </div>
    </div>
  );
}
