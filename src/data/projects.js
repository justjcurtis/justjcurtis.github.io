const { gql, GraphQLClient } = require("graphql-request");
const { ENDPOINT } = require("./constants");

const query = gql`{
    projectCards (orderBy:publishedAt_DESC first: 100) {
      description
      link
      longDescription
      publishedAt
      statusTag
      title
      tags {
        title
      }
      image {
        url
      }
    }
  }`

const getProjects = async () => {
  const client = new GraphQLClient(ENDPOINT)
  const { projectCards } = await client.request(query)
  return projectCards
}

export { getProjects }