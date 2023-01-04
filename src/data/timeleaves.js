const { gql, GraphQLClient } = require("graphql-request");
const { ENDPOINT } = require("./constants");

const query = gql`{
  timeleaves(first: 100, orderBy: publishedAt_DESC) {
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