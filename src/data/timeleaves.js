import { gql, GraphQLClient } from "graphql-request";
import { ENDPOINT } from "./constants";

const query = gql`{
  timeleaves(first: 100, orderBy: createdAt_DESC) {
    title
    text
    dateText
  }
}`

const getTimeleaves = async () => {
  const client = new GraphQLClient(ENDPOINT)
  const { timeleaves } = await client.request(query)
  return timeleaves
}

export { getTimeleaves }
