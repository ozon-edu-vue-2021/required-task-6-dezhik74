<template>
  <div>
    <span @click="changeState" class="icon">
      {{ headerItem.columnID }}
      <span v-if="headerItem.ordance === 'none'"></span>
      <template v-if="headerItem.ordance === 'asc'">
        <font-awesome-icon :icon="['fas', 'arrow-up']" />
        <span class="priority">
          {{ headerItem.priority }}
        </span>
      </template>
      <template v-if="headerItem.ordance === 'desc'">
        <font-awesome-icon :icon="['fas', 'arrow-down']" />
        <span class="priority">
          {{ headerItem.priority }}
        </span>
      </template>
    </span>
    <template v-if="headerItem.filtered">
      <input type="text" @input="fiterTextChanged" @click.stop class="filter" />
    </template>
  </div>
</template>

<script>
export default {
  name: "SorterIcon",
  data() {
    return {
      // state: "none",
      // stateVariants: ["asc", "desc"],
    };
  },
  props: {
    headerItem: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    changeState() {
      this.$emit("changeSorting", this.headerItem.columnID);
    },
    callFilterDropDown() {
      console.log("filter dr");
    },
    fiterTextChanged(e) {
      // console.log("filter text", e.target.value);
      this.$emit("fiterTextChanged", {
        col: this.headerItem.columnID,
        value: e.target.value,
      });
    },
  },
};
</script>

<style>
.icon {
  cursor: pointer;
  user-select: none;
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}

.priority {
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  border: 1px solid gray;
  border-radius: 50%;
  width: 14px;
  height: 14px;
  margin-left: 4px;
}

.filter {
  margin: auto;
  width: 100%;
}
</style>
