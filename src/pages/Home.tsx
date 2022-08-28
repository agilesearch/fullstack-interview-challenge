import { Fragment, useState } from "react";
import PlanetsData from "../data/planets.json";
import Dataset from "../data/dataset.json";
import {
  Button,
  Card,
  Dropdown,
  Grid,
  GridRow,
  GridColumn,
  Header,
  Message,
  Segment,
  SegmentGroup,
} from "semantic-ui-react";
import SelectedRow from "../components/SelectedRow";
import FlightRows from "../components/FlightRows";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import SemanticDatepicker from "react-semantic-ui-datepickers";

import { PlanetType, FlightType, DetailsType } from "../AppType";

const appState: DetailsType = {
  origin: "",
  destinations: [],
  date: "",
};

function Home() {
  const [details, setDetails] = useState<DetailsType>(appState);

  const [showTrips, setShowTrips] = useState(false);

  const navigate = useNavigate();

  const formatPlanets = (
    PlanetsData: Array<PlanetType>
  ): Array<{ key: string; value: string; text: string }> => {
    return PlanetsData.map((planet: PlanetType) => {
      return { key: planet.code, value: planet.code, text: planet.name };
    });
  };

  const setDepartureDate = (data: any) => {
    setDetails({ ...details, date: data.toISOString().slice(0, 10) });
    setShowTrips(true);
  };

  const selectOrigin = (origin: string) => {
    setDetails({
      ...details,
      origin: origin,
    });
  };

  const getLatesOrigin = (): string => {
    if (details?.destinations?.length > 0) {
      return details?.destinations[details?.destinations?.length - 1]
        .destination;
    }
    return details.origin;
  };

  const getLatesDepatureDate = (): string => {
    if (details?.destinations?.length > 0) {
      let sumOfDays = details?.destinations?.reduce(
        (previousValue, currentValue) => {
          return previousValue + currentValue.nodays || 0;
        },
        0
      );
      return dayjs(details.date)
        .add(sumOfDays + 1, "day")
        .toISOString()
        .slice(0, 10);
    }
    return details.date;
  };

  const getTripsByOriginDate = (
    data: any[],
    origin: string,
    date: Date
  ): Array<FlightType> => {
    if (data && data.length > 0 && origin && dayjs(date).isValid()) {
      return data.filter(
        (trip) =>
          trip.origin === origin &&
          dayjs(trip.data).isSame(dayjs(date).add(2, "day"), "day")
      );
    }
    return [];
  };

  const getNameByCode = (code: string): string =>
    PlanetsData.find((planet) => planet.code === code)?.name || "";

  const addTrip = (data: FlightType) => {
    setDetails({
      ...details,
      destinations: [
        ...details.destinations,
        { ...data, id: details?.destinations?.length + 1 },
      ],
    });
    setShowTrips(false);
  };

  const disableFields = (): boolean => {
    return details?.destinations?.length > 0;
  };

  const selectFlightData = getTripsByOriginDate(
    Dataset,
    getLatesOrigin(),
    new Date(getLatesDepatureDate())
  );

  return (
    <Fragment>
      <Grid stretched>
        <GridRow>
          <GridColumn width={1}></GridColumn>
          <GridColumn width={14}>
            <SegmentGroup horizontal>
              <Segment>
                <Header>Origin</Header>
                <Dropdown
                  placeholder="Current Planet"
                  fluid
                  search
                  value={details?.origin}
                  selection
                  disabled={disableFields()}
                  options={formatPlanets(PlanetsData)}
                  onChange={(e: any, { value }: any) => {
                    e.preventDefault();
                    selectOrigin(value);
                  }}
                />
              </Segment>
              <Segment>
                <Header>Depature Date</Header>
                <SemanticDatepicker
                  minDate={new Date("2021-11-01")}
                  maxDate={new Date("2022-05-06")}
                  datePickerOnly
                  disabled={disableFields()}
                  onChange={(e: any, data) => {
                    e.preventDefault();
                    setDepartureDate(data?.value);
                  }}
                />
                <Button
                  floated="right"
                  basic
                  onClick={() => setDetails(appState)}
                >
                  Clear
                </Button>
              </Segment>
            </SegmentGroup>
          </GridColumn>
          <GridColumn width={1}></GridColumn>
        </GridRow>
        {details?.destinations?.length === 0 ? (
          <GridRow>
            <GridColumn width={6}></GridColumn>
            <GridColumn width={4}>
              <Header>Please select Origin and Date</Header>
            </GridColumn>
            <GridColumn width={6}></GridColumn>
          </GridRow>
        ) : null}
        <GridRow>
          <GridColumn width={1}></GridColumn>
          <GridColumn width={7}>
            {showTrips ? (
              <Grid padded>
                <GridRow>
                  <GridColumn width={1}></GridColumn>
                  <GridColumn width={14}>
                    <Header>Select Flight</Header>
                  </GridColumn>
                  <GridColumn width={1}></GridColumn>
                </GridRow>
                <GridRow>
                  <GridColumn width={1}></GridColumn>
                  <GridColumn width={14}>
                    <Card.Group>
                      {selectFlightData?.length > 0 ? (
                        selectFlightData.map((trip) => {
                          return (
                            <FlightRows
                              nodays={0}
                              key={`${trip.data}-${trip.destination}-${trip.price}`}
                              data={trip.data}
                              price={trip.price}
                              origin={trip.origin}
                              addTrip={addTrip}
                              getNameByCode={getNameByCode}
                              availability={trip.availability}
                              destination={trip.destination}
                            />
                          );
                        })
                      ) : (
                        <Message
                          warning
                          header="There is no flights availabile for selected date!"
                        />
                      )}
                    </Card.Group>
                  </GridColumn>
                  <GridColumn width={1}></GridColumn>
                </GridRow>
              </Grid>
            ) : null}
          </GridColumn>
          <GridColumn width={7}>
            {details?.destinations?.length > 0 ? (
              <Grid padded>
                <GridRow>
                  <GridColumn width={1}></GridColumn>
                  <GridColumn width={14}>
                    <Header>Selected Flight</Header>
                  </GridColumn>
                  <GridColumn width={1}></GridColumn>
                </GridRow>
                <GridRow>
                  <GridColumn width={1}></GridColumn>
                  <GridColumn width={14}>
                    <Card.Group>
                      {details?.destinations.map((trip: FlightType) => {
                        return (
                          <SelectedRow
                            key={`${trip.data}-${trip.destination}-${trip.nodays}`}
                            data={trip.data}
                            price={trip.price}
                            origin={trip.origin}
                            getNameByCode={getNameByCode}
                            nodays={trip.nodays || 0}
                            destination={trip.destination}
                            availability={trip.availability}
                          />
                        );
                      })}
                    </Card.Group>
                  </GridColumn>
                  <GridColumn width={1}></GridColumn>
                </GridRow>
                <GridRow>
                  <GridColumn width={1}></GridColumn>
                  <GridColumn width={7}>
                    <Button
                      fluid
                      icon="add"
                      content="Add Trip"
                      labelPosition="right"
                      onClick={() => setShowTrips(true)}
                    />
                  </GridColumn>
                  <GridColumn width={7}>
                    <Button
                      fluid
                      positive
                      icon="checkmark"
                      content="Checkout"
                      labelPosition="right"
                      onClick={() => {
                        navigate("final", { state: details });
                      }}
                    />
                  </GridColumn>
                  <GridColumn width={1}></GridColumn>
                </GridRow>
              </Grid>
            ) : null}
          </GridColumn>
          <GridColumn width={1}></GridColumn>
        </GridRow>
      </Grid>
    </Fragment>
  );
}

export default Home;
