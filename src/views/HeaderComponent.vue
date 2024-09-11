<template>
    <header class="myblog-header">
      <span>EVERYTHING IS PERSONAL. INCLUDING THIS BLOG.</span>
      <h1>Train of Thought</h1>
      <nav class="myblog-nav">
        <div><RouterLink to="/">Home</RouterLink></div>
        <div><RouterLink to="/about">About</RouterLink></div>
        <div><RouterLink to="/myblog">My Blog</RouterLink></div>
        <div><RouterLink to="/write">My Blog(write)</RouterLink></div>
        <div><RouterLink to="/select">Select</RouterLink></div>
      </nav>
    </header>
</template>

<style scoped>
.myblog-header {
    text-align: center;
    margin-bottom: 10rem;
}
.myblog-header span {
    font-size: 2.1rem;
}
.myblog-header h1 {
    margin-top: 10px;
    font-size: 7rem;
}

.myblog-nav {
    display: flex;
    justify-content: center;
    border: 1px solid black;
    height: 3.5rem;
    border-left: none;
    border-right: none;
}

.myblog-nav div {
    display: flex;
    align-items: center; 
    justify-content: center;
    
    height: 100%;
    width: 12rem;
    border: 1px solid black;
    border-right: none;
    border-bottom: none;
    border-top: none;
}

.myblog-nav div:first-child {
    border-left: none;
}

</style>