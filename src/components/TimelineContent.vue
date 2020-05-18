<template>
    <div>
      <div :class="`timelineContainer ${side}`">
        <div class="timelineContent">
          <h2>{{date}}</h2>
          <p>{{text}}</p>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    name:'TimelineContent',
    props:["side", "date", "image", "text"]
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

/* timelineContainer around timelineContent */
.timelineContainer {
  padding: 10px 40px;
  position: relative;
  background-color: inherit;
  width: 50%;
}

/* The circles on the timeline */
.timelineContainer::after {
  content: "";
  position: absolute;
  width: 25px;
  height: 25px;
  right: -17px;
  background-color: #191c31;
  border: 4px solid #ff9c40;
  top: 15px;
  border-radius: 50%;
  z-index: 1;
}

/* Place the timelineContainer to the left */
.left {
  left: 0;
}

/* Place the timelineContainer to the right */
.right {
  left: 50%;
}

/* Add arrows to the left timelineContainer (pointing right) */
.left::before {
  content: " ";
  height: 0;
  position: absolute;
  top: 22px;
  width: 0;
  z-index: 1;
  right: 30px;
  border: medium solid #2f303a;
  border-width: 10px 0 10px 10px;
  border-color: transparent transparent transparent #2f303a;
}

/* Add arrows to the right timelineContainer (pointing left) */
.right::before {
  content: " ";
  height: 0;
  position: absolute;
  top: 22px;
  width: 0;
  z-index: 1;
  left: 30px;
  border: medium solid #2f303a;
  border-width: 10px 10px 10px 0;
  border-color: transparent #2f303a transparent transparent;
}

/* Fix the circle for timelineContainers on the right side */
.right::after {
  left: -16px;
}

/* The actual timelineContent */
.timelineContent {
  padding: 20px 30px;
  background-color: #2f303a;
  position: relative;
  border-radius: 6px;
}

/* Media queries - Responsive timeline on screens less than 600px wide */
@media(orientation: portrait) {
  /* Full-width timelineContainers */
  .timelineContainer {
    width: 100%;
    padding-left: 70px;
    padding-right: 25px;
  }

  /* Make sure that all arrows are pointing leftwards */
  .timelineContainer::before {
    left: 60px;
    border: medium solid #2f303a;
    border-width: 10px 10px 10px 0;
    border-color: transparent #2f303a transparent transparent;
  }

  /* Make sure all circles are at the same spot */
  .left::after,
  .right::after {
    left: 15px;
  }

  /* Make all right timelineContainers behave like the left ones */
  .right {
    left: 0%;
  }
}
</style>