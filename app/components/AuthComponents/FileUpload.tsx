import React from "react";
import { FileUpload } from "@/components/ui/file-upload";

interface UploadedFile {
  file: (file: File[]) => void;
}
export function FileUploadDemo({ file }: UploadedFile) {
  //   const [files, setFiles] = useState<File[]>([]);

  const handleFileUpload = async (files: File[]) => {
    file(files);
    // setFiles(files);
    //
  };

  return (
    <div className="w-full max-w-4xl  mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
      <FileUpload onChange={handleFileUpload} />
    </div>
  );
}
