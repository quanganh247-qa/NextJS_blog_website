import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import React from "react";

const BlogValue = [
  {
    title: "Blog Title",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    img: "/img/blog1.jpg",
    createBy: "Admin",
  },
  {
    title: "Blog Title",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    img: "/img/blog2.jpg",
    createBy: "Admin",
  },
  {
    title: "Blog Title",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    img: "/img/blog3.jpg",
    createBy: "Admin",
  },
];

const Blogsection = () => {
  return (
    // <section id="blog" className="max-x-screen-2xl container">
    //   <div className="grid grid-cols-12 space-y-5 flex">
    //     {BlogValue.map((blog, index) => (
    //       <Card
    //         key={index}
    //         className="ml-12 col-span-12 md:col-span-4 space-y-5 shadow-lg rounded-lg overflow-hidden h-full"
    //       >
    //         <CardHeader className="flex-1">
    //           <CardTitle className="text-xl font-bold text-gray-800">
    //             {blog.title}
    //           </CardTitle>
    //           <CardDescription className="text-gray-600 mt-2">
    //             {blog.description}
    //           </CardDescription>
    //         </CardHeader>
    //         <CardContent className="flex-1">
    //           <div className="md:w-[90%] w-[80%] mx-auto  rounded-lg overflow-hidden ">
    //             <Image
    //               src={blog.img}
    //               alt="blog"
    //               className="h-full w-full object-cover rounded-lg"
    //               width={400}
    //               height={200}
    //             />
    //           </div>
    //         </CardContent>
    //         <CardFooter className="flex-1">
    //           <p className="text-gray-600 mt-2">Created By: {blog.createBy}</p>
    //         </CardFooter>
    //       </Card>
    //     ))}
    //   </div>
    // </section>
    <></>
  );
};

export default Blogsection;
