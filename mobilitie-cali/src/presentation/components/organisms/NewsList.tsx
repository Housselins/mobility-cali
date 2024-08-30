"use client";
import { useFormik } from "formik";
import { ChangeEvent, FC, useEffect, useState } from "react";
import {
  CustomImageInput,
  CustomInput,
  CustomTextArea,
  PrimaryButton,
  Subtitle,
} from "../atoms";
import { appContainer, USECASES_TYPES } from "@/infrastructure/ioc";
import FindNewUseCase from "@/domain/usecases/news/find-new.use.case";
import { AuthDataInterface } from "@/lib/interfaces";
import { NewInterface } from "@/domain/models";
import Image from "next/image";
type FormValues = {
  title?: string;
  content?: string;
  image?: string;
};
export const NewsList: FC<{}> = ({}) => {
  const createNewUseCase = appContainer.get<FindNewUseCase>(
    USECASES_TYPES._FindNewUseCase
  );
  const initialFormValues: FormValues = {
    title: "",
    content: "",
    image: "",
  };
  const [authenticated, setAuthenticated] = useState<AuthDataInterface>();
  const [newsList, setNewsList] = useState<NewInterface[]>([]);

  const getData = async () => {
    const resultCreateNewUseCase = await createNewUseCase.execute(
      authenticated?.access_token
    );

    if (!resultCreateNewUseCase) {
      return;
    }
    setNewsList(resultCreateNewUseCase);
    if (Array.isArray(resultCreateNewUseCase)) {
      setNewsList(resultCreateNewUseCase);
    }
  };
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      setAuthenticated(JSON.parse(auth) as AuthDataInterface);
    }
  }, [localStorage]);
  useEffect(() => {
    getData();
  }, [authenticated]);
  return (
    <div className="w-full h-full justify-center grid grid-cols-3 gap-4 p-4 bg-white ">
      {newsList && (
        <>
          {newsList.map((newItem, key) => {
            return (
              <div className="w-full h-full relative flex flex-col justify-start items-center gap-5 p-4  bg-gray-200 rounded-lg">
                <Subtitle className="self-start" text={newItem.title} />
                {newItem.image && (
                  <Image
                    alt={newItem.title}
                    width={200}
                    height={200}
                    src={newItem.image}
                    className="rounded-md"
                  />
                )}
                <article className="w-full h-full self-start overflow-x-auto">
                  <div className=" whitespace-normal left">
                    {newItem.content?.content}
                  </div>
                </article>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};
