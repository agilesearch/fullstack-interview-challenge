import React, { Fragment } from "react";
import { Card, Icon } from "semantic-ui-react";
import dayjs from "dayjs";

function SelectedRow({
  origin,
  price,
  data,
  nodays,
  destination,
  availability,
  getNameByCode,
}: {
  data: string;
  origin: string;
  price: number;
  nodays: number;
  destination: string;
  availability: number;
  getNameByCode: (code: string) => string;
}) {
  return (
    <Card
      fluid
      color="green"
      header={`${getNameByCode(origin)}  --->  ${getNameByCode(destination)}`}
      meta={`Departure on ${dayjs(data)
        .toISOString()
        .slice(0, 10)} and Staying for ${nodays} days`}
      description={`Price : ${price}`}
      extra={
        <Fragment>
          <Icon name="plane" />
          {availability}
        </Fragment>
      }
    />
  );
}

export default SelectedRow;
