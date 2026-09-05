import { motion } from "motion/react";
import { useState } from "react";
import { useParams } from "react-router-dom";

import { addWish } from "../../services/addWishes";
import { ApiError } from "../../services/api";
import Button from "../Elements/Button";
import { emitWishSubmitted } from "../utils/wishEvents";

interface RsvpFormProps {
  className?: string;
}

export default function RsvpForm(props: Readonly<RsvpFormProps>) {
  const { className } = props;
  const { slug, guestSlug } = useParams<{ slug: string; guestSlug?: string }>();

  const [fullname, setFullname] = useState("");
  const [attendance, setAttendance] = useState<
    "PRESENT" | "NOT PRESENT" | null
  >(null);
  const [guestNumber, setGuestNumber] = useState(1);
  const [wish, setWish] = useState("");
  const [invitationCode, setInvitationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const getVerifiedCode = (): string | undefined => {
    if (!slug || !guestSlug) return undefined;
    const stored = sessionStorage.getItem(`verified_${slug}_${guestSlug}`);
    if (!stored) return undefined;
    return JSON.parse(stored).invitation_code;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullname || !attendance || !wish) {
      alert("Please complete the form");
      return;
    }

    if (guestSlug && !invitationCode) {
      alert("Please enter your invitation code");
      return;
    }

    if (!slug) {
      return;
    }

    setLoading(true);

    try {
      await addWish(
        slug,
        {
          name: fullname,
          attendance: attendance === "PRESENT" ? "hadir" : "tidak_hadir",
          guest_count: attendance === "PRESENT" ? guestNumber : undefined,
          message: wish,
          invitation_code: getVerifiedCode(),
        },
        guestSlug,
      );

      emitWishSubmitted();
      document.getElementById("wishes")?.scrollIntoView({ behavior: "smooth" });

      setFullname("");
      setAttendance(null);
      setGuestNumber(1);
      setWish("");
      setInvitationCode("");

      alert("Thank you for your wish ❤️");
    } catch (error) {
      if (error instanceof ApiError) {
        setErrorMessage(error.message);
        alert(error.message);
      } else {
        alert("Something Went Wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`flex flex-col bg-white/80 lg:min-w-125 min-w-90 md:p-10 p-5 lg:pr-25 md:pr-15 transition-all duration-300 ${className}`}
    >
      <h4 className="font-italiana md:text-4xl text-2xl text-center transition-all duration-300">
        WISHES
      </h4>
      <form
        onSubmit={handleSubmit}
        method="post"
        className="flex flex-col font-inter font-light md:text-lg text-sm gap-5 transition-all duration-300"
      >
        <div className="flex flex-col">
          <label htmlFor="fullname">fullname.</label>
          <input
            type="text"
            name="fullname"
            id="fullname"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            className="bg-black/30 focus:bg-white focus:outline-none focus:border-black/30 focus:border-2 border-2 border-black/1 md:p-2 p-1 md:text-base text-md text-white focus:text-black transition-all duration-300"
          />
        </div>

        <div className="flex flex-col gap-2">
          <p>Confirmation of Attendance</p>

          <div className="flex md:gap-5 gap-2">
            <div className="">
              <input
                type="radio"
                name="attendance"
                value="yes"
                checked={attendance === "PRESENT"}
                onChange={() => setAttendance("PRESENT")}
                className="peer hidden"
                id="attendance-yes"
              />
              <label
                className="peer-checked:opacity-100 opacity-30 border p-2 select-none"
                htmlFor="attendance-yes"
              >
                I'LL BE THERE
              </label>
            </div>

            <div>
              <input
                type="radio"
                name="attendance"
                value="no"
                checked={attendance === "NOT PRESENT"}
                onChange={() => setAttendance("NOT PRESENT")}
                className="peer hidden"
                id="attendance-no"
              />
              <label
                className="peer-checked:opacity-100 opacity-30 border p-2 select-none"
                htmlFor="attendance-no"
              >
                CAN'T COME
              </label>
            </div>
          </div>
        </div>

        {attendance === "PRESENT" && (
          <motion.div
            className="flex flex-col"
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 40, opacity: 0 }}
          >
            <p>Number of Guest</p>
            <select
              value={guestNumber}
              onChange={(e) => setGuestNumber(Number(e.target.value))}
              className="w-fit border md:p-2 p-1 transition-all duration-300"
            >
              <option value="1">1 PERSON</option>
              <option value="2">2 PERSON</option>
              <option value="3">3 PERSON</option>
              <option value="4">4 PERSON</option>
              <option value="5">5 PERSON</option>
            </select>
          </motion.div>
        )}

        {guestSlug && (
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <label htmlFor="invitationCode">invitation code.</label>
            <input
              type="text"
              name="invitationCode"
              id="invitationCode"
              value={invitationCode}
              onChange={(e) => setInvitationCode(e.target.value)}
              placeholder="Check your invitation for the code"
              className="bg-black/30 focus:bg-white focus:outline-none focus:border-black/30 focus:border-2 border-2 border-black/1 md:p-2 p-1 md:text-base text-md text-white focus:text-black transition-all duration-300"
            />
          </motion.div>
        )}

        <div className="flex flex-col">
          <label htmlFor="wish">WISH</label>
          <textarea
            name="wish"
            id="wish"
            value={wish}
            onChange={(e) => setWish(e.target.value)}
            className="md:h-30 h-20 bg-black/30 focus:bg-white focus:outline-none focus:border-black/30 focus:border-2 border-2 border-black/1 p-2 text-base text-white focus:text-black transition-all duration-300"
          ></textarea>
        </div>

        {errorMessage && (
          <p className="text-red-600 text-sm text-center">{errorMessage}</p>
        )}

        <div className="flex justify-center w-full">
          <Button
            type="submit"
            className="w-fit rounded-none border"
            disabled={loading}
          >
            {loading ? "SENDING..." : "SUBMIT"}
          </Button>
        </div>
      </form>
    </div>
  );
}
