import { Button } from "@/components/ui/button";

const Description = () => {
  return (
    <section
      id="description"
      className="max-w-screen-xl mx-auto py-16 px-6 md:px-8 mt-16 rounded-lg"
    >
      <div className="text-center">
        <h2 className="text-4xl font-semibold text-gray-900">Why Choose Us?</h2>
        <p className="text-lg text-gray-600 mt-4">
          Our platform offers an intuitive and user-friendly experience,
          designed to streamline your project management tasks. With advanced
          features and seamless integration, you'll be able to manage your
          projects more efficiently than ever before.
        </p>
        <div className="mt-8">
          <Button
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 text-lg transition duration-300"
            size={"lg"}
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Description;
