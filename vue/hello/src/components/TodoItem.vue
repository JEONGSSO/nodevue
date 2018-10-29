<template>
    <div>
        <ul>
            <li>{{todo.text}}</li>
        </ul>
    </div>
</template>

<script>
export default {
    name : 'todoitem',
    props: {
        todo : {
            default() {
                return {id:-1, text:'default todo'}
            },
        }
    }
}
</script>

