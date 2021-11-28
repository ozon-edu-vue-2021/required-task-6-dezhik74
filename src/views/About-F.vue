<script lang="jsx">
import imgComponentPerformance from "../assets/components.png";
import imgFuncComponentPerformance from "../assets/func-components.png";
export default {
  components: {
    imgComponentPerformance,
    imgFuncComponentPerformance,
  },
  render() {
    return (
      <div class={this.$style.about}>
        <h2>Пункты навигации</h2>
        <h4>Простая</h4>
        <p>статическая и бесконечная пагинация</p>
        <p>Фильтрация по двум, но можно и более столбцам</p>
        <p>Многоуровневая сортировка</p>
        <h4>Виртуальный скролл</h4>
        <p>
          виртуальный скролл по уже загруженным данным(!!! мне не удалось
          добиться нормальной работоспособности)
        </p>
        <h4>Оценка производительности</h4>
        <p>
          Сложно оценить, так как, по моему мнеию, Vue dev tools не видят
          функциональных компонент
        </p>
        <img src={imgComponentPerformance} />
        <p>Это с простыми компонентами</p>
        <img src={imgFuncComponentPerformance} />
        <p>Это с функциональными компонентами</p>
        <p></p>
        <p>
          Я еще пробовал оценить с помощью performance обычных dev tools, и там
          получилось одинаковое время
        </p>
      </div>
    );
  },
};
</script>

<style module>
.about {
  text-align: left;
}
</style>
