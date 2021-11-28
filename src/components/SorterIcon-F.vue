<script lang="jsx">
export default {
  name: "SorterIconF",
  functional: true,
  render(h, dataObject) {
    // console.log(dataObject);
    const { props, listeners, $style } = dataObject;
    function getOrdanceIcon(ordance) {
      if (ordance === "none")
        return (
          <span
            class={$style.icon}
            on={{
              click: () => listeners.changeSorting(props.headerItem.columnID),
            }}
          >
            {props.headerItem.columnID}
          </span>
        );
      if (ordance === "asc" || ordance === "desc") {
        const ordanceIconNames = { asc: "arrow-up", desc: "arrow-down" };
        return (
          <span
            class={$style.icon}
            on={{
              click: () => listeners.changeSorting(props.headerItem.columnID),
            }}
          >
            {props.headerItem.columnID}
            <font-awesome-icon icon={["fas", ordanceIconNames[ordance]]} />
            <span class={$style.priority}>{props.headerItem.priority}</span>
          </span>
        );
      }
    }
    function fiterTextChanged(e) {
      listeners.fiterTextChanged({
        col: props.headerItem.columnID,
        value: e.target.value,
      });
    }
    function getFilterIcon(show) {
      if (show) {
        return (
          <input
            type="text"
            on={{ input: fiterTextChanged }}
            class={$style.filter}
          />
        );
      }
    }
    return (
      <div>
        {getOrdanceIcon(props.headerItem.ordance)}
        {getFilterIcon(props.headerItem.filtered)}
      </div>
    );
  },
};
</script>

<style module>
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
