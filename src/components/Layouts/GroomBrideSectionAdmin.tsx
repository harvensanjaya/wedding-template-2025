import Button from "../Elements/Button";

export default function GroomBrideSectionAdmin() {
  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-xl mb-2">Groom & Bride Detail</h1>
      <div className="w-full">
        <form action="" className="flex gap-10 flex-col w-full">
          <div className="w-full flex md:flex-row flex-col gap-10 transition-all duration-300">
            {/* ================= GROOM ================= */}
            <div className="flex flex-col gap-3 w-full">
              <h2 className="text-base font-semibold">Groom Information</h2>

              {/* Groom Name */}
              <div className="flex flex-col">
                <label htmlFor="groomName" className="text-sm">
                  Groom Fullname
                </label>
                <input
                  type="text"
                  name="groomName"
                  id="groomName"
                  className="border-black/30 border-2 p-2 text-xs"
                  placeholder="type groom fullname"
                />
              </div>

              {/* Groom Profile */}
              <div className="flex flex-col">
                <label htmlFor="groomProfile" className="text-sm">
                  Groom Profile Image
                </label>
                <input
                  type="file"
                  name="groomProfile"
                  id="groomProfile"
                  accept="image/*"
                  className="border-black/30 border-2 p-2 
          file:mr-3 file:px-3 file:py-1 
          file:border-0 file:bg-black file:text-white 
          file:cursor-pointer text-xs"
                />
              </div>

              {/* Groom Instagram */}
              <div className="flex flex-col">
                <label htmlFor="groomInstagram" className="text-sm">
                  Groom Instagram Link
                </label>
                <input
                  type="url"
                  name="groomInstagram"
                  id="groomInstagram"
                  className="border-black/30 border-2 p-2 text-xs"
                  placeholder="https://instagram.com/username"
                />
              </div>

              {/* Groom Father */}
              <div className="flex flex-col">
                <label htmlFor="groomFather" className="text-sm">
                  Groom Father's Name
                </label>
                <input
                  type="text"
                  name="groomFather"
                  id="groomFather"
                  className="border-black/30 border-2 p-2 text-xs"
                  placeholder="type father's name"
                />
              </div>

              {/* Groom Mother */}
              <div className="flex flex-col">
                <label htmlFor="groomMother" className="text-sm">
                  Groom Mother's Name
                </label>
                <input
                  type="text"
                  name="groomMother"
                  id="groomMother"
                  className="border-black/30 border-2 p-2 text-xs"
                  placeholder="type mother's name"
                />
              </div>
            </div>

            {/* ================= BRIDE ================= */}
            <div className="flex flex-col gap-3 w-full">
              <h2 className="text-base font-semibold">Bride Information</h2>

              {/* Bride Name */}
              <div className="flex flex-col">
                <label htmlFor="brideName" className="text-sm">
                  Bride Fullname
                </label>
                <input
                  type="text"
                  name="brideName"
                  id="brideName"
                  className="border-black/30 border-2 p-2 text-xs"
                  placeholder="type bride fullname"
                />
              </div>

              {/* Bride Profile */}
              <div className="flex flex-col">
                <label htmlFor="brideProfile" className="text-sm">
                  Bride Profile Image
                </label>
                <input
                  type="file"
                  name="brideProfile"
                  id="brideProfile"
                  accept="image/*"
                  className="border-black/30 border-2 p-2 
          file:mr-3 file:px-3 file:py-1 
          file:border-0 file:bg-black file:text-white 
          file:cursor-pointer text-xs"
                />
              </div>

              {/* Bride Instagram */}
              <div className="flex flex-col">
                <label htmlFor="brideInstagram" className="text-sm">
                  Bride Instagram Link
                </label>
                <input
                  type="url"
                  name="brideInstagram"
                  id="brideInstagram"
                  className="border-black/30 border-2 p-2 text-xs"
                  placeholder="https://instagram.com/username"
                />
              </div>

              {/* Bride Father */}
              <div className="flex flex-col">
                <label htmlFor="brideFather" className="text-sm">
                  Bride Father's Name
                </label>
                <input
                  type="text"
                  name="brideFather"
                  id="brideFather"
                  className="border-black/30 border-2 p-2 text-xs"
                  placeholder="type father's name"
                />
              </div>

              {/* Bride Mother */}
              <div className="flex flex-col">
                <label htmlFor="brideMother" className="text-sm">
                  Bride Mother's Name
                </label>
                <input
                  type="text"
                  name="brideMother"
                  id="brideMother"
                  className="border-black/30 border-2 p-2 text-xs"
                  placeholder="type mother's name"
                />
              </div>
            </div>
          </div>

          <Button className="w-full bg-black text-white rounded-none text-sm">
            Save Data
          </Button>
        </form>
      </div>
    </div>
  );
}
