<template>
  <div class="data">
    <qrcode-vue :value="url" level="L" :size="150"></qrcode-vue>
    <div>Surveys submitted: <h1>{{numberOfSurveys}}</h1></div>
    <div>Avg satisfaction: <h1>{{avgSat}}</h1></div>
  </div>
  <h1>
      Dashboard
  </h1>
  <div class="info">
    Want to know more about AWS Amplify? Go to <a href="https://aws.amazon.com/amplify">https://aws.amazon.com/amplify</a>
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue'
import aws_exports from './aws-exports';
import { API, graphqlOperation } from 'aws-amplify';
import { onCreateSurveyResponse } from './graphql/subscriptions';
import { listSurveyResponses } from "./graphql/queries";

export default {
  name: 'Dashboard',
  components: {
    QrcodeVue,
  },
  async created() {
    const gqlResponse = await API.graphql({
      query: listSurveyResponses
    });
    this.surveys.push(...gqlResponse.data.listSurveyResponses.items);

    await API.graphql(
        graphqlOperation(onCreateSurveyResponse)
    ).subscribe({
      next: (_) => {
        this.surveys.push(_.value.data.onCreateSurveyResponse);
        this.$toast.info(_.value.data.onCreateSurveyResponse.comments);
      }
    });
  },
  computed: {
    url: () => aws_exports.aws_content_delivery_url,
    numberOfSurveys() {
      return this.surveys ? this.surveys.length :  0;
    },
    avgSat() {
      if(!this.surveys || !this.surveys.length) return 0;
console.log(this.surveys)
      const response1s = this.surveys.filter((_) => _ && _.q1Response).map((_) => _.q1Response);
      console.log(response1s);
      function accumulate({ total, count }, i) {
        console.log(total, count, i)
        return {
          total: total + i,
          count: count+1
        };
      }

      const { total, count } = response1s.reduce(accumulate, { total: 0, count: 0 });
        
      return Math.round(total*10 / count)/10;
    }
  },
  data() {
    return {
      surveys: []
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

.info {
}

.data {
  padding-right: 1em;
  float:right;
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
