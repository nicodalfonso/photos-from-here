import React, { ReactElement } from "react";
import "./spinner.css";

/** A simple loading spinner */
export const Spinner = (): ReactElement => {
  return <svg className="animate-spin h-24 w-24 border-8 border-l-0  border-gray-800 spinner rounded-full cursor-wait" viewBox="0 0 24 24" />;
};
