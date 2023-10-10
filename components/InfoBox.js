import React, { useState } from "react";
import { TextInput } from "react-native-paper";

const InfoBox = (props) => {
  return (
    <TextInput
      mode="outlined"
      outlineColor="lightgray"
      dense={true}
      {...props}
    />
  );
};

export default InfoBox;
