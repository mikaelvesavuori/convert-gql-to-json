# Convert GraphQL schemas to JSON schemas using `graphql-2-json-schema` running on Cloudflare Workers

This deploys a basic API to handle JSON schema conversion of GraphQL schemas.

The actual heavy lifting is done by [graphql-2-json-schema](https://github.com/wittydeveloper/graphql-to-json-schema).

## Prerequisites

- You need a [Cloudflare](https://www.cloudflare.com) account
- You need [Wrangler CLI](https://developers.cloudflare.com/workers/cli-wrangler) installed

## Instructions

- Rename `wrangler dot toml` to `wrangler.toml`
- Insert the `account_id` and `zone_id` values into it
- Deploy with `wrangler publish`

## Example

A basic example is located at `schema.graphql`. The generated output is at `schema.json`.

## Calling the API

```
POST http://127.0.0.1:8787 or https://{worker-name}.{domain}.workers.dev

{
	"body": "\ntype Todo {\n  id: String!\n  name: String!\n  completed: Boolean\n  color: Color\n\n  \"A field that requires an argument\"\n  colors(\n    filter: [Color!]!\n  ): [Color!]!\n}\n\ninput TodoInputType {\n  name: String!\n  completed: Boolean\n  color: Color=RED\n}\n\nenum Color {\n  \"Red color\"\n  RED\n  \"Green color\"\n  GREEN\n}\n\ntype Query {\n  \"A Query with 1 required argument and 1 optional argument\"\n  todo(\n    id: String!,\n    \"A default value of false\"\n    isCompleted: Boolean=false\n  ): Todo\n\n  \"Returns a list (or null) that can contain null values\"\n  todos(\n    \"Reauired argument that is a list that cannot contain null values\"\n    ids: [String!]!\n  ): [Todo]\n}\n\ntype Mutation {\n  \"A Mutation with 1 required argument\"\n  create_todo(\n    todo: TodoInputType!\n  ): Todo!\n\n  \"A Mutation with 2 required arguments\"\n  update_todo(\n    id: String!,\n    data: TodoInputType!\n  ): Todo!\n\n  \"Returns a list (or null) that can contain null values\"\n  update_todos(\n    ids: [String!]!\n    data: TodoInputType!\n  ): [Todo]\n}"
}
```
