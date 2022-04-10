<template>
  <HelloWorld />
  <div class="history">
    <h3>Feature is coming soon</h3>
    <ul>
      <li v-for="(singleData, index) in dateRange" :key="index">
        {{ singleData }}
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
    /* const responseObject = {
      data: {
        dates_to_send: [
          "2022-04-01",
          "2022-04-02",
          "2022-04-03",
          "2022-04-04",
          "2022-04-05",
          "2022-04-06",
          "2022-04-07",
          "2022-04-08",
          "2022-04-09",
          "2022-04-10",
        ],
      },
      error: null,
    }; */
    if (
      responseObject != null &&
      responseObject.hasOwnProperty("data") &&
      responseObject.data != null &&
      responseObject.data.hasOwnProperty("dates_to_send")
    ) {
      this.dateRange = responseObject.data["dates_to_send"];
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