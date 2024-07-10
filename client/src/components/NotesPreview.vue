<template>
  <div>
    <ConfirmationModal ref="ConfirmationModal" />
    <div class="note__add">
      Add note
      <button @click="addNote()">
        <PlusIcon />
      </button>
    </div>

    <div class="note__list">

      <div class="note" v-for="note in notes">
        <div class="note__topline">
          <router-link :to="`/edit/${note.id}`" replace>
            <PencilIcon />
          </router-link>
          <button @click="deleteAndRefresh(note.id)">
            <TrashCanIcon />
          </button>
        </div>

        <p>{{ note.title }}</p>
        <div v-for="(task, n) in note.tasks?.slice(0,3)" @click.prevent.self>
          <input :id="`task-${n}`" type="checkbox" :checked="task.is_completed"></input>
          <label :for="`task-${n}`">{{ task.text }}</label>
        </div>
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

import { mapState } from 'vuex';

export default {
  name: 'NotesPreview',
  mixins: [deleteNoteMixin],
  components: {
    ConfirmationModal,
    PlusIcon,
    TrashCanIcon,
    PencilIcon
  },
  computed: mapState(['notes']),
  methods: {
    getNotes() {
      this.$store.dispatch('getNotes');
    },
    async addNote() {
      await this.$store.dispatch('createNote');
      this.getNotes();
    },
    async deleteAndRefresh(id) {
      await this.deleteNote(id);
      this.getNotes();
    }
  },
  mounted() {
    this.getNotes();
  }
}
</script>
<style lang="scss" scoped>
a {
  display: block;
}

a, button {
  width: auto;
  svg {
    width: 20px;
  }
}

.note {
  height: 200px;
  padding: 10px;
  background-color: #fff9ff;
  border-radius: 3%;
  box-shadow: 0px 0px 5px 1px grey;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  &__add {
    display: flex;
    align-items: center;
    button {
      display: flex;
    }
  }

  &__topline {
    display: flex;
    width: 100%;
    justify-content: flex-end;
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    row-gap: 20px;
    column-gap: 20px;
  }

  p {
    margin: unset;
  }
}

button {
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
</style>
