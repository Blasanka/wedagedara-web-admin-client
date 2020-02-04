/* eslint-disable react/prop-types */
import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

export default function MyBUtton({
  children,
  onClick,
  tip,
  btnClassName,
  tipClassName
}) {
  return (
    <Tooltip title={tip} placement="bottom-start" className={tipClassName}>
      <IconButton onClick={onClick} className={btnClassName}>
        {children}
      </IconButton>
    </Tooltip>
  );
}
