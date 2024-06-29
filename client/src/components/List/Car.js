import { useQuery } from "@apollo/client";
import { List } from "antd";
import { GET_CARS } from "../../graphql/queries";
import CarCard from "../listItem/CarCard";

const Car = ({ personId }) => {
  const styles = getStyles();
  const { loading, error, data } = useQuery(GET_CARS);
  if (loading) return "loading...";
  if (error) return `Error! ${error.message}`;
  console.log(data);
  const personCars = data.cars.filter((car) => car.personId === personId);
  return (
    <List style={styles.list} grid={{ gutter: 20, column: 1 }}>
      {personCars.map(({ id, year, make, model, price }) => (
        <List.Item key={id}>
          <CarCard
            id={id}
            year={year}
            make={make}
            model={model}
            price={price}
            personId={personId}
          />
        </List.Item>
      ))}
    </List>
  );
};

const getStyles = () => ({
  list: {
    display: "flex",
    justifyContent: "center",
  },
});
export default Car;
