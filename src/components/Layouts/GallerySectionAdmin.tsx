import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import api from "../../services/api";
import Button from "../Elements/Button";

const IMAGE_BASE_URL = "http://myapp.local/php-wedding/";

const COLUMN_NAMES = [
  "first_image",
  "second_image",
  "third_image",
  "fourth_image",
  "fifth_image",
  "sixth_image",
  "seventh_image",
  "eighth_image",
  "ninth_image",
  "tenth_image",
];

export default function GalleryAdminSection() {
  const [loading, setLoading] = useState(false);

  const [galleryFiles, setGalleryFiles] = useState<(File | null)[]>(
    new Array(10).fill(null),
  );

  const [previews, setPreviews] = useState<(string | null)[]>(
    new Array(10).fill(null),
  );

  // useEffect(() => {
  //   console.log("Updated previews state:", previews);
  // }, [previews]);
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await api.get("/gallery/2602001");

        if (response.data.result) {
          const fetchedPreviews = COLUMN_NAMES.map((col) =>
            response.data.result[col]
              ? `${IMAGE_BASE_URL}${response.data.result[col]}`
              : null,
          );
          setPreviews(fetchedPreviews);
          // console.log(fetchedPreviews);
          // console.log(previews);
        }
      } catch (error) {
        const err = error as unknown as Error;
        alert("Error Fetching data");
        console.log(err.message);
      }
    };

    fetchGallery();
  }, []);

  const handleFileChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files ? e.target.files[0] : null;

    console.log(file);

    if (file) {
      const newFiles = [...galleryFiles];
      newFiles[index] = file;
      setGalleryFiles(newFiles);

      const newPreviews = [...previews];
      // make a new temp link for previews
      newPreviews[index] = URL.createObjectURL(file);
      setPreviews(newPreviews);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    galleryFiles.forEach((file, index) => {
      if (file) {
        data.append(`image_${index + 1}`, file);
      }
    });

    console.log(data);
    try {
      await api.post("/gallery/2602001", data);
      setLoading(false);
      alert("Gallery Saved!");
    } catch (error) {
      const err = error as unknown as Error;
      alert("Failed Save Data");
      console.log(err);
    }
  };

  return (
    <div className='w-full flex flex-col items-center'>
      <h1 className='text-xl mb-2'>Gallery Section</h1>
      <div className='w-full'>
        <form onSubmit={handleSubmit} action='' className='flex flex-col gap-3'>
          {[...Array(10)].map((_, index) => (
            <div key={index} className='flex flex-col'>
              <label htmlFor={`image${index + 1}`} className='text-sm'>
                Image {index + 1}
              </label>

              {/* Preview Box */}
              <div className='w-1/2 aspect-video bg-gray-100 border-2 border-dashed flex items-center justify-center overflow-hidden'>
                {previews[index] ? (
                  <img
                    src={previews[index]!}
                    alt={`Gallery ${index}`}
                    className='w-full h-full object-cover'
                  />
                ) : (
                  <span className='text-[10px] text-gray-400'>Empty</span>
                )}
              </div>
              <input
                type='file'
                name={`image_${index + 1}`}
                id={`image${index + 1}`}
                accept='image/*'
                onChange={(e) => handleFileChange(index, e)}
                className='border-black/30 border-2 p-2 file:mr-3 file:px-3 file:py-1 file:border-0 file:bg-black file:text-white file:cursor-pointer text-xs'
              />
            </div>
          ))}

          <Button
            className='w-full bg-black text-white rounded-none'
            type='submit'
          >
            {loading ? "Loading" : "Upload Gallery"}
          </Button>
        </form>
      </div>
    </div>
  );
}
