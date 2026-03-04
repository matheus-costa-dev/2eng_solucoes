require('dotenv').config();

const endpoint = process.env.HYGRAPH_ENDPOINT;
const token = process.env.HYGRAPH_TOKEN;

async function testHygraphPermissions() {
    const query = `
    query GetTestimonials {
      testimonials(first: 5) {
        name
      }
    }
  `;

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({ query })
        });

        const data = await response.json();
        console.log("Response status:", response.status);
        console.log("Response body:", JSON.stringify(data, null, 2));

        if (data.errors) {
            console.error("GraphQL Errors detected:", data.errors);
        } else {
            console.log("Success! Permisions seem correct.");
        }
    } catch (error) {
        console.error("Network or fetch error:", error);
    }
}

testHygraphPermissions();
