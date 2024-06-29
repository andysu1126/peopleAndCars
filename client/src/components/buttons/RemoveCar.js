import filter from "lodash.filter";
import { GET_CARS, REMOVE_CAR } from "../../graphql/queries";
import { useMutation } from "@apollo/client";
import { DeleteOutlined } from "@ant-design/icons";
const RemoveCar = ({ id }) => {
  const [removeCar] = useMutation(REMOVE_CAR, {
    update(cache, { data: { removeCar } }) {
      const { cars } = cache.readQuery({ query: GET_CARS });
      cache.writeQuery({
        query: GET_CARS,
        data: { cars: filter(cars, (c) => c.id !== removeCar.id) },
      });
    },
  });

  const handleButtonClick = () => {
    let result = window.confirm("Are you sure you want to delete this car?");
    console.log(result, "RESULT");
    if (result) {
      removeCar({
        variables: { removeCarId: id },
      });
    }
  };

  return (
    <DeleteOutlined
      key="delete"
      onClick={handleButtonClick}
      style={{ color: "red" }}
    />
  );
};
export default RemoveCar;
