import { MultiValue } from "react-select";
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import Select from "react-select";
import { motion } from "framer-motion";
import {
  Upload,
  MapPin,
  Tag,
  FileText,
  Camera,
  Video,
  X,
  Check,
  Loader2,
} from "lucide-react";
import { data } from "@/app/api/DummyData/data";
import { handleCreatePost } from "@/app/api/PostApi/api";
import { AxiosProgressEvent } from "axios";
import { useRouter } from "next/navigation";
import { StylesConfig, CSSObjectWithLabel } from "react-select";

interface VideoProps {
  isComplete: (status: boolean) => void;
}

interface FormValues {
  content: string;
  caption: string;
  tags: string[];
  location: string;
  thumbnail: File | null;
  banner: File | null;
  fullVideo: File | null;
}

interface FormErrors {
  content?: string;
  caption?: string;
  tags?: string;
  thumbnail?: string;
  banner?: string;
  fullVideo?: string;
  location?: string;
}

const VideoForm: React.FC<VideoProps> = ({ isComplete }) => {
  const [formValues, setFormValues] = useState<FormValues>({
    content: "",
    caption: "",
    tags: [],
    location: "",
    thumbnail: null,
    banner: null,
    fullVideo: null,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formHeight, setFormHeight] = useState<number>(600); // Default height
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const tagOptions = data.map((tag) => ({ value: tag.name, label: tag.name }));


  const customSelectStyles: StylesConfig<{ value: string; label: string }, true> = {
    control: (base: CSSObjectWithLabel) => ({
      ...base,
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      borderColor: "rgba(255, 255, 255, 0.1)",
      boxShadow: "none",
      "&:hover": {
        borderColor: "rgba(99, 102, 241, 0.8)",
      },
      padding: "0.25rem",
      borderRadius: "0.75rem",
      minHeight: "auto",
    }),
    menu: (base: CSSObjectWithLabel) => ({
      ...base,
      backgroundColor: "#1F2937",
      borderRadius: "0.75rem",
      overflow: "hidden",
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
    }),
    option: (base: CSSObjectWithLabel, { isFocused, isSelected }) => ({
      ...base,
      backgroundColor: isFocused
        ? "rgba(99, 102, 241, 0.2)"
        : isSelected
        ? "rgba(99, 102, 241, 0.4)"
        : "transparent",
      "&:hover": {
        backgroundColor: "rgba(99, 102, 241, 0.2)",
      },
      cursor: "pointer",
      padding: "0.5rem 1rem",
    }),
    multiValue: (base: CSSObjectWithLabel) => ({
      ...base,
      backgroundColor: "rgba(99, 102, 241, 0.2)",
      borderRadius: "0.5rem",
    }),
    multiValueLabel: (base: CSSObjectWithLabel) => ({
      ...base,
      color: "white",
      fontSize: "0.875rem",
      padding: "0.25rem",
    }),
    multiValueRemove: (base: CSSObjectWithLabel) => ({
      ...base,
      color: "white",
      "&:hover": {
        backgroundColor: "rgba(239, 68, 68, 0.8)",
        color: "white",
      },
    }),
    input: (base: CSSObjectWithLabel) => ({
      ...base,
      color: "white",
      fontSize: "0.875rem",
      margin: 0,
      padding: 0,
    }),
    placeholder: (base: CSSObjectWithLabel) => ({
      ...base,
      color: "rgba(255, 255, 255, 0.5)",
      fontSize: "0.875rem",
    }),
    dropdownIndicator: (base: CSSObjectWithLabel) => ({
      ...base,
      padding: "0.25rem",
    }),
    clearIndicator: (base: CSSObjectWithLabel, props) => ({
      ...base,
      padding: "0.25rem",
    }),
  };
  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: keyof FormValues,
    previewSetter: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const file = event.currentTarget.files?.[0] || null;
    setFormValues((prev) => ({ ...prev, [fieldName]: file }));

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        previewSetter(reader.result as string);
      };
      reader.readAsDataURL(file);

      if (fieldName === "fullVideo") {
        simulateVideoProcessing();
      }
    } else {
      previewSetter(null);
    }
  };

  const simulateVideoProcessing = () => {
    setIsProcessing(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        const newProgress = prev + Math.floor(Math.random() * 10) + 1;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsProcessing(false), 500);
          return 100;
        }
        return newProgress;
      });
    }, 200);

    return () => clearInterval(interval);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  
  const handleTagsChange = (selectedOptions: MultiValue<{ value: string; label: string }>) => {
    const selectedTags = selectedOptions.map((option) => option.value);
    setFormValues((prev) => ({ ...prev, tags: selectedTags }));
  };

  useEffect(() => {
    const updateFormHeight = () => {
      if (formRef.current) {
        setFormHeight(formRef.current.offsetHeight);
      }
    };

    updateFormHeight();
    window.addEventListener("resize", updateFormHeight);

    return () => {
      window.removeEventListener("resize", updateFormHeight);
    };
  }, []);

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};

    if (step === 1) {
      if (!formValues.fullVideo) {
        newErrors.fullVideo = "Video is required";
      } else if (formValues.fullVideo.size > 2 * 1024 * 1024 * 1024) {
        newErrors.fullVideo = "Video must be smaller than 2GB";
      }
    }

    if (step === 2) {
      if (!formValues.content) {
        newErrors.content = "Content is required";
      } else if (formValues.content.length > 1000) {
        newErrors.content = "Content must be less than 1000 characters";
      }

      if (!formValues.caption) {
        newErrors.caption = "Caption is required";
      } else if (formValues.caption.length > 100) {
        newErrors.caption = "Caption must be less than 100 characters";
      }

      if (!formValues.tags || formValues.tags.length === 0) {
        newErrors.tags = "At least one tag is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateStep(currentStep)) {
      // setIsVideoUploading(true);
      setIsLoading(true);

      const data = {
        content: formValues.content,
        caption: formValues.caption,
        tags: formValues.tags,
        location: formValues.location,
        thumbnail: formValues.thumbnail,
        banner: formValues.banner,
        fullVideo: formValues.fullVideo,
      };

      try {
        await handleCreatePost(data, (progressEvent: AxiosProgressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          }
        });

        setIsLoading(false);
        // setIsVideoUploading(false);
        isComplete(true);
        alert("successfully uploaded");
        router.push("/pages/Dashboard/Videos");
      } catch (error) {
        console.error("Upload failed:", error);
        setIsLoading(false);
        // setIsVideoUploading(false);
      }
    }
  };

  if (isProcessing) {
    return (
      <div className="w-full flex flex-col items-center justify-center space-y-8 py-12 px-4">
        <div className="text-center space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            {uploadProgress < 100
              ? "Processing Your Video"
              : "Processing Complete"}
          </h3>
          <p className="text-gray-400 text-sm sm:text-base">
            {uploadProgress < 100
              ? "Please wait while we process your video..."
              : "Video ready for upload!"}
          </p>
        </div>

        <div className="w-full max-w-md relative px-4">
          <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-600"
              initial={{ width: "0%" }}
              animate={{ width: `${uploadProgress}%` }}
              transition={{ type: "tween" }}
            />
          </div>
          <div className="mt-2 flex justify-between text-xs sm:text-sm text-gray-400">
            <span>{uploadProgress < 100 ? "Processing" : "Complete"}</span>
            <span>{uploadProgress}%</span>
          </div>
        </div>

        {uploadProgress < 100 && (
          <div className="mt-4 text-center px-4">
            <p className="text-gray-500 text-xs sm:text-sm">
              This may take a few moments depending on video length
            </p>
          </div>
        )}
      </div>
    );
  }

  const steps = [
    { name: "Media", icon: <Camera className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { name: "Details", icon: <FileText className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { name: "Preview", icon: <Video className="w-4 h-4 sm:w-5 sm:h-5" /> },
  ];

  return (
    <div ref={formRef} className="w-full max-w-4xl mx-auto px-4 sm:px-6">
      {/* Stepper */}
      <div className="mb-6 sm:mb-8">
        <div className="flex justify-between items-center w-full">
          {steps.map((step, i) => (
            <React.Fragment key={i}>
              <button
                onClick={() => currentStep > i + 1 && setCurrentStep(i + 1)}
                disabled={currentStep <= i + 1}
                className={`flex flex-col items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full ${
                  i + 1 === currentStep
                    ? "bg-indigo-600 text-white ring-4 ring-indigo-600/30"
                    : i + 1 < currentStep
                    ? "bg-green-500 text-white"
                    : "bg-gray-700 text-gray-400"
                } transition-all duration-300`}
              >
                {i + 1 < currentStep ? (
                  <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  step.icon
                )}
              </button>
              {i < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 ${
                    i + 1 < currentStep
                      ? "bg-green-500"
                      : i + 1 === currentStep
                      ? "bg-gradient-to-r from-green-500 to-gray-700"
                      : "bg-gray-700"
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="flex justify-between mt-2">
          {steps.map((step, i) => (
            <div
              key={i}
              className={`text-xs sm:text-sm ${
                i + 1 === currentStep
                  ? "text-indigo-400 font-medium"
                  : i + 1 < currentStep
                  ? "text-green-500"
                  : "text-gray-500"
              } transition-colors duration-300 flex-1 text-center`}
            >
              {step.name}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="w-full">
        {currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4 sm:space-y-6"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Upload Media Files
            </h2>

            {/* Video Upload */}
            <div className="rounded-xl sm:rounded-2xl border border-dashed border-gray-600 bg-gray-800/50 backdrop-blur-sm">
              <div className="p-4 sm:p-6 flex flex-col items-center">
                <input
                  type="file"
                  id="fullVideo"
                  name="fullVideo"
                  accept="video/*"
                  onChange={(e) =>
                    handleFileChange(e, "fullVideo", setVideoPreview)
                  }
                  className="hidden"
                />

                {!videoPreview ? (
                  <label htmlFor="fullVideo" className="w-full cursor-pointer">
                    <div className="flex flex-col items-center justify-center py-6 sm:py-8 px-4">
                      <div className="p-3 sm:p-4 bg-indigo-600/20 rounded-full mb-3 sm:mb-4">
                        <Video className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-400" />
                      </div>
                      <h3 className="text-base sm:text-lg font-medium text-white mb-1 sm:mb-2">
                        Upload Video
                      </h3>
                      <p className="text-gray-400 text-xs sm:text-sm text-center mb-3 sm:mb-4">
                        Drag and drop your video file or click to browse
                      </p>
                      <p className="text-xs text-gray-500">
                        MP4, WebM or MOV (max. 2GB)
                      </p>
                    </div>
                  </label>
                ) : (
                  <div className="w-full relative">
                    <video
                      ref={videoRef}
                      src={videoPreview}
                      controls
                      className="w-full rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setFormValues((prev) => ({ ...prev, fullVideo: null }));
                        setVideoPreview(null);
                      }}
                      className="absolute top-2 right-2 bg-red-500 rounded-full p-1 hover:bg-red-600 transition-colors"
                    >
                      <X className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                )}
              </div>
              {errors.fullVideo && (
                <div className="text-red-500 text-xs sm:text-sm p-2">
                  {errors.fullVideo}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2">
              {/* Thumbnail Upload */}
              <div className="rounded-xl sm:rounded-2xl border border-gray-700 bg-gray-800/30 overflow-hidden">
                <div className="p-3 sm:p-4 border-b border-gray-700">
                  <h3 className="font-medium text-sm sm:text-base flex items-center gap-2">
                    <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400" />
                    Thumbnail Image
                  </h3>
                </div>
                <div className="p-4 sm:p-6">
                  <input
                    type="file"
                    id="thumbnail"
                    name="thumbnail"
                    accept="image/*"
                    onChange={(e) =>
                      handleFileChange(e, "thumbnail", setThumbnailPreview)
                    }
                    className="hidden"
                  />

                  {!thumbnailPreview ? (
                    <label
                      htmlFor="thumbnail"
                      className="w-full cursor-pointer flex flex-col items-center justify-center border border-dashed border-gray-600 rounded-lg py-4 sm:py-6 px-4 hover:bg-gray-700/30 transition-colors"
                    >
                      <Camera className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 mb-1 sm:mb-2" />
                      <p className="text-xs sm:text-sm text-gray-400">
                        Upload thumbnail
                      </p>
                    </label>
                  ) : (
                    <div className="relative">
                      <img
                        src={thumbnailPreview}
                        alt="Thumbnail preview"
                        className="w-full rounded-lg h-36 sm:h-48 object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setFormValues((prev) => ({
                            ...prev,
                            thumbnail: null,
                          }));
                          setThumbnailPreview(null);
                        }}
                        className="absolute top-2 right-2 bg-red-500 rounded-full p-1 hover:bg-red-600 transition-colors"
                      >
                        <X className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  )}
                  {errors.thumbnail && (
                    <div className="text-red-500 text-xs sm:text-sm mt-2">
                      {errors.thumbnail}
                    </div>
                  )}
                </div>
              </div>

              {/* Banner Upload */}
              <div className="rounded-xl sm:rounded-2xl border border-gray-700 bg-gray-800/30 overflow-hidden">
                <div className="p-3 sm:p-4 border-b border-gray-700">
                  <h3 className="font-medium text-sm sm:text-base flex items-center gap-2">
                    <Upload className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400" />
                    Banner Image
                  </h3>
                </div>
                <div className="p-4 sm:p-6">
                  <input
                    type="file"
                    id="banner"
                    name="banner"
                    accept="image/*"
                    onChange={(e) =>
                      handleFileChange(e, "banner", setBannerPreview)
                    }
                    className="hidden"
                  />

                  {!bannerPreview ? (
                    <label
                      htmlFor="banner"
                      className="w-full cursor-pointer flex flex-col items-center justify-center border border-dashed border-gray-600 rounded-lg py-4 sm:py-6 px-4 hover:bg-gray-700/30 transition-colors"
                    >
                      <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 mb-1 sm:mb-2" />
                      <p className="text-xs sm:text-sm text-gray-400">
                        Upload banner
                      </p>
                    </label>
                  ) : (
                    <div className="relative">
                      <img
                        src={bannerPreview}
                        alt="Banner preview"
                        className="w-full rounded-lg h-36 sm:h-48 object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setFormValues((prev) => ({ ...prev, banner: null }));
                          setBannerPreview(null);
                        }}
                        className="absolute top-2 right-2 bg-red-500 rounded-full p-1 hover:bg-red-600 transition-colors"
                      >
                        <X className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  )}
                  {errors.banner && (
                    <div className="text-red-500 text-xs sm:text-sm mt-2">
                      {errors.banner}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {currentStep === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4 sm:space-y-6"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Video Details
            </h2>

            {/* Content Input */}
            <div className="space-y-2">
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-300"
              >
                Content
              </label>
              <textarea
                id="content"
                name="content"
                value={formValues.content}
                onChange={handleInputChange}
                rows={4}
                placeholder="Write something about your video..."
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder:text-gray-500 px-4 py-2 sm:py-3"
              />
              {errors.content && (
                <div className="text-red-500 text-xs sm:text-sm">
                  {errors.content}
                </div>
              )}
            </div>

            {/* Caption Input */}
            <div className="space-y-2">
              <label
                htmlFor="caption"
                className="block text-sm font-medium text-gray-300"
              >
                Caption
              </label>
              <input
                type="text"
                id="caption"
                name="caption"
                value={formValues.caption}
                onChange={handleInputChange}
                placeholder="Add a caption for your video"
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder:text-gray-500 px-4 py-2 sm:py-3"
              />
              {errors.caption && (
                <div className="text-red-500 text-xs sm:text-sm">
                  {errors.caption}
                </div>
              )}
            </div>

            {/* Tags Select */}
            <div className="space-y-2">
              <label
                htmlFor="tags"
                className="block text-sm font-medium text-gray-300"
              >
                Tags
              </label>
              <Select
                isMulti
                name="tags"
                options={tagOptions}
                value={formValues.tags.map((tag: string) => ({
                  value: tag,
                  label: tag,
                }))}
                onChange={handleTagsChange}
                styles={customSelectStyles}
                className="w-full"
              />
              {errors.tags && (
                <div className="text-red-500 text-xs sm:text-sm">
                  {errors.tags}
                </div>
              )}
            </div>

            {/* Location Input */}
            <div className="space-y-2">
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-300 flex items-center gap-1.5"
              >
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formValues.location}
                onChange={handleInputChange}
                placeholder="Add a location"
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder:text-gray-500 px-4 py-2 sm:py-3"
              />
              {errors.location && (
                <div className="text-red-500 text-xs sm:text-sm">
                  {errors.location}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {currentStep === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4 sm:space-y-6"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Preview
            </h2>

            {/* Thumbnail Preview */}
            {thumbnailPreview && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-300">
                  Thumbnail Preview
                </h3>
                <img
                  src={thumbnailPreview}
                  alt="Thumbnail preview"
                  className="w-full rounded-lg h-48 object-cover"
                />
              </div>
            )}

            {/* Banner Preview */}
            {bannerPreview && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-300">
                  Banner Preview
                </h3>
                <img
                  src={bannerPreview}
                  alt="Banner preview"
                  className="w-full rounded-lg h-48 object-cover"
                />
              </div>
            )}

            {/* Video Preview */}
            {videoPreview && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-300">
                  Video Preview
                </h3>
                <video
                  ref={videoRef}
                  src={videoPreview}
                  controls
                  className="w-full rounded-lg"
                />
              </div>
            )}

            {/* Content, Caption, Location, Tags Preview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-300">Content</h3>
                <p className="text-white bg-gray-800/50 rounded-lg p-3 whitespace-pre-line">
                  {formValues.content || (
                    <span className="text-gray-500 italic">No content</span>
                  )}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-300">Caption</h3>
                <p className="text-white bg-gray-800/50 rounded-lg p-3">
                  {formValues.caption || (
                    <span className="text-gray-500 italic">No caption</span>
                  )}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-300 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                  Location
                </h3>
                <p className="text-white bg-gray-800/50 rounded-lg p-3">
                  {formValues.location || (
                    <span className="text-gray-500 italic">No location</span>
                  )}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-300 flex items-center gap-1.5">
                  <Tag className="w-4 h-4 sm:w-5 sm:h-5" />
                  Tags
                </h3>
                <div className="bg-gray-800/50 rounded-lg p-3 flex flex-wrap gap-2">
                  {formValues.tags.length > 0 ? (
                    formValues.tags.map((tag: string, index: number) => (
                      <span
                        key={index}
                        className="bg-indigo-600/20 text-indigo-300 rounded-full px-2 py-1 text-xs"
                      >
                        {tag}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500 italic">No tags</span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Navigation */}
        <div
          className="mt-8 bottom-0 left-0 w-full bg-gray-900/50 backdrop-blur-sm p-4 sm:p-6 z-10"
          style={{
            bottom:
              (formRef.current?.offsetHeight ?? 0) > 600
                ? "0"
                : `calc(100vh - ${formRef.current?.offsetHeight}px)`,
          }}
        >
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handlePrevStep}
              disabled={currentStep === 1}
              className={`px-4 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl flex items-center gap-1 sm:gap-2 text-xs sm:text-sm ${
                currentStep === 1
                  ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                  : "bg-gray-800 text-white hover:bg-gray-700"
              } transition-colors`}
            >
              Back
            </button>

            {currentStep < 3 ? (
              <button
                type="button"
                onClick={handleNextStep}
                disabled={
                  (currentStep === 1 && !formValues.fullVideo) ||
                  (currentStep === 2 &&
                    (!formValues.content ||
                      !formValues.caption ||
                      formValues.tags.length === 0))
                }
                className={`px-4 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl flex items-center gap-1 sm:gap-2 text-xs sm:text-sm ${
                  (currentStep === 1 && !formValues.fullVideo) ||
                  (currentStep === 2 &&
                    (!formValues.content ||
                      !formValues.caption ||
                      formValues.tags.length === 0))
                    ? "bg-indigo-600/50 text-gray-300 cursor-not-allowed"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                } transition-colors`}
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                disabled={isLoading || Object.keys(errors).length > 0}
                className={`px-4 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl flex items-center gap-1 sm:gap-2 text-xs sm:text-sm ${
                  isLoading || Object.keys(errors).length > 0
                    ? "bg-indigo-600/50 text-gray-300 cursor-not-allowed"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                } transition-colors`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                    Publishing...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 sm:w-5 sm:h-5" />
                    Publish Video
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default VideoForm;
