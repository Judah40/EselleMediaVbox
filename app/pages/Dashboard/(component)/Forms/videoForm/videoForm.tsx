import React, {  useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormValues } from "./form.types";
import { validationSchema } from "./validation";
import { data } from "@/app/api/DummyData/data";
import Select from "react-select";
import { handleCreatePost } from "@/app/api/PostApi/api";
import { Progress, Spinner } from "@nextui-org/react";

interface videoProps {
  isComplete: (status: boolean) => void;
}
const VideoForm: React.FC<videoProps> = ({ isComplete }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isVideoUploading, setIsVideoUploading] = useState<boolean>(false);
  const [uploadingPercentage, setUploadingPercentage] = useState<number>(0);

  const initialValues: FormValues = {
    content: "",
    caption: "",
    tags: [""],
    location: "",
    thumbnail: null,
    banner: null,
    fullVideo: null,
  };

  const tagOptions = data.map((tag) => ({ value: tag.name, label: tag.name }));

  if (isVideoUploading) {
    return (
      <>
        <p>Please Wait uploading.....</p>
        <Progress
          aria-label="Loading..."
          value={uploadingPercentage}
          className="w-6/12"
        />
        ;
      </>
    );
  }
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        setIsVideoUploading(true);
        setIsLoading(true);
        console.log(values);
        const data = {
          content: values.content,
          caption: values.caption,
          tags: values.tags,
          location: values.location,
          thumbnail: values.thumbnail,
          banner: values.banner,
          fullVideo: values.fullVideo,
        };
        // console.log(values.tags);
        handleCreatePost(data, (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadingPercentage(percentCompleted);
          }
        })
          .then(() => {
            setIsLoading(false);
            alert("post successfully sent");
            setIsVideoUploading(false);
            isComplete(true);
          })
          .catch((error) => {
            setIsLoading(false);
            alert("Error sending post");
            console.log(error);
            setIsVideoUploading(false);
          });
      }}
    >
      {({ setFieldValue }) => (
        <Form className="items-center flex flex-col gap-4 flex-1 w-11/12">
          <div className="w-11/12 flex flex-col lg:flex-row gap-4">
            {/* CONTENT */}
            <div className="flex flex-col w-full">
              <label>Content</label>
              <Field
                name="content"
                type="text"
                className="p-2 rounded text-black"
              />
              <ErrorMessage
                name="content"
                component="div"
                className="text-red-500"
              />
            </div>

            {/* CAPTION */}

            <div className="flex flex-col w-full">
              <label>Caption</label>
              <Field
                name="caption"
                type="text"
                className="p-2 rounded text-black"
              />
              <ErrorMessage
                name="caption"
                component="div"
                className="text-red-500"
              />
            </div>
          </div>

          <div className="flex flex-col w-11/12">
            <label>Tags</label>
            <Select
              isMulti
              name="tags"
              options={tagOptions}
              className="text-black"
              onChange={(selectedOptions) => {
                const newTags = selectedOptions
                  ? selectedOptions.map((option) => option.value)
                  : [];
                setFieldValue("tags", newTags);
              }}
            />

            <ErrorMessage
              name="tags"
              component="div"
              className="text-red-500"
            />
          </div>

          <div className="w-11/12 flex flex-col lg:flex-row gap-4">
            {/* LOCATION */}
            <div className="flex flex-col w-full lg:w-6/12">
              <label>Location</label>
              <Field
                name="location"
                type="text"
                className="p-2 rounded text-black"
              />
              <ErrorMessage
                name="location"
                component="div"
                className="text-red-500"
              />
            </div>
            {/* THUMBNAIL */}
            <div className="flex flex-col w-full lg:w-6/12">
              <label>Thumbnail</label>
              <input
                name="thumbnail"
                type="file"
                onChange={(event) => {
                  setFieldValue(
                    "thumbnail",
                    event.currentTarget.files
                      ? event.currentTarget.files[0]
                      : null
                  );
                }}
                className="p-2 rounded border"
              />
              <ErrorMessage
                name="thumbnail"
                component="div"
                className="text-red-500"
              />
            </div>
          </div>

          <div className="flex flex-col w-11/12">
            <label>Banner</label>
            <input
              name="banner"
              type="file"
              onChange={(event) => {
                setFieldValue(
                  "banner",
                  event.currentTarget.files
                    ? event.currentTarget.files[0]
                    : null
                );
              }}
              className="p-2 rounded border"
            />
            <ErrorMessage
              name="banner"
              component="div"
              className="text-red-500"
            />
          </div>

          <div className="flex flex-col w-11/12">
            <label>Full Video</label>
            <input
              name="fullVideo"
              type="file"
              onChange={(event) => {
                setFieldValue(
                  "fullVideo",
                  event.currentTarget.files
                    ? event.currentTarget.files[0]
                    : null
                );
              }}
              className="p-2 rounded border "
            />
            <ErrorMessage
              name="fullVideo"
              component="div"
              className="text-red-500"
            />
          </div>

          <button type="submit" className="bg-cyan-500 w-11/12 p-2 rounded">
            {isLoading ? <Spinner color="white" /> : <span>Submit</span>}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default VideoForm;
