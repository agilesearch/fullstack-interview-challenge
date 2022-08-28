import { Fragment, useState } from "react";
import dayjs from "dayjs";
import { Button, Card, Input, Icon, Modal } from "semantic-ui-react";

import { FlightRowType } from "../AppType";

function FlightRows({
  data,
  destination,
  origin,
  price,
  availability,
  addTrip,
  getNameByCode,
}: FlightRowType) {
  const [nodays, setNoDays] = useState(0);
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <Card
        fluid
        header={`${getNameByCode(origin)}  --->  ${getNameByCode(destination)}`}
        meta={dayjs(data).toISOString().slice(0, 10)}
        description={`Price : ${price}`}
        extra={
          <Fragment>
            <Icon name="plane" />
            {availability}
          </Fragment>
        }
        onClick={() => {
          setOpen(true);
        }}
      />
      <Modal onClose={() => setOpen(false)} open={open}>
        <Modal.Header>Number of days</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <p>Enter the number of days you are planing to stay</p>
            <Input
              placeholder="Number of days"
              onChange={(e, { value }) => {
                setNoDays(parseInt(value));
              }}
            ></Input>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            content="Add"
            labelPosition="right"
            icon="checkmark"
            onClick={() => {
              addTrip({
                data,
                price,
                origin,
                nodays,
                destination,
                availability,
              });
              setNoDays(0);
              setOpen(false);
            }}
            positive
          />
        </Modal.Actions>
      </Modal>
    </Fragment>
  );
}

export default FlightRows;
