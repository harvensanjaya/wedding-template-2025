// import { useEffect, useMemo, useState } from "react";
// import api from "../../services/api";
// import type { Wish } from "../../types/wish";

// export default function RsvpSectionAdmin() {
//   const [wishes, setWishes] = useState<Wish[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize, setPageSize] = useState(10);

//   // useEffect(() => {
//   //   const q = query(collection(db, "rsvp-wish"), orderBy("createdAt", "desc"));

//   //   const unsubscribe = onSnapshot(q, (snapshot) => {
//   //     const data = snapshot.docs.map((doc) => ({
//   //       id: doc.id,
//   //       ...(doc.data() as Omit<Wish, "id">),
//   //     }));
//   //     setWishes(data);
//   //   });

//   //   return () => unsubscribe();
//   // }, []);

//   useEffect(() => {
//     const fetchedWish = async () => {
//       try {
//         const response = await api.get("rspv");

//         if (response.data.result) {
//           setWishes(response.data.result);
//         }
//       } catch (error) {
//         const err = error as unknown as Error;

//         console.log(err.message);
//       }
//     };
//     fetchedWish();
//   }, []);

//   // Pagination Logic
//   const totalPages = Math.ceil(wishes.length / pageSize);

//   const paginatedData = useMemo(() => {
//     const start = (currentPage - 1) * pageSize;
//     return wishes.slice(start, start + pageSize);
//   }, [wishes, currentPage, pageSize]);

//   // Export CSV
//   const exportCSV = () => {
//     const headers = [
//       "No",
//       "Fullname",
//       "Confirmation",
//       "Number of Guest",
//       "Wishes",
//     ];

//     const rows = wishes.map((item, index) => [
//       index + 1,
//       item.fullname,
//       item.status,
//       item.number_of_guest,
//       item.wish,
//     ]);

//     const csvContent =
//       "data:text/csv;charset=utf-8," +
//       [headers, ...rows]
//         .map((row) => row.map((field) => `"${field}"`).join(","))
//         .join("\n");

//     const link = document.createElement("a");
//     link.href = encodeURI(csvContent);
//     link.download = "rsvp-data.csv";
//     link.click();
//   };

//   return (
//     <div className='w-full flex flex-col items-center gap-4'>
//       <h1 className='text-xl mb-2'>Guest RSVP Detail</h1>

//       {/* Controls */}
//       <div className='w-full flex justify-between items-center text-sm'>
//         <div className='flex items-center gap-2'>
//           <span>Show</span>
//           <select
//             value={pageSize}
//             onChange={(e) => {
//               setPageSize(Number(e.target.value));
//               setCurrentPage(1);
//             }}
//             className='border-black/30 border-2 p-1 text-xs'
//           >
//             {[10, 25, 50, 100, 500].map((size) => (
//               <option key={size} value={size}>
//                 {size}
//               </option>
//             ))}
//           </select>
//           <span>entries</span>
//         </div>

//         <button
//           onClick={exportCSV}
//           className='bg-black text-white px-3 py-1 text-xs'
//         >
//           Download CSV
//         </button>
//       </div>

//       {/* Table Container */}
//       <div className='w-full overflow-x-auto border-black/30 border-2'>
//         <table className='min-w-225 w-full text-xs border-collapse'>
//           <thead className='bg-black text-white'>
//             <tr>
//               <th className='p-2 text-left'>No</th>
//               <th className='p-2 text-left'>Fullname</th>
//               <th className='p-2 text-left'>Confirmation</th>
//               <th className='p-2 text-left'>Number of Guest</th>
//               <th className='p-2 text-left'>Wishes</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedData.map((item, index) => (
//               <tr key={item.id} className='border-t border-black/20'>
//                 <td className='p-2'>
//                   {(currentPage - 1) * pageSize + index + 1}
//                 </td>
//                 <td className='p-2'>{item.fullname}</td>
//                 <td className='p-2'>{item.status}</td>
//                 <td className='p-2'>{item.number_of_guest}</td>
//                 <td className='p-2 whitespace-nowrap'>{item.wish}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className='flex gap-2 text-xs'>
//         <button
//           disabled={currentPage === 1}
//           onClick={() => setCurrentPage((prev) => prev - 1)}
//           className='border-black/30 border-2 px-2 py-1 disabled:opacity-40'
//         >
//           Prev
//         </button>

//         <span className='px-2 py-1'>
//           Page {currentPage} of {totalPages || 1}
//         </span>

//         <button
//           disabled={currentPage === totalPages}
//           onClick={() => setCurrentPage((prev) => prev + 1)}
//           className='border-black/30 border-2 px-2 py-1 disabled:opacity-40'
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }
