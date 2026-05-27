"use client";

import * as React from "react";
import {
  Themeprovider as NextThemesprovider,
  type ThemeproviderProps,
} from "next-themes";

export function Themeprovider({ children, ...props }: ThemeproviderProps) {
  return <NextThemesprovider {...props}>{children}</NextThemesprovider>;
}
