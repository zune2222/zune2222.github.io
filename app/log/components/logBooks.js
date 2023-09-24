import Book from "./book";
import { allPosts } from "contentlayer/generated";
export default function LogBooks() {
  return (
    <div className="px-5 grid gap-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-1">
      {allPosts.map((data) => {
        return (
          <Book
            key={data.title}
            title={data.title}
            url={data.url}
            date={data.date}
          />
        );
      })}
    </div>
  );
}
