// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.131.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@^1.33.2"

export const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey',
}

export const supabaseClient = createClient(
    // Supabase API URL - env var exported by default when deployed.
    'https://mwwrzadxsiodfzxknimw.supabase.co',
    // Supabase API ANON KEY - env var exported by default when deployed.
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNjAyNzgzNCwiZXhwIjoxOTUxNjAzODM0fQ.CO-N6xL40HPI9SooPTdSCMB04_h3exeI5EZm7aRsiuI'
)

type PixelArtEntry = {
    created_date: string;
    pixel_value: string;
}
//console.log("Hello from Functions!")

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    } else if (req.method === 'POST') {

        var data: { [k2: string]: any } = {};
        // Get the JSON Body
        var postJSONBody = await req.json();

        console.log("The next line is the Post Body")
        console.log(postJSONBody)

        // Parse all the keys
        const jsonKeys: { [k: string]: any } = Object.keys(postJSONBody);

        let currentDate = new Date()
        var utcDate = currentDate.toISOString().split('T')[0]

        // we will have json like {"art_value": "#EA2134", "pixel_index" :"0"}}
        if (jsonKeys.includes('art_value') && jsonKeys.includes('pixel_index')) {
            const colorCodeToAdd = postJSONBody["art_value"];
            const colorIndex = postJSONBody.pixel_index;

            var singleFetchedRow: { [k1: string]: any } = await fetchDBValue(utcDate);

            singleFetchedRow[colorIndex] = colorCodeToAdd;
            const upsertResponse = await supabaseClient
                .from('functionhackathon')
                .upsert({ "pixel_value": singleFetchedRow });
            data = await fetchDBValue(utcDate);
        } else if (jsonKeys.includes('date_to_fetch')) {
            var tempDate = postJSONBody.date_to_fetch;
            let parsedDate = new Date(tempDate);
            utcDate = parsedDate.toISOString().split('T')[0];
            console.log('The date we are going to fetch ' + utcDate)
            data = await fetchDBValue(utcDate);
        } else if (jsonKeys.includes('date_range')) {
            let dateInItreation = new Date("2022-04-01");
            var dateToSend = [];
            while (dateInItreation < currentDate) {
                var modifiedDate = dateInItreation.toISOString().split('T')[0]
                dateToSend.push(modifiedDate);
                dateInItreation.setDate(dateInItreation.getDate() + 1);
            }
            data.dates_to_send = dateToSend;
        } else {
            data = await fetchDBValue(utcDate);
        }

        return new Response(
            JSON.stringify(data),
            {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 200

            },
        )
    }
    return new Response('ok', { headers: corsHeaders })

})

// This method will be fetching the values based on date
async function fetchDBValue(utcDate: any) {
    const response = await supabaseClient
        .from<PixelArtEntry>('functionhackathon')
        .select('*')
        .eq('created_date', utcDate);
    const arrayOfRows = response.data;

    console.log(arrayOfRows)

    var singleFetchedRow: { [k1: string]: any } = {}
    if (arrayOfRows != null) {
        var tempWholeSingleRow = arrayOfRows[0];

        if (tempWholeSingleRow != null && tempWholeSingleRow.hasOwnProperty('pixel_value')) {
            var fetchedJSON = tempWholeSingleRow['pixel_value'];
            if (fetchedJSON != null) {
                console.log(fetchedJSON)
                const fetchedJSONKeys: { [k: string]: any } = Object.keys(fetchedJSON);
                if (fetchedJSONKeys != null) {
                    fetchedJSONKeys.forEach((element: any) => {
                        singleFetchedRow[element] = fetchedJSON[element];
                    });
                }
            }
        }
    }
    return singleFetchedRow;
}