import React, { useRef, useState } from "react";
import { useTranslations } from "next-intl";

const UploadBox = () => {
  const t = useTranslations("tracking");
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (validateFile(droppedFile)) {
      setFile(droppedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && validateFile(selectedFile)) {
      setFile(selectedFile);
    }
  };

  const validateFile = (file: File) => {
    const isValidType = file.type === "image/png" || file.type === "image/jpeg";
    const isValidSize = file.size <= 10 * 1024 * 1024; // 10 MB
    return isValidType && isValidSize;
  };

  const handleDelete = () => {
    setFile(null);
    fileInputRef.current!.value = "";
  };

  return (
    <div
      onClick={() => fileInputRef.current?.click()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className="rounded-lg border-2 p-3 space-y-2 border-primary-200"
    >
      <div className="h-40 rounded-lg overflow-hidden flex items-center justify-center border-dashed border-gray-200 border-2">
        {file ? (
          <img
            src={URL.createObjectURL(file)}
            alt="uploaded preview"
            className="object-cover h-full"
          />
        ) : (
          <div className="text-center">
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="m-auto"
            >
              <path
                d="M8.8875 7.63713L11.75 4.76213V16.7496C11.75 17.0811 11.8817 17.3991 12.1161 17.6335C12.3505 17.8679 12.6685 17.9996 13 17.9996C13.3315 17.9996 13.6495 17.8679 13.8839 17.6335C14.1183 17.3991 14.25 17.0811 14.25 16.7496V4.76213L17.1125 7.63713C17.2287 7.75429 17.367 7.84728 17.5193 7.91074C17.6716 7.9742 17.835 8.00687 18 8.00687C18.165 8.00687 18.3284 7.9742 18.4807 7.91074C18.633 7.84728 18.7713 7.75429 18.8875 7.63713C19.0047 7.52092 19.0977 7.38267 19.1611 7.23035C19.2246 7.07802 19.2572 6.91464 19.2572 6.74963C19.2572 6.58461 19.2246 6.42123 19.1611 6.26891C19.0977 6.11658 19.0047 5.97833 18.8875 5.86213L13.8875 0.862126C13.7686 0.748326 13.6284 0.659119 13.475 0.599626C13.1707 0.474604 12.8293 0.474604 12.525 0.599626C12.3716 0.659119 12.2314 0.748326 12.1125 0.862126L7.1125 5.86213C6.99595 5.97867 6.9035 6.11704 6.84043 6.26931C6.77735 6.42159 6.74489 6.5848 6.74489 6.74963C6.74489 6.91445 6.77735 7.07766 6.84043 7.22994C6.9035 7.38222 6.99595 7.52058 7.1125 7.63713C7.22905 7.75367 7.36741 7.84613 7.51969 7.9092C7.67197 7.97228 7.83518 8.00474 8 8.00474C8.16482 8.00474 8.32803 7.97228 8.48031 7.9092C8.63259 7.84613 8.77095 7.75367 8.8875 7.63713ZM24.25 12.9996C23.9185 12.9996 23.6005 13.1313 23.3661 13.3657C23.1317 13.6002 23 13.9181 23 14.2496V21.7496C23 22.0811 22.8683 22.3991 22.6339 22.6335C22.3995 22.8679 22.0815 22.9996 21.75 22.9996H4.25C3.91848 22.9996 3.60054 22.8679 3.36612 22.6335C3.1317 22.3991 3 22.0811 3 21.7496V14.2496C3 13.9181 2.8683 13.6002 2.63388 13.3657C2.39946 13.1313 2.08152 12.9996 1.75 12.9996C1.41848 12.9996 1.10054 13.1313 0.866116 13.3657C0.631696 13.6002 0.5 13.9181 0.5 14.2496V21.7496C0.5 22.7442 0.895088 23.698 1.59835 24.4013C2.30161 25.1045 3.25544 25.4996 4.25 25.4996H21.75C22.7446 25.4996 23.6984 25.1045 24.4017 24.4013C25.1049 23.698 25.5 22.7442 25.5 21.7496V14.2496C25.5 13.9181 25.3683 13.6002 25.1339 13.3657C24.8995 13.1313 24.5815 12.9996 24.25 12.9996Z"
                fill="#B3B3B3"
              />
            </svg>

            <p className="text-gray-700 font-medium">
              {t("clickUpload")}
            </p>
            <p className="text-sm text-gray-500">
              {t("maxSize")}
            </p>
          </div>
        )}
      </div>

      {file && (
        <div className="flex gap-2">
          <button className="bg-blue-500 text-white px-4 py-1 rounded-lg font-bold">
            Scan
          </button>
          <button
            className="bg-red-500 text-white px-4 py-1 rounded-lg font-bold"
            onClick={(e) => {
              e.stopPropagation(); // prevent triggering upload click
              handleDelete();
            }}
          >
            Delete
          </button>
        </div>
      )}

      <input
        type="file"
        accept="image/png, image/jpeg"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default UploadBox;
