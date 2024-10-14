"use client";
import { useAppSelector, ViewPdf } from "@/presentation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ViewNewPdf() {
  const router = useRouter();
  const newData = useAppSelector((state) => state.news.new);
  useEffect(() => {
    if (!newData) {
      router.back();
    }
  }, [newData]);
  return (
    <div className="w-full h-full grid bg-slate-50">
      {newData?.file && <ViewPdf file={newData.file}></ViewPdf>}
    </div>
  );
}
