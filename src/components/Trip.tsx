import React from "react";
import { Icon, Step } from "semantic-ui-react";

function Trip({
  nodays,
  location,
  date,
  getNameByCode,
}: {
  nodays: number;
  location: string;
  date: string;
  getNameByCode: (code: string) => string;
}) {
  return (
    <Step>
      <Icon name="plane" />
      <Step.Content>
        <Step.Title>{getNameByCode(location)}</Step.Title>
        {nodays ? (
          <Step.Description>Staying for {nodays}</Step.Description>
        ) : null}
        <Step.Description>Depature on {date}</Step.Description>
      </Step.Content>
    </Step>
  );
}

export default Trip;
