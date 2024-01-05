import { gql, GraphQLClient } from "graphql-request";
import { ENDPOINT } from "./constants";

const query = gql`{
  workCards{
    createdAt
    bg
    title
    name
    description
    tech
    link
    cols
    rows
  }
}`

const getWorkCards = async () => {
    const client = new GraphQLClient(ENDPOINT)
    const { workCards } = await client.request(query)
    return workCards
}

export { getWorkCards }
