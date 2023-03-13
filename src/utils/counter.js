const namespace = 'justjcurtis.dev'
const countapi = require('countapi-js')

export const getCount = async key => {
    const { status, value } = await countapi.get(namespace, key)
    if (status === 404) {
        await countapi.create({ namespace, key })
        return 0
    }
    if (status !== 200) return undefined
    return value
}

export const hitCount = async key => {
    const { value } = await countapi.hit(namespace, key)
    return value
}