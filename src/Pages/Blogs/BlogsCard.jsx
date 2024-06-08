import { Button, Card } from "flowbite-react";
import HTMLReactParser from "html-react-parser";

const BlogsCard = ({ blog }) => {
  const { title, thumbnail, content } = blog;

  return (
    <Card
      data-aos="fade-up"
      data-aos-duration="1500"
      className="max-w-full my-10"
      imgAlt="Meaningful alt text for an image that is not purely decorative"
      imgSrc={thumbnail}
    >
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {title}
      </h5>
      {content && (
        <div className="font-normal text-gray-700 dark:text-gray-400">
          {HTMLReactParser(content)}
        </div>
      )}
    </Card>
  );
};

export default BlogsCard;
