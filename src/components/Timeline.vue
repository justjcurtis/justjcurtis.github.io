<template>
  <div>
    <div class="timeline">
      <TimelineContent
        v-scrollAnimation 
        :side="'left'"
        :date="'2018 - Present'"
        :text="'Mobile software developer @ Ideagen using C# Javascript & Xamarin.Forms.'"
      />
      <TimelineContent
        v-scrollAnimation 
        :side="'right'"
        :date="'2017'"
        :text="'Gymnastics coaching @ Camp Awosting CT & Owner and Biomechanics coach @ FitFix'"
      />
      <TimelineContent
        v-scrollAnimation 
        :side="'left'"
        :date="'2014 - 2016'"
        :text="'Studying Physics BSC @ Open University'"
      />
      <TimelineContent
        v-scrollAnimation 
        :side="'right'"
        :date="'2012 - 2014'"
        :text="'Studying Physics, Maths, Philosophy, Psychology & Law & Bilborough College'"
      />
      <TimelineContent
        v-scrollAnimation 
        :side="'left'"
        :date="'2012 - 2016'"
        :text="'Got back into coding teaching myself Python, JavaScript, HTML & CSS, revisited computer science fundementals learning Linux & bash.'"
      />
      <TimelineContent
        v-scrollAnimation 
        :side="'right'"
        :date="'2005-2009'"
        :text="'Began teaching myself to code, starting with batch files & VB.NET - Quickly moving on to C# & Java.'"
      />
      <TimelineContent
        v-scrollAnimation 
        :side="'left'"
        :date="'2000 - 2012'"
        :text="'School & Internatonal level gymnast representing Team GB Under 16s'"
      />
      <TimelineContent
        v-scrollAnimation 
        :side="'right'"
        :date="'1995'"
        :text="'Born.'"
      />
    </div>
  </div>
</template>

<script>
import TimelineContent from './TimelineContent'
export default {
  name: "Timeline",
  components:{
      TimelineContent
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

/* The actual timeline (the vertical ruler) */
.timeline {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
}

/* The actual timeline (the vertical ruler) */
.timeline::after {
  content: "";
  position: absolute;
  width: 6px;
  background-image: linear-gradient(#191c31, white);
  min-height: 80vh;
  top: 0;
  bottom: 0;
  left: 50%;
  margin-left: -3px;
}

/* Media queries - Responsive timeline on screens less than 600px wide */
@media(orientation: portrait) {
  /* Place the timelime to the r */
  .timeline::after {
    left: 31px;
  }
}
.before-enter{
    z-index: 5;
    opacity: 0;
    transform: translateY(50px);
    transition: all 1s ease-out;
}
.enter{
    opacity: 1;
    transform: translateY(0);
}
</style>