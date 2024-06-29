import { EditOutlined } from "@ant-design/icons";
import { Card } from "antd";
import { useState } from "react";
import UpdateCar from "../forms/UpdateCar";
import RemoveCar from "../buttons/RemoveCar";

const CarCard = ({ id, year, make, model, price, personId }) => {
  const [editMode, setEditMode] = useState(false);
  const styles = getStyles();
  const handleButtonClick = () => {
    setEditMode(!editMode);
  };
  return (
    <div>
      {editMode ? (
        <UpdateCar
          id={id}
          year={year}
          make={make}
          model={model}
          price={price}
          onButtonClick={handleButtonClick}
          personId={personId}
        />
      ) : (
        <Card
          style={styles.card}
          actions={[
            <EditOutlined key="edit" onClick={handleButtonClick} />,
            <RemoveCar id={id} />,
          ]}
        >
          <div style={styles.info}>
            <h3>{year}</h3>
            <h3>{make}</h3>
            <h3>{model}</h3>
            <h3>{price}</h3>
          </div>
        </Card>
      )}
    </div>
  );
};

const getStyles = () => ({
  card: {
    width: "70rem",
  },
  info: {
    display: "flex",
    flexDirection: "row",
    gap: "10px",
  },
});
export default CarCard;
