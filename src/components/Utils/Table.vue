<template>
    <div>
        <table class="table table-hover" v-if="items && items.length > 0">
            <thead>
                <tr class="__tableHead">
                    <th v-for="col in cols" :key="col.key">
                        {{ col.title }}
                    </th>
                </tr>
            </thead>

            <tbody>
                <router-link
                    tag="tr"
                    v-for="item in items"
                    :key="item._id"
                    :to="baseLink + item._id"
                >
                    <td v-for="col in cols" :key="col.key">
                        {{ item[col.key] }}
                    </td>
                </router-link>
            </tbody>
        </table>

        <p v-else class="__secondary">Nothing to see here.</p>
    </div>
</template>

<script>
export default {
    props: {
        items: Array,
        cols: Array,
        baseLink: String
    }
};
</script>

<style scoped>
@import './../../assets/css/table.css';
</style>
