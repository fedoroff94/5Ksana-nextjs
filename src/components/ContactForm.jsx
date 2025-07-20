"use client";

import React, { useEffect, useState } from "react";
import Input from "./Input";
import TextArea from "./TextArea";
import Checkbox from "./Checkbox";
import { createMarkup, getSettings } from "../utils";
import axios from "axios";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

const ContactForm = ({ decor }) => {
  const [settings, setSettings] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    getSettings("elements", setSettings);
  }, []);

  if (!settings) return null;

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_DB_LINK}/api/contact`,
        data,
      );
      if (response.status === 200) {
        alert("Message sent successfully!");
        reset();
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <section
      className={`w-full h-auto min-h-[464px] ${
        decor ? "my-14 md:my-0" : "my-5 md:my-0"
      } relative flex justify-center items-center px-4 xl:px-24`}
    >
      <div className="w-full z-[1] h-auto rounded-2xl p-4 sm:p-8 bg-[#FFFFFF1A] border border-[#212121] backdrop-blur-xl xl:flex-row flex-col flex justify-between">
        <div className="flex flex-col gap-6 sm:gap-10 w-full xl:mb-0 mb-8">
          <div className="flex flex-col gap-4 w-full xl:w-fit">
            <h4
              dangerouslySetInnerHTML={createMarkup(
                settings?.sections?.[0]?.title,
              )}
              className="font-main uppercase text-4xl 2xl:text-5xl font-semibold tracking-wider"
            />
            <p
              dangerouslySetInnerHTML={createMarkup(
                settings?.sections?.[0]?.description,
              )}
              className="font-main font-light opacity-50 xl:max-w-[450px] text-lg sm:text-xl"
            />
          </div>
          <a
            href="mailto:info@buybitart.com"
            className="flex gap-1 items-center"
          >
            <img src="/email.svg" alt="email" className="w-6 h-6" />
            <span className="font-main font-light underline">
              info@buybitart.com
            </span>
          </a>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 w-full 2xl:max-w-[750px] xl:max-w-[588px]"
        >
          <div className="flex flex-col gap-6 w-full">
            <div className="flex flex-col xl:flex-row gap-6 w-full">
              <div className="flex flex-col gap-6 w-full">
                <div className="flex flex-col gap-1.5 w-full">
                  <Input
                    type="text"
                    placeholder="Name"
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-1.5 w-full">
                  <Input
                    type="email"
                    placeholder="Email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-1.5 w-full">
                <TextArea
                  placeholder="Message"
                  {...register("message", { required: "Message is required" })}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm">
                    {errors.message.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-1.5 w-full">
              <label className="flex gap-2 items-center">
                <Checkbox
                  {...register("privacy", {
                    required: "You must agree to privacy policy",
                  })}
                />
                <span className="font-main font-light text-sm sm:text-base">
                  I have read and agree with the privacy policy
                </span>
              </label>
              {errors.privacy && (
                <p className="text-red-500 text-sm">{errors.privacy.message}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="ml-auto w-full sm:w-28 h-10 rounded-xl flex items-center justify-center gap-3 bg-[#FCCB00] text-[#522700] font-main font-semibold hover:bg-white hover:text-black transition-colors"
          >
            {isSubmitting ? (
              <span>Sending...</span>
            ) : (
              <>
                <span>Send</span>
                <motion.img
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "32px" }}
                  transition={{ duration: 0.3 }}
                  src="/send.svg"
                  alt="send"
                  className="w-8 h-8"
                />
              </>
            )}
          </button>
        </form>
      </div>

      {decor && (
        <>
          <img
            src="/btc1.png"
            alt="btc1"
            className="absolute top-10 right-10 w-20 xl:w-28"
          />
          <img
            src="/btc2.png"
            alt="btc2"
            className="absolute bottom-10 left-10 w-20 xl:w-28"
          />
          <div className="w-96 h-96 absolute bottom-[-150px] right-[-300px] bg-[#FCCB002E] rounded-full blur-[150px]" />
          <div className="w-80 h-80 absolute top-[-156px] left-[-183px] bg-[#FCCB002E] rounded-full blur-[150px]" />
        </>
      )}
    </section>
  );
};

export default ContactForm;
