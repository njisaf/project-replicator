<script>
    function handleClick() {
        alert("Hello there");
    }
</script>

<button on:click={handleClick}> Click Me </button>

<style>
    button {
        padding: 10px;
        font-size: 16px;
        cursor: pointer;
    }
</style>
