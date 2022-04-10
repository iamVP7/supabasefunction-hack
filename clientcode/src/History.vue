<template>
  <HelloWorld />
  <div class="history">
    <h3>
      This page will have the history of the Pixel art created at the end of the
      day
    </h3>
    <ul>
      <li v-for="(singleData, index) in dateRange" :key="index">
        <router-link
          :to="{ name: 'HistoryPage', params: { historydate: singleData } }"
          >{{ singleData }}</router-link
        >
      </li>
    </ul>
  </div>
</template>
<script>
import HelloWorld from "./components/HelloWorld.vue";
import supabase from "./js/supabaseClient";
export default {
  name: "History",
  components: {
    HelloWorld,
  },
  data() {
    return {
      dateRange: [],
    };
  },
  async mounted() {
    var jsonData = {
      date_range: "",
    };

    const responseObject = await supabase.functions.invoke("pixelart", {
      body: JSON.stringify(jsonData),
    });
    if (
      responseObject != null &&
      responseObject.hasOwnProperty("data") &&
      responseObject.data != null &&
      responseObject.data.hasOwnProperty("dates_to_send")
    ) {
      var tempValue = responseObject.data["dates_to_send"];
      if (tempValue != null) {
        tempValue.reverse();
      }
      this.dateRange = tempValue;
    }
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
}
li {
  position: relative;
  left: -10px;
  margin-bottom: 15px;
}
</style>