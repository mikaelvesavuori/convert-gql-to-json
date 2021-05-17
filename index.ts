import { buildSchema, graphqlSync, getIntrospectionQuery } from 'graphql';

import { fromIntrospectionQuery } from 'graphql-2-json-schema';

const options = {
  ignoreInternals: true,
  nullableArrayItems: true
};

async function convert(req: any) {
  const { method } = req;
  const payload = await req.json();
  if (!payload.body && method !== 'POST')
    return new Response('You need to use the POST method and pass in a GraphQL schema as body.', {
      status: 400
    });

  const schema = buildSchema(payload.body);

  const introspection: any = graphqlSync(schema, getIntrospectionQuery()).data;
  const jsonSchema = fromIntrospectionQuery(introspection, options);

  return new Response(JSON.stringify(jsonSchema), { status: 200 });
}

// @ts-ignore
addEventListener('fetch', (event) => event.respondWith(convert(event.request)));
