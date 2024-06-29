import { useMutation, useQuery } from "@apollo/client";
import { Button, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ADD_CAR, GET_CARS, GET_PEOPLE } from "../../graphql/queries";
const AddCar = () => {
  const [form] = Form.useForm();
  const [id] = useState(uuidv4());
  const [, forceUpdate] = useState();
  const [addCar] = useMutation(ADD_CAR);
  const styles = getStyles();
  const { Option } = Select;
  const { loading, error, data } = useQuery(GET_PEOPLE);
  useEffect(() => {
    forceUpdate({});
  }, []);
  if (loading) return <p>Loading...</p>; // Added loading state handling
  if (error) return <p>Error :</p>; // Added error state handling

  const onFinish = (values) => {
    const { year, make, model, price, person } = values;
    addCar({
      variables: { addCarId: id, year, make, model, price, personId: person },

      //cache update
      update: (cache, { data: { addCar } }) => {
        const data = cache.readQuery({ query: GET_CARS });

        cache.writeQuery({
          query: GET_CARS,
          data: {
            ...data,
            cars: [...data.cars, addCar],
          },
        });
      },
    });
  };
  return (
    <Form
      name="add-car-form"
      layout="inline"
      size="large"
      style={{ marginBottom: "40px" }}
      form={form}
      onFinish={onFinish}
    >
      <div style={styles.row}>
        <h6>Year</h6>
        <Form.Item
          name="year"
          rules={[{ required: true, message: "Please enter a year" }]}
        >
          <Input placeholder="Year" />
        </Form.Item>
        <h6>Make</h6>
        <Form.Item
          name="make"
          rules={[{ required: true, message: "Please enter a make" }]}
        >
          <Input placeholder="Make" />
        </Form.Item>
        <h6>Model</h6>
        <Form.Item
          name="model"
          rules={[{ required: true, message: "Please enter a model" }]}
        >
          <Input placeholder="Model" />
        </Form.Item>
        <h6>Price</h6>
        <Form.Item
          name="price"
          rules={[{ required: true, message: "Please enter a price" }]}
        >
          <Input placeholder="Price" />
        </Form.Item>
        <h6>Person</h6>
        <Form.Item
          name="person"
          rules={[{ required: true, message: "Please select a person" }]}
        >
          <Select
            showSearch
            placeholder="Select a person"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {data &&
              data.people.map(({ id, firstName, lastName }) => (
                <Option key={id} value={id}>
                  {firstName} {lastName}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item shouldUpdate={true}>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              disabled={
                !form.isFieldTouched ||
                form.getFieldError().filter(({ errors }) => errors.length)
                  .length
              }
            >
              Add Car
            </Button>
          )}
        </Form.Item>
      </div>
    </Form>
  );
};

const getStyles = () => ({
  row: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default AddCar;
