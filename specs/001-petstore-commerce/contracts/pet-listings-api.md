# Contract: Pet Listings API

Base path: `/lumba/api/v1`

## Common Response Shape

Each listing response includes the pet's identifier, name, category, age, price, availability, description, image
reference, and audit timestamps.

## List Pet Listings

- `GET /lumba/api/v1/pets`
- Returns the catalog of pet listings with fields needed for browsing, filtering, and detail display.
- Supports optional query parameters for search, category, price range, age range, and availability.

## Get Pet Listing

- `GET /lumba/api/v1/pets/{id}`
- Returns one pet listing or a not-found response.

## Create Pet Listing

- `POST /lumba/api/v1/pets`
- Creates a new pet listing.
- Requires validation for required catalog fields.

## Update Pet Listing

- `PUT /lumba/api/v1/pets/{id}`
- Replaces or updates a pet listing.
- Returns the updated record.

## Delete Pet Listing

- `DELETE /lumba/api/v1/pets/{id}`
- Removes a pet listing from the catalog.

## Expected Behavior

- Validation failures return clear client errors.
- Unavailable pets remain in the catalog data but must be marked so the storefront can hide or disable purchase-like actions.
- Responses should be shaped so the frontend can render cards, detail views, filters, and saved-item controls without extra transformation.
