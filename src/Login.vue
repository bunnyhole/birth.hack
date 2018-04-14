<template>
  <div id="main">
    <div class="login">
      <div class="login-screen">
        <div class="app-title">
          <h1>Авторизация</h1>
        </div>

        <div id="vk_auth"></div>

      </div>
    </div>
  </div>
</template>

<script>
  require("./assets/openapi");
  export default {
    name: "Login",
    created: function() {
      VK.init({
        apiId: 6448277
      });
      VK.Widgets.Auth("vk_auth", {});
    }
  }
</script>


<style>
  #main {
    height: 100%;
    position: relative;

    background-image: url("../images/blur_back.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  * {
    box-sizing: border-box;
  }

  *:focus {
    outline: none;
  }

  .login {
    margin-left: 40% ;
    width: 300px;
  }
  .login-screen {
    padding: 20px;
    border-radius: 5px;
  }

  .app-title {
    text-align: center;
    color: white;
    text-shadow: black 0 0 10px;
  }

  .login-form {
    text-align: center;
  }
  .control-group {
    margin-bottom: 10px;
  }

  input {
    text-align: center;
    background-color: #ECF0F1;
    border: 2px solid transparent;
    border-radius: 3px;
    font-size: 16px;
    font-weight: 200;
    padding: 10px 0;
    width: 250px;
    transition: border .5s;
  }

  input:focus {
    border: 2px solid #3498DB;
    box-shadow: none;
  }

  .btn {
    border: 2px solid transparent;
    background: #2369ab;
    color: #ffffff;
    font-size: 16px;
    line-height: 25px;
    padding: 10px 0;
    text-decoration: none;
    text-shadow: none;
    border-radius: 3px;
    box-shadow: none;
    transition: 0.25s;
    display: block;
    width: 250px;
    margin: 0 auto;
  }

  .btn:hover {
    background-color: #20609c;
  }

  .login-link {
    font-size: 12px;
    color: black;
    display: block;
    margin-top: 12px;
  }
</style>
