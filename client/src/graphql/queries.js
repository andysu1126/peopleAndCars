import { gql } from "@apollo/client";

export const GET_PEOPLE = gql`
  query Query {
    people {
      id
      lastName
      firstName
    }
  }
`;

export const ADD_PERSON = gql`
  mutation AddPerson($id: String!, $firstName: String!, $lastName: String!) {
    addPerson(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`;
export const REMOVE_PERSON = gql`
  mutation RemovePerson($id: String!) {
    removePerson(id: $id) {
      id
      firstName
      lastName
    }
  }
`;

export const UPDATE_PERSON = gql`
  mutation UpdatePerson($id: String!, $firstName: String!, $lastName: String!) {
    updatePerson(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`;

//cars
export const GET_CARS = gql`
  query Query {
    cars {
      id
      year
      make
      model
      price
      personId
    }
  }
`;

export const ADD_CAR = gql`
  mutation AddCar(
    $addCarId: String!
    $year: String!
    $make: String!
    $model: String!
    $price: String!
    $personId: String!
  ) {
    addCar(
      id: $addCarId
      year: $year
      make: $make
      model: $model
      price: $price
      personId: $personId
    ) {
      id
      year
      make
      model
      price
      personId
    }
  }
`;

export const REMOVE_CAR = gql`
  mutation RemoveCar($removeCarId: String!) {
    removeCar(id: $removeCarId) {
      id
      year
      make
      model
      price
      personId
    }
  }
`;

export const UPDATE_CAR = gql`
  mutation UpdateCar(
    $updateCarId: String!
    $year: String!
    $make: String!
    $model: String!
    $price: String!
    $personId: String!
  ) {
    updateCar(
      id: $updateCarId
      year: $year
      make: $make
      model: $model
      price: $price
      personId: $personId
    ) {
      id
      year
      make
      model
      price
      personId
    }
  }
`;
