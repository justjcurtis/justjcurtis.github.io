import { gql, GraphQLClient } from "graphql-request";
import { ENDPOINT } from "./constants";
import { isNumber } from "../utils/helpers";

const query = gql`{
  workCards{
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
  workCards.sort((a, b) => {
    if (a.name == "Work") return -1
    if (b.name == "Work") return 1
    let aYear = parseInt(a.title.split(" - ")[1])
    let bYear = parseInt(b.title.split(" - ")[1])
    return bYear - aYear
  })
  return workCards
}

export { getWorkCards }
