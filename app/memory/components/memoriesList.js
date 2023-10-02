import Book from "./book";
import { allDocuments } from "contentlayer/generated";
export default function MemoryBooks() {
  return (
    <div className="px-5 grid gap-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-1">
      {allDocuments.map((data) => {
        if (data._raw.sourceFileDir === "memory") {
          return (
            <Book
              key={data.title}
              title={data.title}
              url={data.href}
              date={data.date}
            />
          );
        }
        return;
      })}
    </div>
  );
}
