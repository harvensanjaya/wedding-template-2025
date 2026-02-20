import Button from "../Elements/Button";

export default function GalleryAdminSection() {
  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-xl mb-2">Gallery Section</h1>
      <div className="w-full">
        <form action="" className="flex flex-col gap-3">
          {[...Array(10)].map((_, index) => (
            <div key={index} className="flex flex-col">
              <label htmlFor={`image${index + 1}`} className="text-sm">
                Image {index + 1}
              </label>
              <input
                type="file"
                name={`image${index + 1}`}
                id={`image${index + 1}`}
                accept="image/*"
                className="border-black/30 border-2 p-2 file:mr-3 file:px-3 file:py-1 file:border-0 file:bg-black file:text-white file:cursor-pointer text-xs"
              />
            </div>
          ))}

          <Button className="w-full bg-black text-white rounded-none">
            Upload Gallery
          </Button>
        </form>
      </div>
    </div>
  );
}
