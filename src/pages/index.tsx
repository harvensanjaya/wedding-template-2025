import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

import GuestQrModal from "../components/Fragments/GuestQrModal";
import QrFloatingButton from "../components/Fragments/QrFloatingButton";
import { ApiError } from "../services/api";
import { verifyGuestCode } from "../services/guestVerifyService";

import { formatWeddingDate } from "../components/utils/formatDate";
import { getCouple } from "../services/coupleService";
import type { CoupleData } from "../types/couple";

interface StoredGuestVerification {
  name: string;
  invitation_code: string;
  qr_svg: string;
}

function getStorageKey(slug: string, guestSlug: string) {
  return `verified_${slug}_${guestSlug}`;
}

function getFirstName(fullName: string): string {
  return fullName.trim().split(" ")[0] ?? fullName;
}

export default function Home() {
  const { slug, guestSlug } = useParams<{
    slug: string;
    guestSlug?: string;
  }>();

  const [couple, setCouple] = useState<CoupleData | null>(null);
  const [guestName, setGuestName] = useState<string>("Guest");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [isActive, setIsActive] = useState<boolean>(true);
  const [showPhoto, setShowPhoto] = useState<boolean>(false);
  const [showBless, setShowBless] = useState<boolean>(false);

  const [photoIndex, setPhotoIndex] = useState(0);

  const [verified, setVerified] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [verifyError, setVerifyError] = useState<string | null>(null);

  const [showQrModal, setShowQrModal] = useState(false);
  const [qrModalMode, setQrModalMode] = useState<"initial" | "reopen">(
    "initial",
  );
  const [qrSvg, setQrSvg] = useState<string | null>(null);

  const galleryPhotos = couple?.gallery
    .slice()
    .sort((a, b) => a.row_order - b.row_order)
    .flatMap((row) => row.photos);

  const toggleView = () => {
    setIsActive(!isActive);
  };

  // Fetch data couple (cuma sekali, tidak dobel lagi)
  useEffect(() => {
    if (!slug) return;

    getCouple(slug)
      .then(setCouple)
      .catch(() => setError("Undangan tidak ditemukan"))
      .finally(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    if (!couple) return;

    document.title = `${getFirstName(couple.groom.name)} & ${getFirstName(
      couple.bride.name,
    )} Wedding - Stellar Organizer`;
  }, [couple]);

  // Cek apakah tamu ini sudah pernah verifikasi sebelumnya (persist lewat localStorage)
  useEffect(() => {
    if (!guestSlug) {
      setVerified(true); // link generic tanpa nama tamu, langsung anggap "verified" (no gate)
      return;
    }

    if (!slug) return;

    const stored = localStorage.getItem(getStorageKey(slug, guestSlug));
    if (stored) {
      const parsed: StoredGuestVerification = JSON.parse(stored);
      setVerified(true);
      setGuestName(parsed.name);
      setQrSvg(parsed.qr_svg);
    }
  }, [slug, guestSlug]);

  const handleVerifyCode = async (code: string) => {
    if (!slug || !guestSlug) return;

    setVerifyLoading(true);
    setVerifyError(null);

    try {
      const result = await verifyGuestCode(slug, guestSlug, code);

      setGuestName(result.name);
      setQrSvg(result.qr_svg);
      setQrModalMode("initial");
      setShowQrModal(true);
      setVerified(true);

      localStorage.setItem(
        getStorageKey(slug, guestSlug),
        JSON.stringify({
          name: result.name,
          invitation_code: result.invitation_code,
          qr_svg: result.qr_svg,
        } satisfies StoredGuestVerification),
      );
    } catch (err) {
      if (err instanceof ApiError) {
        setVerifyError(err.message);
      } else {
        setVerifyError("Terjadi kesalahan, coba lagi.");
      }
    } finally {
      setVerifyLoading(false);
    }
  };

  const handleReopenQr = () => {
    setQrModalMode("reopen");
    setShowQrModal(true);
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (error || !couple) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p>{error ?? "Undangan tidak ditemukan"}</p>
      </div>
    );
  }

  const mainEvent =
    couple.events.find((e) => e.event_name === "holy_matrimony") ??
    couple.events[0];

  return (
    <div className="w-full">
      {isActive ? (
        <div className="w-full h-screen overflow-hidden">
          <CoverScreen
            onClick={toggleView}
            coverImage={couple.image_cover ?? undefined}
            groomName={couple.groom.name}
            brideName={couple.bride.name}
            weddingDate={formatWeddingDate(mainEvent?.event_date)}
            guestName={guestName}
            requireCode={Boolean(guestSlug) && !verified}
            onVerifyCode={handleVerifyCode}
            verifyLoading={verifyLoading}
            verifyError={verifyError}
          />

          {qrSvg && (
            <GuestQrModal
              isOpen={showQrModal}
              guestName={guestName}
              qrSvg={qrSvg}
              onContinue={() => {
                setShowQrModal(false);
                if (qrModalMode === "initial") {
                  toggleView();
                }
              }}
            />
          )}
        </div>
      ) : (
        <div className="w-full relative">
          <Navbar />
          <MusicPlayer
            className="md:bottom-10 md:right-10 bottom-6 right-6"
            songUrl={couple.wedding_song.url ?? undefined}
            songTitle={couple.wedding_song.title ?? undefined}
            songArtist={couple.wedding_song.artist ?? undefined}
          />

          {guestSlug && qrSvg && <QrFloatingButton onClick={handleReopenQr} />}

          {qrSvg && (
            <GuestQrModal
              isOpen={showQrModal}
              guestName={guestName}
              qrSvg={qrSvg}
              onContinue={() => setShowQrModal(false)}
            />
          )}

          <HeroSection
            id="hero"
            groomName={couple.groom.name}
            brideName={couple.bride.name}
            weddingDate={formatWeddingDate(mainEvent?.event_date)}
            jumbotronImage={couple.image_jumbotron ?? undefined}
          />
          <GroomBrideSection
            couplePhoto={couple.couple_photo ?? undefined}
            groomPhoto={couple.groom.photo ?? undefined}
            groomName={couple.groom.name}
            groomFatherName={couple.groom.father_name ?? undefined}
            groomMotherName={couple.groom.mother_name ?? undefined}
            bridePhoto={couple.bride.photo ?? undefined}
            brideName={couple.bride.name}
            brideFatherName={couple.bride.father_name ?? undefined}
            brideMotherName={couple.bride.mother_name ?? undefined}
          />
          <FilterSection
            className="lg:my-40 md:my-30 sm:my-20 my-15 transition-all duration-300"
            weddingHashtag={couple.filter?.hashtag ?? undefined}
            images={couple.filter?.images}
            instagramFilter={couple.filter?.instagram_filter_link ?? undefined}
          />
          <WeddingSection
            className="lg:my-40 md:my-30 sm:my-20 my-15 transition-all duration-300"
            id="wedding"
            events={couple.events}
            groomName={couple.groom.name}
            brideName={couple.bride.name}
          />
          <GallerySection
            id="gallery"
            gallery={couple.gallery}
            onOpen={(index) => {
              setPhotoIndex(index);
              setShowPhoto(true);
            }}
          />
          <PhotoModal
            onConfirm={() => setShowPhoto(false)}
            isShow={showPhoto}
            photos={galleryPhotos}
            currentIndex={photoIndex}
            onIndexChange={setPhotoIndex}
          />
          <RsvpSection
            id="rsvp"
            image={couple.wish_section_image ?? undefined}
          />
          <SendGiftSection onOpen={() => setShowBless(true)} />
          <BlessingModal
            onConfirm={() => setShowBless(false)}
            isOpen={showBless}
            gifts={couple.gifts}
          />
          <WishesSection id="wishes" />
          <Footer id="footer" gallery={couple.gallery} />
        </div>
      )}
    </div>
  );
}
