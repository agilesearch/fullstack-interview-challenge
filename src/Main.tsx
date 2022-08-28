import { Fragment, useState } from "react";
import PlanetsData from "./data/planets.json";
import Dataset from "./data/dataset.json";
import {
  Button,
  Card,
  Dropdown,
  Grid,
  GridRow,
  GridColumn,
  Header,
  Input,
  Icon,
  Modal,
  Segment,
  SegmentGroup,
} from "semantic-ui-react";
import dayjs from "dayjs";
import SemanticDatepicker from 'react-semantic-ui-datepickers';

function Main() {

  const [details, setDetails] = useState({
    origin: "",
    destinations: [{
      id:1,
      data:"",
      origin:"",
      price: 0,
      nodays:0,
      destination:"",
      availability: 0,
    }],
    date:""
  });

  const [open, setOpen] = useState(false)

  const formatPlanets = (PlanetsData:any) =>{
   return PlanetsData.map((planet:any) => {
      return { key: planet.code, value: planet.code, text: planet.name };
    });
  }

  const setDepartureDate = (data:any) => {
    setDetails({...details,date:data.toISOString().slice(0,10)})
  };

  const selectOrigin = (origin:string)=>{
    setDetails({
      ...details,
      origin:origin
    })
  }

  const getTripsByOriginDate=(data:any[],origin:string,date:Date)=>{
    if(data && data.length> 0 && origin && dayjs(date).isValid()){
      return data.filter(trip=>trip.origin===origin && dayjs(trip.data).isSame(dayjs(date).add(2, 'day'), 'day'))
    }
    return [];
  }

  const getNameByCode=(code:string)=> PlanetsData.find(planet=>planet.code===code)?.name;

  const addDestinations=(data:any)=>{
    if(details?.destinations?.length>1){
      setDetails({
        ...details,
        destinations:[]
      })
    }else{
      setDetails({
        ...details,
        destinations:[{
          ...data,
          id:1,
          nodays:0
        }]
      })
    }
  }

  const addMoreDestinations = () =>{
    setDetails({
      ...details,
      destinations:
      [...details.destinations,{
        id:details.destinations.length+1,
        origin:"",
        destination:"",
        price:0,
        data:"",
        nodays:0,
        availability:0
      }]
    })
  }

  const removeDestination=(id:number)=>{
    if(details.destinations.length>1){
      setDetails({
        ...details,
        destinations:details?.destinations.filter(destination=>destination.id!==id)
      })
    }
  }

  return (
    <Fragment>
     
    <Grid >
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
                  options={formatPlanets(PlanetsData)}
                  onChange={(e : any,{value}:any)=>{
                    e.preventDefault();
                    selectOrigin(value)
                  }}
                />
              </Segment>
              <Segment>
                <Header>Depature Date</Header>
                <SemanticDatepicker 
                  minDate={new Date("2021-11-01")}
                  maxDate={new Date("2022-05-06")}
                  datePickerOnly 
                  onChange={(e:any,data)=>{
                    e.preventDefault();
                    setDepartureDate(data?.value)
                  }}
                />
              </Segment>
              {/* <Segment>
                <br/>
                <Button basic onClick={()=>{getTravelDetails()}}>Cancel</Button>
                <Button basic onClick={()=>{console.log(filterDataSet(details.origin))}}>Search</Button>
              </Segment> */}
            </SegmentGroup>
        </GridColumn>
        <GridColumn width={1}></GridColumn>
      </GridRow>
      <GridRow>
        <GridColumn width={1}></GridColumn>
        <GridColumn width={14}><Header>Select Flight</Header></GridColumn>
        <GridColumn width={1}></GridColumn>
      </GridRow>
      <GridRow>
        <GridColumn width={1}></GridColumn>
        <GridColumn width={14}>
          {getTripsByOriginDate(Dataset,details.origin,new Date(details.date)).map((trip,i)=>{
            return (
              <Card
                fluid
                key={i}
                header={`${getNameByCode(trip.origin)}  --->  ${getNameByCode(trip.destination)}`}
                meta={dayjs(trip.data).toISOString().slice(0,10)}
                description={`Price : ${trip.price}`}
                extra={
                <a>
                  <Icon name='plane' />
                  {trip.availability}
                </a>
                }
                onClick={()=>{
                 addDestinations(trip)
                 setOpen(true)
                }}
            />
            )
          })}
        </GridColumn>
        <GridColumn width={1}></GridColumn>
      </GridRow>
      <GridRow>
        <GridColumn width={1}></GridColumn>
        <GridColumn width={14}>{JSON.stringify(details.destinations)}</GridColumn>
        <GridColumn width={1}></GridColumn>
      </GridRow>
    </Grid>
      <Modal
        onClose={() => setOpen(false)}
        open={open}
      >
        <Modal.Header>Number of days</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <p>
              Enter the number of days you are planing to stay
            </p>
            <Input placeholder="Number of days" onChange={(e,{value})=>{
              if(details.destinations.length===1){
                setDetails({
                  ...details,
                  destinations:[
                    {...details.destinations[0],nodays:parseInt(value)}
                  ]
                })
              }
            }}></Input>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            content="Add"
            labelPosition='right'
            icon='checkmark'
            onClick={() => setOpen(false)}
            positive
          />
        </Modal.Actions>
      </Modal>
    </Fragment>
  );
}

export default Main;
