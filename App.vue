<template>
  <div v-if="surveyCompleted">
      <h1>Thank you for casting your vote!</h1>
      
      For more information about AWS Amplify, visit <a href="https://aws.amazon.com/amplify/">https://aws.amazon.com/amplify/</a>
      <br/>            
      Feel free to connect with me on <a href="https://www.linkedin.com/in/anthonydupre/">linkedin</a>
  </div>
  
  <div v-if="!surveyCompleted">
    <form v-on:submit.prevent="onSubmit">
      <span>Did this DevWednesday Meetup "AWS at Swisscom" fulfill your expectations?</span>
      <star-rating v-model:rating="q1Response"></star-rating>
      
      <span>How would you rate your satisfaction with the first talk by Simon Frei?</span>
      <star-rating v-model:rating="q2Response"></star-rating>
      
      <span>How would you rate your satisfaction with the second talk by Daniel Lorch &amp; Reto Wehrli?</span>
      <star-rating v-model:rating="q3Response"></star-rating>
      
      <span>How would you rate your satisfaction with the third talk by Anthony Dupré</span>
      <star-rating v-model:rating="q4Response"></star-rating>
      
      <span>Do you have any topic suggestions for future DevWednesdays?</span>
      <div>
        <textarea v-model="q5Response" rows="10"></textarea>
      </div>
      
      <span>Would you recommend Dev.Wednesday to a friend?</span>
      <div>
        <input type="radio" :value="true" v-model="q6Response" />
        <label for="one"><span>Yes</span></label>
        <input type="radio" :value="false" v-model="q6Response" />
        <label for="two"><span>No</span></label>
      </div>
      
      <span>Do you have any comments? What did you like/not like about this session?</span>
      <div>
        <textarea v-model="comments" rows="10"></textarea>
      </div>
      <input type="submit" value="Vote!" >
    </form>
  </div>
</template>

<script>
import StarRating from 'vue-star-rating';
import { API } from 'aws-amplify';
import { createSurveyResponse } from './graphql/mutations';

export default {
  name: 'App',
  components: {
    StarRating
  },
  mounted() {
    this.surveyID = localStorage.surveyID
  },
  methods: {
    async onSubmit() {
      const gqlResponse = await API.graphql({
        query: createSurveyResponse,
        variables:  {
            input: {
              q1Response: this.q1Response,
              q2Response: this.q2Response,
              q3Response: this.q3Response,
              q4Response: this.q4Response,
              q5Response: this.q5Response,
              q6Response: this.q6Response,
              comments: this.comments
            }
        }
      });
      
      this.surveyID = localStorage.surveyID = gqlResponse.data.createSurveyResponse.id;
    }
  },
  computed: {
    surveyCompleted() { return this.surveyID || localStorage.surveyID }
  },
  data() {
    return {
      q1Response: 5,
      q2Response: 5,
      q3Response: 5,
      q4Response: 5,
      q5Response: "",
      q6Response: true,
      comments: "",
      surveyID: null
    };
  }
}
</script>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 1em;
}

span {
  font-size: 1.2em;
  margin-top: .4em;
  margin-bottom: .2em;
}

div {
  margin-top: .5em;
  margin-bottom: .5em;
}

textarea {
  width:80%;
}
</style>
