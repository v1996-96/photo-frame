<script>
export default {
    name: 'Delayed',

    props: {
        wait: {
            type: Number,
            default: 0,
        },
    },

    data: () => ({
        waiting: true,
    }),

    created() {
        this.timer = setTimeout(() => {
            this.waiting = false;
        }, this.wait);
    },

    destroyed() {
        clearTimeout(this.timer);
    },

    render(h) {
        return h('div', this.waiting ? this.$slots.loading || null : this.$slots.default);
    },
};
</script>
