<template>
  <v-container fluid class="grey lighten-4 fill-height" id="map"></v-container>
</template>

<script>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet.chinatmsproviders'
import axios from 'axios'

// import data from "@/mock/data";
import pData from '@/mock/miao'

const SZ_CENTER = [22.543143497998308, 114.06160783203126]
const SZ_FULL = {
  url: '/geojson/sz_full.json',
  style: {
    weight: 0.5,
    opacity: 1,
    color: '#414141',
    fillOpacity: 0,
    fillColor: '#fff'
  }
}
const SZ_OUTLINE = {
  url: '/geojson/sz_outline.json',
  style: {
    opacity: 0.8,
    weight: 5,
    color: '#414141',
    fillOpacity: 0
  }
}

const POINT_STYLE = {
  radius: 3,
  fillColor: '#f64b3c',
  color: '#c81912',
  weight: 2,
  opacity: 1,
  fillOpacity: 0.8
}

export default {
  name: 'VMap',
  data: () => ({
    map: null
  }),
  methods: {
    initMap() {
      this.map = L.map('map', {
        center: SZ_CENTER,
        zoom: 10
      })
      L.tileLayer(
        'https://api.mapbox.com/styles/v1/924152651/ck6m17bz00qg81iqajselyt9h/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiOTI0MTUyNjUxIiwiYSI6ImNrNjkwdXYwNjBhMzUzZHBtZHZqMHc1Y3QifQ.-ghyt3JdDn12Wk31yifDLw',
        {
          maxZoom: 18
        }
      ).addTo(this.map)
      // 加载高德地图
      // L.tileLayer
      //   .chinaProvider("Geoq.Normal.Gray", { maxZoom: 18, minZoom: 5 })
      //   .addTo(this.map);
      this.loadGeoData(SZ_FULL)
      this.loadGeoData(SZ_OUTLINE)
      // this.addPointLayer(data.geojson);
      this.addPolygonLayer()
    },
    addPolygonLayer() {
      const cityData = pData.find(city => city.name === '深圳市').pois
      const polygonData = cityData.filter(p => p.geometry.type === 'Polygon')
      const pointData = cityData.filter(p => p.geometry.type !== 'Polygon')
      const layer2 = []
      pointData.forEach(e => {
        layer2.push({
          type: 'Feature',
          properties: { name: e.name },
          geometry: e.point
        })
      })
      // eslint-disable-next-line no-unused-vars
      const l1 = L.geoJSON(layer2, {
        pointToLayer: function(feature, latlng) {
          return L.circleMarker(latlng, POINT_STYLE)
        }
      }).addTo(this.map)
      // this.bindPopup(l1)

      const layer = []
      polygonData.forEach(e => {
        layer.push({
          type: 'Feature',
          properties: { name: e.name },
          geometry: e.geometry
        })
      })
      // eslint-disable-next-line no-unused-vars
      const l2 = L.geoJSON(layer).addTo(this.map)
      // this.bindPopup(l2)
    },
    bindPopup(lyr) {
      lyr.eachLayer(function(layer) {
        const popup = L.popup({
          autoClose: false,
          closeOnClick: false
        }).setContent(layer.feature.properties.name)
        layer.bindPopup(popup).openPopup()
      })
    },
    addPointLayer(geojson) {
      L.geoJSON(geojson, {
        pointToLayer: function(feature, latlng) {
          return L.circleMarker(latlng, POINT_STYLE)
        }
      }).addTo(this.map)
    },
    async loadGeoData({ url, style }) {
      let layer
      await axios
        .get(url)
        .then(res => {
          if (res.status === 200 && res.statusText === 'OK') {
            return res.data
          }
        })
        .then(geofile => {
          layer = L.geoJSON(geofile.features, {
            style: style
          }).addTo(this.map)
        })
      return layer
    }
  },
  mounted() {
    this.initMap()
  }
}
</script>

<style scoped>
#map {
  width: 100%;
  height: 100%;
}
</style>
