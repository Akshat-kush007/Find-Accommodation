const fetchAcc = async ()=>{
    try{
        console.log("AGENT_API: ",endpoints.AI_API)
        const response = await fetch(endpoints.AI_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: `Give me list of Pg in ${city} city ${location} Location response should be in json format a list contain json object, each object contain name, city, location, address, phone` }),
        });

        const data = await response.json();

        // Step 1: Extract the string from the 'output' field
        const rawOutput = data.output;

        // Step 2: Remove the markdown code block
        const cleaned = rawOutput.replace(/```json|```/g, "").trim();

        // Step 3: Parse it into JSON
        let pgList;
        try {
        pgList = JSON.parse(cleaned);
        setAccommodations(pgList || [])
        console.log(pgList); // Now this is a usable JS array
        } catch (error) {
        console.error("Failed to parse PG list:", error);
        }
    }catch(err){
        console.log("fetchAcc Error: ",err)
    }

  }