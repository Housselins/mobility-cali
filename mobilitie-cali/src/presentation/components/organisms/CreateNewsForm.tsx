"use client";
import { useFormik } from "formik";
import { ChangeEvent, FC } from "react";
import {
  CustomImageInput,
  CustomInput,
  CustomTextArea,
  PrimaryButton,
  Subtitle,
} from "../atoms";
type FormValues = {
  title?: string;
  content?: string;
  image?: string;
};
export const CreateNewsForm: FC<{}> = ({}) => {
  const initialFormValues: FormValues = {
    title: "",
    content: "",
    image: "",
  };
  const formikForm = useFormik({
    initialValues: initialFormValues,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <div className="w-full h-full justify-center p-4 ">
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
    </div>
  );
};
