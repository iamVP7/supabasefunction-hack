<template>
  <HelloWorld />
  <div>
    <h1>About this Pixel Art</h1>
    <p>
      This is done for supabase hackathon. Source can be found in
      <a href="https://github.com/iamVP7/supabasefunction-hack">Github</a>
      and its deployed in
      <a href="https://supabasefunction-hack-ld822443q-iamvp7.vercel.app/"
        >Vercel</a>
    </p>
    <p>
      <b>Note:</b> As of now its not authenticated, its public which means the
      art pixel which you have contributed can be updated with different color
      by others too.
    </p>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
export default {
  name: "App",
  components: {
    HelloWorld,
  },
};
</script>