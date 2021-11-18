# Pre-requisites

Install Vue.js CLI

Install Amplify CLI


# Creating the app

Run the following commands on the command line in the folder you want to put your code in (vue create will create a directory for you)
```
vue create bern-survey 
cd bern-survey 
amplify init
npm install --save vue-star-rating@next @meforma/vue-toaster aws-amplify qrcode.vue
amplify api add
```

Move main.js, Dashboard.vue and App.vue to the src folder (this will overwrite some of the files)

Move schema.js to the amplify/backend/api/survey/ folder

# Deploy
```
amplify hosting add
amplify publish
```
