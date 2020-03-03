import addressCollection from '@/assets/addressCollection'
const GAODE_KEY = 'dbccf4f561e7c3573572e318b0274889'

// eslint-disable-next-line no-unused-vars
const loadEpidemicData = () => {
  const diff = []
  addressCollection.forEach(addr => {
    diff.push(
      this.$http
        .get(
          `https://restapi.amap.com/v3/geocode/geo?key=${GAODE_KEY}&city=shenzhen&address=${addr}`
        )
        .then(res => {
          if (res.status === 200 && res.data.status === '1') {
            return this.parseGeocode(res.data.geocodes[0])
          } else {
            return null
          }
        })
    )
  })
}

const geocoder = function ({ location, formatted_address, district }) {
  const str = location.split(',')
  const coordinates = [Number.parseFloat(str[0]), Number.parseFloat(str[1])]
  return {
    type: 'Feature',
    properties: {
      address: formatted_address,
      district: district
    },
    geometry: { type: 'Point', coordinates: coordinates }
  }
}

export default {
  geocoder
}
