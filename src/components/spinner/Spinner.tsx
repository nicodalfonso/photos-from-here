import React, { ReactElement } from "react";
import "./spinner.css";

export const Spinner = (): ReactElement => {
  return <svg className="animate-spin h-24 w-24 border-8 border-l-0  border-white spinner rounded-full" viewBox="0 0 24 24" />;
};
