import { motion } from "motion/react";
import type { GalleryRow } from "../../types/couple";
import { fadeUpSection } from "../utils/sectionAnimation";

interface GallerySectionProps {
  className?: string;
  gallery?: GalleryRow[];
  onOpen?: (index: number) => void;
  id?: string;
}

function getColumnSpan(photosPerRow: number): number {
  switch (photosPerRow) {
    case 1:
      return 12;
    case 2:
      return 6;
    case 3:
      return 4;
    case 4:
      return 3;
    default:
      return 12;
  }
}

interface FlatPhoto {
  url: string;
  globalIndex: number;
}

interface RowWithIndex {
  row: GalleryRow;
  photos: FlatPhoto[];
}

function buildRowsWithIndex(gallery: GalleryRow[]): RowWithIndex[] {
  const sortedRows = gallery.slice().sort((a, b) => a.row_order - b.row_order);

  const { rows } = sortedRows.reduce<{ rows: RowWithIndex[]; count: number }>(
    (acc, row) => {
      const photosWithIndex: FlatPhoto[] = row.photos.map((url, i) => ({
        url,
        globalIndex: acc.count + i,
      }));

      return {
        rows: [...acc.rows, { row, photos: photosWithIndex }],
        count: acc.count + row.photos.length,
      };
    },
    { rows: [], count: 0 },
  );

  return rows;
}

export default function GallerySection(props: Readonly<GallerySectionProps>) {
  const { className = "", gallery = [], onOpen = () => {}, id = "" } = props;

  const rowsWithIndex = buildRowsWithIndex(gallery);

  return (
    <motion.div
      id={id}
      className={`w-full flex flex-col justify-center items-center gap-10 pt-20 ${className}`}
      variants={fadeUpSection}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <h2 className="font-italiana md:text-6xl text-5xl transition-all duration-300">
        GALLERY
      </h2>

      {gallery.length === 0 ? (
        <p className="text-black/50 pb-10">No photos yet.</p>
      ) : (
        <div className="w-full bg-black">
          {rowsWithIndex.map(({ row, photos }, rowIdx) => (
            <div
              key={rowIdx}
              className="grid grid-cols-12 lg:auto-rows-[400px] auto-rows-[200px]"
            >
              {photos.map((photo, photoIdx) => (
                <button
                  key={photoIdx}
                  className="w-full h-full cursor-pointer overflow-hidden"
                  style={{
                    gridColumn: `span ${getColumnSpan(
                      row.photos_per_row,
                    )} / span ${getColumnSpan(row.photos_per_row)}`,
                  }}
                  onClick={() => onOpen(photo.globalIndex)}
                >
                  <img
                    src={photo.url}
                    alt=""
                    className="w-full h-full object-cover hover:opacity-40 transition-all duration-300"
                  />
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
