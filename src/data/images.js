const { gql, GraphQLClient } = require("graphql-request");
const { ENDPOINT } = require("./constants");

const query = gql`{
    images(first: 100) {
      title
      asset {
        url
      }
    }
  }`

const getImages = async () => {
  console.log('images get')
  const client = new GraphQLClient(ENDPOINT)
  const { images } = await client.request(query)
  return images.reduce((map, i) => {
    map[i.title] = i.asset.url
    return map
  }, {})
}

export { getImages }