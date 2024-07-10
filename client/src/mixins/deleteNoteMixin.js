export default {
  methods: {
    async deleteNote(id) {
      const isConfirmed = await this.$refs.ConfirmationModal.show("Do you want to delete the note?");

      if (isConfirmed) {
        await this.$store.dispatch('deleteNote', id);
        return true;
      }
    },
  }
}
