"use client";
import { CreateNewsForm } from "@/presentation/components/organisms";
import { useAppSelector } from "@/presentation/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function NewDetails() {
  const newState = useAppSelector((state) => state.news);
  const router = useRouter();
  useEffect(() => {
    // Validate New in Store
    if (!newState.new) {
      router.push("/news/find-new");
    }
  }, []);
  return (
    <div className="w-full h-full grid bg-slate-50">
      <div className="w-3/5 h-full flex justify-self-center self-center">
        <CreateNewsForm newToEdit={newState.new} />
      </div>
    </div>
  );
}
