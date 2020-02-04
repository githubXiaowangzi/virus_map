<template>
  <v-container fluid class="grey lighten-4 fill-height" id="map"></v-container>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.chinatmsproviders";
import axios from "axios";

import data from "@/mock/data";
// import addressCollection from "@/assets/addressCollection";

const SZ_CENTER = [22.543143497998308, 114.06160783203126];
// const GAODE_KEY = "dbccf4f561e7c3573572e318b0274889";
const SZ_FULL = {
  url: "/geojson/sz_full.json",
  style: {
    weight: 0.5,
    opacity: 1,
    color: "#414141",
    fillOpacity: 0,
    fillColor: "#fff"
  }
}
const SZ_OUTLINE = {
  url: "/geojson/sz_outline.json",
  style: {
    opacity: 0.8,
    weight: 5,
    color: "#414141",
    fillOpacity: 0
  }
}
// const SZ_FULL_URL = "/geojson/sz_full.json";
// const SZ_OUTLINE_URL = "/geojson/sz_outline.json";

// const SZ_FULL_STYLE = {
//   weight: 1,
//   opacity: 1,
//   color: "#414141",
//   fillOpacity: 0
// }
// const SZ_OUTLINE_STYLE = {
//   opacity: 0.8,
//   weight: 8,
//   color: "#414141",
//   fillOpacity: 0
// }
const POINT_STYLE = {
  radius: 3,
  fillColor: "#f64b3c",
  color: "#c81912",
  weight: 2,
  opacity: 1,
  fillOpacity: 0.8
}

export default {
  name: "VMap",
  data: () => ({
    map: null,
  }),
  methods: {
    initMap() {
      this.map = L.map("map", {
        center: SZ_CENTER,
        zoom: 10
      });
      // 加载高德地图
      L.tileLayer
        .chinaProvider("Geoq.Normal.Gray", { maxZoom: 18, minZoom: 5 })
        .addTo(this.map);
      this.loadGeoData(SZ_FULL);
      this.loadGeoData(SZ_OUTLINE);
      this.addPointLayer(data.geojson);
    },
    addPointLayer(geojson) {
      L.geoJSON(geojson, {
          pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng, POINT_STYLE);
          }
      }).addTo(this.map);
    },
    async loadGeoData({ url, style }) {
      let layer;
      await axios.get(url).then(res => {
        if (res.status === 200 && res.statusText === "OK") {
          return res.data;
        }
      }).then(geofile => {
        layer = L.geoJSON(geofile.features, {
          style: style
        }).addTo(this.map);
      });
      return layer;
    },
    // async loadGeoData() {
    //   await axios
    //     .get(`/geojson/sz_full.json`)
    //     .then(res => {
    //       if (res.status === 200 && res.statusText === "OK") {
    //         return res.data;
    //       }
    //     })
    //     .then(geofile => {
    //       L.geoJSON(geofile.features, {
    //         style: SZ_FULL_STYLE
    //       }).addTo(this.map);
    //     });
    //   await axios
    //     .get(`/geojson/sz_outline.json`)
    //     .then(res => {
    //       if (res.status === 200 && res.statusText === "OK") {
    //         return res.data;
    //       }
    //     })
    //     .then(geofile => {
    //       L.geoJSON(geofile.features, {
    //         style: SZ_OUTLINE_STYLE
    //       }).addTo(this.map);
    //     });
    // },
    // parseGeocode({location, formatted_address, district}) {
    //   let str = location.split(',');
    //   let coordinates = [
    //     Number.parseFloat(str[0]),
    //     Number.parseFloat(str[1])
    //   ];
    //   return {
    //     "type": "Feature",
    //     "properties": {
    //       "address": formatted_address,
    //       "district": district
    //     },
    //     "geometry": { "type": "Point", "coordinates": coordinates }
    //   };
    // },
    // loadEpidemicData() {
    //   let diff = [];
    //   addressCollection.forEach(addr => {
    //     diff.push(
    //       axios.get(
    //         `https://restapi.amap.com/v3/geocode/geo?key=${GAODE_KEY}&city=shenzhen&address=${addr}`
    //       )
    //       .then(res => {
    //         if (res.status === 200 && res.data.status === "1") {
    //           return this.parseGeocode(res.data.geocodes[0]);
    //         } else {
    //           return null;
    //         }
    //       })
    //     );
    //   });
    //   Promise.all(diff).then(res => {
    //     // eslint-disable-next-line no-console
    //     L.geoJSON(res, {
    //       pointToLayer: function(feature, latlng) {
    //         return L.circleMarker(latlng, {
    //           radius: 3,
    //           fillColor: "#f64b3c",
    //           color: "#c81912",
    //           weight: 2,
    //           opacity: 1,
    //           fillOpacity: 0.8
    //         });
    //       }
    //     }).addTo(this.map);
    //   })
    // }
  },
  mounted() {
    this.initMap();
  }
};
</script>

<style scoped>
#map {
  width: 100%;
  height: 100%;
}
</style>
