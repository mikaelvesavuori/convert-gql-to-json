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
