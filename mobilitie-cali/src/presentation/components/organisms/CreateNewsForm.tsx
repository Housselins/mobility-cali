"use client";
import { NewInterface } from "@/domain/models";
import CreateNewUseCase from "@/domain/usecases/news/create-new.use.case";
import { appContainer, USECASES_TYPES } from "@/infrastructure/ioc";
import { AuthDataInterface } from "@/lib/interfaces";
import { isEmptyArray, useFormik } from "formik";
import { useRouter } from "next/navigation";
import { ChangeEvent, FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
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
type FormProps = {
  newToEdit?: NewInterface;
};
export const CreateNewsForm: FC<FormProps> = ({ newToEdit }) => {
  const isModify = newToEdit ? true : false;
  const router = useRouter();
  const dispatch = useDispatch();

  const createNewUseCase = appContainer.get<CreateNewUseCase>(
    USECASES_TYPES._CreateNewUseCase
  );
  const initialFormValues: FormValues = {
    title: isModify ? newToEdit?.title : "",
    content: isModify ? newToEdit?.content?.content : "",
    image: isModify ? newToEdit?.image : "",
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
        values.image,
        newToEdit?.id
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

  const removeNew = async (newData: NewInterface) => {
    const resultCreateNewUseCase = await createNewUseCase.execute(
      newData.title,
      authenticated?.access_token,
      newData.content,
      newData.image,
      newToEdit?.id,
      !newData.isEnabled
    );

    if (resultCreateNewUseCase) {
      toast(
        (t) => (
          <div style={{ color: "#fff" }}>
            <strong>Exito!</strong>
            <p>Se pudo remover la noticia.</p>
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
            <p>No se pudo remover la noticia.</p>
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
  };
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      setAuthenticated(JSON.parse(auth) as AuthDataInterface);
    }
  }, [localStorage]);
  useEffect(() => {
    // Clean store
    // return () => {
    //   console.log("unmount");
    //   dispatch(setNewState(undefined));
    // };
  }, []);

  return (
    <div className="w-full h-full justify-center p-4 ">
      {authenticated && (
        <form
          className="w-full h-full grid grid-flow-row justify-center p-4 bg-white shadow rounded-2xl"
          onSubmit={formikForm.handleSubmit}
        >
          <Subtitle
            text={`${isModify ? "Modificar Noticia" : "Crear Noticia"}`}
          />

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
            selectedImage={formikForm.values.image}
            returnFile={(image) => {
              formikForm.setFieldValue("image", image);
            }}
          />

          <PrimaryButton
            className="justify-self-center"
            type={"submit"}
            label="Crear"
            onClick={formikForm.submitForm}
          />
          {isModify && newToEdit && (
            <PrimaryButton
              className="justify-self-center bg-red-400"
              type={"button"}
              label="Remover"
              onClick={async () => await removeNew(newToEdit)}
            />
          )}
        </form>
      )}
    </div>
  );
};
