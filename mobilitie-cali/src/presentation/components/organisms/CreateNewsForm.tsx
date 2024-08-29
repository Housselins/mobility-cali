"use client";
import CreateNewUseCase from "@/domain/usecases/news/create-new.use.case";
import { appContainer, USECASES_TYPES } from "@/infrastructure/ioc";
import { AuthDataInterface } from "@/lib/interfaces";
import { isEmptyArray, useFormik } from "formik";
import { ChangeEvent, FC, useEffect, useState } from "react";
import * as Yup from "yup";
import {
  CustomImageInput,
  CustomInput,
  CustomTextArea,
  PrimaryButton,
  Subtitle,
} from "../atoms";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
type FormValues = {
  title?: string;
  content?: string;
  image?: string;
};
export const CreateNewsForm: FC<{}> = ({}) => {
  const router = useRouter();

  const createNewUseCase = appContainer.get<CreateNewUseCase>(
    USECASES_TYPES._CreateNewUseCase
  );
  const initialFormValues: FormValues = {
    title: "",
    content: "",
    image: "",
  };
  const [authenticated, setAuthenticated] = useState<AuthDataInterface>();

  const schema = Yup.object().shape({
    title: Yup.string().required("Campo titulo obligatorio *"),
    content: Yup.string().required("Campo contenido obligatorio *"),
  });
  const formikForm = useFormik({
    initialValues: initialFormValues,
    validationSchema: schema,
    onSubmit: async (values) => {
      console.log(values);
      const content = {
        content: values.content,
      };
      // Triggers validations
      const validateFomr = await formikForm.validateForm();
      // Catch errors array
      const errorsInForm = Object.values(validateFomr);

      if (!isEmptyArray(errorsInForm)) {
        toast(
          (t) => (
            <div style={{ color: "#fff" }}>
              <strong>Error!</strong>
              <p>
                No se pudo crear la noticia por validaciones del formulario.
              </p>
            </div>
          ),
          {
            style: {
              backgroundColor: "red",
              color: "#fff",
            },
            icon: "❌",
            duration: 3000,
          }
        );
        return;
      }
      const resultCreateNewUseCase = await createNewUseCase.execute(
        values.title!,
        authenticated?.access_token,
        content,
        values.image
      );

      if (resultCreateNewUseCase) {
        toast(
          (t) => (
            <div style={{ color: "#fff" }}>
              <strong>Exito!</strong>
              <p>Se pudo crear la noticia.</p>
            </div>
          ),
          {
            style: {
              backgroundColor: "green",
              color: "#fff",
            },
            duration: 3000,
          }
        );
        router.push("/news/find-new");
      } else {
        toast(
          (t) => (
            <div style={{ color: "#fff" }}>
              <strong>Error!</strong>
              <p>No se pudo crear la noticia.</p>
            </div>
          ),
          {
            style: {
              backgroundColor: "red",
              color: "#fff",
            },
            icon: "❌",
            duration: 3000,
          }
        );
      }
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
          {formikForm.errors.title && (
            <p className="text-red-500 text-xs italic">
              {formikForm.errors.title}
            </p>
          )}
          <CustomTextArea
            value={formikForm.values.content}
            onChange={(areaChange: ChangeEvent<HTMLTextAreaElement>) => {
              formikForm.setFieldValue("content", areaChange.target.value);
            }}
            label="Contenido noticia"
          />
          {formikForm.errors.content && (
            <p className="text-red-500 text-xs italic">
              {formikForm.errors.content}
            </p>
          )}
          <CustomImageInput
            returnFile={(image) => {
              console.log(image);

              formikForm.setFieldValue("image", image);
            }}
          />

          <PrimaryButton
            type={"submit"}
            label="Crear"
            onChange={formikForm.submitForm}
          />
        </form>
      )}
    </div>
  );
};
