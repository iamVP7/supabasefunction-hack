<template>
  <div class="main_pixel_art_grid">
    <div v-if="!readonly">
      <color-picker
        id="gridcolorpicker"
        v-model:pureColor="pureColor"
        format="hex"
        lang="en"
        @change="colorChanged"
      />
    </div>
    <table class="pixelgrid">
      <tbody>
        <tr
          v-for="(normalRowNumber, zeroRowIndex) in rowsCount"
          :key="zeroRowIndex"
        >
          <td
            v-for="(normalColNumber, zeroColIndex) in columnsCount"
            :key="zeroColIndex"
            :style="{
              backgroundColor: getBackGroundColor(zeroRowIndex, zeroColIndex),
            }"
            :my-attr="getAttributeValue(zeroRowIndex, zeroColIndex)"
            @click="(event) => !readonly && clickedGridCell(event)"
          ></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
import supabase from "../js/supabaseClient";
import { ColorPicker } from "vue3-colorpicker";

import "vue3-colorpicker/style.css";

export default {
  name: "PixelGrid",
  props: {
    msg: String,
  },
  components: {
    ColorPicker,
  },
  setup() {
    const defaultGridSize = 15;
    const pureColor = "#ffa727";
    const columnsCount = 15;
    const rowsCount = 15;

    return { pureColor, columnsCount, rowsCount };
  },
  data() {
    return {
      readonly: false,
      pixelArtResponse: {},
    };
  },
  async mounted() {
    const responseObject = await supabase.functions.invoke("pixelart", {
      body: JSON.stringify({}),
    });
    if (
      responseObject != null &&
      responseObject.hasOwnProperty("data") &&
      responseObject.data != null
    ) {
      this.pixelArtResponse = responseObject.data;
      console.log(this.pixelArtResponse);
    }
  },
  methods: {
    getBackGroundColor(zeroRowIndex, zeroColIndex) {
      let valueToSearch = this.getAttributeValue(zeroRowIndex, zeroColIndex);
      if (
        this.pixelArtResponse != null &&
        this.pixelArtResponse.hasOwnProperty(valueToSearch)
      ) {
        return this.pixelArtResponse[valueToSearch];
      }
      return "#ffffff";
    },
    getAttributeValue(rowIndex, columIndex) {
      return rowIndex * 15 + columIndex;
    },
    clickedGridCell: async function (event) {
      let clickedCell = event.currentTarget.getAttribute("my-attr");
      let choosenColor = this.pureColor;

      var jsonToSend = {};
      jsonToSend.art_value = choosenColor;
      jsonToSend.pixel_index = clickedCell;

      const responseObject = await supabase.functions.invoke("pixelart", {
        body: JSON.stringify(jsonToSend),
      });

      if (
        responseObject != null &&
        responseObject.hasOwnProperty("data") &&
        responseObject.data != null
      ) {
        this.pixelArtResponse = responseObject.data;
        console.log(this.pixelArtResponse);
      }
    },
    colorChanged: function (event) {
      console.log("colorChanged");
    },
  },
};
</script>

<style scoped>
.pixelgrid {
  margin-left: auto;
  margin-right: auto;
}
table {
  min-width: 600px;
  width: 600px;
}
td {
  display: table-cell;
  border: 2px solid rgb(0, 0, 0);
  width: 30px;
  height: 30px;
  overflow: hidden;
}
</style>