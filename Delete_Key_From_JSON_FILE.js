const fs = require('fs');

 const filePath = 'countries+states.json';
   
    const keyToDelete = "state_code";
    deleteKeyFromJson(filePath, keyToDelete);
    function deleteKeyFromJson(filePath, keyToDelete) {
      // Read the JSON file
      fs.readFile(filePath, 'utf8', (err, data) => {
        console.log("hello this is readifl", keyToDelete)
          if (err) {
              console.error('Error reading the file:', err);
              return;
          }
    
          // Parse the JSON data
          let jsonData;
          try {
              jsonData = JSON.parse(data);
          } catch (parseErr) {
              console.error('Error parsing JSON:', parseErr);
              return;
          }
          console.log(jsonData)
    
          // Delete the key from the JSON data
          function deleteNestedKey(obj, keyToDelete) {
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (key === keyToDelete) {
                        delete obj[key];
                    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                        deleteNestedKey(obj[key], keyToDelete);
                    }
                }
            }
        }

        // Call the function to delete the key
        deleteNestedKey(jsonData, keyToDelete);
          // Write the updated JSON data back to the file
          fs.writeFile(filePath, JSON.stringify(jsonData, null, 4), 'utf8', (writeErr) => {
            console.log("writing started")
              if (writeErr) {
                  console.error('Error writing to the file:', writeErr);
              } else {
                  console.log(`Key "${keyToDelete}" has been deleted from the JSON data.`);
              }
          });
      });
    }
    res.status(200).json();
