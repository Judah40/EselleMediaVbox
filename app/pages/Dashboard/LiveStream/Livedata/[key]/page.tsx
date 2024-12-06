"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { Spinner } from "@nextui-org/react";
import { FormValues } from "./key.types";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { validationSchema } from "../validation";
import { handleGoLive } from "@/app/api/LiveApi/api";
import Select from "react-select";
import { data } from "@/app/api/DummyData/data";
// import CopyToClipboard from "react-copy-to-clipboard";

const Page = () => {
  const router = useRouter();
  const initialValues: FormValues = {
    title: "",
    description: "",
    location: "",
    tags: [""],
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => alert("Text copied to clipboard!"))

      .catch((err: Error) => alert("Failed to copy text: " + err.message)); //+
  };

  const tagOptions = data.map((tag) => ({ value: tag.name, label: tag.name }));
  const { key } = useParams();
  const textToCopy = Array.isArray(key) ? key.join(",") : key; // Convert to string if it's an array
  const handleSubmit = (values: FormValues) => {
    setIsLoading(true);
    console.log("Form submitted with values:", values);
    const data = {
      title: values.title,
      description: values.description,
      location: values.location,
      tags: values.tags,
      streamKey: textToCopy,
    };
    handleGoLive(data)
      .then(() => {
        setIsLoading(false);
        router.push("/pages/Dashboard/liveStream");
      })
      .catch(() => {
        setIsLoading(false);
      });
  };
  const streamUrl = process.env.NEXT_PUBLIC_API_URL_VIDEO_STREAM_URL;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoIsPlaying, setVideoIsPlaying] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    // getToken();

    if (videoRef.current) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        const video = videoRef.current;
        const hlsUrl = `${streamUrl}/${key}/index.m3u8`;

        hls.loadSource(hlsUrl);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play();
          setVideoIsPlaying(true);
        });

        return () => {
          hls.destroy();
        };
      } else if (
        videoRef.current.canPlayType("application/vnd.apple.mpegurl")
      ) {
        videoRef.current.src = `${streamUrl}/${key}/index.m3u8`;
        videoRef.current.addEventListener("loadedmetadata", () => {
          if (videoRef.current) {
            videoRef.current.play();
            setVideoIsPlaying(true);
          }
        });
      }
    }
  }, [key, streamUrl]);
  useEffect(() => {
    console.log(key);
  }, [key]);
  return (
    <div>
      {" "}
      <div className="col-span-1 lg:col-span-2 p-4 h-[400px] md:h-[500px] relative">
        <video ref={videoRef} controls autoPlay className="w-full h-full" />
        {/* Overlay text */}
        {!videoIsPlaying && (
          <div className="absolute top-0 bg-gray-500 bg-opacity-20 left-0 w-full h-full flex flex-col items-center justify-center text-white text-2xl font-bold">
            <Spinner color="white" />
            <p>Please Wait...</p>
          </div>
        )}
      </div>
      <div className="w-full  flex">
        <div className="max-w-lg  flex-1 p-4">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({  setFieldValue }) => (
              <Form className="space-y-4 ">
                {/* Title */}
                <div>
                  <label htmlFor="title">Title</label>
                  <Field
                    name="title"
                    type="text"
                    className="border p-2 w-full text-black"
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description">Description</label>
                  <Field
                    name="description"
                    as="textarea"
                    className="border p-2 w-full h-40 text-black"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                {/* Location */}
                <div>
                  <label htmlFor="location">Location</label>
                  <Field
                    name="location"
                    type="text"
                    className="border p-2 w-full text-black"
                  />
                  <ErrorMessage
                    name="location"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                {/* Tags */}
                <div>
                  <label htmlFor="tags">Tags</label>
                  <Select
                    isMulti
                    name="tags"
                    options={tagOptions}
                    className="basic-multi-select text-black"
                    classNamePrefix="select"
                    onChange={(selectedOptions) =>
                      setFieldValue(
                        "tags",
                        selectedOptions
                          ? selectedOptions.map((option) => option.value)
                          : []
                      )
                    }
                  />
                  <ErrorMessage
                    name="tags"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  {isLoading ? <Spinner /> : <p>Submit</p>}
                </button>
              </Form>
            )}
          </Formik>
        </div>

        <div className="p-4">
          <h2>Stream Key</h2>
          <div className="flex items-center gap-2 w-full bg-gray-400 ps-2 ">
            <p>{key}</p>
            <button onClick={handleCopy} className="bg-gray-500 p-2">
              copy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
