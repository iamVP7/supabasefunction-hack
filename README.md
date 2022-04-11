# Pixel Art
This repo contains the code for the Supbase hackathon

TLDR
The Pixel art project is submitted for Supabase functions hackathon. 

We have 15 * 15 pixel where the whole front end is created using Vue.JS 

Whenever a click is made the pixel clicked and the color code selected is sent to the supabase function, in the supabase function we will be fetching the existing values and then appending this and upsert into the database.  (only two columns, date and JSONB)

The functions consists of three different parts.
1) To Save the pixel information as mentioned before.
2) To fetch pixel created  based on the date / current date.
3) To create the history of date from starting (hackathon stating to current date)

Source can be found in [Github](https://github.com/iamVP7/supabasefunction-hack) and its deployed in [Vercel](https://supabasefunction-hack-ld822443q-iamvp7.vercel.app/)
    

### About Source Code

The source code is divided into two parts

- clientcode
- supabase

#### Clientcode

This is the folder where we are having the front-end of this project. This is written in VueJS 3.

**How to Run Client Code**

First install the dependencies

- node
- vuejs

After that install the dependencies for this project. Goto clientcode/ folder first. Run the below command.

`npm install`

After successfully  finishing the dependency install you can run the code

`npm run dev`


#### Deploying Supabase function

**supabase** folder will have the functions which we are going to run. For now we are going to run and delopy only the *pixelart* function.

Check the blog post by [Supabase Team](https://supabase.com/docs/guides/functions). Our code is also having similar basic knowledge.

