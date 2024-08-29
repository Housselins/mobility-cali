import { CreateNewsForm, NewsList } from "@/presentation/components/organisms";

export default function About() {
  return (
    <div className="w-full h-full grid bg-slate-50">
      <div className="w-full h-full flex justify-self-center self-center">
        <NewsList />
      </div>
    </div>
  );
}
