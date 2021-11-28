<template>
  <section>
    <table class="table">
      <thead>
        <th
          v-for="(headerItem, index) in header"
          :key="`${headerItem.columnID}-${index}`"
          class="headercell"
        >
          <sorter-icon
            :headerItem="headerItem"
            v-on:changeSorting="$emit('changeSorting', $event)"
            v-on:fiterTextChanged="$emit('fiterTextChanged', $event)"
          />
        </th>
      </thead>
      <tbody>
        <tr v-for="(row, index) in rows" :key="`row-${index}`">
          <td
            v-for="(key, idx) in header"
            :key="`elem-${index}-${idx}`"
            class="cell"
          >
            {{ row[key.columnID] }}
          </td>
        </tr>
      </tbody>
    </table>
    <OzTablePaginator
      v-if="staticPaging"
      v-on="$listeners"
      :totalPages="totalPages"
      :currentPage="currentPage"
    />
    <div
      v-if="!staticPaging"
      v-detect-viewport="{ callback: $listeners.getPage }"
    >
      ...
    </div>
  </section>
</template>

<script>
import OzTablePaginator from "./oz-table-paginator";
import SorterIcon from "./SorterIcon.vue";

export default {
  name: "SimpleTable",
  components: {
    OzTablePaginator,
    SorterIcon,
  },
  props: {
    header: {
      type: Array,
      default: () => [],
    },
    rows: {
      type: Array,
      default: () => [],
    },
    totalPages: {
      type: Number,
      default: 100,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    staticPaging: {
      type: Boolean,
      default: true,
    },
  },
  computed: {},
  methods: {},
};
</script>

<style scoped>
.table {
  border-spacing: 0;
  margin: 8px;
  width: 100%;
}

.cell {
  text-align: left;
  border-bottom: 1px solid #c8cacc;
  padding: 1rem 1rem;
}

.headercell {
  text-align: left;
  border-bottom: 1px solid #c8cacc;
  padding: 1rem 1rem;
  background: #c7cbcb;
}
</style>
