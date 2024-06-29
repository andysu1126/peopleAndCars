import { Card } from "antd";
import RemovePerson from "../buttons/RemovePerson";
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import UpdatePerson from "../forms/UpdatePerson";

import Car from "../List/Car";

const PersonCard = ({ id, firstName, lastName }) => {
  const [editMode, setEditMode] = useState(false);
  const styles = getStyles();
  const handleButtonClick = () => {
    setEditMode(!editMode);
  };
  return (
    <div>
      {editMode ? (
        <UpdatePerson
          id={id}
          firstName={firstName}
          onButtonClick={handleButtonClick}
          lastName={lastName}
        />
      ) : (
        <Card
          style={styles.card}
          actions={[
            <EditOutlined key="edit" onClick={handleButtonClick} />,
            <RemovePerson id={id} />,
          ]}
        >
          {firstName} {lastName}
          <Car personId={id} />
        </Card>
      )}
    </div>
  );
};

const getStyles = () => ({
  card: {
    width: "75rem",
  },
});

export default PersonCard;
