import { gql, GraphQLClient } from "graphql-request";
import { ENDPOINT } from "./constants";

const query = gql`{
    images(first: 100) {
      title
      asset {
        url
      }
    }
  }`

const getImages = async () => {
  const client = new GraphQLClient(ENDPOINT)
  const { images } = await client.request(query)
  return images.reduce((map, i) => {
    map[i.title] = i.asset.url
    return map
  }, {})
}

export { getImages }
