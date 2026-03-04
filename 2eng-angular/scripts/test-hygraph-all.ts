import 'dotenv/config';

const endpoint = process.env['HYGRAPH_ENDPOINT'] || '';
const token = process.env['HYGRAPH_TOKEN'] || '';

if (!endpoint || !token) {
    console.error('Error: HYGRAPH_ENDPOINT or HYGRAPH_TOKEN missing in .env');
    process.exit(1);
}

const headers = {
    'Content-Type': 'application/json',
    'Authorization': token
};

async function fetchGraphQL(queryName: string, queryBody: string) {
    console.log(`\n\n=== Testing [${queryName}] ===`);
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers,
            body: JSON.stringify({ query: queryBody })
        });

        const data = await response.json();
        console.log(`HTTP Status: ${response.status}`);

        if (data.errors) {
            console.error(`❌ Errors in [${queryName}]:`, JSON.stringify(data.errors, null, 2));
        } else {
            const resultKeys = Object.keys(data.data || {});
            const results = data.data[resultKeys[0]];
            console.log(`✅ Success for [${queryName}]! Fetched ${results?.length || 0} items.`);
            if (results?.length > 0) {
                console.log(`Sample item data:`, JSON.stringify(results[0], null, 2));
            }
        }
    } catch (e) {
        console.error(`❌ Network/Fetch error in [${queryName}]:`, e);
    }
}

async function runAllTests() {
    const slidesQuery = `
      query GetSlides {
        slides {
          title
        }
      }
    `;

    const servicesQuery = `
      query GetServices {
        services(first: 5) {
          title
        }
      }
    `;

    const testimonialsQuery = `
      query GetTestimonials {
        testimonials(first: 5) {
          name
        }
      }
    `;

    const clientsQuery = `
      query GetClients {
        clients(first: 5) {
          name
        }
      }
    `;

    await fetchGraphQL('GetSlides', slidesQuery);
    await fetchGraphQL('GetServices', servicesQuery);
    await fetchGraphQL('GetTestimonials', testimonialsQuery);
    await fetchGraphQL('GetClients', clientsQuery);

    console.log('\n\n✅ Todos os testes finalizados.');
}

runAllTests();
