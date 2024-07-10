<template>
  <div>
    <ConfirmationModal ref="ConfirmationModal" />
    <div class="note__top-actions">

      <router-link to="/" replace>
        <BackIcon />
      </router-link>

      <button @click="changeEditMode()">
        <PencilIcon v-if="!editMode" />
        <PencilOffIcon v-else />
      </button>
      <button @click="deleteAndReturn()">
        <TrashCanIcon />
      </button>
    </div>
    <div class="note__edit" :class="{'note__edit-disabled': !editMode}">
      <div>
        <input @blur="note.title = $event.target.value" :value="note.title" />
      </div>
      <div>
        <div class="note__top-actions">
          <span>Add Task</span>
          <button @click="addTask()"><PlusIcon /></button>
        </div>
        <div v-for="task in note?.tasks">
          <input type="checkbox" v-model="task.is_completed" />
          <input @blur="task.text = $event.target.value" :value="task.text" />

          <button @click="removeTask(task)">
            <TrashCanIcon />
          </button>
        </div>
      </div>
      <div class="note__bottom-actions">
        <button :disabled="undoIsDisabled" class="text" @click="undo()">Undo</button>
        <button :disabled="redoIsDisabled" class="text" @click="redo()">Redo</button>
        <button class="text" @click="saveNote()">Save changes</button>
      </div>
    </div>
  </div>
</template>

<script>
import ConfirmationModal from '../components/ConfirmationModal.vue'
import deleteNoteMixin from '../mixins/deleteNoteMixin.js'

import PlusIcon from '../components/icons/PlusIcon.vue'
import TrashCanIcon from '../components/icons/TrashCanIcon.vue'
import PencilIcon from '../components/icons/PencilIcon.vue'
import PencilOffIcon from '../components/icons/PencilOffIcon.vue'
import BackIcon from '../components/icons/BackIcon.vue'

export default {
  name: 'Edit',
  mixins: [deleteNoteMixin],
  components: {
    ConfirmationModal,
    PlusIcon,
    TrashCanIcon,
    PencilIcon,
    PencilOffIcon,
    BackIcon
  },
  data() {
    return {
      note: {},
      noteLatest: {},
      editMode: false,
      undone: [],
      done: [],
      oldNote: {},
      skipPushing: false
    }
  },
  computed: {
    undoIsDisabled() {
      return !this.done.length;
    },
    redoIsDisabled() {
      return !this.undone.length;
    }
  },
  watch: {
    note: {
      handler(newVal, oldVal) {
        if (this.skipPushing) {
          this.skipPushing = false;
        } else {
          if (Object.keys(this.oldNote).length) {
            this.done.push(structuredClone(this.oldNote));
          }
          this.oldNote = structuredClone(newVal);
          this.undone = [];
        }
      },
      deep: true
    },
  },
  methods: {
    undo() {
      this.skipPushing = true;
      this.oldNote = structuredClone(this.note);
      this.note = structuredClone(this.done.pop());
      this.undone.push(structuredClone(this.oldNote));
    },
    redo() {
      this.skipPushing = true;
      this.oldNote = structuredClone(this.note);
      this.note = structuredClone(this.undone.pop());

      this.done.push(structuredClone(this.oldNote));
    },
    async loadInitial() {
      let noteId = this.$route.params.id;
      this.note = await this.$store.dispatch('getCurrentNote', noteId);
    },
    async changeEditMode() {
      if (this.editMode) {
        const isConfirmed = await this.$refs.ConfirmationModal.show("Do you want to exit edit mode?");

        if (isConfirmed) {
          this.loadInitial();
          this.editMode = false;
        }
      } else {
        this.editMode = true;
      }
    },
    addTask() {
      let tasks;
      tasks = this.note.tasks || [];
      this.note.tasks = [...tasks, {title: null, is_completed: false}];
    },
    removeTask(taskToDelete) {
      this.note.tasks = this.note.tasks.filter((task) => task != taskToDelete);
    },
    async saveNote() {
      await this.$store.dispatch('updateNote', this.note);
      this.editMode = false;
    },
    async deleteAndReturn() {
      const isConfirmed = await this.deleteNote(this.note.id);
      if (isConfirmed) {
        this.$router.replace('/');
      }
    }
  },
  mounted() {
    this.loadInitial();
  }
}
</script>
<style lang="scss" scoped>
  
a, button {
  width: auto;
  svg {
    width: 20px;
  }
}

button:not(.text) {
  cursor: pointer;
  padding: 0;
  width: auto;
  height: auto;
  border: none;
  background: none;
  svg {
    fill: black;
  }
}

.note {
  &__top-actions {
    display: flex;
    .router-link-active {
      margin-right: auto;
    }
    span {
      margin-left: auto;
    }
  }
  &__bottom-actions {
    padding-top: 10px;
  }
  &__edit {
    padding: 10px;
    &-disabled {
      filter: grayscale(80%);
      background-color: grey;
      pointer-events: none;
    }
  }
  input:not([type="checkbox"]) {
    width: 100%;
  }
}
</style>
