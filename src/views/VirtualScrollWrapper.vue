<template>
  <div class="wrapper">
    <div class="header">
      <span
        v-for="(key, index) in getKeys"
        :key="`${key}-${index}`"
        class="headercell"
      >
        {{ key }}
      </span>
    </div>
    <RecycleScroller
      :items="originalData"
      :item-size="55"
      key-field="id"
      :buffer="2000"
      page-mode
      v-slot="{ item }"
    >
      <div class="row">
        <div class="item">{{ item.postId }}</div>
        <div class="item">{{ item.id }}</div>
        <div class="item">{{ item.name }}</div>
        <div class="item">{{ item.email }}</div>
        <div class="item">{{ item.body }}</div>
        <!-- <div
          v-for="(key, index) in getKeys"
          :key="`${index}-${item.id}`"
          class="item"
        >
          {{ item[key] }}
        </div> -->
      </div>
    </RecycleScroller>
  </div>
</template>

<script>
export default {
  name: "VirtuaScrollWrapper",
  props: {
    originalData: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    getKeys() {
      if (this.originalData.length === 0) return [];
      const res = [];
      for (let key in this.originalData[0]) {
        res.push(key);
      }
      return res;
    },
  },
};
</script>

<style scoped>
.wrapper {
  margin: 0 15px;
  text-align: left;
}

.header {
  display: grid;
  grid-template-columns: 5% 5% 10% 10% 60%;
  column-gap: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid gray;
  margin-bottom: 10px;
}

.headercell {
  font-weight: bold;
}

/* .row {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 30px;
}
.item {
  margin-right: 10px;
} */

.row{
  display: grid;
  grid-template-columns: 5% 5% 10% 10% 60%;
  column-gap: 10px;
}

.item {
  word-wrap: break-word;
  white-space: normal;
  height: 55px;
}
</style>
