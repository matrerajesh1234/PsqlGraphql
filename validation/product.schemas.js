import Joi from "joi";

export const productSchemas = {
  body: Joi.object({
    productName: Joi.string().required().messages({
      "string.empty": "Product name cannot be empty",
      "any.required": "Product name is required",
    }),
    description: Joi.string()
      .required()
      .messages({
        "string.empty": "Description cannot be empty",
        "any.required": "Description is required",
      })
      .max(255)
      .messages({
        "string.max": "Description length should not exceed 255 characters",
      }),
    productDetails: Joi.string()
      .required()
      .messages({
        "string.empty": "Product details cannot be empty",
        "any.required": "Product details are required",
      })
      .max(255)
      .messages({
        "string.max": "Product details length should not exceed 255 characters",
      }),
    price: Joi.number()
      .required()
      .messages({
        "number.base": "Price should be a number",
        "any.required": "Price is required",
      })
      .positive()
      .messages({
        "number.positive": "Price should be a positive number",
      }),
    color: Joi.string()
      .required()
      .messages({
        "string.empty": "Color cannot be empty",
        "any.required": "Color is required",
      })
      .pattern(/^#[0-9a-fA-F]{6}$/)
      .messages({
        "string.pattern.base":
          "Color should be in hexadecimal format like #ffffff",
      }),
    rating: Joi.number()
      .precision(3)
      .positive()
      .optional()
      .allow(null)
      .messages({
        "number.positive": "Rating should be a positive number",
      }),
    reviews: Joi.string().optional().allow(null).messages({
      "string.base": "Review should be a string",
    }),
    brand: Joi.string().optional().allow(null),
    categoryId: Joi.alternatives().try(
      Joi.string().pattern(new RegExp("^[0-9]+$")).required().messages({
        "string.pattern.base": "Category Id must be in integer format",
        "string.empty": "Category Id cannot be empty",
        "any.required": "Category Id is required",
      }),
      Joi.array()
        .items(Joi.string().pattern(new RegExp("^[0-9]+$")).required())
        .min(1)
        .required()
        .messages({
          "array.base": "Category Id should be an array",
          "array.min": "At least one Category Id is required",
          "any.required": "Category Id is required",
          "string.pattern.base": "Category Id must be in integer format",
        })
    ),
    filesSchema: Joi.object({
      imageUrl: Joi.alternatives().conditional("imageUrl", {
        is: Joi.exist(), // If imageUrl is present
        then: Joi.alternatives()
          .try(
            Joi.object({
              name: Joi.string().required(),
              data: Joi.binary().required(),
              size: Joi.number().required(),
              encoding: Joi.string().required(),
              tempFilePath: Joi.string().allow(""),
              truncated: Joi.boolean().required(),
              mimetype: Joi.string()
                .valid("image/jpeg", "image/png", "image/gif")
                .required(),
              md5: Joi.string().required(),
              mv: Joi.function().required(),
            }),
            Joi.array()
              .items(
                Joi.object({
                  name: Joi.string().required(),
                  data: Joi.binary().required(),
                  size: Joi.number().required(),
                  encoding: Joi.string().required(),
                  tempFilePath: Joi.string().allow(""),
                  truncated: Joi.boolean().required(),
                  mimetype: Joi.string()
                    .valid("image/jpeg", "image/png", "image/gif")
                    .required(),
                  md5: Joi.string().required(),
                  mv: Joi.function().required(),
                })
              )
              .min(1) // Ensure at least one image is present in the array
          )
          .required()
          .messages({
            "any.required": "Image is required",
            "array.min": "At least one image is required",
            "string.valid":
              "Invalid image type, only jpeg, png, or gif are allowed",
          }),
        otherwise: Joi.string().required().messages({
          "any.required": "Image is required",
          "string.empty": "Image cannot be empty",
        }),
      }),
    }).messages({
      "array.min": "At least one image is required",
      "string.valid": "Invalid image type, only jpeg, png, or gif are allowed",
    }),
  }),
  params: Joi.object({
    id: Joi.string().required().messages({
      "string.empty": "Product ID cannot be empty",
      "any.required": "Product ID is required",
    }),
  }),
  query: Joi.object({
    search: Joi.string().optional().allow("").max(255).messages({
      "string.max": "Search query length should not exceed 255 characters",
    }),
    page: Joi.number().integer().positive().optional().messages({
      "number.integer": "Page number must be an integer",
      "number.positive": "Page number must be a positive integer",
    }),
    limit: Joi.number().integer().positive().optional().messages({
      "number.integer": "Limit must be an integer",
      "number.positive": "Limit must be a positive integer",
    }),
    sortBy: Joi.string().optional().allow("").max(255).messages({
      "string.max": "SortBy field length should not exceed 255 characters",
    }),
    sortOrder: Joi.string().valid("asc", "desc").optional().messages({
      "any.only": "SortOrder must be either 'asc' or 'desc'",
    }),
  }),
  filesSchema: Joi.object({
    imageUrl: Joi.alternatives().try(
      Joi.object({
        name: Joi.string().required(),
        data: Joi.binary().required(),
        size: Joi.number().required(),
        encoding: Joi.string().required(),
        tempFilePath: Joi.string().allow(""),
        truncated: Joi.boolean().required(),
        mimetype: Joi.string()
          .valid("image/jpeg", "image/png", "image/gif")
          .required(),
        md5: Joi.string().required(),
        mv: Joi.function().required(),
      }),
      Joi.array()
        .items(
          Joi.object({
            name: Joi.string().required(),
            data: Joi.binary().required(),
            size: Joi.number().required(),
            encoding: Joi.string().required(),
            tempFilePath: Joi.string().allow(""),
            truncated: Joi.boolean().required(),
            mimetype: Joi.string()
              .valid("image/jpeg", "image/png", "image/gif")
              .required(),
            md5: Joi.string().required(),
            mv: Joi.function().required(),
          })
        )
        .min(1) // Ensure at least one image is present in array
    ),
  }).messages({
    "any.required": "Image is required",
    "array.min": "At least one image is required",
    "object.base": "Invalid image data",
    "string.base": "Invalid image data",
    "string.valid": "Invalid image type, only jpeg, png, or gif are allowed",
  }),
};
