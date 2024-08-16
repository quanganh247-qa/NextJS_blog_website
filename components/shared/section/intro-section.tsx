import { Button } from "@/components/ui/button";
import React from "react";
import introSectionImg from "@/public/img/blog1.jpg";
import Image from "next/image";
import Link from "next/link";

const Introsection = () => {
  return (
    <section
      id="intro"
      className="max-w-screen-xl mx-auto py-16 px-6 md:px-8 bg-gray-50 mt-16 rounded-lg"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left">
          <h1 className="text-5xl font-bold text-gray-900">
            Manage Your Blog Effortlessly
          </h1>
          <p className="text-lg text-gray-600 mt-4">
            Discover the ultimate platform for effortless blog management.
            Enhance your content creation and streamline your publishing process
            with our intuitive tools. Join us and elevate your blogging
            experience today.
          </p>
          <div className="mt-8">
            <Link href="/blog/upload">
              <Button
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 text-lg transition duration-300"
                size={"lg"}
              >
                New Post
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="w-full max-w-lg rounded-lg overflow-hidden shadow-lg">
            <Image
              src="https://django-bucket-12321.s3.us-east-1.amazonaws.com/intro.jpg"
              alt="intro"
              layout="responsive"
              width={800}
              height={600}
              className="w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Introsection;
