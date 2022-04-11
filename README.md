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


### What is happening in Function

For now our function will be accepting only the *POST* call. We will have different actions based on the values coming to the function.

#### To Add New Pixel

In order to add new pixel color, we will be clicking in the UI. For this action we need to send two values in our POST body JSON

```json
{
    "art_value" : "#345662",
    "pixel_index" : "214"
}
```

So the *art_value* will be having the color which we want to save and the *pixel_index* will be having the pixel id where we want to save the color. Basically in the backend we will check if both values present and if its present then we will be fetching the existing values from database. And then replace this value in the existing JSON, *upsert* into the database.

#### To Fetch History of Dates

We have to know the date range of the pixel art. Since the event has started from April 1st 2022, we will be feching this value from function.

```json
{
"date_range" : ""
}
```

For his empty date_range JSON is sent to function, and in the function we will be calcuating the date range from April 1st 2022 to current date and return it back to client.  We can do this operation in client also but we have to format the date so its slightly memory consumption process.
#### To Fetch History

We can fetch the last saved version of the pixel art via our History page for this we need to have date which we are fetching.


```json
{
    "date_to_fetch" : "2022-04-09"
}
```

So when we click on the date from history page we will be having the dynamic router with date as param. We will fetch the date and send the above JSON to the server. 
Based on the date provided we will fetch from the server and send to client.


We can improve this in future with authetication and also multi-play mode in future.