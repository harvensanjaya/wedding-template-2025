// import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
// import api from "../../services/api";
// import Button from "../Elements/Button";

// // const API_URL = "http://localhost/php-wedding/index.php/couple";

// const BASE_IMAGE_URL = "http://myapp.local/php-wedding/";

// interface CoupleFormData {
//   groom_name: string;
//   groom_instagram: string;
//   groom_father: string;
//   groom_mother: string;
//   bride_name: string;
//   bride_mother: string;
//   bride_father: string;
//   bride_instagram: string;
// }

// export default function GroomBrideSectionAdmin() {
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState<CoupleFormData>({
//     groom_name: "",
//     groom_instagram: "",
//     groom_father: "",
//     groom_mother: "",
//     bride_name: "",
//     bride_mother: "",
//     bride_father: "",
//     bride_instagram: "",
//   });

//   const [groomProfile, setGroomProfile] = useState<File | null>(null);
//   const [brideProfile, setBrideProfile] = useState<File | null>(null);
//   const [groomPreview, setGroomPreview] = useState<string | null>(null);
//   const [bridePreview, setBridePreview] = useState<string | null>(null);

//   // READ: Fetch data
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // 2. Path is relative to baseURL in api.ts
//         const response = await api.get("/couple/2026001");
//         if (response.data) {
//           setFormData(response.data.result);
//         }

//         if (response.data.result.groom_picture) {
//           setGroomPreview(
//             `${BASE_IMAGE_URL}${response.data.result.groom_picture}`,
//           );
//         }
//         if (response.data.result.bride_picture) {
//           setBridePreview(
//             `${BASE_IMAGE_URL}${response.data.result.bride_picture}`,
//           );
//         }
//       } catch (err) {
//         console.error("Error fetching data:", err);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files ? e.target.files[0] : null;

//     if (file) {
//       const localUrl = URL.createObjectURL(file);

//       if (e.target.name === "groom_picture") {
//         setGroomProfile(file);
//         setGroomPreview(localUrl);
//       }
//       if (e.target.name === "bride_picture") {
//         setBrideProfile(file);
//         setBridePreview(localUrl);
//       }
//     }
//   };

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // CREATE / UPDATE: Submit handler
//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     // Using FormData because we have files (images)
//     const data = new FormData();

//     // Append text fields
//     (Object.keys(formData) as Array<keyof CoupleFormData>).forEach((key) => {
//       data.append(key, formData[key]);
//     });

//     // Append files
//     if (groomProfile) data.append("groom_picture", groomProfile);
//     if (brideProfile) data.append("bride_picture", brideProfile);

//     console.log(groomProfile);
//     try {
//       // POST request using Axios
//       // 3. Request simplified: headers are already in api.ts
//       const response = await api.post("/couple/2026001", data);
//       console.log(formData);
//       alert("Data saved successfully!");
//       console.log(response.data);
//     } catch (err) {
//       const error = err as unknown as Error;
//       alert("Failed to save data.");
//       console.error(err);
//       console.log(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className='w-full flex flex-col items-center'>
//       <h1 className='text-xl mb-2'>Groom & Bride Detail</h1>
//       <div className='w-full'>
//         <form
//           action=''
//           onSubmit={handleSubmit}
//           className='flex gap-10 flex-col w-full'
//         >
//           <div className='w-full flex md:flex-row flex-col gap-10 transition-all duration-300'>
//             {/* ================= GROOM ================= */}
//             <div className='flex flex-col gap-3 w-full'>
//               <h2 className='text-base font-semibold'>Groom Information</h2>

//               {/* Groom Name */}
//               <div className='flex flex-col'>
//                 <label htmlFor='groom_name' className='text-sm'>
//                   Groom Fullname
//                 </label>
//                 <input
//                   type='text'
//                   name='groom_name'
//                   id='groom_name'
//                   value={formData.groom_name}
//                   onChange={handleChange}
//                   className='border-black/30 border-2 p-2 text-xs'
//                   placeholder='type groom fullname'
//                 />
//               </div>

//               {/* Groom Profile */}
//               <div className='w-32 h-32 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50'>
//                 {groomPreview ? (
//                   <img
//                     src={groomPreview}
//                     alt='Groom Preview'
//                     className='w-full h-full object-cover'
//                   />
//                 ) : (
//                   <span className='text-[10px] text-gray-400'>
//                     No Image Selected
//                   </span>
//                 )}
//               </div>
//               <div className='flex flex-col'>
//                 <label htmlFor='groom_picture' className='text-sm'>
//                   Groom Profile Image
//                 </label>
//                 <input
//                   type='file'
//                   name='groom_picture'
//                   id='groom_picture'
//                   accept='image/*'
//                   onChange={handleFileChange}
//                   className='border-black/30 border-2 p-2
//           file:mr-3 file:px-3 file:py-1
//           file:border-0 file:bg-black file:text-white
//           file:cursor-pointer text-xs'
//                 />
//               </div>

//               {/* Groom Instagram */}
//               <div className='flex flex-col'>
//                 <label htmlFor='groom_instagram' className='text-sm'>
//                   Groom Instagram Link
//                 </label>
//                 <input
//                   type='url'
//                   name='groom_instagram'
//                   id='groom_instagram'
//                   value={formData.groom_instagram}
//                   onChange={handleChange}
//                   className='border-black/30 border-2 p-2 text-xs'
//                   placeholder='https://instagram.com/username'
//                 />
//               </div>

//               {/* Groom Father */}
//               <div className='flex flex-col'>
//                 <label htmlFor='groom_father' className='text-sm'>
//                   Groom Father's Name
//                 </label>
//                 <input
//                   type='text'
//                   name='groom_father'
//                   id='groom_father'
//                   value={formData.groom_father}
//                   onChange={handleChange}
//                   className='border-black/30 border-2 p-2 text-xs'
//                   placeholder="type father's name"
//                 />
//               </div>

//               {/* Groom Mother */}
//               <div className='flex flex-col'>
//                 <label htmlFor='groom_mother' className='text-sm'>
//                   Groom Mother's Name
//                 </label>
//                 <input
//                   type='text'
//                   name='groom_mother'
//                   id='groom_mother'
//                   value={formData.groom_mother}
//                   onChange={handleChange}
//                   className='border-black/30 border-2 p-2 text-xs'
//                   placeholder="type mother's name"
//                 />
//               </div>
//             </div>

//             {/* ================= BRIDE ================= */}
//             <div className='flex flex-col gap-3 w-full'>
//               <h2 className='text-base font-semibold'>Bride Information</h2>

//               {/* Bride Name */}
//               <div className='flex flex-col'>
//                 <label htmlFor='bride_name' className='text-sm'>
//                   Bride Fullname
//                 </label>
//                 <input
//                   type='text'
//                   name='bride_name'
//                   id='bride_name'
//                   value={formData.bride_name}
//                   onChange={handleChange}
//                   className='border-black/30 border-2 p-2 text-xs'
//                   placeholder='type bride fullname'
//                 />
//               </div>

//               {/* Bride Profile */}
//               <div className='w-32 h-32 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50'>
//                 {bridePreview ? (
//                   <img
//                     src={bridePreview}
//                     alt='Groom Preview'
//                     className='w-full h-full object-cover'
//                   />
//                 ) : (
//                   <span className='text-[10px] text-gray-400'>
//                     No Image Selected
//                   </span>
//                 )}
//               </div>
//               <div className='flex flex-col'>
//                 <label htmlFor='bride_picture' className='text-sm'>
//                   Bride Profile Image
//                 </label>
//                 <input
//                   type='file'
//                   name='bride_picture'
//                   id='bride_picture'
//                   accept='image/*'
//                   onChange={handleFileChange}
//                   className='border-black/30 border-2 p-2
//           file:mr-3 file:px-3 file:py-1
//           file:border-0 file:bg-black file:text-white
//           file:cursor-pointer text-xs'
//                 />
//               </div>

//               {/* Bride Instagram */}
//               <div className='flex flex-col'>
//                 <label htmlFor='bride_instagram' className='text-sm'>
//                   Bride Instagram Link
//                 </label>
//                 <input
//                   type='url'
//                   name='bride_instagram'
//                   id='bride_instagram'
//                   value={formData.bride_instagram}
//                   onChange={handleChange}
//                   className='border-black/30 border-2 p-2 text-xs'
//                   placeholder='https://instagram.com/username'
//                 />
//               </div>

//               {/* Bride Father */}
//               <div className='flex flex-col'>
//                 <label htmlFor='bride_father' className='text-sm'>
//                   Bride Father's Name
//                 </label>
//                 <input
//                   type='text'
//                   name='bride_father'
//                   id='bride_father'
//                   value={formData.bride_father}
//                   onChange={handleChange}
//                   className='border-black/30 border-2 p-2 text-xs'
//                   placeholder="type father's name"
//                 />
//               </div>

//               {/* Bride Mother */}
//               <div className='flex flex-col'>
//                 <label htmlFor='bride_mother' className='text-sm'>
//                   Bride Mother's Name
//                 </label>
//                 <input
//                   type='text'
//                   name='bride_mother'
//                   id='bride_mother'
//                   value={formData.bride_mother}
//                   onChange={handleChange}
//                   className='border-black/30 border-2 p-2 text-xs'
//                   placeholder="type mother's name"
//                 />
//               </div>
//             </div>
//           </div>

//           <Button
//             type='submit'
//             disabled={loading}
//             className='w-full bg-black text-white rounded-none text-sm'
//           >
//             {loading ? "Saving..." : "Save Data"}
//           </Button>
//         </form>
//       </div>
//     </div>
//   );
// }
