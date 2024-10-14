"use client";

import { FC } from "react";

interface Props {
  file: string;
}

export const ViewPdf: FC<Props> = ({ file }: Props) => {
  return <iframe width="100%" height="100%" src={file}></iframe>;
};
