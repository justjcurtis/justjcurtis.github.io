<template>
  <div class="section bg">
    <div class="content">
      <div class="instructions non-mobile">
        <h1>Contact</h1>
        <p>
          Feel free to contact me here if you have any feedback for this site or
          any of the project sites.
        </p>
        <p>
          If you have any ideas for new projects you'd like to see here let me
          know.
        </p>
        <p>Red squares represent squres already visited and evaluated.</p>
        <span class="highlight">
          <p>
            I hope you've enjoyed the site & got a decent score on spaceJnvaders
            :)
          </p>
        </span>
      </div>
      <div class="standoff">
        <form action="https://formspree.io/f/xqkgqvgq" method="POST">
          <p>Your email:</p>
          <input type="text" name="_replyto" />
          <p>Your message:</p>
          <textarea name="message"></textarea>
          <br />
          <button type="submit">Send</button>
        </form>
      </div>
      <div class="instructions mobile">
        <h1>Contact</h1>
        <p>
          Feel free to contact me here if you have any feedback for this site or
          any of the project sites.
        </p>
        <p>
          If you have any ideas for new projects you'd like to see here let me
          know.
        </p>
        <p>Red squares represent squres already visited and evaluated.</p>
        <span class="highlight">
          <p>
            I hope you've enjoyed the site & got a decent score on spaceJnvaders
            :)
          </p>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "About",
  created() {
    this.land();
  },
  methods: {
    ...mapActions(["land"]),
  },
};
</script>

<style scoped>
@media (orientation: landscape) {
  .bg {
    background: #191c31;
    overflow: hidden;
  }
  .content {
    display: inline;
    padding-top: 50px;
  }
  .standoff {
    display: inline-block;
    margin: 0 auto;
    padding: 15px;
    border-radius: 1em;
    background: #191c31;
    /* filter: drop-shadow(0px 0px 10px #0c0d18); */
    width: 50vw;
  }
  .standoff p {
    color: white;
  }
  textarea {
    resize: none;
    width: 30vw;
    height: 20vh;
  }
  .instructions {
    display: inline-block;
    width: 30vw;
  }
  .instructions > p {
    margin: 1em;
    font-size: 1.5vw;
    text-align: start;
  }
  .highlight > p {
    color: #ff9c40;
    font-size: 1.5vw;
    text-align: start;
    margin: 1em;
  }
  .mobile {
    display: none;
  }
}
@media (orientation: portrait) {
  .bg {
    background: #191c31;
    overflow: hidden;
  }
  .content {
    display: inline;
    padding-top: 50px;
  }
  .standoff {
    display: inline-block;
    margin: 3vh auto 0 auto;
    padding: 15px;
    border-radius: 1em;
    background: #191c31;
    filter: drop-shadow(0px 0px 10px #0c0d18);
    width: 80vw;
  }
  .standoff p {
    color: white;
  }
  textarea {
    resize: none;
    width: 75vw;
    height: 20vh;
  }
  .instructions {
    display: block;
    width: 100%;
  }
  .instructions > p {
    margin-top: 0;
    margin-left: 1em;
    margin-right: 1em;
    font-size: 0.8em;
    text-align: start;
  }
  .highlight > p {
    margin-right: 1em;
    margin-top: 0;
    color: #ff9c40;
    font-size: 0.8em;
    text-align: start;
    margin-left: 1em;
  }
  .non-mobile {
    display: none;
  }
}
</style>