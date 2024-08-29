import { ButtonHTMLAttributes, InputHTMLAttributes } from "react";

export interface CustomTextInputInterface
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  returnFile?: (file: string) => void;
}

export interface CustomTextAreaInterface
  extends InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export interface ButtonInterface
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}
