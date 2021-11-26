<template>
  <section>
    Простая таблица
    <hr />
    <label for="paging">Стаическая пагинация</label>
    <input
      type="checkbox"
      id="paging"
      v-bind:checked="staticPaging"
      @change="changeStaticPaging"
    />
    <button @click="clearChanges">Reset</button>
    <simple-table
      :rows="rows"
      :header="header"
      v-on:getPage="getPage"
      v-on:changeSorting="changeSorting"
      :totalPages="totalPages"
      :currentPage="currentPage"
      :staticPaging="staticPaging"
    />
  </section>
</template>

<script>
import SimpleTable from "../components/SimpleTable.vue";
import { orderBy } from "lodash/collection";

export default {
  name: "SimpleTableWrapper",
  components: {
    SimpleTable,
  },
  data() {
    return {
      header: [
        { columnID: "postId", ordance: "none", priority: 0 },
        { columnID: "id", ordance: "none", priority: 0 },
        { columnID: "name", ordance: "none", priority: 0 },
        { columnID: "email", ordance: "none", priority: 0 },
        { columnID: "body", ordance: "none", priority: 0 },
      ],
      rows: [], // строки, которые идут в таблицу
      changedData: [], //отсортированные и отфильтрованные данные
      pageSize: 10,
      totalPages: 0, //вычисляется
      currentPage: 1,
      staticPaging: true,
    };
  },
  props: {
    originalData: {
      type: Array,
      default: () => [],
    },
  },
  created() {
    // console.log("created", this.originalData.length);
    this.clearChanges();
  },
  methods: {
    getPage(number) {
      if (this.staticPaging) {
        // console.log("getpage", number, this.currentPage);
        if (number <= this.totalPages && number >= 1) {
          // console.log("Number = ", number);
          this.currentPage = number;
          // console.log("Curr page= ", this.currentPage);
        }
        this.rows = this.changedData.slice(
          (this.currentPage - 1) * this.pageSize,
          this.currentPage * this.pageSize
        );
      } else {
        this.currentPage++;
        this.rows = this.changedData.slice(0, this.currentPage * this.pageSize);
      }
    },
    changeStaticPaging() {
      this.staticPaging = !this.staticPaging;
      this.getPage(1);
    },
    changeSorting(columnID) {
      // console.log("сортировка ", columnID);
      let filteredItems = this.header.filter(
        (itm) => itm.columnID === columnID
      );
      if (filteredItems.length === 0) {
        return;
      }
      let headerItem = filteredItems[0];
      let oldPriority = headerItem.priority;
      switch (headerItem.ordance) {
        case "none":
          headerItem.ordance = "asc";
          this.header.forEach((item) => {
            if (item.priority !== 0) {
              item.priority++;
            }
          });
          headerItem.priority = 1;
          break;
        case "asc":
          headerItem.ordance = "desc";
          break;
        case "desc":
          headerItem.ordance = "none";
          headerItem.priority = 0;
          this.header.forEach((item) => {
            if (item.priority !== 0 && item.priority > oldPriority) {
              item.priority--;
            }
          });
      }
      this.changedData = orderBy(
        this.changedData,
        headerItem.columnID,
        headerItem.ordance
      );
      this.getPage(1);
    },
    clearChanges() {
      // console.log("clear sorting");
      this.changedData = [];
      this.originalData.map((el) => this.changedData.push(el));
      this.totalPages = Number(this.changedData.length / this.pageSize);
      this.staticPaging = true;
      this.header.map((item) => {
        item.priority = 0;
        item.ordance = "none";
      });
      this.getPage(1);
    },
  },
};
</script>
