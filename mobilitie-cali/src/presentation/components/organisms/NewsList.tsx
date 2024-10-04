"use client";
import { NewInterface } from "@/domain/models";
import FindNewUseCase from "@/domain/usecases/news/find-new.use.case";
import { appContainer, USECASES_TYPES } from "@/infrastructure/ioc";
import { ADMIN_ROL_ID } from "@/lib/config";
import { AuthDataInterface } from "@/lib/interfaces";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { Subtitle } from "../atoms";
import { useAppDispatch } from "@/presentation/store";
import { setNewState } from "@/presentation/store/news/NewsSlice";
import { useRouter } from "next/navigation";
type FormValues = {
  title?: string;
  content?: string;
  image?: string;
};
export const NewsList: FC<{}> = ({}) => {
  const createNewUseCase = appContainer.get<FindNewUseCase>(
    USECASES_TYPES._FindNewUseCase
  );
  const dispatch = useAppDispatch();
  const router = useRouter();
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
              <div
                key={key}
                onClick={() => {
                  dispatch(setNewState(newItem));
                  router.push('find-new/new-details')
                }}
                className={`w-full h-full relative flex flex-col justify-start items-center gap-5 p-4  bg-gray-200 rounded-lg
                  ${
                    authenticated?.user?.rol?.id == ADMIN_ROL_ID &&
                    "hover:shadow-xl transition-shadow duration-300"
                  }`}
              >
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
