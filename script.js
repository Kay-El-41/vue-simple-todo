const { createApp } = Vue;
const app = createApp({
  data() {
    return {
      inputTracker: "",
      todoLs: [],
      activeStatus: "all",
      totalTodo: 0,
    };
  },
  computed: {
    isToDoExist() {
      return this.todoLs.length > 0 ? true : false;
    },
    filteredTodo() {
      if (this.activeStatus === "all") {
        return this.todoLs;
      }
      if (this.activeStatus === "active") {
        return this.todoLs.filter((todo) => todo.isCompleted === false);
      }
      if (this.activeStatus === "completed") {
        return this.todoLs.filter((todo) => todo.isCompleted === true);
      }
    },
    // totalTodo() {
    //   return this.filteredTodo.length;
    // },
  },
  watch: {
    "filteredTodo.length": {
      handler() {
        this.totalTodo = this.filteredTodo.length;
      },
      immediate: true,
    },
  },
  methods: {
    addNewTodo() {
      const newTodo = {
        id:
          this.todoLs.length !== 0
            ? this.todoLs[this.todoLs.length - 1].id + 1
            : 0,
        isCompleted: false,
        title: this.inputTracker,
      };
      this.todoLs.push(newTodo);
      this.inputTracker = "";
    },
    deleteTodo(id) {
      this.todoLs = this.todoLs.filter((todo) => todo.id !== id);
    },
    setFilterStatus(status) {
      this.activeStatus = status;
    },
  },
});

app.mount("#app");
