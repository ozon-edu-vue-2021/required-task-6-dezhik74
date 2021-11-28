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
      v-on:fiterTextChanged="fiterTextChanged"
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
        {
          columnID: "postId",
          ordance: "none",
          priority: 0,
          filtered: true,
          filterText: "",
        },
        {
          columnID: "id",
          ordance: "none",
          priority: 0,
          filtered: false,
          filterText: "",
        },
        {
          columnID: "name",
          ordance: "none",
          priority: 0,
          filtered: false,
          filterText: "",
        },
        {
          columnID: "email",
          ordance: "none",
          priority: 0,
          filtered: true,
          filterText: "",
        },
        {
          columnID: "body",
          ordance: "none",
          priority: 0,
          filtered: false,
          filterText: "",
        },
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
      this.sortByPriority();
      this.getPage(1);
    },
    sortByPriority() {
      // Такая сортировка только из-за того, что ручка одна и данные уже на клиенте!!!
      const sortedPriority = orderBy(this.header, "columnID", "asc");
      sortedPriority.forEach((elem) => {
        if (elem.priority > 0) {
          this.changedData = orderBy(
            this.changedData,
            elem.columnID,
            elem.ordance
          );
        }
      });
    },
    fiterTextChanged({ col, value }) {
      // Такое фильтрование только из-за того, что ручка одна и данные уже на клиенте!!!
      // Сначала формируем массив полей с текстом фильтрации
      this.header.forEach((headerItem) => {
        if (headerItem.columnID === col) {
          headerItem.filterText = value;
        }
      });
      this.clearChangeData();
      // затем проходим по ним и фильтруем там, где непустой текст
      this.header.forEach((headerItem) => {
        if (headerItem.filterText != "") {
          this.changedData = this.changedData.filter((row) => {
            if (typeof row[headerItem.columnID] === "number") {
              return row[headerItem.columnID] === Number(headerItem.filterText);
            } else {
              return row[headerItem.columnID]
                .toUpperCase()
                .includes(headerItem.filterText.toUpperCase());
            }
          });
        }
      });
      this.totalPages = Math.ceil(this.changedData.length / this.pageSize);
      this.sortByPriority();
      this.getPage(1);
    },
    clearChangeData() {
      this.changedData = [];
      this.originalData.map((el) => this.changedData.push(el));
    },
    clearChanges() {
      this.clearChangeData();
      this.totalPages = Math.ceil(this.changedData.length / this.pageSize);
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
