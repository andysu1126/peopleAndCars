import "./App.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Title from "./components/layout/Title";
import People from "./components/List/People";
import AddPerson from "./components/forms/AddPerson";
import AddCar from "./components/forms/AddCar";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});
function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Title>PEOPLE AND THEIR CARS</Title>
        <AddPerson />
        <Title>Add Car</Title>
        <AddCar />
        <People />
      </div>
    </ApolloProvider>
  );
}

export default App;
