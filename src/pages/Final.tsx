import React from "react";
import {
  Grid,
  GridRow,
  GridColumn,
  Header,
  Step,
  Button,
} from "semantic-ui-react";
import dayjs from "dayjs";
import { useNavigate, useLocation } from "react-router-dom";
import Trip from "../components/Trip";
import PlanetsData from "../data/planets.json";
import { DetailsType, FlightType } from "../AppType";

function Final() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const getTripLocations = (data: DetailsType): any[] => {
    return [
      {
        location: data.origin,
        date: dayjs(data.date).add(2, "day").toISOString().slice(0, 10),
      },
      ...data.destinations.map((trip: FlightType) => {
        return {
          location: trip.destination,
          date: dayjs(trip.data)
            .add(trip.nodays, "day")
            .toISOString()
            .slice(0, 10),
          nodays: trip.nodays,
        };
      }),
    ];
  };

  const getTotalPrice = (data: DetailsType): number => {
    return parseFloat(
      data?.destinations.reduce((prev, { price }) => prev + price, 0).toFixed(2)
    );
  };

  const getNameByCode = (code: string): string =>
    PlanetsData.find((planet) => planet.code === code)?.name || "";

  return (
    <Grid stretched padded>
      <GridRow stretched>
        <GridColumn width={5}></GridColumn>
        <GridColumn width={6}>
          <Header as="h1" textAlign="center">
            Your trip summary
          </Header>
        </GridColumn>
        <GridColumn width={5}></GridColumn>
      </GridRow>
      <GridRow stretched>
        <GridColumn width={1}></GridColumn>
        <GridColumn width={14}>
          <Step.Group size="tiny">
            {getTripLocations(state as DetailsType).map((trip) => {
              return (
                <Trip
                  key={`${trip.location}-${trip.date}`}
                  location={trip.location}
                  nodays={trip.nodays}
                  date={trip.date}
                  getNameByCode={getNameByCode}
                />
              );
            })}
          </Step.Group>
        </GridColumn>
        <GridColumn width={1}></GridColumn>
      </GridRow>
      <GridRow stretched>
        <GridColumn width={5}></GridColumn>
        <GridColumn width={6}>
          <Header as="h3" textAlign="center">
            Your trip cost {getTotalPrice(state as DetailsType)}
          </Header>
          <Button
            content="Start new trip"
            fluid
            icon="arrow left"
            labelPosition="left"
            onClick={() => {
              navigate("/");
            }}
          />
        </GridColumn>
        <GridColumn width={5}></GridColumn>
      </GridRow>
    </Grid>
  );
}

export default Final;
