# KZ CMS API Documentation

This document outlines the available endpoints for the KZ CMS API.
All routes are prefixed with `/v1`.

## Base URL

`/v1`

---

## Pages Endpoints

### GET /v1/pages

*   **Description**: Retrieves a list of all pages.
*   **Method**: `GET`
*   **Authentication**: None required.
*   **Response**: `200 OK`
    ```json
    [
      {
        "id": "string",
        "title": "string",
        "slug": "string",
        "isPublished": "boolean",
        "updatedAt": "Date"
      }
    ]
    ```

### GET /v1/pages/:slug

*   **Description**: Retrieves a single published page by its slug, including its associated blocks.
*   **Method**: `GET`
*   **Authentication**: None required.
*   **Parameters**:
    *   `slug` (Path Parameter): The unique slug of the page.
*   **Response**: `200 OK` if page is found and published, `404 Not Found` otherwise.
    ```json
    {
      "id": "string",
      "title": "string",
      "slug": "string",
      "isPublished": "boolean",
      "updatedAt": "Date",
      "blocks": [
        {
          "id": "string",
          "pageId": "string",
          "type": "string",
          "content": "string",
          "order": "number"
        }
      ]
    }
    ```

### POST /v1/pages

*   **Description**: Creates a new page.
*   **Method**: `POST`
*   **Authentication**: None required (for now, will need to add later).
*   **Request Body**:
    ```json
    {
      "title": "string",
      "slug": "string"
    }
    ```
*   **Response**: `201 Created`
    ```json
    {
      "id": "string",
      "title": "string",
      "slug": "string",
      "isPublished": "boolean",
      "updatedAt": "Date"
    }
    ```

### POST /v1/pages/:id/blocks

*   **Description**: Adds a new block to a specified page.
*   **Method**: `POST`
*   **Authentication**: None required (for now, will need to add later).
*   **Parameters**:
    *   `id` (Path Parameter): The ID of the page to add the block to.
*   **Request Body**:
    ```json
    {
      "type": "string",
      "content": "string",
      "order": "number" // Optional: order of the block within the page
    }
    ```
*   **Response**: `201 Created`
    ```json
    {
      "id": "string",
      "pageId": "string",
      "type": "string",
      "content": "string",
      "order": "number"
    }
    ```
