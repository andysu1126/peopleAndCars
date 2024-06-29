import { useMutation } from "@apollo/client";
import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ADD_PERSON, GET_PEOPLE } from "../../graphql/queries";

const AddPerson = () => {
  const [form] = Form.useForm();
  const [id] = useState(uuidv4());
  const [, forceUpdate] = useState();
  const [addPerson] = useMutation(ADD_PERSON);
  const styles = getStyles();

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values) => {
    const { firstName, lastName } = values;
    addPerson({
      variables: { id, firstName, lastName },

      //cache update
      update: (cache, { data: { addPerson } }) => {
        const data = cache.readQuery({ query: GET_PEOPLE });

        cache.writeQuery({
          query: GET_PEOPLE,
          data: {
            ...data,
            people: [...data.people, addPerson],
          },
        });
      },
    });
  };
  return (
    <Form
      name="add-person-form"
      layout="inline"
      size="large"
      style={{ marginBottom: "40px" }}
      form={form}
      onFinish={onFinish}
    >
      <div style={styles.row}>
        <h6>First Name</h6>
        <Form.Item
          name="firstName"
          rules={[{ required: true, message: "Please enter a first name" }]}
        >
          <Input placeholder="First Name" />
        </Form.Item>
      </div>
      <div style={styles.row}>
        <h6>Last Name</h6>
        <Form.Item
          name="lastName"
          rules={[{ required: true, message: "Please enter a first name" }]}
        >
          <Input placeholder="Last name" />
        </Form.Item>
      </div>
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            disabled={
              !form.isFieldTouched ||
              form.getFieldError().filter(({ errors }) => errors.length).length
            }
          >
            Add Person
          </Button>
        )}
      </Form.Item>
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
export default AddPerson;
