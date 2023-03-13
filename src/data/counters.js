import { getCurrentYearMonthString } from "../utils/helpers";

const { gql, GraphQLClient } = require("graphql-request");
const { ENDPOINT } = require("./constants");

const query = gql`{
    counters {
      title,
      key,
    }
  }`

const getCounters = async () => {
  const client = new GraphQLClient(ENDPOINT)
  const { counters } = await client.request(query)
  const result = counters.reduce((map, c) => {
    map[c.title] = c.key
    return map
  }, {})
  result.monthlyViews = result.views + '-' + getCurrentYearMonthString()
  return result
}

export { getCounters }