"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { Spinner } from "@nextui-org/react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { handleGoLive } from "@/app/api/LiveApi/api";
import {
  handleGetLiveStreamUrl,
  handleGetSingleChannel,
  handleGetStreamKey,
  handleLiveMatch,
  handleStartChannel,
  handleStopChannel,
} from "@/app/api/AdminApi/usersApi/api";
import { channel, FormValues, Match, streamData } from "./key.types";
import { validationSchema } from "./formVlidationSchema";
import MatchInterface from "../../../(component)/LiveComponents/MatchInterface";

const Page = () => {
  const router = useRouter();
  const { key } = useParams();
  const textToCopy = Array.isArray(key) ? key.join(",") : key;
  const streamUrl = process.env.NEXT_PUBLIC_API_URL_VIDEO_STREAM_URL;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoIsPlaying, setVideoIsPlaying] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [previewImages, setPreviewImages] = useState<Record<string, string>>({
    league: "",
    homeTeam: "",
    awayTeam: "",
  });
  const [streamData, setStreamData] = useState<streamData>();
  const initialValues: FormValues = {
    league: {
      name: "",
      logo: null,
    },
    homeTeam: {
      name: "",
      logo: null,
    },
    awayTeam: {
      name: "",
      logo: null,
    },
    round: "",
    dateTime: "",
    location: "",
  };

  const [url, setUrl] = useState<string | null>(null);
  const [channel, setChannel] = useState<channel | null>(null);
  const [isLive, setIsLive] = useState<boolean>(false);
  const [LiveMatch, setLiveMatch] = useState<Match>();
  const handleCopy = () => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        const toast = document.getElementById("toast");
        if (toast) {
          toast.classList.remove("hidden");
          setTimeout(() => {
            toast.classList.add("hidden");
          }, 3000);
        }
      })
      .catch((err: Error) => alert("Failed to copy text: " + err.message));
  };

  const handleSubmit = (values: FormValues) => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("league[name]", values.league.name);
    if (values.league.logo) formData.append("league[logo]", values.league.logo);

    formData.append("homeTeam[name]", values.homeTeam.name);
    if (values.homeTeam.logo)
      formData.append("homeTeam[logo]", values.homeTeam.logo);

    formData.append("awayTeam[name]", values.awayTeam.name);
    if (values.awayTeam.logo)
      formData.append("awayTeam[logo]", values.awayTeam.logo);

    formData.append("round", values.round);
    formData.append("dateTime", values.dateTime);
    formData.append("location", values.location);
    formData.append("streamKey", textToCopy);

    handleGoLive(formData)
      .then(() => {
        setIsLoading(false);
        router.push("/pages/Dashboard/liveStream");
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string,
    setFieldValue: (field: string, value: string | File | null) => void
  ) => {
    const file = event.currentTarget.files?.[0] || null;

    if (file) {
      setFieldValue(`${field}.logo`, file);

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImages((prev) => ({
          ...prev,
          [field]: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Video streaming setup
  useEffect(() => {
    if (videoRef.current && url) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        const video = videoRef.current;
        const hlsUrl = url;

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
        videoRef.current.src = url;
        videoRef.current.addEventListener("loadedmetadata", () => {
          if (videoRef.current) {
            videoRef.current.play();
            setVideoIsPlaying(true);
          }
        });
      }
    }
  }, [key, streamUrl, url]);

  //GET STREAM KEY
  useEffect(() => {
    handleGetLiveStreamUrl(key.toString())
      .then((response) => {
        setUrl(response.data.data.url);
      })
      .catch(() => {});
    handleGetStreamKey(key.toString())
      .then((response) => {
        setStreamData(response.data.data);
      })
      .catch(() => {})
      .finally(() => {});

    handleGetSingleChannel(key.toString())
      .then((response) => {
        setChannel(response.data.data);
        setIsLive(response.data.data.dataValues.isLive);
      })
      .catch(() => {});

    handleLiveMatch({
      channelName: key.toString(),
      date: new Date(),
    })
      .then((response) => {
        setLiveMatch(response.data.data);
      })
      .catch(() => {});
  }, [key, url]);
  return (
    <div className="bg-gray-900 text-gray-100">
      {/* Video Preview Area */}
      <div className="col-span-1 lg:col-span-2 p-4 h-[400px] md:h-[500px] relative rounded-lg overflow-hidden shadow-lg border border-gray-800">
        <video ref={videoRef} controls autoPlay className="w-full h-full" />
        {!videoIsPlaying && (
          <div className="absolute top-0 bg-gray-900 bg-opacity-70 left-0 w-full h-full flex flex-col items-center justify-center text-white text-2xl font-bold">
            <Spinner color="white" />
            <p>Connecting to Stream...</p>
          </div>
        )}
      </div>
      <div className="p-4">
        {channel && channel.status === "RUNNING" ? (
          <button
            onClick={() => {
              handleStopChannel(key.toString())
                .then(() => {
                })
                .catch(() => {
                });
            }}
            className="bg-red-500 p-2 rounded"
          >
            Stop Channel
          </button>
        ) : (
          <button
            onClick={() => {
              handleStartChannel(key.toString())
                .then(() => {
                })
                .catch(() => {
                });
            }}
            className="bg-green-500 p-2 rounded"
          >
            Start Channel
          </button>
        )}
      </div>
      {/* Toast notification */}
      <div
        id="toast"
        className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg hidden animate-fade-in-out z-50"
      >
        Stream key copied to clipboard!
      </div>

      {/* Match Form and Stream Key Area */}

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stream Key Card */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
          <h2 className="text-xl font-bold mb-4 text-blue-400">Stream Key</h2>
          <h1>Server Url</h1>
          <div className="flex items-center gap-2 rounded bg-gray-700 overflow-hidden">
            <p className="p-3 flex-1 font-mono text-gray-300 break-all">
              {streamData && streamData?.streamUrl}
            </p>
            <button
              onClick={handleCopy}
              className="bg-blue-600 hover:bg-blue-700 p-3 h-full transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path>
                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path>
              </svg>
            </button>
          </div>
          <h1>Key</h1>
          <div className="flex items-center gap-2 mt-4 rounded bg-gray-700 overflow-hidden">
            <p className="p-3 flex-1 font-mono text-gray-300 break-all">
              {streamData && streamData?.streamKey}
            </p>
            <button
              onClick={handleCopy}
              className="bg-blue-600 hover:bg-blue-700 p-3 h-full transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path>
                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path>
              </svg>
            </button>
          </div>
          <div className="mt-4">
            <p className="text-gray-400 text-sm">
              Use this key in your streaming software to go live.
            </p>
          </div>
        </div>
        {/* Match Setup Form */}
        {/* //IF LIVE SHOW THIS */}
        {isLive ? (
          <div className="flex-1 lg:col-span-2">
            <MatchInterface LiveMatch={LiveMatch} />
          </div>
        ) : (
          // IF NOT LIVE SHOW THIS
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6 text-blue-400">
              Match Setup
            </h2>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ setFieldValue }) => (
                <Form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* League Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-300 border-b border-gray-700 pb-2">
                        League Information
                      </h3>

                      <div>
                        <label
                          htmlFor="league.name"
                          className="block text-sm font-medium text-gray-300 mb-1"
                        >
                          League Name
                        </label>
                        <Field
                          name="league.name"
                          type="text"
                          className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                          placeholder="Premier League"
                        />
                        <ErrorMessage
                          name="league.name"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          League Logo
                        </label>
                        <div className="flex items-center space-x-4">
                          <div className="relative w-16 h-16 bg-gray-700 rounded-md overflow-hidden border border-gray-600">
                            {previewImages.league ? (
                              <img
                                src={previewImages.league}
                                alt="League Logo Preview"
                                className="w-full h-full object-contain"
                              />
                            ) : (
                              <div className="flex items-center justify-center h-full text-gray-400">
                                <svg
                                  className="w-8 h-8"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                  ></path>
                                </svg>
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <input
                              id="league-logo"
                              name="league.logo"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(event) =>
                                handleFileChange(event, "league", setFieldValue)
                              }
                            />
                            <label
                              htmlFor="league-logo"
                              className="inline-flex items-center px-4 py-2 bg-gray-700 border border-gray-600 rounded-md font-medium text-gray-200 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer text-sm"
                            >
                              <svg
                                className="w-5 h-5 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12"
                                ></path>
                              </svg>
                              Upload Logo
                            </label>
                          </div>
                        </div>
                        <ErrorMessage
                          name="league.logo"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                    </div>

                    {/* Match Details */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-300 border-b border-gray-700 pb-2">
                        Match Details
                      </h3>

                      <div>
                        <label
                          htmlFor="round"
                          className="block text-sm font-medium text-gray-300 mb-1"
                        >
                          Round/Stage
                        </label>
                        <Field
                          name="round"
                          type="text"
                          className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                          placeholder="Quarter Final"
                        />
                        <ErrorMessage
                          name="round"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="dateTime"
                          className="block text-sm font-medium text-gray-300 mb-1"
                        >
                          Date & Time
                        </label>
                        <Field
                          name="dateTime"
                          type="datetime-local"
                          className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                        />
                        <ErrorMessage
                          name="dateTime"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="location"
                          className="block text-sm font-medium text-gray-300 mb-1"
                        >
                          Location
                        </label>
                        <Field
                          name="location"
                          type="text"
                          className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                          placeholder="Wembley Stadium, London"
                        />
                        <ErrorMessage
                          name="location"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Teams Section */}
                  <div className="pt-6 border-t border-gray-700">
                    <h3 className="text-lg font-medium text-gray-300 mb-4">
                      Team Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Home Team */}
                      <div className="space-y-4 p-4 bg-gray-700 rounded-lg border border-gray-600">
                        <h4 className="font-medium text-blue-400">Home Team</h4>

                        <div>
                          <label
                            htmlFor="homeTeam.name"
                            className="block text-sm font-medium text-gray-300 mb-1"
                          >
                            Team Name
                          </label>
                          <Field
                            name="homeTeam.name"
                            type="text"
                            className="w-full bg-gray-600 border border-gray-500 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                            placeholder="Manchester United"
                          />
                          <ErrorMessage
                            name="homeTeam.name"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Team Logo
                          </label>
                          <div className="flex items-center space-x-4">
                            <div className="relative w-16 h-16 bg-gray-600 rounded-md overflow-hidden border border-gray-500">
                              {previewImages.homeTeam ? (
                                <img
                                  src={previewImages.homeTeam}
                                  alt="Home Team Logo Preview"
                                  className="w-full h-full object-contain"
                                />
                              ) : (
                                <div className="flex items-center justify-center h-full text-gray-400">
                                  <svg
                                    className="w-8 h-8"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    ></path>
                                  </svg>
                                </div>
                              )}
                            </div>
                            <div className="flex-1">
                              <input
                                id="home-team-logo"
                                name="homeTeam.logo"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(event) =>
                                  handleFileChange(
                                    event,
                                    "homeTeam",
                                    setFieldValue
                                  )
                                }
                              />
                              <label
                                htmlFor="home-team-logo"
                                className="inline-flex items-center px-4 py-2 bg-gray-600 border border-gray-500 rounded-md font-medium text-gray-200 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer text-sm"
                              >
                                <svg
                                  className="w-5 h-5 mr-2"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12"
                                  ></path>
                                </svg>
                                Upload Logo
                              </label>
                            </div>
                          </div>
                          <ErrorMessage
                            name="homeTeam.logo"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>
                      </div>

                      {/* Away Team */}
                      <div className="space-y-4 p-4 bg-gray-700 rounded-lg border border-gray-600">
                        <h4 className="font-medium text-blue-400">Away Team</h4>

                        <div>
                          <label
                            htmlFor="awayTeam.name"
                            className="block text-sm font-medium text-gray-300 mb-1"
                          >
                            Team Name
                          </label>
                          <Field
                            name="awayTeam.name"
                            type="text"
                            className="w-full bg-gray-600 border border-gray-500 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                            placeholder="Liverpool"
                          />
                          <ErrorMessage
                            name="awayTeam.name"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Team Logo
                          </label>
                          <div className="flex items-center space-x-4">
                            <div className="relative w-16 h-16 bg-gray-600 rounded-md overflow-hidden border border-gray-500">
                              {previewImages.awayTeam ? (
                                <img
                                  src={previewImages.awayTeam}
                                  alt="Away Team Logo Preview"
                                  className="w-full h-full object-contain"
                                />
                              ) : (
                                <div className="flex items-center justify-center h-full text-gray-400">
                                  <svg
                                    className="w-8 h-8"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    ></path>
                                  </svg>
                                </div>
                              )}
                            </div>
                            <div className="flex-1">
                              <input
                                id="away-team-logo"
                                name="awayTeam.logo"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(event) =>
                                  handleFileChange(
                                    event,
                                    "awayTeam",
                                    setFieldValue
                                  )
                                }
                              />
                              <label
                                htmlFor="away-team-logo"
                                className="inline-flex items-center px-4 py-2 bg-gray-600 border border-gray-500 rounded-md font-medium text-gray-200 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer text-sm"
                              >
                                <svg
                                  className="w-5 h-5 mr-2"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12"
                                  ></path>
                                </svg>
                                Upload Logo
                              </label>
                            </div>
                          </div>
                          <ErrorMessage
                            name="awayTeam.logo"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6 border-t border-gray-700 text-right">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="inline-flex items-center px-6 py-3 bg-blue-600 border border-transparent rounded-md font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <Spinner size="sm" color="white" className="mr-2" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <svg
                            className="w-5 h-5 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                            ></path>
                          </svg>
                          Go Live
                        </>
                      )}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        )}
      </div>

      {/* Styles for toast animation */}
      <style jsx>{`
        @keyframes fadeInOut {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          10% {
            opacity: 1;
            transform: translateY(0);
          }
          90% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-20px);
          }
        }
        .animate-fade-in-out {
          animation: fadeInOut 3s ease-in-out;
        }
        .hidden {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Page;
