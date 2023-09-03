import Book from "./book";
export default function LogBooks() {
  return (
    <div className="px-5 grid gap-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-1">
      <Book title="테스트입니당" />
      <Book title="테스트입니당" />
      <Book title="테스트입니당" />
      <Book title="테스트입니당" />
      <Book title="테스트입니당" />
      <Book title="테스트입니당" />
      <Book title="테스트입니당" />
    </div>
  );
}
