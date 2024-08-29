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
import CreateNewUseCase from "@/domain/usecases/request/create-new.use.case";
import { AuthDataInterface } from "@/lib/interfaces";
type FormValues = {
  title?: string;
  content?: string;
  image?: string;
};
export const CreateNewsForm: FC<{}> = ({}) => {
  const createNewUseCase = appContainer.get<CreateNewUseCase>(
    USECASES_TYPES._CreateNewUseCase
  );
  const initialFormValues: FormValues = {
    title: "",
    content: "",
    image: "",
  };
  const [authenticated, setAuthenticated] = useState<AuthDataInterface>();
  const formikForm = useFormik({
    initialValues: initialFormValues,
    onSubmit: async (values) => {
      console.log(values);
      const content = {
        content: values.content,
      };

      const resultCreateNewUseCase = await createNewUseCase.execute(
        values.title!,
        authenticated?.access_token,
        content,
        values.image
      );
      console.log(resultCreateNewUseCase);
    },
  });
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      setAuthenticated(JSON.parse(auth) as AuthDataInterface);
    }
  }, [localStorage]);
  return (
    <div className="w-full h-full justify-center p-4 ">
      {authenticated && (
        <form
          className="w-full h-full grid grid-flow-row justify-center p-4 bg-white shadow rounded-2xl"
          onSubmit={formikForm.handleSubmit}
        >
          <Subtitle text="Crear Noticia" />
          <CustomInput
            value={formikForm.values.title}
            onChange={(titleChange: ChangeEvent<HTMLInputElement>) => {
              formikForm.setFieldValue("title", titleChange.target.value);
            }}
            label="Titulo Noticia"
          />
          <CustomTextArea
            value={formikForm.values.content}
            onChange={(areaChange: ChangeEvent<HTMLTextAreaElement>) => {
              formikForm.setFieldValue("content", areaChange.target.value);
            }}
            label="Contenido noticia"
          />
          <CustomImageInput
            returnFile={(image) => {
              console.log(image);

              formikForm.setFieldValue("image", image);
            }}
          />
          <PrimaryButton label="Crear" onChange={formikForm.submitForm} />
        </form>
      )}
    </div>
  );
};
