import { appleFontEB, appleFontB } from "../../components/fontZip";
export default function MemoryTitle() {
  return (
    <div className="flex w-full flex-col justfy-center items-center">
      <div className="w-{85} h-auto p-5 text-center items-center justify-center">
        <div
          className={`toc-class translate-y-6 opacity-0 ${appleFontEB.className} 
    text-black text-4xl`}
        >
          추억
        </div>
        <div
          id="toc-header"
          className={`toc-class translate-y-6 opacity-0 ${appleFontB.className} text-gray-500 mt-5`}
        >
          <div>Can I walk with you or have a tea with you?</div>
          <div>Your scent makes me feel like I live in Paris</div>
          <div>Can I love you? Giving my all to you?🎵</div>
        </div>
      </div>
    </div>
  );
}
