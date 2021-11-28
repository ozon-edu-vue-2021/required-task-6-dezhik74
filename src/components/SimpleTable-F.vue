<script lang="jsx">
import OzTablePaginator from "./oz-table-paginator";
import SorterIconF from "./SorterIcon-F.vue";

export default {
  name: "SimpleTableF",
  functional: true,
  components: {
    OzTablePaginator,
    SorterIconF,
  },
  render(h, dataObject) {
    // console.log(dataObject);
    const { props, $style, listeners } = dataObject;

    function getPaginator() {
      const directives = [
        {
          name: "detect-viewport",
          value: {
            callback: listeners.getPage,
          },
        },
      ];

      if (props.staticPaging) {
        return (
          <OzTablePaginator
            on={listeners}
            totalPages={props.totalPages}
            currentPage={props.currentPage}
          />
        );
      } else {
        return <div {...{ directives: directives }}>...</div>;
      }
    }

    return (
      <section>
        <table class={$style.table}>
          <thead>
            {...props.header.map((item) => {
              return (
                <th class={$style.headercell}>
                  <SorterIconF
                    headerItem={item}
                    on={{
                      changeSorting: (e) => {
                        listeners.changeSorting(e);
                      },
                      fiterTextChanged: (e) => {
                        listeners.fiterTextChanged(e);
                      },
                    }}
                  />
                </th>
              );
            })}
          </thead>
          <tbody>
            {...props.rows.map((row) => {
              // console.log(row.name);
              return (
                <tr>
                  {...props.header.map((headerItem) => {
                    return (
                      <td class={$style.cell}>{row[headerItem.columnID]}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        {getPaginator()}
      </section>
    );
  },
};
</script>

<style module>
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
